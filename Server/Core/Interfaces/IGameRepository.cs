using Core.Models.App;

namespace Core.Interfaces;
public interface IGameRepository
{
   void AddGame(Game newGame);
   void RemoveGame(Game gameToRemove);
   Game GetGameByName(string gameName);
   Game GetGameByPlayerName(string playerName);
   Game UpdateGame(Game game);
   
}