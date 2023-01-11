using Core.Interfaces;
using Core.Models.App;

namespace Infrastructure.Repositories;

public class GameRepository: IGameRepository
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
    public void RemoveGame(Game gameToRemove)
    {
        _gameRepository.Remove(gameToRemove);
    }
    public Game GetGameByName(string gameName)
    {
        return _gameRepository.FirstOrDefault(g => g.GameName == gameName);
    }

    public Game GetGameByPlayerName(string playerName)
    {
        return _gameRepository.FirstOrDefault(g => g.Players.Any(p => p.UserName == playerName));
    }

    public Game UpdateGame(Game game)
    {
        var gameIndex = _gameRepository.FindIndex(g => g.GameName == game.GameName);

        _gameRepository[gameIndex] = game;

        return _gameRepository[gameIndex];
    }

    public bool UserIsPlaying(string userName)
    {
        foreach (var game in _gameRepository)
        {
            foreach (var player in game.Players)
            {
                if(player.UserName == userName) return true;
            }
        }
        return false;
    }
}