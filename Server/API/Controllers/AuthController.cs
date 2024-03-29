using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Entities.AuthEntities;
using Core.Interfaces;
using Core.Models.App;
using Core.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{

    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;

    private readonly IAppDataService _appDataService;

    public AuthController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IAppDataService appDataService)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
        _appDataService = appDataService;
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var userExists = await _userManager.FindByNameAsync(model.Username);
        var emailExists = await _userManager.FindByEmailAsync(model.Email);
        if (userExists != null)
            return StatusCode(StatusCodes.Status500InternalServerError, new SnackMessage { Status = "Error", Message = "User already exists!" });
        if (emailExists != null)
            return StatusCode(StatusCodes.Status500InternalServerError, new SnackMessage { Status = "Error", Message = "The Email provided is already in use!" });

        AppUser user = new()
        {
            Email = model.Email,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = model.Username
        };
        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
            return StatusCode(StatusCodes.Status500InternalServerError, new SnackMessage { Status = "Error", Message = "User creation failed! Please check user details and try again." });

        await _appDataService.PostStatistics(user.Id);

        return Ok(new SnackMessage { Status = "Success", Message = "User created successfully!" });
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await _userManager.FindByNameAsync(model.Username);
        if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var token = GetToken(authClaims);

            return Ok(new
            {
                status = "Success",
                token = new JwtSecurityTokenHandler().WriteToken(token),
                id = user.Id,
                expiration = token.ValidTo,
                avatarCode = user.AvatarCode
            });
        }
        return Unauthorized(new SnackMessage { Status = "Error", Message = "Couldn't log you in. Please check username and password and try again." });
    }

    [HttpPut]
    [Route("UpdateAvatar")]
    public async Task<IActionResult> UpdateAvatar([FromBody] string avatarCode)
    {
        var user = await _userManager.FindByNameAsync(User.Identity?.Name);

        if (user != null)
        {
            user.AvatarCode = avatarCode;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok(new SnackMessage { Status = "Success", Message = "Avatar updated successfully!" });
            }
        }
        return StatusCode(StatusCodes.Status500InternalServerError, new SnackMessage { Status = "Error", Message = "Avatar update failed! Please try again." });
    }

    [HttpGet]
    [Route("IsAuthenticated")]
    public async Task<IActionResult> IsAuthenticated()
    {
        var user = await _userManager.FindByNameAsync(User.Identity?.Name);

        return Ok(new
        {
            id = user.Id,
            username = User.Identity?.Name,
            avatarCode = user.AvatarCode
        });
    }

    private JwtSecurityToken GetToken(List<Claim> authClaims)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddYears(1),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

        return token;
    }
}