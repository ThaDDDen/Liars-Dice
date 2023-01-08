using Core.Interfaces;
using Core.Models.App;

namespace Infrastructure.Repositories;

public class ConnectionRepository: IConnectionRepository
{
    private readonly List<UserConnection> _connectionRepository;

    public ConnectionRepository()
    {
        _connectionRepository = new();
    }

        public void AddConnection(UserConnection userConnection)
    {
        if (!_connectionRepository.Any(c => c.User == userConnection.User && c.Room == userConnection.Room))
        {
            _connectionRepository.Add(userConnection);
        }
        else
        {
            // run AlreadyConnected();
        }
    }

    public void RemoveConnection(string username)
    {
        _connectionRepository.Remove(_connectionRepository.FirstOrDefault(x => x.User.UserName == username) ?? throw new ArgumentNullException("cant find userconnection"));
    }

    public List<UserConnection> ConnectedUsers()
    {
        return _connectionRepository;
    }

    public bool AlreadyConnected(string user, string room)
    {
        return _connectionRepository.Any(c => c.User.UserName == user && c.Room == room);
    }

    public UserConnection GetConnectionByName(string name)
    {
        return _connectionRepository.FirstOrDefault(uc => uc.User.UserName == name);
    }

}