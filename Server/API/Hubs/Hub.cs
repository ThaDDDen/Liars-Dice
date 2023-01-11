using Core.Entities.AuthEntities;
using Core.Interfaces;
using Core.Models.App;
using Core.Models.Auth;
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
    // private readonly ConnectionRepository _connections;
    private readonly IGameService _gameService;
    private readonly IGameRepository _gameRepository;
    private readonly IConnectionRepository _connectionRepository;
    private readonly IAppDataService _appDataService;
    private readonly UserManager<AppUser> _userManager;

    public Hub(IConnectionRepository connectionRepository, IGameService gameService, IGameRepository gameRepository, IAppDataService appDataService, UserManager<AppUser> userManager)
    {
        _connectionRepository = connectionRepository;
        // _games = games;
        _appDataService = appDataService;
        _gameRepository = gameRepository;
        _gameService = gameService;
        _userManager = userManager;
        _lobbyBot = "LobbyBot";
        _gameBot = "GameBot";
    }

    public async Task JoinLobby()
    {
        var user = await _userManager.FindByNameAsync(Context.User.Identity.Name);

        if (_connectionRepository.AlreadyConnected(user.UserName, "Lobby"))
        {
            await Clients.Caller.SendAsync("AlreadyConnected", _lobbyBot, "You are already connected to the lobby.");
            return;
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, "Lobby");

        _connectionRepository.AddConnection(new UserConnection
        {
            User = new HubUser()
            {
                Id = user.Id,
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
        var usersInLobby = _connectionRepository.ConnectedUsers().Where(x => x.Room == "Lobby");
        await Clients.Group("Lobby").SendAsync("ConnectedUsers", usersInLobby);
    }

    public async Task CreateGame(GameSettings gameSettings, HubUser gameHost)
    {
        if (_gameRepository.GetGameByName(gameSettings.GameName) != null)
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

        gameHost.GameProperties.GameHost = true;
        gameHost.GameProperties.Dice = diceList;

        var game = _gameService.CreateGame(gameSettings, gameHost);

        await Clients.Caller.SendAsync("ReceiveGame", game);
        await SendMessage(_gameBot, gameSettings.GameName, $"{gameHost.UserName} has joined the game!");
    }

    public async Task UpdateGameSettings(GameSettings updatedGameSettings)
    {
        var game = _gameRepository.GetGameByName(updatedGameSettings.GameName);

        _gameService.UpdatePlayerCount(game.GameName, updatedGameSettings.PlayerCount);
        _gameService.UpdateDiceCount(game.GameName, updatedGameSettings.DiceCount);

        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
    }

    public async Task StartGame(HubUser user)
    {
        var game = _gameRepository.GetGameByPlayerName(user.UserName);
        game.GameStarted = true;

        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
        await SendMessage(_gameBot, game.GameName, $"{user.UserName} has started the game!");
    }

    public async Task RequestToJoinGame(HubUser user, string gameName)
    {
        var game = _gameRepository.GetGameByName(gameName);

        if (game == null)
        {
            await Clients.Caller.SendAsync("ReceiveError", new ResponseModel()
            {
                Status = "Error",
                Message = $"There is no game named \"{gameName}\"! Try again!"
            });
            return;
        }

        if (game.GameStarted)
        {
            await Clients.Caller.SendAsync("ReceiveError", new ResponseModel()
            {
                Status = "Error",
                Message = $"The game has already started."
            });
            return; 
        }

        var gameHost =  _connectionRepository.GetConnectionByName(_gameService.GetGameHost(game.GameName).UserName);

        await Clients.Client(gameHost.User.ConnectionId).SendAsync("ReceiveJoinRequest", user);
    }

    public async Task AcceptJoinRequest(HubUser player, string gameName)
    {
        var game = _gameRepository.GetGameByName(gameName);

        await Groups.AddToGroupAsync(_connectionRepository.GetConnectionByName(player.UserName).User.ConnectionId, gameName);
        _gameService.AddPlayerToGame(game.GameName, player);

        await Clients.Group(gameName).SendAsync("ReceiveGame", game);
        await SendMessage(_gameBot, gameName, $"{player.UserName} has joined the game!");
    }

    // JOIN GAME IS CURRENTLY NOT IN USE
    public async Task JoinGame(HubUser hubUser, string gameName)
    {

        var game = _gameRepository.GetGameByName(gameName);

        if (game == null)
        {
            await Clients.Caller.SendAsync("ReceiveError", new ResponseModel()
            {
                Status = "Error",
                Message = $"There is no game named \"{gameName}\"! Try again!"
            });
            return;
        }

        var success = _gameService.AddPlayerToGame(game.GameName, hubUser);

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

    public async Task KickPlayer(HubUser player)
    {
        var game = _gameRepository.GetGameByPlayerName(player.UserName);
        var user = _connectionRepository.GetConnectionByName(player.UserName);

        await SendMessage(_gameBot, game.GameName, $"{player.UserName} has been kicked from the game!");
        await Clients.Client(user.User.ConnectionId).SendAsync("Kicked");
        await Clients.Client(user.User.ConnectionId).SendAsync("ReceiveError", new ResponseModel()
            {
                Status = "Error",
                Message = "You have been kicked out of the game 😫" 
            });

        _gameService.RemovePlayerFromGame(game.GameName, player.UserName);
        await Groups.RemoveFromGroupAsync(user.User.ConnectionId, game.GameName);

        if(game.RoundStarted)
        {
            await Clients.Group(game.GameName).SendAsync("ReceiveError", new ResponseModel()
            {
                Status = "Error",
                Message = $"{player.UserName} got kicked! The round will be restarted!" 
            });
            _gameService.RestartRound(game.GameName);
        }

        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
    }

    public async Task LeaveGame(HubUser user)
    {
        var game = _gameRepository.GetGameByPlayerName(user.UserName);
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, game.GameName);
        _gameService.RemovePlayerFromGame(game.GameName, user.UserName);

        await SendMessage(_gameBot, game.GameName, user.GameProperties.GameHost ? $"{user.UserName} has left the game! A new game host has randomly been assigned!" : $"{user.UserName} has left the game!");


        if(game.RoundStarted)
        {
            await Clients.Group(game.GameName).SendAsync("ReceiveError", new ResponseModel()
            {
                Status = "Error",
                Message = $"{user.UserName} dissconnected. 😣 The round will be restarted!" 
            });
            _gameService.RestartRound(game.GameName);
        }
        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);

        if(_gameService.GameIsEmpty(game.GameName)) _gameRepository.RemoveGame(game);
    }

    public async Task UpdatePlayerOrder(List<HubUser> players)
    {
        var game = _gameRepository.GetGameByPlayerName(Context.User.Identity.Name);
        game.Players = players;

        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
    }

    public async Task InvitePlayer(HubUser hubUser, string playerToInvite)
    {
        var game = _gameRepository.GetGameByPlayerName(hubUser.UserName);

        var user = _connectionRepository.GetConnectionByName(playerToInvite);

        await Clients.Client(user.User.ConnectionId).SendAsync("ReceiveGameInvitation", new GameInvitation { GameHost = hubUser.UserName, GameName = game.GameName });
    }
    public async Task RollDice(HubUser user)
    {
        var game = _gameRepository.GetGameByPlayerName(user.UserName);

        _gameService.RollDice(game.GameName, game.Players.FirstOrDefault(x => x.UserName == user.UserName));


        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
    }

    public async Task SetBet(GameBet gameBet)
    {
        var game = _gameRepository.GetGameByName(gameBet.GameName);

        _gameService.SetBet(game.GameName, gameBet);

        await Clients.Group(gameBet.GameName).SendAsync("ReceiveGame", game);
    }

    public async Task Call(HubUser caller)
    {
        var game = _gameRepository.GetGameByPlayerName(caller.UserName);

        _gameService.Call(game.GameName, caller);

        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        var user = Context.User.Identity.Name;
        _connectionRepository.RemoveConnection(user);


        if (_gameRepository.GetGameByPlayerName(user) != null)
        {
            var game = _gameRepository.GetGameByPlayerName(user);
            _gameService.RemovePlayerFromGame(game.GameName, user);

            if(game.RoundStarted)
            {
                Clients.Group(game.GameName).SendAsync("ReceiveError", new ResponseModel()
                {
                    Status = "Error",
                    Message = $"{user} dissconnected. 😣 The round will be restarted!" 
                });
                _gameService.RestartRound(game.GameName);
            }
            
            Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
        }

        SendConnectedUsers();


        SendMessage(_lobbyBot, "Lobby", $"{user} has left the lobby.");

        return base.OnDisconnectedAsync(exception);
    }
}