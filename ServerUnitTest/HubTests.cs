using System.Security.Claims;
using System.Security.Principal;
using Core.Entities.AuthEntities;
using Core.Interfaces;
using Core.Models.App;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using ServerUnitTest.TestHelpers;
using Moq;
using TestHelpers;

namespace ServerUnitTest;

public class HubTests
{
    //REPOSITORY MOCKS
    private Mock<IConnectionRepository> _connectionRepoMock = new Mock<IConnectionRepository>();
    private Mock<IGameRepository> _gameRepoMock = new Mock<IGameRepository>();
    private Mock<IGameService> _gameServiceMock = new Mock<IGameService>();
    private Mock<IAppDataService> _appServiceMock = new Mock<IAppDataService>();

    //HUB MOCKS
    private Mock<HubCallerContext> _hubCallerContextMock = new Mock<HubCallerContext>();
    private Mock<IHubCallerClients> _hubCallerClientsMock = new Mock<IHubCallerClients>();
    private Mock<ISingleClientProxy> _clientProxyMock = new Mock<ISingleClientProxy>();
    private Mock<IClientProxy> _clientGroupProxyMock = new Mock<IClientProxy>();
    private Mock<IGroupManager> _groupManagerMock = new Mock<IGroupManager>();

    //IDENTITY MOCKS
    private Mock<IIdentity> _identityMock = new Mock<IIdentity>();
    private Mock<ClaimsPrincipal> _claimsPrincipalMock;
    private Mock<IUserStore<AppUser>> _userStoreMock = new Mock<IUserStore<AppUser>>();
    private Mock<UserManager<AppUser>> _userManagerMock;

