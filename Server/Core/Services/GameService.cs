using Core.Models;
using Core.Interfaces;

namespace Core.Services;

public class GameService: IGameService
{
    private readonly Random _random;
    private IGameRepository _gameRepository;

    public GameService(IGameRepository gameRepository)
    {
        _random = new();
        _gameRepository = gameRepository;
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

            if (!newPlayer.GameHost)
            {
                for (int i = 0; i < game.DiceCount; i++)
                {
                    newPlayer.Dice.Add(1);
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
        if(game.Players.FirstOrDefault(p => p.UserName == playerToRemove).GameHost) 
        {
            game.Players.FirstOrDefault(p => p.UserName == playerToRemove).GameHost = false;
            game.Players.Where(p => p.UserName != playerToRemove).ToList()[_random.Next(0, game.Players.Where(p => p.UserName != playerToRemove).ToList().Count)].GameHost = true;
        }
        game.Players.Remove(game.Players.FirstOrDefault(p => p.UserName == playerToRemove));
        game.PlayerCount--;
    }

    public void RollDice(string gameName, HubUser user)
    {
        var game = _gameRepository.GetGameByName(gameName);
        user.Dice = game.Players.FirstOrDefault(x => x.UserName == user.UserName).Dice.Select(y => y = _random.Next(1, 7)).ToList();
        user.HasRolled = true;
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

        var result = GetDiceWithBetValue(game);

        if (result >= game.CurrentBet.DiceAmount)
        {
            caller.Dice.RemoveAt(0);

            if(caller.Dice.Count == 0) caller.IsOut = true;

            roundResult.RoundLoser = caller;
            roundResult.RoundWinner = better;
            game.CurrentBetter = better;
        }
        else
        {
            better.Dice.RemoveAt(0);

            if(better.Dice.Count == 0) better.IsOut = true;

            roundResult.RoundLoser = better;
            roundResult.RoundWinner = caller;
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
            player.Dice = newDiceList;
        }
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
        game.Players.ForEach(p => p.HasRolled = false);
    }

    public HubUser GetGameHost(string gameName)
    {   
        var game = _gameRepository.GetGameByName(gameName);
        return game.Players.FirstOrDefault(p => p.GameHost);
    }

    private void CheckRolls(Game game)
    {
        if (game.Players.Where(p => !p.IsOut).All(x => x.HasRolled))
        {
            game.RoundStarted = true;

            if(!IsFirstRound(game))
            {
                if(!game.Players.Any(p => p.UserName == game.CurrentBetter.UserName)) game.CurrentBetter = game.RoundResult.RoundLoser;

            }

            // Set random better if it's the first round // 
            if (IsFirstRound(game)) game.CurrentBetter = game.Players[_random.Next(0, game.Players.Count)];        
        }
    }

    private bool IsFirstRound(Game game)
    {
        var diceLeft = game.Players.Select(x => (x.Dice.Count)).Sum();

        return game.DiceCount * game.PlayerCount == diceLeft;
    }

    private void SetBetter(Game game, GameBet gameBet)
    {
        //find the actual Player that placed the bet.
        var currentBetter = game.Players.FirstOrDefault(x => x.UserName == gameBet.Better.UserName);

        game.PreviousBetter = currentBetter;
        
        if (currentBetter == game.Players.Where(p => !p.IsOut).Last())
        {
            game.CurrentBetter = game.Players.Where(p => !p.IsOut).First();
            return;
        }
        game.CurrentBetter = game.Players.Where(p => !p.IsOut).ToList()[game.Players.Where(p => !p.IsOut).ToList().IndexOf(currentBetter) + 1];
    }

    private void PrepareNextRound(Game game)
    {
        game.CurrentBet = null;
        game.RoundStarted = false;
        game.Players.ForEach(p => p.HasRolled = false);
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
                diceWithInStraight += player.Dice.Count;
            }
            else
            {
                foreach (var dice in player.Dice)
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
        if (player.Dice.Count < 3) return false;

        var orderedHand = player.Dice.OrderBy(dice => dice).ToList();

        if (orderedHand[0] != 1) return false;

        if (!orderedHand.Select((i, j) => i - j).Distinct().Skip(1).Any())
        {
            return true;
        }
        return false;
    }

    private void CheckGameOver(Game game)
    {
        if(game.Players.Where(p => p.Dice.Count > 0).Count() == 1) game.GameOver = true;
    }

       
}