using API.Hubs.HubModels;
using API.Hubs.HubServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class LobbyHub : Hub
{
    private readonly string _bot;
    private readonly ConnectionRepository _connections;

    public LobbyHub(ConnectionRepository connections)
    {
        _connections = connections;
        _bot = "LobbyBot";
    }

    public async Task JoinLobby()
    {
        var user = Context.User.Identity.Name;

        if (_connections.AlreadyConnected(user, "Lobby"))
        {
            await Clients.Caller.SendAsync("AlreadyConnected", _bot, "You are already connected to the lobby.");
            return;
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, "Lobby");

        _connections.AddConnection(new UserConnection { User = user, Room = "Lobby" });

        await SendConnectedUsers();

        await Clients.Group("Lobby").SendAsync("ReceiveMessage", _bot, $"{user} has joined the lobby.", DateTime.Now.ToString("HH:mm"));

    }

    public async Task SendMessage(string message)
    {
        var user = Context.User.Identity.Name;

        await Clients.Group("Lobby").SendAsync("ReceiveMessage", user, message, DateTime.Now.ToString("HH:mm"));
    }

    public async Task SendConnectedUsers()
    {

        var usersInLobby = _connections.ConnectedUsers().Where(x => x.Room == "Lobby");

        await Clients.Group("Lobby").SendAsync("ConnectedUsers", usersInLobby);
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var user = Context.User.Identity.Name;
        _connections.RemoveConnection(user);

        SendConnectedUsers();

        Clients.Group("Lobby").SendAsync("ReceiveMessage", _bot, $"{user} has left the lobby.", DateTime.Now.ToString("HH:mm"));


        return base.OnDisconnectedAsync(exception);
    }
}