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
        _connections.Remove(_connections.FirstOrDefault(x => x.User.UserName == username) ?? throw new ArgumentNullException("cant find userconnection"));
    }

    public List<UserConnection> ConnectedUsers()
    {
        return _connections;
    }

    public bool AlreadyConnected(string user, string room)
    {
        return _connections.Any(c => c.User.UserName == user && c.Room == room);
    }

    public UserConnection GetConnectionByName(string name)
    {
        return _connections.FirstOrDefault(uc => uc.User.UserName == name);
    }
}