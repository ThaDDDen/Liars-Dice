using Microsoft.AspNetCore.Identity;


namespace API.Auth.Models;
public class AppUser : IdentityUser
{
    public string AvatarCode { get; set; } = "oscar";
}