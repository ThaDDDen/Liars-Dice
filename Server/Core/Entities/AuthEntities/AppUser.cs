using Microsoft.AspNetCore.Identity;

namespace Core.Entities.AuthEntities;
public class AppUser : IdentityUser
{
    public string AvatarCode { get; set; } = "oscar";
}