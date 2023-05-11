using Core.Models.App;
using Core.Interfaces;

namespace Core.Services;

public class GameService : IGameService
{
    private readonly Random _random;
    private IGameRepository _gameRepository;

    private IAppDataService _appDataService;

    public GameService(IGameRepository gameRepository, IAppDataService appDataService)
    {
        _random = new();
        _gameRepository = gameRepository;
        _appDataService = appDataService;
    }

    public Game CreateGame(GameSettings gameSettings, HubUser gameHost)
    {
        var game = new Game
        {
            Id = Guid.NewGuid(),
            Players = new(),
            GameName = gameSettings.GameName,
            DiceCount = gameSettings.DiceCount,
            PlayerCount = gameSettings.PlayerCount,
            BetTime = gameSettings.BetTime,
            RoundResult = new(),
            Round = 1,
        };
        _gameRepository.AddGame(game);
        AddPlayerToGame(gameSettings.GameName, gameHost);

        return game;
    }

    public bool AddPlayerToGame(string gameName, HubUser newPlayer)
    {
        var game = _gameRepository.GetGameByName(gameName);

        if (game.Players.Count() != game.PlayerCount)
        {
            if (game.Players.Any(p => p.UserName == newPlayer.UserName)) return false;

            if (game.GameStarted) return false;

            if (!newPlayer.GameProperties.GameHost)
            {
                for (int i = 0; i < game.DiceCount; i++)
                {
                    newPlayer.GameProperties.Dice.Add(1);
                }
            }
            game.Players.Add(newPlayer);
            return true;
        }
        return false;
    }

    public void RemovePlayerFromGame(string gameName, string playerToRemove)
    {
        var game = _gameRepository.GetGameByName(gameName);
        // If the player that's leaving is gameHost we assign //
        // a random gameHost from the remaining players       //
        if (game.Players.FirstOrDefault(p => p.UserName == playerToRemove).GameProperties.GameHost && game.Players.Count != 1)
        {
            game.Players.FirstOrDefault(p => p.UserName == playerToRemove).GameProperties.GameHost = false;
            game.Players.Where(p => p.UserName != playerToRemove).ToList()[_random.Next(0, game.Players.Where(p => p.UserName != playerToRemove).ToList().Count)].GameProperties.GameHost = true;
        }
        game.Players.Remove(game.Players.FirstOrDefault(p => p.UserName == playerToRemove));
        game.PlayerCount--;
    }

    public void RollDice(string gameName, HubUser user)
    {
        var game = _gameRepository.GetGameByName(gameName);
        user.GameProperties.Dice = game.Players.FirstOrDefault(x => x.UserName == user.UserName).GameProperties.Dice.Select(y => y = _random.Next(1, 7)).Order().ToList();
        user.GameProperties.HasRolled = true;
        SetDiceStatistics(user);
        CheckRolls(game);
    }

    public void SetBet(string gameName, GameBet gameBet)
    {
        var game = _gameRepository.GetGameByName(gameName);
        game.CurrentBet = gameBet;
        SetBetter(game, gameBet);
    }

    public void Call(string gameName, HubUser gameCaller)
    {
        var game = _gameRepository.GetGameByName(gameName);
        var roundResult = new RoundResult();

        var caller = game.Players.FirstOrDefault(x => x.UserName == gameCaller.UserName);
        var better = game.Players.FirstOrDefault(x => x.UserName == game.PreviousBetter.UserName);

        caller.Statistics.Calls += 1;
        _appDataService.UpdateStatistics(caller.Statistics);

        var result = GetDiceWithBetValue(game);

        if (result >= game.CurrentBet.DiceAmount)
        {
            caller.GameProperties.Dice.RemoveAt(0);

            if (caller.GameProperties.Dice.Count == 0)
            {
                caller.GameProperties.IsOut = true;
                caller.Statistics.GamesPlayed += 1;
                _appDataService.UpdateStatistics(caller.Statistics);
            }

            roundResult.RoundLoser = caller;
            roundResult.RoundWinner = better;
            roundResult.RoundWinner.Statistics.RoundsWon += 1;
            _appDataService.UpdateStatistics(roundResult.RoundWinner.Statistics);
            game.CurrentBetter = better;
        }
        else
        {
            better.GameProperties.Dice.RemoveAt(0);

            if (better.GameProperties.Dice.Count == 0)
            {
                better.GameProperties.IsOut = true;
                better.Statistics.GamesPlayed += 1;
                _appDataService.UpdateStatistics(better.Statistics);
            }


            roundResult.RoundLoser = better;
            roundResult.RoundWinner = caller;
            roundResult.RoundWinner.Statistics.RoundsWon += 1;
            _appDataService.UpdateStatistics(roundResult.RoundWinner.Statistics);
            game.CurrentBetter = caller;
        }

        roundResult.CallResult = result;
        roundResult.GameBet = game.CurrentBet;
        roundResult.Caller = gameCaller.UserName;
        roundResult.Round = game.Round;

        game.RoundResult = roundResult;

        PrepareNextRound(game);
        CheckGameOver(game);
    }

    public void UpdatePlayerCount(string gameName, int newPlayerCount)
    {
        var game = _gameRepository.GetGameByName(gameName);
        game.PlayerCount = newPlayerCount;
    }

