using API.Hubs.HubModels;

namespace API.Hubs.HubServices;

public class Game
{
    private readonly Random _random;
    public string GameName { get; set; }
    public int DiceCount { get; set; }
    public int PlayerCount { get; set; }
    public List<HubUser> Players { get; set; }
    public GameBet CurrentBet { get; set; } = null;
    public HubUser CurrentBetter { get; set; } = null;
    public bool GameStarted { get; set; }
    public bool RoundStarted { get; set; }
    public RoundResult RoundResult { get; set; } = null;

    public Game(GameSettings gameSettings, HubUser gameHost)
    {
        _random = new();
        Players = new();
        GameName = gameSettings.GameName;
        DiceCount = gameSettings.DiceCount;
        PlayerCount = gameSettings.PlayerCount;
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

        if (currentBetter == Players.Last())
        {
            CurrentBetter = Players.First();
            return;
        }

        CurrentBetter = Players[Players.IndexOf(currentBetter) + 1];
    }

    public void Call(HubUser gameCaller, HubUser gameBetter)
    {
        var roundResult = new RoundResult();

        var caller = Players.FirstOrDefault(x => x.UserName == gameCaller.UserName);
        var better = Players.FirstOrDefault(x => x.UserName == gameBetter.UserName);

        //quick maddafakka test solution

        var lastBetter = new HubUser();

        if (better == Players.First())
        {
            lastBetter = Players.Last();
        }
        else
        {
            lastBetter = Players[Players.IndexOf(better) - 1];
        }

        System.Console.WriteLine("test lastBetter:" + lastBetter.UserName);

        Console.WriteLine("GameCaller: " + gameCaller.UserName);
        Console.WriteLine("GameBetter: " + gameBetter.UserName);

        var result = GetDiceWithBetValue(CurrentBet.DiceValue);

        if (result >= CurrentBet.DiceAmount)
        {
            caller.Dice.RemoveAt(0);

            roundResult.RoundLoser = caller.UserName;
            roundResult.RoundWinner = lastBetter.UserName;
        }
        else
        {
            lastBetter.Dice.RemoveAt(0);

            roundResult.RoundLoser = lastBetter.UserName;
            roundResult.RoundWinner = caller.UserName;
        }

        roundResult.CallResult = result;
        roundResult.GameBet = CurrentBet;

        RoundResult = roundResult;

        RoundStarted = false;
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


    public bool GameOver()
    {
        int diceLeft = 0;

        foreach (HubUser hubUser in Players)
        {
            diceLeft += hubUser.Dice.Count();
        }

        return diceLeft == 0;
    }
}