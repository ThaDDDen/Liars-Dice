import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import React from "react";
import { Image, View } from "react-native";
import { useTheme } from "react-native-paper";
import dice from "../assets/images/white_dice/white_dice_tabstack.png";
import UserAvatar from "../components/Lobby/UserAvatar";
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

const BottomTabStack = () => {
  const { currentUser } = useUser();
  const { colors } = useTheme();
  return (
    // TODO Check posibility to use more colorful images instead of Icons in the bottomtab
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
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="chat-outline" size={size} color={color} />,
        }}
      />
      <TabStack.Screen
        name="Game"
        component={GameStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Image source={dice} style={{ width: size, resizeMode: "contain", opacity: focused ? 1 : 0.5 }} />
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
