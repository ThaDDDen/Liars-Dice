import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import GameScreen from "../screens/GameScreen";
import LobbyScreen from "../screens/LobbyScreen";
import ProfileScreen from "../screens/ProfileScreen";

export type BottomTabStackParams = {
  Lobby: undefined;
  Game: undefined;
  Profile: undefined;
};

const TabStack = createBottomTabNavigator<BottomTabStackParams>();

const BottomTabStack = () => {
  return (
    <TabStack.Navigator initialRouteName="Lobby">
      <TabStack.Screen name="Lobby" component={LobbyScreen} />
      <TabStack.Screen name="Game" component={GameScreen} />
      <TabStack.Screen name="Profile" component={ProfileScreen} />
    </TabStack.Navigator>
  );
};

export default BottomTabStack;
