namespace API.Hubs.HubModels;

public class GameBet
{
    public string GameName { get; set; }
    public HubUser Better { get; set; }
    public int DiceAmount { get; set; }
    public int DiceValue { get; set; }
}