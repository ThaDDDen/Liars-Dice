using Core.Entities.AppEntities;

namespace Core.Models.App;

public class HubUser
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string AvatarCode { get; set; }
    public string ConnectionId { get; set; } = "";
    public GameProperties GameProperties { get; set; } = new();
    public List<HubUser> Friends { get; set; } = new();
    public Statistics Statistics { get; set; } = new();
}
