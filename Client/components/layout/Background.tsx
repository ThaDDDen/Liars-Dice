import { AntDesign, Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { ReactNode, useRef } from "react";
import { Pressable, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Badge, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import background from "../../assets/images/background_huge-dice.png";
import { useConnection } from "../../contexts/ConnectionContext";
import { initialGameState, useGame } from "../../contexts/GameContext";
import { initialUserState, useUser } from "../../contexts/UserContext";
import GameChat from "../game/game-chat/GameChat";

interface Props {
  children: ReactNode;
}

const Background = ({ children }: Props) => {
  const navigation = useNavigation();
  const { connectedUsers } = useConnection();
  const { colors } = useTheme();
  const { game } = useGame();
  const { currentUser } = useUser();

  const chatModalize = useRef<Modalize>(null);

  const openChatModal = () => {
    chatModalize.current?.open();
  };

  return (
    <SafeAreaView mode="margin" style={{ flex: 1, justifyContent: "center" }}>
      <AppBackground resizeMode="contain" source={background}>
        {currentUser !== initialUserState && (
          <>
            <View style={{ flexDirection: "row", position: "absolute", top: 0, right: 0, padding: 10 }}>
              {game !== initialGameState && (
                <Pressable style={{ marginRight: 10 }} onPress={() => openChatModal()}>
                  <Ionicons name="chatbubble-outline" size={35} color="white" />
                </Pressable>
              )}
              <Pressable
                onPress={() => navigation.getParent("rightDrawer")?.dispatch(DrawerActions.toggleDrawer())}
                // onPress={() => navigation.getParent()?.dispatch(DrawerActions.toggleDrawer())}
              >
                <AntDesign name="menu-unfold" size={35} color="white" />
                <OnlineUsers backgroundColor={colors.secondary} visible={true} size={20}>
                  {connectedUsers.length}
                </OnlineUsers>
              </Pressable>
            </View>
            <Pressable
              style={{ position: "absolute", top: 0, left: 0, padding: 10 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Ionicons name="settings-outline" size={35} color="white" />
            </Pressable>
          </>
        )}
        <Modalize ref={chatModalize} rootStyle={{}} modalStyle={{ backgroundColor: colors.surface }} adjustToContentHeight>
          <GameChat />
        </Modalize>
        {children}
      </AppBackground>
    </SafeAreaView>
  );
};

export default Background;

const AppBackground = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 10px;
  padding-top: 0px;
`;
const OnlineUsers = styled(Badge)<{ backgroundColor: string }>`
  font-size: 14px;
  font-family: "Manrope-Bold";
  background-color: ${({ backgroundColor }) => backgroundColor};
  position: absolute;
  top: -2px;
  right: -2px;
  color: white;
`;
