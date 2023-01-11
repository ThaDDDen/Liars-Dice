using Core.Entities.AppEntities;

namespace Core.Interfaces;

public interface IAppDataService
{
    Task<FriendRelation> AddFriendAsync(string friendOneId, string friendTwoId);
    Task<bool> RemoveFriendAsync(string friendOneId, string friendTwoId);
    Task<PrivateMessage> AddMessageAsync(string senderId, string receiverId, string message);
    Task<List<PrivateMessage>> GetMessagesAsync(string userId);
}