using API.Hubs.HubModels;

namespace API.Hubs.HubServices;

public class ConnectionRepository
{
    private readonly List<UserConnection> _connections;

    public ConnectionRepository()
    {
        _connections = new List<UserConnection>();
    }

    public void AddConnection(UserConnection userConnection)
    {
        if (!_connections.Any(c => c.User == userConnection.User && c.Room == userConnection.Room))
        {
            _connections.Add(userConnection);
        }
        else
        {
            // run AlreadyConnected();
        }
    }

    public void RemoveConnection(string username)
    {
        _connections.Remove(_connections.FirstOrDefault(x => x.User == username) ?? throw new ArgumentNullException("cant find userconnection"));
    }

    public bool AlreadyConnected(string user, string room)
    {
        return _connections.Any(c => c.User == user && c.Room == room);
    }
}