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
        //TODO cleanup and investigate abit because gameBet.Better and PLayers user didnt match.
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