import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useTheme } from "react-native-paper";
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
        component={GameScreen}
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
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person-outline" size={size} color={color} />,
        }}
      />
    </TabStack.Navigator>
  );
};

export default BottomTabStack;
