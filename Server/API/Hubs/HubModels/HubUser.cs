namespace API.Hubs.HubModels;

public class HubUser
{
    public string UserName { get; set; }
    public string AvatarCode { get; set; }
    public bool GameHost { get; set; }
    public List<int> Dice { get; set; } = new();
    public string ConnectionId { get; set; } = "";
    public bool HasRolled { get; set; }
    public bool IsOut { get; set; }
}