    public HubTests()
    {
        //SETING UP THE MOCKS NEEDED
        _userManagerMock = new Mock<UserManager<AppUser>>(_userStoreMock.Object, null, null, null, null, null, null, null, null);
        _userManagerMock.Setup(x => x.FindByNameAsync(It.IsAny<string>())).ReturnsAsync(new AppUser() { Id = "userID", UserName = "UserName", AvatarCode = "AvatarCode" });
        _userManagerMock.Setup(x => x.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(new AppUser() { Id = "userID", UserName = "UserName", AvatarCode = "AvatarCode" });

        _identityMock.Setup(i => i.Name).Returns("TestUserName");
        _claimsPrincipalMock = new Mock<ClaimsPrincipal>(_identityMock.Object);
        _claimsPrincipalMock.Setup(p => p.Identity).Returns(_identityMock.Object);

        _hubCallerContextMock.Setup(x => x.User).Returns(_claimsPrincipalMock.Object);
        _hubCallerContextMock.Setup(x => x.ConnectionId).Returns("123456789");
        _hubCallerClientsMock.Setup(x => x.Caller).Returns(_clientProxyMock.Object);
        _hubCallerClientsMock.Setup(x => x.Client(It.IsAny<string>())).Returns(_clientProxyMock.Object);
        _hubCallerClientsMock.Setup(x => x.Group(It.IsAny<string>())).Returns(_clientGroupProxyMock.Object);

        _groupManagerMock.Setup(x => x.AddToGroupAsync(It.IsAny<string>(), It.IsAny<string>(), default)).Returns(Task.FromResult(Guid.NewGuid()));
    }

    [Fact]
    public async Task SendConnectedUsers_Success()
    {
        SetupConnectionRepo.WithConnectedUsers(_connectionRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Clients = _hubCallerClientsMock.Object
        };

        await sut.SendConnectedUsers();

        _hubCallerClientsMock.Verify(x => x.Group("Lobby").SendCoreAsync("ConnectedUsers", It.Is<object[]>(o => o != null && VerifyType<List<HubUser>>(o.First())), default), Times.Exactly(1));
    }

    [Fact]
    public async Task CreateGame_GameAlreadyExist_SendSnackToCaller()
    {
        SetupGameRepo.ValidGameByName(_gameRepoMock);

        var gameSettings = SetupGameService.CreateTestGameSettings();

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Clients = _hubCallerClientsMock.Object
        };

        await sut.CreateGame(gameSettings, null);

        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync("ReceiveSnack", It.Is<object[]>(o => o != null && VerifyType<SnackMessage>(o.First())), default), Times.Exactly(1));
    }

    [Fact]
    public async Task CreateGame_SendCompleteGameToGameHost_Successful()
    {
        SetupGameService.CreateGame(_gameServiceMock);
        var gameSettings = SetupGameService.CreateTestGameSettings();

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object
        };

        var gameHost = new HubUser()
        {
            UserName = "TestUser",
        };

        await sut.CreateGame(gameSettings, gameHost);

        Assert.True(gameHost.GameProperties.GameHost);
        Assert.Equal(6, gameHost.GameProperties.Dice.Count);

        _groupManagerMock.Verify(x => x.AddToGroupAsync(It.IsAny<string>(), gameSettings.GameName, default), Times.Once());
        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync("ReceiveGame", It.Is<object[]>(o => o != null && VerifyType<Game>(o.First())), default), Times.Exactly(1));
        _hubCallerClientsMock.Verify(x => x.Group(It.IsAny<string>()).SendCoreAsync("ReceiveMessage", It.Is<object[]>(o => o != null && VerifyType<UserMessage>(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task SendMessage_SendMessageToConnectionGroup()
    {
        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, _userManagerMock.Object)
        {
            Clients = _hubCallerClientsMock.Object
        };

        await sut.SendMessage("testSender", "testRoom", "this is a message for test");

        _hubCallerClientsMock.Verify(x => x.Group(It.IsAny<string>()).SendCoreAsync("ReceiveMessage", It.Is<object[]>(o => o != null && VerifyType<UserMessage>(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task JoinLobby_UserAlreadyConnected_CorrectMessageSent()
    {
        SetupConnectionRepo.WithAlreadyConnected(_connectionRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, _userManagerMock.Object)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object
        };

        await sut.JoinLobby();

        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync("AlreadyConnected", It.Is<object[]>(o => o != null && CheckAlreadyConnected(o)), default), Times.Once);
    }

    [Fact]
    public async Task JoinLobby_UserGetsAddedToLobby_SendUserToClientCaller()
    {
        SetupConnectionRepo.WithNotAlreadyConnected(_connectionRepoMock);
        SetupConnectionRepo.AddConnectedUser(_connectionRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, _userManagerMock.Object)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object
        };

        await sut.JoinLobby();

        _groupManagerMock.Verify(x => x.AddToGroupAsync("123456789", "Lobby", default), Times.Once());
        _connectionRepoMock.Verify(x => x.AddConnection(It.Is<HubUser>(x => x.ConnectionId == "123456789" && x.UserName == "UserName")), Times.Once);
        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync("ReceiveUser", It.Is<object[]>(o => VerifyType<HubUser>(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task UpdateGameSettings_GameGetsSentToGroup_Success()
    {
        SetupGameRepo.ValidGameByName(_gameRepoMock);
        var gameSettings = SetupGameService.CreateTestGameSettings();

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object
        };

        await sut.UpdateGameSettings(gameSettings);

        _gameRepoMock.Verify(x => x.GetGameByName(It.Is<string>(gameName => gameName == "TestGame")), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Group(It.IsAny<string>()).SendCoreAsync(It.Is<string>(methodName => methodName == "ReceiveGame"), It.Is<object[]>(o => o != null && VerifyType<Game>(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task StartGame_SendGameToGroup_GameStartedTrue()
    {
        SetupGameRepo.GetGameByPlayerName(_gameRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object
        };

        var hubUser = new HubUser()
        {
            UserName = "TestUser"
        };

        await sut.StartGame(hubUser);

        _gameRepoMock.Verify(x => x.GetGameByPlayerName(It.Is<string>(name => name == "TestUser")), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Group(It.IsAny<string>()).SendCoreAsync("ReceiveGame", It.Is<object[]>(o => o != null && CheckGameStarted(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task RequestToJoinGame_GameDontExist_SendSnackMessageToCaller()
    {
        SetupGameRepo.NoGameByName(_gameRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object
        };

        var hubUser = new HubUser()
        {
            UserName = "TestUser"
        };

        await sut.RequestToJoinGame(hubUser, "testGame");

        _gameRepoMock.Verify(x => x.GetGameByName(It.IsAny<string>()), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync(It.Is<string>(methodName => methodName == "ReceiveSnack"), It.Is<object[]>(o => o != null && CheckSnackMessage(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task RequestToJoinGame_GameIsAlreadyStarted_SendCorrectSnackMessage()
    {
        SetupGameRepo.StartedGameByName(_gameRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object
        };

        var hubUser = new HubUser()
        {
            UserName = "TestUser"
        };

        await sut.RequestToJoinGame(hubUser, "testGame");

        _gameRepoMock.Verify(x => x.GetGameByName(It.IsAny<string>()), Times.Once);
        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync(It.Is<string>(methodName => methodName == "ReceiveSnack"), It.Is<object[]>(o => o != null && CheckSnackMessage(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task RequestToJoinGame_SendReceiveJoinRequestHost_Success()
    {
        SetupGameRepo.ValidGameByName(_gameRepoMock);

        _connectionRepoMock.Setup(x => x.GetConnectionByName(It.IsAny<string>())).Returns(new HubUser { ConnectionId = "123456789" });

        _gameServiceMock.Setup(x => x.GetGameHost(It.IsAny<string>())).Returns(new HubUser() { ConnectionId = "123456789", UserName = "TestUser" });

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var hubUser = new HubUser()
        {
            UserName = "TestUser"
        };

        await sut.RequestToJoinGame(hubUser, "testGame");

        _gameRepoMock.Verify(x => x.GetGameByName(It.IsAny<string>()), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Client(It.IsAny<string>()).SendCoreAsync(It.Is<string>(methodName => methodName == "ReceiveJoinRequest"), It.Is<object[]>(o => o != null && VerifyType<HubUser>(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task AcceptJoinRequest_AddPlayerToGame_SendUpdatedGameToGroup()
    {
        SetupGameRepo.ValidGameByName(_gameRepoMock);
        SetupConnectionRepo.ConnectionByName(_connectionRepoMock);
        SetupGameService.AddPlayerToGame(_gameServiceMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var hubUser = new HubUser()
        {
            UserName = "newPlayer"
        };

        await sut.AcceptJoinRequest(hubUser, "testGame");

        _gameServiceMock.Verify(x => x.AddPlayerToGame(It.Is<string>(gameName => gameName == "TestGame"), It.Is<HubUser>(user => user.UserName == "newPlayer")), Times.Once);
        _groupManagerMock.Verify(x => x.AddToGroupAsync(It.Is<string>(connectionId => connectionId == "123456789"), "testGame", default), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Group(It.IsAny<string>()).SendCoreAsync("ReceiveGame", It.Is<object[]>(o => o != null && CheckAcceptJoinRequest(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task JoinGame_NoGameWithName_SendSnackMessageToCaller()
    {
        SetupGameRepo.NoGameByName(_gameRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var hubUser = new HubUser()
        {
            UserName = "TestUser"
        };

        await sut.JoinGame(hubUser, "TestGame");

        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync("ReceiveSnack", It.Is<object[]>(o => o != null && CheckSnackMessage(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task JoinGame_GameFullOrAlreadyJoined_SendUserMessageToCaller()
    {
        SetupGameService.FailAddPlayerToGame(_gameServiceMock);
        SetupGameRepo.ValidGameByName(_gameRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var hubUser = new HubUser()
        {
            UserName = "TestUser"
        };

        await sut.JoinGame(hubUser, "TestGame");

        _gameServiceMock.Verify(x => x.AddPlayerToGame(It.IsAny<string>(), It.IsAny<HubUser>()), Times.Once);
        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync("GameFullOrAlreadyJoined", It.Is<object[]>(o => o != null && CheckUserMessage(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task JoinGame_AddUserToGroup_SendGameToGroup()
    {
        SetupGameRepo.ValidGameByName(_gameRepoMock);
        SetupGameService.AddPlayerToGame(_gameServiceMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var hubUser = new HubUser()
        {
            UserName = "TestUser"
        };

        await sut.JoinGame(hubUser, "TestGame");

        _gameServiceMock.Verify(x => x.AddPlayerToGame(It.IsAny<string>(), It.IsAny<HubUser>()), Times.Once);
        _groupManagerMock.Verify(x => x.AddToGroupAsync("123456789", "TestGame", default), Times.Once);
        _hubCallerClientsMock.Verify(x => x.Group("TestGame").SendCoreAsync("ReceiveGame", It.Is<object[]>(o => o != null && VerifyType<Game>(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task KickPlayer_RemovePlayer_SendGameToGroup()
    {
        SetupConnectionRepo.GetConnectionByUserId(_connectionRepoMock);
        SetupGameRepo.GetGameByPlayerName(_gameRepoMock);
        SetupGameService.WithRemovePlayerFromGame(_gameServiceMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        await sut.KickPlayer("playerId");

        _connectionRepoMock.Verify(x => x.GetConnectionByUserId("playerId"), Times.Once);
        _gameRepoMock.Verify(x => x.GetGameByPlayerName("TestUser"), Times.Once);
        _hubCallerClientsMock.Verify(x => x.Client(It.IsAny<string>()).SendCoreAsync("Kicked", It.Is<object[]>(o => o != null), default), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Client(It.IsAny<string>()).SendCoreAsync("ReceiveSnack", It.Is<object[]>(o => o != null && CheckSnackMessage(o.First())), default), Times.Once);

        _gameServiceMock.Verify(x => x.RemovePlayerFromGame("TestGame", "TestUser"), Times.Once);
        _groupManagerMock.Verify(x => x.RemoveFromGroupAsync("123456789", "TestGame", default), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Group("TestGame").SendCoreAsync("ReceiveGame", It.Is<object[]>(o => o != null), default), Times.Once);
    }

    [Fact]
    public async Task KickPlayer_RemovePlayerRoundStarted_GameRestartSendGameToGroup()
    {
        SetupConnectionRepo.GetConnectionByUserId(_connectionRepoMock);
        SetupGameRepo.StartedGameByPlayerNameManyPlayers(_gameRepoMock);
        SetupGameService.WithRemovePlayerFromGame(_gameServiceMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        await sut.KickPlayer("playerId");

        _connectionRepoMock.Verify(x => x.GetConnectionByUserId("playerId"), Times.Once);
        _gameRepoMock.Verify(x => x.GetGameByPlayerName("TestUser"), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Client(It.IsAny<string>()).SendCoreAsync("Kicked", It.Is<object[]>(o => o != null), default), Times.Once);
        _hubCallerClientsMock.Verify(x => x.Client(It.IsAny<string>()).SendCoreAsync("ReceiveSnack", It.Is<object[]>(o => o != null && CheckSnackMessage(o.First())), default), Times.Once);

        _gameServiceMock.Verify(x => x.RemovePlayerFromGame("TestGame", "TestUser"), Times.Once);
        _groupManagerMock.Verify(x => x.RemoveFromGroupAsync("123456789", "TestGame", default), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Group("TestGame").SendCoreAsync("ReceiveSnack", It.Is<object[]>(o => o != null && CheckSnackMessage(o.First())), default), Times.Once);
        _gameServiceMock.Verify(x => x.RestartRound("TestGame"), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Group("TestGame").SendCoreAsync("ReceiveGame", It.Is<object[]>(o => o != null), default), Times.Once);
    }

    [Fact]
    public async Task LeaveGame_GameStartedOnlyOnePlayerLeft_SendSnackToGroupRemoveGame()
    {
        SetupGameRepo.StartedGameByPlayerNameOnePlayer(_gameRepoMock);
        SetupGameService.WithRemovePlayerFromGame(_gameServiceMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var hubUser = new HubUser() { UserName = "TestUser" };

        await sut.LeaveGame(hubUser);

        _gameRepoMock.Verify(x => x.GetGameByPlayerName("TestUser"), Times.Once);
        _groupManagerMock.Verify(x => x.RemoveFromGroupAsync("123456789", "TestGame", default), Times.Once);
        _gameServiceMock.Verify(x => x.RemovePlayerFromGame("TestGame", "TestUser"), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Group("TestGame").SendCoreAsync("ReceiveGameEnded", It.Is<object[]>(o => o != null), default), Times.Once);
    }

    [Fact]
    public async Task LeaveGame_RoundStartedPlayersLeft_RestartRoundAndSendGameToGroup()
    {
        SetupGameRepo.StartedGameByPlayerNameManyPlayers(_gameRepoMock);
        SetupGameService.WithRestartRound(_gameServiceMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var hubUser = new HubUser() { UserName = "TestUser" };

        await sut.LeaveGame(hubUser);

        _gameRepoMock.Verify(x => x.GetGameByPlayerName("TestUser"), Times.Once);
        _groupManagerMock.Verify(x => x.RemoveFromGroupAsync("123456789", "TestGame", default), Times.Once);
        _gameServiceMock.Verify(x => x.RemovePlayerFromGame("TestGame", "TestUser"), Times.Once);

        _gameServiceMock.Verify(x => x.RestartRound("TestGame"), Times.Once);
        _hubCallerClientsMock.Verify(x => x.Group("TestGame").SendCoreAsync("ReceiveGame", It.Is<object[]>(o => o != null), default), Times.Once);
    }

    [Fact]
    public async Task UpdatePlayerOrder_SendUpdatedGameToGroup()
    {
        SetupGameRepo.GetGameByPlayerName(_gameRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var players = new List<HubUser>()
        {
            new() { UserName = "Player2" },
            new() { UserName = "Player1" }
        };

        await sut.UpdatePlayerOrder(players);

        _hubCallerClientsMock.Verify(x => x.Group("TestGame").SendCoreAsync("ReceiveGame", It.Is<object[]>(o => o != null && CheckPlayerOrder(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task InvitePlayer_UserIsAlreadyPlaying_SendSnackToCaller()
    {
        SetupGameRepo.UserIsPlaying(_gameRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var testUser = new HubUser() { UserName = "TestUser" };

        await sut.InvitePlayer(testUser, "PlayerToInvite");

        _gameRepoMock.Verify(x => x.UserIsPlaying("PlayerToInvite"), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync("ReceiveSnack", It.Is<object[]>(o => o != null && CheckSnackMessage(o.First())), default), Times.Once);
    }

    [Fact]
    public async Task InvitePlayer_SendInvitationToClient()
    {
        SetupGameRepo.UserIsNotPlaying(_gameRepoMock);
        SetupGameRepo.GetGameByPlayerName(_gameRepoMock);
        SetupConnectionRepo.ConnectionByName(_connectionRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var testUser = new HubUser() { UserName = "TestUser" };

        await sut.InvitePlayer(testUser, "PlayerToInvite");

        _gameRepoMock.Verify(x => x.GetGameByPlayerName(It.Is<string>(name => name == "TestUser")), Times.Once);

        _connectionRepoMock.Verify(x => x.GetConnectionByName("PlayerToInvite"), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Client("123456789").SendCoreAsync("ReceiveGameInvitation", It.Is<object[]>(o => o != null), default), Times.Once);
    }


    [Fact]
    public async Task RollDice_SendGameToGroup()
    {
        SetupGameRepo.GetGameByPlayerName(_gameRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var testUser = new HubUser() { UserName = "TestUser" };

        await sut.RollDice(testUser);

        _gameServiceMock.Verify(x => x.RollDice(It.IsAny<string>(), It.IsAny<HubUser>()), Times.Once);

        _hubCallerClientsMock.Verify(x => x.Group("TestGame").SendCoreAsync("ReceiveGame", It.Is<object[]>(o => o != null), default), Times.Once);
    }

    [Fact]
    public async Task SetBet_SendGameToGroup()
    {
        SetupGameRepo.ValidGameByName(_gameRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var testBetter = new HubUser() { UserName = "TestBetter" };
        var testBet = new GameBet() { GameName = "TestGame", Better = testBetter };

        await sut.SetBet(testBet);

        _gameServiceMock.Verify(x => x.SetBet("TestGame", It.IsAny<GameBet>()), Times.Once);
        _hubCallerClientsMock.Verify(x => x.Group("TestGame").SendCoreAsync("ReceiveGame", It.Is<object[]>(o => o != null), default), Times.Once);
    }

    [Fact]
    public async Task Call_SendGameToGroup()
    {
        SetupGameRepo.GetGameByPlayerName(_gameRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        var testCaller = new HubUser() { UserName = "TestCaller" };

        await sut.Call(testCaller);

        _gameServiceMock.Verify(x => x.Call("TestGame", It.Is<HubUser>(user => user.UserName == "TestCaller")), Times.Once);
        _hubCallerClientsMock.Verify(x => x.Group("TestGame").SendCoreAsync("ReceiveGame", It.Is<object[]>(o => o != null), default), Times.Once);
    }

    [Fact]
    public async Task SendFriendRequest_FriendNull_DontSendRequest()
    {
        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        await sut.SendFriendRequest(String.Empty, String.Empty);

        _hubCallerClientsMock.Verify(x => x.Client(It.IsAny<string>()).SendCoreAsync(It.IsAny<string>(), It.IsAny<object[]>(), default), Times.Never);
    }

    [Fact]
    public async Task SendFriendRequest_FriendExists_SendRequestToCLient()
    {
        SetupConnectionRepo.GetConnectionByUserId(_connectionRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        await sut.SendFriendRequest("userId", "friendId");

        _hubCallerClientsMock.Verify(x => x.Client("123456789").SendCoreAsync("ReceiveFriendRequest", It.IsAny<object[]>(), default), Times.Once);
    }

    [Fact]
    public async Task AcceptFriendRequest_Success_SendSnacksAndFriendsToBothClients()
    {
        SetupConnectionRepo.ConnectionByName(_connectionRepoMock);
        SetupAppDataService.AddFriendSucces(_appServiceMock);
        SetupAppDataService.GetFriends(_appServiceMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, null)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        await sut.AcceptFriendRequest("userId", "friendId");

        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync("ReceiveSnack", It.Is<object[]>(o => o != null), default), Times.Exactly(2));
        _hubCallerClientsMock.Verify(x => x.Client(It.IsAny<string>()).SendCoreAsync("ReceiveFriends", It.Is<object[]>(o => o != null), default), Times.Exactly(2));
    }

    [Fact]
    public async Task RemoveFriend_Success_SendFriendsToClient()
    {
        SetupAppDataService.GetFriends(_appServiceMock);
        SetupAppDataService.RemoveFriendSucces(_appServiceMock);
        SetupConnectionRepo.GetConnectionByUserId(_connectionRepoMock);

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, _userManagerMock.Object)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        await sut.RemoveFriend(String.Empty, String.Empty);

        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync("ReceiveFriends", It.Is<object[]>(o => o != null), default), Times.Exactly(2));
        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync("ReceiveSnack", It.Is<object[]>(o => o != null), default), Times.Once);
    }

    [Fact]
    public async Task GetProfile_Success_SendProfileToCaller()
    {

        var sut = new API.Hubs.Hub(_connectionRepoMock.Object, _gameServiceMock.Object, _gameRepoMock.Object, _appServiceMock.Object, _userManagerMock.Object)
        {
            Context = _hubCallerContextMock.Object,
            Groups = _groupManagerMock.Object,
            Clients = _hubCallerClientsMock.Object,
        };

        await sut.GetProfile("TestUserId");

        _hubCallerClientsMock.Verify(x => x.Caller.SendCoreAsync("ReceiveProfile", It.Is<object[]>(o => o != null && VerifyType<Profile>(o.First())), default), Times.Once);
    }


    //CHECK PROPERTIES IN OBJECT SENT TO CLIENT
    private bool CheckAlreadyConnected(object[] objects)
    {
        var firstObject = objects[0] as string;
        var secondObject = objects[1] as string;

        Assert.Equal("LobbyBot", firstObject);
        Assert.Equal("You are already connected to the lobby.", secondObject);

        return true;
    }

    private bool CheckUserMessage(object input)
    {
        if (input is UserMessage userMessage)
        {
            Assert.Equal("The game TestGame is full or you have already joined.", userMessage.Message);
            return true;
        }
        return false;
    }

    private bool CheckSnackMessage(object input)
    {
        if (input is SnackMessage snackMessage)
        {
            Assert.Equal("Error", snackMessage.Status);
            return true;
        }
        return false;
    }

    private bool CheckGameStarted(object input)
    {
        if (input is Game game)
        {
            Assert.True(game.GameStarted);
            return true;
        }
        return false;
    }

    private bool CheckAcceptJoinRequest(object input)
    {
        if (input is Game game)
        {
            Assert.Single(game.Players);
            return true;
        }
        return false;
    }

    private bool CheckPlayerOrder(object input)
    {
        if (input is Game game)
        {
            Assert.Equal("Player2", game.Players[0].UserName);
            Assert.Equal("Player1", game.Players[1].UserName);
            return true;
        }

        return false;
    }

    private bool VerifyType<T>(object objectType)
    {
        if (objectType == null) return false;
        var result = objectType is T;
        return result;
    }
}




