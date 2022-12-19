using API.Auth.Models;
using API.Hubs.HubModels;
using API.Hubs.HubServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class LobbyHub : Hub
{
    private readonly string _bot;
    private readonly ConnectionRepository _connections;
    private readonly UserManager<AppUser> _userManager;

    public LobbyHub(ConnectionRepository connections, UserManager<AppUser> userManager)
    {
        _userManager = userManager;
        _connections = connections;
        _bot = "LobbyBot";
    }

    public async Task JoinLobby()
    {
        var user = await _userManager.FindByNameAsync(Context.User.Identity.Name);

        if (_connections.AlreadyConnected(user.UserName, "Lobby"))
        {
            await Clients.Caller.SendAsync("AlreadyConnected", _bot, "You are already connected to the lobby.");
            return;
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, "Lobby");

        _connections.AddConnection(new UserConnection { User = new UserConnectionUser() { UserName = user.UserName, AvatarCode = user.AvatarCode }, Room = "Lobby" });

        await SendConnectedUsers();

        await Clients.Group("Lobby").SendAsync("ReceiveMessage", _bot, "BotAvatar", $"{user} has joined the lobby.", DateTime.Now.ToString("HH:mm"));
    }

    public async Task SendMessage(string message)
    {
        var user = await _userManager.FindByNameAsync(Context.User.Identity.Name);


        await Clients.Group("Lobby").SendAsync("ReceiveMessage", user.UserName, user.AvatarCode, message, DateTime.Now.ToString("HH:mm"));
    }

    public async Task SendConnectedUsers()
    {

        var usersInLobby = _connections.ConnectedUsers().Where(x => x.Room == "Lobby");


        await Clients.Group("Lobby").SendAsync("ConnectedUsers", usersInLobby);
    }

    public async Task CreateGame(string gameName, int numberOfDice)
    {
        var diceList = new List<int>();
        for (int i = 0; i < numberOfDice; i++)
        {
            diceList.Add(1);
        }
        await Groups.AddToGroupAsync(Context.ConnectionId, gameName);


        var user = await _userManager.FindByNameAsync(Context.User.Identity.Name);

        var userConnection = new
        {
            user = new UserConnectionUser
            {
                UserName = user.UserName,
                AvatarCode = user.AvatarCode,
                GameHost = true,
                Dice = diceList

            },
            room = gameName
        };

        await Clients.Group(gameName).SendAsync("CreateGame", userConnection);
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var user = Context.User.Identity.Name;
        _connections.RemoveConnection(user);

        SendConnectedUsers();

        Clients.Group("Lobby").SendAsync("ReceiveMessage", _bot, "BotAvatar", $"{user} has left the lobby.", DateTime.Now.ToString("HH:mm"));

        return base.OnDisconnectedAsync(exception);
    }
}