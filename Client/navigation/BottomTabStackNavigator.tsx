import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import React from "react";
import { useTheme } from "react-native-paper";
import LobbyScreen from "../screens/LobbyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GameStack, { GameStackParams } from "./GameStackNavigator";

export type BottomTabStackParams = {
  Lobby: undefined;
  Game: NavigatorScreenParams<GameStackParams>;
  Profile: undefined;
};

const TabStack = createBottomTabNavigator<BottomTabStackParams>();

const BottomTabStack = () => {
  const { colors } = useTheme();
  return (
    // TODO Check posibility to use more colorful images instead of Icons in the bottomtab
    <TabStack.Navigator
      initialRouteName="Lobby"
      screenOptions={{
        tabBarActiveBackgroundColor: colors.primaryContainer,
        tabBarActiveTintColor: colors.onPrimaryContainer,
        tabBarInactiveBackgroundColor: colors.background,
      }}
    >
      <TabStack.Screen
        name="Lobby"
        component={LobbyScreen}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="chat-outline" size={size} color={color} />,
        }}
      />
      <TabStack.Screen
        name="Game"
        component={GameStack}
        options={{
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="dice-5-outline" size={size} color={color} />,
        }}
      />
      <TabStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person-outline" size={size} color={color} />,
        }}
      />
    </TabStack.Navigator>
  );
};

export default BottomTabStack;
