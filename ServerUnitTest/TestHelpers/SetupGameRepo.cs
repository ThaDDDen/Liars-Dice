using Core.Interfaces;
using Core.Models.App;
using Moq;

namespace ServerUnitTest.TestHelpers;

public static class SetupGameRepo
{

    public static void ValidGameByName(Mock<IGameRepository> gameRepo)
    {
        gameRepo.Setup(x => x.GetGameByName(It.IsAny<string>()))
            .Returns(new Game()
            {
                GameName = "TestGame",
                Players = new List<HubUser>
                {
                    new()
                    {
                        UserName = "user1"
                    }
                }
            });
    }

    public static void NoGameByName(Mock<IGameRepository> gameRepo)
    {
        gameRepo.Setup(x => x.GetGameByName(It.IsAny<string>()))
            .Returns<Game>(null);
    }


    public static void GetGameByPlayerName(Mock<IGameRepository> gameRepo)
    {
        gameRepo.Setup(x => x.GetGameByPlayerName(It.IsAny<string>()))
        .Returns(new Game()
        {
            GameName = "TestGame",
            Players = new List<HubUser>()
            {
                new()
                {
                    UserName = "Player1"
                },
                new()
                {
                    UserName = "Player2"
                }
            },
            RoundResult = new RoundResult()
            {
                Round = 1,
                RoundLoser = new HubUser() { UserName = "TestLoser" },
                RoundWinner = new HubUser() { UserName = "TestWinner" },
                Caller = "TestCaller",
                GameBet = new GameBet() { GameName = "TestGame", DiceAmount = 1, DiceValue = 2, Better = new HubUser() { UserName = "TestBetter" } },
                CallResult = 10
            },
        });
    }

    public static void StartedGameByPlayerNameOnePlayer(Mock<IGameRepository> gameRepo)
    {
        gameRepo.Setup(x => x.GetGameByPlayerName(It.IsAny<string>()))
            .Returns(new Game()
            {
                GameName = "TestGame",
                GameStarted = true,
                RoundStarted = true,
                Players = new(){
                new() {
                    UserName = "Player1"
                }
            }
            });
    }

    public static void StartedGameByPlayerNameManyPlayers(Mock<IGameRepository> gameRepo)
    {
        gameRepo.Setup(x => x.GetGameByPlayerName(It.IsAny<string>()))
            .Returns(new Game()
            {
                GameName = "TestGame",
                GameStarted = true,
                RoundStarted = true,
                Players = new()
                {
                    new() {
                        UserName = "Player1"
                    },
                    new() {
                        UserName = "Player2"
                    },
                    new() {
                        UserName = "Player3"
                    },
                    new() {
                        UserName = "Player4"
                    }
                }
            });
    }

    public static void StartedGameByName(Mock<IGameRepository> gameRepo)
    {
        gameRepo.Setup(x => x.GetGameByName(It.IsAny<string>()))
            .Returns(new Game() { GameName = "TestGame", GameStarted = true });
    }

    public static void UserIsPlaying(Mock<IGameRepository> gameRepo)
    {
        gameRepo.Setup(x => x.UserIsPlaying(It.IsAny<string>())).Returns(true);
    }

    public static void UserIsNotPlaying(Mock<IGameRepository> gameRepo)
    {
        gameRepo.Setup(x => x.UserIsPlaying(It.IsAny<string>())).Returns(false);
    }
}