using Core.Interfaces;
using Core.Models.App;
using Moq;

namespace ServerUnitTest.TestHelpers;

public static class SetupAppDataService
{
    public static void AddFriendSucces(Mock<IAppDataService> _appDataService)
    {
        _appDataService.Setup(x => x.AddFriendAsync(It.IsAny<string>(), It.IsAny<string>())).Returns(Task.FromResult<bool>(true));
    }

    public static void GetFriends(Mock<IAppDataService> _appDataService)
    {
        var friends = new List<HubUser>()
        {
            new HubUser()
            {
                UserName = "TestFriend"
            },
        };

        _appDataService.Setup(x => x.GetFriendsAsync(It.IsAny<string>())).Returns(Task.FromResult(friends));
    }

    public static void RemoveFriendSucces(Mock<IAppDataService> _appDataService)
    {
        _appDataService.Setup(x => x.RemoveFriendAsync(It.IsAny<string>(), It.IsAny<string>())).Returns(Task.FromResult(true));
    }
}