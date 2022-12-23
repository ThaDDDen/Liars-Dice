using API.Hubs.HubModels;

namespace API.Hubs.HubServices;

public class Game
{
    private readonly Random _random;
    public HubUser GameHost { get; set; }
    public string GameName { get; set; }
    public int DiceCount { get; set; }
    public int PlayerCount { get; set; }
    public List<HubUser> Players { get; set; }
    public Game(GameSettings gameSettings, HubUser gameHost)
    {
        _random = new();
        Players = new();
        GameName = gameSettings.GameName;
        DiceCount = gameSettings.DiceCount;
        PlayerCount = gameSettings.PlayerCount;
        GameHost = gameHost;
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