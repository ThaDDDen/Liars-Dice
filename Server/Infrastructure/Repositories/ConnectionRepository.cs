using Core.Interfaces;
using Core.Models.App;

namespace Infrastructure.Repositories;

public class ConnectionRepository: IConnectionRepository
{
    private readonly List<HubUser> _connectionRepository;

    public ConnectionRepository()
    {
        _connectionRepository = new();
    }

    public void AddConnection(HubUser connection)
    {
        if (!_connectionRepository.Any(u => u == connection))
        {
            _connectionRepository.Add(connection);
        }
        else
        {
            // run AlreadyConnected();
        }
    }

    public void RemoveConnection(string username)
    {
        _connectionRepository.Remove(_connectionRepository.FirstOrDefault(u => u.UserName == username) ?? throw new ArgumentNullException("cant find userconnection"));
    }

    public List<HubUser> ConnectedUsers()
    {
        return _connectionRepository;
    }

    public bool AlreadyConnected(string user)
    {
        return _connectionRepository.Any(u => u.UserName == user);
    }

    public HubUser GetConnectionByName(string name)
    {
        return _connectionRepository.FirstOrDefault(u => u.UserName == name);
    }

}