using Core.Entities.AppEntities;

namespace Core.Models.App;

public class Profile
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string AvatarCode { get; set; }
    public Statistics Statistics { get; set; } = new();
}
