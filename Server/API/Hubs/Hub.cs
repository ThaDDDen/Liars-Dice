using Core.Entities.AppEntities;
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
    private readonly IGameService _gameService;
    private readonly IGameRepository _gameRepository;
    private readonly IConnectionRepository _connectionRepository;
    private readonly IAppDataService _appDataService;
    private readonly UserManager<AppUser> _userManager;

    public Hub(IConnectionRepository connectionRepository, IGameService gameService, IGameRepository gameRepository, IAppDataService appDataService, UserManager<AppUser> userManager)
    {
        _connectionRepository = connectionRepository;
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

        if (_connectionRepository.AlreadyConnected(user.UserName))
        {
            await Clients.Caller.SendAsync("AlreadyConnected", _lobbyBot, "You are already connected to the lobby.");
            return;
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, "Lobby");

        var hubUser = new HubUser()
        {
            Id = user.Id,
            ConnectionId = Context.ConnectionId,
            UserName = user.UserName,
            AvatarCode = user.AvatarCode,
            Friends = await _appDataService.GetFriendsAsync(user.Id),
            Statistics = await _appDataService.GetStatistics(user.Id)
        };

        _connectionRepository.AddConnection(hubUser);

        await SendConnectedUsers();

        await Clients.Caller.SendAsync("ReceiveUser", hubUser);

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
                Id = user != null ? user.Id : "BotId",
                UserName = user != null ? user.UserName : sender == _lobbyBot ? _lobbyBot : _gameBot,
                AvatarCode = user != null ? user.AvatarCode : "BotAvatar"
            },
            Message = message,
            Time = DateTime.Now.ToString("HH:mm")
        }, room);
    }

    public async Task SendConnectedUsers()
    {
        var usersInLobby = _connectionRepository.ConnectedUsers();
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

        // Note: The following values gets set to the client-side user upon receiveing the game.

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
        _gameService.UpdateBetTime(updatedGameSettings.GameName, updatedGameSettings.BetTime);

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

        var gameHost = _connectionRepository.GetConnectionByName(_gameService.GetGameHost(game.GameName).UserName);

        await Clients.Client(gameHost.ConnectionId).SendAsync("ReceiveJoinRequest", user);
    }

    public async Task AcceptJoinRequest(HubUser player, string gameName)
    {
        var game = _gameRepository.GetGameByName(gameName);

        await Groups.AddToGroupAsync(_connectionRepository.GetConnectionByName(player.UserName).ConnectionId, gameName);
        _gameService.AddPlayerToGame(game.GameName, player);

        await Clients.Group(gameName).SendAsync("ReceiveGame", game);
        await SendMessage(_gameBot, gameName, $"{player.UserName} has joined the game!");
    }


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

    public async Task KickPlayer(string playerId)
    {

        var player = _connectionRepository.GetConnectionByUserId(playerId);
        var game = _gameRepository.GetGameByPlayerName(player.UserName);

        await SendMessage(_gameBot, game.GameName, $"{player.UserName} has been kicked from the game!");
        await Clients.Client(player.ConnectionId).SendAsync("Kicked");
        await Clients.Client(player.ConnectionId).SendAsync("ReceiveError", new ResponseModel()
        {
            Status = "Error",
            Message = "You have been kicked out of the game 😫"
        });

        _gameService.RemovePlayerFromGame(game.GameName, player.UserName);
        await Groups.RemoveFromGroupAsync(player.ConnectionId, game.GameName);

        if (game.RoundStarted)
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


        if (game.RoundStarted)
        {
            await Clients.Group(game.GameName).SendAsync("ReceiveError", new ResponseModel()
            {
                Status = "Error",
                Message = $"{user.UserName} dissconnected. 😣 The round will be restarted!"
            });
            _gameService.RestartRound(game.GameName);
        }
        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);

        if (_gameService.GameIsEmpty(game.GameName)) _gameRepository.RemoveGame(game);
    }

    public async Task UpdatePlayerOrder(List<HubUser> players)
    {
        var game = _gameRepository.GetGameByPlayerName(Context.User.Identity.Name);
        game.Players = players;

        await Clients.Group(game.GameName).SendAsync("ReceiveGame", game);
    }

    public async Task InvitePlayer(HubUser hubUser, string playerToInvite)
    {
        if (_gameRepository.UserIsPlaying(playerToInvite))
        {
            await Clients.Caller.SendAsync("ReceiveError", new ResponseModel()
            {
                Status = "Error",
                Message = $"{playerToInvite} is already playing a game."
            });
            return;
        }
        var game = _gameRepository.GetGameByPlayerName(hubUser.UserName);

        var user = _connectionRepository.GetConnectionByName(playerToInvite);

        await Clients.Client(user.ConnectionId).SendAsync("ReceiveGameInvitation", new GameInvitation { GameHost = hubUser.UserName, GameName = game.GameName });
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

    public async Task SendFriendRequest(string userId, string friendId)
    {
        var user = _connectionRepository.GetConnectionByUserId(userId);
        var friendOnline = _connectionRepository.GetConnectionByUserId(friendId);
        if (friendOnline != null)
            await Clients.Client(friendOnline.ConnectionId).SendAsync("ReceiveFriendRequest", user.UserName);
    }

    public async Task AcceptFriendRequest(string userName, string friendName)
    {
        var user = _connectionRepository.GetConnectionByName(userName);
        var friend = _connectionRepository.GetConnectionByName(friendName);

        var ok = await _appDataService.AddFriendAsync(user.Id, friend.Id);

        if (ok)
        {
            await Clients.Caller.SendAsync("ReceiveError", new ResponseModel()
            {
                Status = "Success",
                Message = $"You are now friends with {friendName} 💚"
            });
            await Clients.Client(user.ConnectionId).SendAsync("ReceiveFriends", await _appDataService.GetFriendsAsync(user.Id));

            await Clients.Client(friend.ConnectionId).SendAsync("ReceiveError", new ResponseModel()
            {
                Status = "Success",
                Message = $"{userName} has accepted your friend request! 💚"
            });
            await Clients.Client(friend.ConnectionId).SendAsync("ReceiveFriends", await _appDataService.GetFriendsAsync(friend.Id));
        }
    }

    public async Task RemoveFriend(string userId, string friendId)
    {
        await _appDataService.RemoveFriendAsync(userId, friendId);
        await Clients.Caller.SendAsync("ReceiveFriends", await _appDataService.GetFriendsAsync(userId));
        await Clients.Caller.SendAsync("ReceiveError", new ResponseModel()
        {
            Status = "Success",
            Message = $"{(await _userManager.FindByIdAsync(friendId)).UserName} has been removed from you list of friends! 💔"
        });

        var friend = _connectionRepository.GetConnectionByUserId(friendId);

        if (friend != null) await Clients.Client(friend.ConnectionId).SendAsync("ReceiveFriends", await _appDataService.GetFriendsAsync(friendId));
    }

    public async Task GetProfile(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        var profile = new Profile()
        {
            Id = user.Id,
            UserName = user.UserName,
            AvatarCode = user.AvatarCode,
            Statistics = await _appDataService.GetStatistics(user.Id)
        };
        
        await Clients.Caller.SendAsync("ReceiveProfile", profile);
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        var user = Context.User.Identity.Name;
        _connectionRepository.RemoveConnection(user);


        if (_gameRepository.GetGameByPlayerName(user) != null)
        {
            var game = _gameRepository.GetGameByPlayerName(user);
            _gameService.RemovePlayerFromGame(game.GameName, user);

            if (game.RoundStarted)
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

        Task task = SendConnectedUsers();

        Task task1 = SendMessage(_lobbyBot, "Lobby", $"{user} has left the lobby.");

        return base.OnDisconnectedAsync(exception);
    }
}