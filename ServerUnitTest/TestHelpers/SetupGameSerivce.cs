using Core.Interfaces;
using Core.Models.App;
using Moq;

namespace TestHelpers;

public static class SetupGameService
{
    public static void CreateGame(Mock<IGameService> gameService)
    {
        gameService.Setup(x => x.CreateGame(It.IsAny<GameSettings>(), It.IsAny<HubUser>())).Returns(CreateTestGame());
    }

    public static void AddPlayerToGame(Mock<IGameService> gameService)
    {
        gameService.Setup(x => x.AddPlayerToGame(It.IsAny<string>(), It.IsAny<HubUser>()))
            .Returns(true);
    }

    public static void FailAddPlayerToGame(Mock<IGameService> gameService)
    {
        gameService.Setup(x => x.AddPlayerToGame(It.IsAny<string>(), It.IsAny<HubUser>())).Returns(false);
    }

    public static void WithRemovePlayerFromGame(Mock<IGameService> gameService)
    {
        gameService.Setup(x => x.RemovePlayerFromGame(It.IsAny<string>(), It.IsAny<string>()));
        //TODO ask tommy if i can return bool and maybe change input parameters to GAME instead of gameName
    }

    public static void WithRestartRound(Mock<IGameService> gameService)
    {
        gameService.Setup(x => x.RestartRound(It.IsAny<string>()));
    }

    private static Game CreateTestGame(bool GameOver = false, bool GameStarted = false, bool RoundStarted = false)
    {
        return new Game()
        {
            GameName = "TestGame",
            GameOver = GameOver,
            DiceCount = 6,
            PlayerCount = 2,
            Round = 1,
            Players = new List<HubUser>
            {
                new HubUser()
                {
                    UserName= "TestPlayer1"
                },
                new HubUser ()
                {
                    UserName = "TestPlayer2"
                }
            },
            GameStarted = GameStarted,
            RoundStarted = RoundStarted,
            BetTime = 20,
            RoundResult = new RoundResult()
        };
    }

    public static GameSettings CreateTestGameSettings()
    {
        return new GameSettings()
        {
            GameName = "TestGame",
            DiceCount = 6,
            PlayerCount = 2,
            BetTime = 20
        };
    }
}