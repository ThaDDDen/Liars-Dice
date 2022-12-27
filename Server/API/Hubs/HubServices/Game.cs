using API.Hubs.HubModels;

namespace API.Hubs.HubServices;

public class Game
{
    private readonly Random _random;
    public bool GameOver { get; set; }
    public string GameName { get; set; }
    public int DiceCount { get; set; }
    public int PlayerCount { get; set; }
    public int Round { get; set; }
    public List<HubUser> Players { get; set; }
    public GameBet CurrentBet { get; set; } = null;
    public HubUser PreviousBetter { get; set; } = null;
    public HubUser CurrentBetter { get; set; } = null;
    public bool GameStarted { get; set; }
    public bool RoundStarted { get; set; }
    public RoundResult RoundResult { get; set; }

    public Game(GameSettings gameSettings, HubUser gameHost)
    {
        _random = new();
        Players = new();
        GameName = gameSettings.GameName;
        DiceCount = gameSettings.DiceCount;
        PlayerCount = gameSettings.PlayerCount;
        RoundResult = new();
        Round = 1;
        AddPlayerToGame(gameHost);
    }

    public bool AddPlayerToGame(HubUser newPlayer)
    {
        if (Players.Count() != PlayerCount)
        {
            if (Players.Any(p => p.UserName == newPlayer.UserName))
            {
                return false;
            }

            if (!newPlayer.GameHost)
            {
                for (int i = 0; i < DiceCount; i++)
                {
                    newPlayer.Dice.Add(1);
                }
            }

            Players.Add(newPlayer);
            return true;
        }

        return false;
    }

    public void RemovePlayerFromGame(string playerToRemove)
    {
        Players.Remove(Players.FirstOrDefault(p => p.UserName == playerToRemove));
    }

    public void RollDice(HubUser user)
    {
        user.Dice = Players.FirstOrDefault(x => x.UserName == user.UserName).Dice.Select(y => y = _random.Next(1, 7)).ToList();
        user.HasRolled = true;
        CheckRolls();
    }

    private void CheckRolls()
    {
        if (Players.All(x => x.HasRolled))
        {
            RoundStarted = true;

            if (IsFirstRound())
            {
                CurrentBetter = Players[_random.Next(0, Players.Count)];
            }
        }
    }

    private bool IsFirstRound()
    {
        var diceLeft = Players.Select(x => (x.Dice.Count)).Sum();

        return DiceCount * PlayerCount == diceLeft;
    }

    public void SetBet(GameBet gameBet)
    {
        CurrentBet = gameBet;

        //find the actual Player that placed the bet.
        var currentBetter = Players.FirstOrDefault(x => x.UserName == gameBet.Better.UserName);

        PreviousBetter = currentBetter;
        
        if (currentBetter == Players.Last())
        {
            CurrentBetter = Players.First();
            return;
        }

        CurrentBetter = Players[Players.IndexOf(currentBetter) + 1];
    }

    public void Call(HubUser gameCaller)
    {
        var roundResult = new RoundResult();

        var caller = Players.FirstOrDefault(x => x.UserName == gameCaller.UserName);
        var better = Players.FirstOrDefault(x => x.UserName == PreviousBetter.UserName);

        //quick maddafakka test solution

        // var lastBetter = new HubUser();

        // if (better == Players.First())
        // {
        //     lastBetter = Players.Last();
        // }
        // else
        // {
        //     lastBetter = Players[Players.IndexOf(better) - 1];
        // }

        // System.Console.WriteLine("test lastBetter:" + lastBetter.UserName);

        // Console.WriteLine("GameCaller: " + gameCaller.UserName);
        // Console.WriteLine("GameBetter: " + gameBetter.UserName);

        var result = GetDiceWithBetValue(CurrentBet.DiceValue);

        if (result >= CurrentBet.DiceAmount)
        {
            caller.Dice.RemoveAt(0);

            roundResult.RoundLoser = caller;
            roundResult.RoundWinner = better;
            CurrentBetter = better;
        }
        else
        {
            better.Dice.RemoveAt(0);

            roundResult.RoundLoser = better;
            roundResult.RoundWinner = caller;
            CurrentBetter = caller;
        }

        roundResult.CallResult = result;
        roundResult.GameBet = CurrentBet;
        roundResult.Caller = gameCaller.UserName;
        roundResult.Round = Round;

        RoundResult = roundResult;


        CurrentBet = null;
        RoundStarted = false;
        Players.ForEach(p => p.HasRolled = false);
        Round++;
        CheckGameOver();
    }

    private int GetDiceWithBetValue(int betValue)
    {
        var diceWithBetValue = 0;
        var diceWithInStraight = 0;
        var diceWithValueOne = 0;

        foreach (var player in Players)
        {
            if (PlayerHasStraight(player))
            {
                diceWithInStraight += player.Dice.Count;
            }
            else
            {
                foreach (var dice in player.Dice)
                {
                    if (dice == betValue)
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



    public void UpdatePlayerCount(int newPlayerCount)
    {
        PlayerCount = newPlayerCount;
    }

    public void UpdateDiceCount(int newDiceCount)
    {
        DiceCount = newDiceCount;

        foreach (var player in Players)
        {
            var newDiceList = new List<int>();

            for (int i = 0; i < newDiceCount; i++)
            {
                newDiceList.Add(1);
            }

            player.Dice = newDiceList;
        }
    }

    public bool IsEmpty()
    {
        return Players.Count == 0;
    }
    public void CheckGameOver()
    {
        if(Players.Where(p => p.Dice.Count > 0).Count() == 1) GameOver = true;
    }
}