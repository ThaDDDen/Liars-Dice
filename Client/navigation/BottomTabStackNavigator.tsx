import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams, useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, Image } from "react-native";
import { useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import styled from "styled-components/native";
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
  const isFocused = useIsFocused();
  const deviceWidth = Dimensions.get("window").width;

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
        tabBarActiveBackgroundColor: colors.secondary,
        tabBarInactiveBackgroundColor: colors.surface,
        tabBarActiveTintColor: colors.onPrimaryContainer,
        tabBarShowLabel: false,
        tabBarStyle: { height: 49 },
      }}
    >
      <TabStack.Screen
        name="Lobby"
        component={LobbyScreen}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
          tabBarIcon: ({ size, focused }) => {
            if (!focused) {
              return <Image source={lobby} style={{ width: size, height: size * 1.2, resizeMode: "contain" }} />;
            }
            return (
              <FocusedContainer colors={colors} width={deviceWidth / 3}>
                <Image source={lobby} style={{ width: size * 2, height: size * 2.4, resizeMode: "contain" }} />
              </FocusedContainer>
            );
          },
        }}
      />
      <TabStack.Screen
        name="Game"
        component={GameStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused }) => {
            if (!focused) {
              return <Image source={dice} style={{ width: size, height: size * 1.2 }} />;
            }
            return (
              <FocusedContainer colors={colors} width={deviceWidth / 3}>
                <Image source={dice} style={{ padding: 2, width: size * 2, height: size * 2.4 }} />
              </FocusedContainer>
            );
          },
        }}
      />
      <TabStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
          tabBarItemStyle: isFocused ? { borderRadius: 0, marginTop: 0 } : {},
          // tabBarStyle: { transform: [{ scale: 1.1 }] },
          tabBarIcon: ({ focused }) => {
            if (!focused) {
              return <UserAvatar avatarCode={currentUser.avatarCode} size={30} />;
            }
            return (
              <FocusedContainer colors={colors} width={deviceWidth / 3}>
                <UserAvatar avatarCode={currentUser.avatarCode} size={60} />
              </FocusedContainer>
            );
          },
        }}
      />
    </TabStack.Navigator>
  );
};

export default BottomTabStack;

const FocusedContainer = styled.View<{ colors: MD3Colors; width: number }>`
  background-color: ${({ colors }) => colors.secondary};
  width: ${({ width }) => width}px;
  padding: 5px;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-bottom: -10px;
  align-items: center;
  justify-content: center;
  margin-top: -30px;
`;
