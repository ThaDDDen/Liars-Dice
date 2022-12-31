using System;
using API.Auth.Models;
using API.Hubs.HubModels;
using API.Hubs.HubServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class Hub : Microsoft.AspNetCore.SignalR.Hub
{
    private readonly string _lobbyBot;
    private readonly string _gameBot;
    private readonly ConnectionRepository _connections;
    private readonly GameRepository _games;
    private readonly UserManager<AppUser> _userManager;

    public Hub(ConnectionRepository connections, GameRepository games, UserManager<AppUser> userManager)
    {
        _connections = connections;
        _games = games;
        _userManager = userManager;
        _lobbyBot = "LobbyBot";
        _gameBot = "GameBot";
    }

    public async Task JoinLobby()
    {
        var user = await _userManager.FindByNameAsync(Context.User.Identity.Name);

        if (_connections.AlreadyConnected(user.UserName, "Lobby"))
        {
            await Clients.Caller.SendAsync("AlreadyConnected", _lobbyBot, "You are already connected to the lobby.");
            return;
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, "Lobby");

        _connections.AddConnection(new UserConnection
        {
            User = new HubUser()
            {
                ConnectionId = Context.ConnectionId,
                UserName = user.UserName,
                AvatarCode = user.AvatarCode
            },
            Room = "Lobby"
        });

        await SendConnectedUsers();

        await SendMessage(_lobbyBot, "Lobby", $"{user.UserName} has joined the lobby.");

    }

    public async Task SendMessage(string sender, string room, string message)
    {
        AppUser user = null;
        
        if (sender != _lobbyBot || sender != _gameBot)
        {
            user = await _userManager.FindByNameAsync(sender);
        }

        await Clients.Group(room).SendAsync("ReceiveMessage", new UserMessage()
        {
            User = new HubUser()
            {
                UserName = user != null ? user.UserName : sender == _lobbyBot ? _lobbyBot : _gameBot,
                AvatarCode = user != null ? user.AvatarCode : "BotAvatar"
            },
            Message = message,
            Time = DateTime.Now.ToString("HH:mm")
        }, room);
    }

    public async Task SendConnectedUsers()
    {
        var usersInLobby = _connections.ConnectedUsers().Where(x => x.Room == "Lobby");
        await Clients.Group("Lobby").SendAsync("ConnectedUsers", usersInLobby);
    }

    public async Task CreateGame(GameSettings gameSettings, HubUser gameHost)
    {
        if (_games.GetGameByName(gameSettings.GameName) != null)
        {
            await Clients.Caller.SendAsync("ReceiveError", new ResponseModel
            {
                Status = "Error",
                Message = $"There is already a game called \"{gameSettings.GameName}\". Please try something else!"
            });
            return;
        }
        var diceList = new List<int>();
        for (int i = 0; i < gameSettings.DiceCount; i++)
        {
            diceList.Add(1);
        }
        await Groups.AddToGroupAsync(Context.ConnectionId, gameSettings.GameName);

        gameHost.GameHost = true;
        gameHost.Dice = diceList;

        var game = new Game(gameSettings, gameHost);

        _games.AddGame(game);

        await Clients.Caller.SendAsync("ReceiveGame", game);
        await SendMessage(_gameBot, gameSettings.GameName, $"{gameHost.UserName} has joined the game!");

    }

    public async Task UpdateGameSettings(GameSettings updatedGameSettings)
    {
        var game = _games.GetGameByName(updatedGameSettings.GameName);

        game.UpdatePlayerCount(updatedGameSettings.PlayerCount);
        game.UpdateDiceCount(updatedGameSettings.DiceCount);

        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
    }

    public async Task StartGame(HubUser user)
    {
        var game = _games.GetGameByPlayerName(user.UserName);
        game.GameStarted = true;

        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
        await SendMessage(_gameBot, game.GameName, $"{user.UserName} has started the game!");

    }

    public async Task JoinGame(HubUser hubUser, string gameName)
    {

        var game = _games.GetGameByName(gameName);

        if (game == null)
        {
            await Clients.Caller.SendAsync("ReceiveError", new ResponseModel()
            {
                Status = "Error",
                Message = $"There is no game named \"{gameName}\"! Try again!"
            });
            return;
        }

        var success = game.AddPlayerToGame(hubUser);

        if (!success)
        {
            await Clients.Caller.SendAsync("GameFullOrAlreadyJoined", new UserMessage()
            {
                User = new HubUser()
                {
                    UserName = _lobbyBot,
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
            await SendMessage(_gameBot, gameName, $"{hubUser.UserName} has joined the game!");

        }
    }

    public async Task LeaveGame(HubUser user)
    {
        var game = _games.GetGameByPlayerName(user.UserName);
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, game.GameName);
        game.RemovePlayerFromGame(user.UserName);

        await SendMessage(_gameBot, game.GameName, user.GameHost ? $"{user.UserName} has left the game! A new game host has randomly been assigned!" : $"{user.UserName} has left the game!");


        if(game.RoundStarted)
        {
            await Clients.Group(game.GameName).SendAsync("ReceiveError", new ResponseModel()
            {
                Status = "Error",
                Message = $"{user.UserName} dissconnected. 😣 The round will be restarted!" 
            });
            game.RestartRound();
        }
        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);

        if(game.GameIsEmpty()) _games.RemoveGame(game);
    }

    public async Task UpdatePlayerOrder(List<HubUser> players)
    {
        var game = _games.GetGameByPlayerName(Context.User.Identity.Name);
        game.Players = players;

        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
    }

    public async Task InvitePlayer(HubUser hubUser, string playerToInvite)
    {
        var game = _games.GetGameByPlayerName(hubUser.UserName);
        var user = _connections.GetConnectionByName(playerToInvite);

        await Clients.Client(user.User.ConnectionId).SendAsync("ReceiveGameInvitation", new GameInvitation { GameHost = hubUser.UserName, GameName = game.GameName });
    }
    public async Task RollDice(HubUser user)
    {
        var game = _games.GetGameByPlayerName(user.UserName);

        game.RollDice(game.Players.FirstOrDefault(x => x.UserName == user.UserName));


        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
    }

    public async Task SetBet(GameBet gameBet)
    {
        var game = _games.GetGameByName(gameBet.GameName);

        game.SetBet(gameBet);

        await Clients.Group(gameBet.GameName).SendAsync("ReceiveGame", game);
    }

    public async Task Call(HubUser caller)
    {
        var game = _games.GetGameByPlayerName(caller.UserName);

        game.Call(caller);

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

            if(game.RoundStarted)
            {
                Clients.Group(game.GameName).SendAsync("ReceiveError", new ResponseModel()
                {
                    Status = "Error",
                    Message = $"{user} dissconnected. 😣 The round will be restarted!" 
                });
                game.RestartRound();
            }
            
            Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
        }

        SendConnectedUsers();


        SendMessage(_lobbyBot, "Lobby", $"{user} has left the lobby.");

        return base.OnDisconnectedAsync(exception);
    }
}