using Core.Models.App;

namespace Core.Interfaces;
public interface IConnectionRepository
{
    void AddConnection(HubUser connection);
    void RemoveConnection(string username);
    List<HubUser> ConnectedUsers();
    bool AlreadyConnected(string user);
    HubUser GetConnectionByName(string name);
}