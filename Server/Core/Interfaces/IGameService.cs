using Core.Models.App;

namespace Core.Interfaces;
public interface IGameService
{
   Game CreateGame(GameSettings gameSettings, HubUser gameHost);
   bool AddPlayerToGame(string gameName, HubUser newPlayer);
   void RemovePlayerFromGame(string gameName, string playerToRemove);
   void RollDice(string gameName, HubUser user);
   void SetBet(string gameName, GameBet gameBet);
   void Call(string gameName, HubUser gameCaller);
   void UpdatePlayerCount(string gameName, int newPlayerCount);
   void UpdateDiceCount(string gameName, int newDiceCount);
   void UpdateBetTime(string gameName,int time);
   bool GameIsEmpty(string gameName);
   void RestartRound(string gameName);
   HubUser GetGameHost(string gameName);
   
}