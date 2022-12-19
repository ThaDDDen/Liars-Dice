using API.Hubs.HubModels;

namespace API.Hubs.HubServices;

public class Game
{
    public HubUser GameHost { get ; set;}
    public string GameName { get; set; }
    public int DiceCount { get; set; }
    public int PlayerCount {get; set;}
    public List<HubUser> Players { get; set; }
    public Game(GameSettings gameSettings, HubUser gameHost)
    {
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
            if(Players.Any(p => p.UserName == newPlayer.UserName))
            {
                return false;
            }

            if(!newPlayer.GameHost)
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