    public void UpdateDiceCount(string gameName, int newDiceCount)
    {
        var game = _gameRepository.GetGameByName(gameName);
        game.DiceCount = newDiceCount;

        foreach (var player in game.Players)
        {
            var newDiceList = new List<int>();

            for (int i = 0; i < newDiceCount; i++)
            {
                newDiceList.Add(1);
            }
            player.GameProperties.Dice = newDiceList;
        }
    }

    public void UpdateBetTime(string gameName, int time)
    {
        var game = _gameRepository.GetGameByName(gameName);
        
        game.BetTime = time;
    }

    public bool GameIsEmpty(string gameName)
    {
        var game = _gameRepository.GetGameByName(gameName);
        return game.Players.Count == 0;
    }

    public void RestartRound(string gameName)
    {
        var game = _gameRepository.GetGameByName(gameName);
        game.CurrentBet = null;
        game.RoundStarted = false;
        game.Players.ForEach(p => p.GameProperties.HasRolled = false);
    }

    public HubUser GetGameHost(string gameName)
    {
        var game = _gameRepository.GetGameByName(gameName);
        return game.Players.FirstOrDefault(p => p.GameProperties.GameHost);
    }

    private void CheckRolls(Game game)
    {
        if (game.Players.Where(p => !p.GameProperties.IsOut).All(x => x.GameProperties.HasRolled))
        {
            game.RoundStarted = true;

            if (!IsFirstRound(game))
            {
                if (!game.Players.Any(p => p.UserName == game.CurrentBetter.UserName)) game.CurrentBetter = game.RoundResult.RoundLoser;

            }

            // Set random better if it's the first round // 
            if (IsFirstRound(game)) game.CurrentBetter = game.Players[_random.Next(0, game.Players.Count)];
        }
    }

    private bool IsFirstRound(Game game)
    {
        var diceLeft = game.Players.Select(x => (x.GameProperties.Dice.Count)).Sum();

        return game.DiceCount * game.PlayerCount == diceLeft;
    }

    private void SetBetter(Game game, GameBet gameBet)
    {
        //find the actual Player that placed the bet.
        var currentBetter = game.Players.FirstOrDefault(x => x.UserName == gameBet.Better.UserName);

        game.PreviousBetter = currentBetter;

        if (currentBetter == game.Players.Where(p => !p.GameProperties.IsOut).Last())
        {
            game.CurrentBetter = game.Players.Where(p => !p.GameProperties.IsOut).First();
            return;
        }
        game.CurrentBetter = game.Players.Where(p => !p.GameProperties.IsOut).ToList()[game.Players.Where(p => !p.GameProperties.IsOut).ToList().IndexOf(currentBetter) + 1];
    }

    private void PrepareNextRound(Game game)
    {
        game.CurrentBet = null;
        game.RoundStarted = false;
        game.Players.ForEach(p => p.GameProperties.HasRolled = false);
        game.Round++;
    }

    private int GetDiceWithBetValue(Game game)
    {
        var diceWithBetValue = 0;
        var diceWithInStraight = 0;
        var diceWithValueOne = 0;

        foreach (var player in game.Players)
        {
            if (PlayerHasStraight(player))
            {
                diceWithInStraight += player.GameProperties.Dice.Count;
            }
            else
            {
                foreach (var dice in player.GameProperties.Dice)
                {
                    if (dice == game.CurrentBet.DiceValue)
                    {
                        diceWithBetValue += 1;
                    }
                    if (dice == 1)
                    {
                        diceWithValueOne += 1;
                    }
                }
            }
        }
        return diceWithBetValue + diceWithInStraight + diceWithValueOne;
    }

    private bool PlayerHasStraight(HubUser player)
    {
        if (player.GameProperties.Dice.Count < 3) return false;

        var orderedHand = player.GameProperties.Dice.OrderBy(dice => dice).ToList();

        if (orderedHand[0] != 1) return false;

        if (!orderedHand.Select((i, j) => i - j).Distinct().Skip(1).Any())
        {
            SetStraighStatistics(player);
            return true;
        }
        return false;
    }

    private void CheckGameOver(Game game)
    {
        if (game.Players.Where(p => p.GameProperties.Dice.Count > 0).Count() == 1)
        {
            var winner = game.Players.FirstOrDefault(x => !x.GameProperties.IsOut);
            winner.Statistics.GamesPlayed += 1;
            winner.Statistics.GamesWon += 1;
            _appDataService.UpdateStatistics(winner.Statistics);

            game.GameOver = true;
        }
    }


    //STATISTICS FUNCTIONS WILL MOVE LATER?
    private void SetDiceStatistics(HubUser user)
    {
        user.Statistics.Ones += user.GameProperties.Dice.FindAll(x => x == 1).Count;
        user.Statistics.Twoes += user.GameProperties.Dice.FindAll(x => x == 2).Count;
        user.Statistics.Threes += user.GameProperties.Dice.FindAll(x => x == 3).Count;
        user.Statistics.Fours += user.GameProperties.Dice.FindAll(x => x == 4).Count;
        user.Statistics.Fives += user.GameProperties.Dice.FindAll(x => x == 5).Count;
        user.Statistics.Sixes += user.GameProperties.Dice.FindAll(x => x == 6).Count;
    }

    private void SetStraighStatistics(HubUser user)
    {
        user.Statistics.Straights += 1;
    }
}