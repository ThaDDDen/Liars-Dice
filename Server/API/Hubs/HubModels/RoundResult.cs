
namespace API.Hubs.HubModels;

public class RoundResult
{
    public string RoundWinner { get; set; }

    public string RoundLoser { get; set; }

    public string Caller { get; set; }

    public GameBet GameBet { get; set; }

    public int CallResult { get; set; }

}