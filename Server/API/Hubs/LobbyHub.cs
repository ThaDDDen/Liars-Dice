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
    private readonly GameRepository _games;
    private readonly UserManager<AppUser> _userManager;

    public LobbyHub(ConnectionRepository connections, GameRepository games, UserManager<AppUser> userManager)
    {
        _connections = connections;
        _games = games;
        _userManager = userManager;
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

        _connections.AddConnection(new UserConnection
        {
            User = new HubUser()
            {
                UserName = user.UserName,
                AvatarCode = user.AvatarCode
            },
            Room = "Lobby"
        });

        await SendConnectedUsers();

        await Clients.Group("Lobby").SendAsync("ReceiveMessage", new UserMessage()
        {
            User = new HubUser()
            {
                UserName = _bot,
                AvatarCode = "BotAvatar"
            },
            Message = $"{user} has joined the lobby.",
            Time = DateTime.Now.ToString("HH:mm")
        });
    }

    public async Task SendMessage(string message)
    {
        var user = await _userManager.FindByNameAsync(Context.User.Identity.Name);


        await Clients.Group("Lobby").SendAsync("ReceiveMessage", new UserMessage()
        {
            User = new HubUser()
            {
                UserName = user.UserName,
                AvatarCode = user.AvatarCode
            },
            Message = message,
            Time = DateTime.Now.ToString("HH:mm")
        });
    }

    public async Task SendConnectedUsers()
    {

        var usersInLobby = _connections.ConnectedUsers().Where(x => x.Room == "Lobby");


        await Clients.Group("Lobby").SendAsync("ConnectedUsers", usersInLobby);
    }

    public async Task CreateGame(GameSettings gameSettings, HubUser gameHost)
    {
        var diceList = new List<int>();
        for (int i = 0; i < gameSettings.DiceCount; i++)
        {
            diceList.Add(1);
        }
        await Groups.AddToGroupAsync(Context.ConnectionId, gameSettings.GameName);

        var user = await _userManager.FindByNameAsync(Context.User.Identity.Name);

        gameHost.GameHost = true;
        gameHost.Dice = diceList;

        var game = new Game(gameSettings, gameHost);

        _games.AddGame(game);

        await Clients.Caller.SendAsync("GameCreated", game);
    }

    public async Task JoinGame(HubUser hubUser, string gameName)
    {

        var game = _games.GetGameByName(gameName);

        if (game == null)
        {
            await Clients.Caller.SendAsync("NoGameWithThatName", new UserMessage()
            {
                User = new HubUser()
                {
                    UserName = _bot,
                    AvatarCode = "BotAvatar"
                },
                Message = $"There is no game named {gameName} to join",
                Time = DateTime.Now.ToString("HH:mm")
            });
        }

        var success = game.AddPlayerToGame(hubUser);

        if (!success)
        {
            await Clients.Caller.SendAsync("GameFullOrAlreadyJoined", new UserMessage()
            {
                User = new HubUser()
                {
                    UserName = _bot,
                    AvatarCode = "BotAvatar"
                },
                Message = $"The game {gameName} is full or you have already joined.",
                Time = DateTime.Now.ToString("HH:mm")
            });
        }
        else
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, gameName);
            await Clients.Group(gameName).SendAsync("ReceiveGame", game);
        }
    }

    public async Task DiceRolled(HubUser user)
    {
        var game = _games.GetGameByPlayerName(user.UserName);

        game.RollDice(game.Players.FirstOrDefault(x => x.UserName == user.UserName));

        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        var user = Context.User.Identity.Name;
        _connections.RemoveConnection(user);

        if (_games.GetGameByPlayerName(user) != null)
        {
            var game = _games.GetGameByPlayerName(user);
            game.RemovePlayerFromGame(user);

            Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
        }

        SendConnectedUsers();

        Clients.Group("Lobby").SendAsync("ReceiveMessage", new UserMessage()
        {
            User = new HubUser()
            {
                UserName = _bot,
                AvatarCode = "BotAvatar"
            },
            Message = $"{user} has left the lobby.",
            Time = DateTime.Now.ToString("HH:mm")
        });

        return base.OnDisconnectedAsync(exception);
    }
}