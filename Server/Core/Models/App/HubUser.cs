namespace Core.Models.App;

public class HubUser
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string AvatarCode { get; set; }
    public string ConnectionId { get; set; } = "";
    public GameProperties GameProperties { get; set; } = new();
}
