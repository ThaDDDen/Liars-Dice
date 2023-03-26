import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { initialGameState, useGame } from "../contexts/GameContext";
import CreateGameScreen from "../screens/CreateGameScreen";
import GameHomeScreen from "../screens/GameHomeScreen";
import GameScreen from "../screens/GameScreen";
import JoinGameScreen from "../screens/JoinGameScreen";

export type GameStackParams = {
  CreateGameScreen: undefined;
  JoinGameScreen: undefined;
  GameScreen: undefined;
};

const GameStackNavigator = createNativeStackNavigator();

const GameStack = () => {
  const { game } = useGame();
  return (
    <GameStackNavigator.Navigator>
      {game === initialGameState ? (
        <>
          <GameStackNavigator.Screen name="GameHomeScreen" component={GameHomeScreen} options={{ headerShown: false }} />
          <GameStackNavigator.Screen name="CreateGameScreen" component={CreateGameScreen} options={{ headerShown: false }} />
          <GameStackNavigator.Screen name="JoinGameScreen" component={JoinGameScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <GameStackNavigator.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }} />
        </>
      )}
    </GameStackNavigator.Navigator>
  );
};

export default GameStack;
