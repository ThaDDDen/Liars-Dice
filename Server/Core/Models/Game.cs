namespace Core.Models;
public class Game
{
    private readonly Random _random;
    public Guid Id { get; set; }
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
    
}
