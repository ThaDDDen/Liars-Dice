namespace Core.Models.App;

public class UserMessage
{
    public HubUser User { get; set; }
    public string Message {get; set;}
    public string Time { get; set; }
}
