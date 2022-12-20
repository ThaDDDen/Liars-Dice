import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initialGameState, useGame } from "../contexts/GameContext";
import CreateGameScreen from "../screens/CreateGameScreen";
import GameLobbyScreen from "../screens/GameLobbyScreen";
import GameScreen from "../screens/GameScreen";
import JoinGameScreen from "../screens/JoinGameScreen";

export type GameStackParams = {
  CreateGameScreen: undefined;
  JoinGameScreen: undefined;
  GameLobby: undefined;
  GameScreen: undefined;
};

const GameStackNavigator = createNativeStackNavigator();

const GameStack = () => {
  const { game } = useGame();
  return (
    <GameStackNavigator.Navigator>
      {game === initialGameState ? (
        <>
          <GameStackNavigator.Screen name="CreateGameScreen" component={CreateGameScreen} options={{ headerShown: false }} />
          <GameStackNavigator.Screen name="JoinGameScreen" component={JoinGameScreen} />
        </>
      ) : (
        <>
          <GameStackNavigator.Screen name="GameLobbyScreen" component={GameLobbyScreen} />
          <GameStackNavigator.Screen name="GameScreen" component={GameScreen} />
        </>
      )}
    </GameStackNavigator.Navigator>
  );
};

export default GameStack;
