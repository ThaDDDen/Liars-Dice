import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { useTheme } from "react-native-paper";
import lobby from "../assets/images/lobby_chat.png";
import dice from "../assets/images/white_dice/white_dice_tabstack.png";
import UserAvatar from "../components/Lobby/UserAvatar";
import { useGame } from "../contexts/GameContext";
import { useUser } from "../contexts/UserContext";
import LobbyScreen from "../screens/LobbyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GameStack, { GameStackParams } from "./GameStackNavigator";

export type BottomTabStackParams = {
  Lobby: undefined;
  Game: NavigatorScreenParams<GameStackParams>;
  Profile: undefined;
};

const TabStack = createBottomTabNavigator<BottomTabStackParams>();

type GameScreenNavProp = NativeStackNavigationProp<BottomTabStackParams>;

const BottomTabStack = () => {
  const { currentUser } = useUser();
  const { colors } = useTheme();
  const { game } = useGame();
  const navigation = useNavigation<GameScreenNavProp>();

  useEffect(() => {
    if (game.id) {
      navigation.navigate("Game", { screen: "GameScreen" });
    }
  }, [game.id, game.gameStarted]);

  useEffect(() => {
    if (game.currentBetter) {
      if (game.currentBetter.userName === currentUser.userName) {
        navigation.navigate("Game", { screen: "GameScreen" });
      }
    }
  }, [game.currentBetter]);
  return (
    // TODO Check posibility to use more colorful images instead of Icons in the bottomtab <MaterialCommunityIcons name="chat-outline" size={size} color={color} />
    <TabStack.Navigator
      initialRouteName="Lobby"
      screenOptions={{
        tabBarActiveBackgroundColor: colors.primaryContainer,
        tabBarActiveTintColor: colors.onPrimaryContainer,
      }}
    >
      <TabStack.Screen
        name="Lobby"
        component={LobbyScreen}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Image source={lobby} style={{ width: size, height: size * 1.2, resizeMode: "contain", opacity: focused ? 1 : 0.5 }} />
          ),
        }}
      />
      <TabStack.Screen
        name="Game"
        component={GameStack}
        options={{
          headerShown: false,
          tabBarStyle: { overflow: "hidden" },
          tabBarIcon: ({ color, size, focused }) => (
            <Image source={dice} style={{ width: size, height: size * 1.2, resizeMode: "contain", opacity: focused ? 1 : 0.5 }} />
          ),
        }}
      />
      <TabStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ opacity: focused ? 1 : 0.5 }}>
              <UserAvatar avatarCode={currentUser.avatarCode} size={size} />
            </View>
          ),
        }}
      />
    </TabStack.Navigator>
  );
};

export default BottomTabStack;
