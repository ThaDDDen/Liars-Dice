using Core.Entities.AppEntities;
using Core.Interfaces;

namespace Core.Services;

public class AppDataService: IAppDataService
{
    private readonly IAppDataRepository<PrivateMessage> _messages;
    private readonly IAppDataRepository<FriendRelation> _friends;
    public AppDataService(IAppDataRepository<PrivateMessage> messages, IAppDataRepository<FriendRelation> friends)
    {
        _messages = messages;
        _friends = friends;
    }

    public async Task<bool> AddFriendAsync(string friendOneId, string friendTwoId)
    {
        var firstRelation = await _friends.AddAsync(new FriendRelation()
        {
            FriendOneId = friendOneId,
            FriendTwoId = friendTwoId
        });
        var secondRelation = await _friends.AddAsync(new FriendRelation()
        {
            FriendOneId = friendTwoId,
            FriendTwoId = friendOneId
        });
        return firstRelation != null && secondRelation != null ;
    }

    public async Task<bool> RemoveFriendAsync(string friendOneId, string friendTwoId)
    {
        var relation = await _friends.FindByConditionAsync(relation => relation.FriendOneId == friendOneId && relation.FriendTwoId == friendTwoId);
        if (relation == null)
        {
            relation = await _friends.FindByConditionAsync(relation => relation.FriendOneId == friendTwoId && relation.FriendTwoId == friendOneId);
        }

        return await _friends.DeleteAsync(relation.First());
    }

    public async Task<PrivateMessage> AddMessageAsync(string senderId, string receiverId, string message)
    {
        var newMessage = await _messages.AddAsync(new PrivateMessage()
        {
            SenderId = senderId,
            ReceiverId = receiverId,
            Time = DateTime.Now,
            Message = message
        });

        return newMessage;
    }

    public async Task<List<PrivateMessage>> GetMessagesAsync(string userId)
    {
        return await _messages.GetAllAsync();
    }
}