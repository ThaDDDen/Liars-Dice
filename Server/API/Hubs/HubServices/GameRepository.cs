namespace API.Hubs.HubServices;

public class GameRepository
{
    private readonly List<Game> _gameRepository;

    public GameRepository()
    {
        _gameRepository = new();
    }

    public void AddGame(Game newGame)
    {
        _gameRepository.Add(newGame);
    }

    public Game GetGameByName(string gameName)
    {
        return _gameRepository.FirstOrDefault(g => g.GameName == gameName);
    }

    public Game GetGameByPlayerName(string playerName)
    {
        return _gameRepository.FirstOrDefault(g => g.Players.Any(p => p.UserName == playerName));
    }
}