using Core.Models.App;

namespace Core.Interfaces;
public interface IConnectionRepository
{
    void AddConnection(UserConnection userConnection);
    void RemoveConnection(string username);
    List<UserConnection> ConnectedUsers();
    bool AlreadyConnected(string user, string room);
    UserConnection GetConnectionByName(string name);
}