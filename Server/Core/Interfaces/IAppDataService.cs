using Core.Entities.AppEntities;
using Core.Models.App;

namespace Core.Interfaces;

public interface IAppDataService
{
    Task<bool> AddFriendAsync(string friendOneId, string friendTwoId);
    Task<bool> RemoveFriendAsync(string friendOneId, string friendTwoId);
    Task<PrivateMessage> AddMessageAsync(string senderId, string receiverId, string message);
    Task<List<PrivateMessage>> GetMessagesAsync(string userId);
    Task<List<HubUser>> GetFriendsAsync(string userId);
}