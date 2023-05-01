using Core.Interfaces;
using Core.Models.App;
using Moq;

namespace ServerUnitTest.TestHelpers;

public static class SetupConnectionRepo
{
    public static void WithConnectedUsers(Mock<IConnectionRepository> connectionRepo)
    {
        connectionRepo.Setup(x => x.ConnectedUsers()).
        Returns(new List<HubUser>()
        {
            new() { UserName = "TestUser1" },
            new() { UserName = "TestUser2" }
        });
    }

    public static void WithAlreadyConnected(Mock<IConnectionRepository> connectionRepo)
    {
        connectionRepo.Setup(x => x.AlreadyConnected(It.IsAny<string>())).Returns(true);
    }

    public static void WithNotAlreadyConnected(Mock<IConnectionRepository> connectionRepo)
    {
        connectionRepo.Setup(x => x.AlreadyConnected(It.IsAny<string>())).Returns(false);
    }

    public static void AddConnectedUser(Mock<IConnectionRepository> connectionRepo)
    {
        connectionRepo.Setup(x => x.AddConnection(It.IsAny<HubUser>()));
    }

    public static void ConnectionByName(Mock<IConnectionRepository> connectionRepo)
    {
        connectionRepo.Setup(x => x.GetConnectionByName(It.IsAny<string>()))
            .Returns(new HubUser()
            {
                Id = "TestUserId",
                ConnectionId = "123456789",
                UserName = "TestUser"
            });
    }

    public static void GetConnectionByUserId(Mock<IConnectionRepository> connectionRepo)
    {
        connectionRepo.Setup(x => x.GetConnectionByUserId(It.IsAny<string>()))
            .Returns(new HubUser { UserName = "TestUser", ConnectionId = "123456789" });
    }

}