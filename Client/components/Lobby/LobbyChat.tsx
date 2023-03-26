import React, { useRef } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Badge, IconButton, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useProfileModalize } from "../../contexts/ProfileModalizeContext";
import { useUser } from "../../contexts/UserContext";
import { User } from "../../types/types";
import Background from "../layout/Background";
import ChatMessage from "./ChatMessage";
import MessageForm from "./MessageForm";
import OnlineUserCard from "./OnlineUserCard";
const LobbyChat = () => {
  const { lobbyMessages } = useUser();
  const { setFetchUser } = useProfileModalize();
  const { colors } = useTheme();
  const { connectedUsers } = useConnection();
  const { currentUser } = useUser();

  const scrollViewRef = useRef<ScrollView | null>(null);
  const usersOnlineModalize = useRef<Modalize>(null);

  const openModal = () => {
    usersOnlineModalize.current?.open();
  };

  const handlePressMessage = (player: User) => {
    if (player.id !== currentUser.id) setFetchUser(player);
  };

  return (
    <Background>
      <View
        style={{
          paddingBottom: 25,
          flex: 1,
          backgroundColor: "#161545",
          margin: -10,
          marginTop: 50,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <ChatContainer>
          <Header>
            <HeaderTitle variant="headlineSmall">Lobby</HeaderTitle>

            <IconButton icon="account-multiple" size={30} onPress={() => openModal()} style={{ margin: 0 }} />
            <OnlineUsers visible={true} size={15}>
              {connectedUsers.length}
            </OnlineUsers>
          </Header>
          <ChatWindow ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
            {lobbyMessages.map((userMessage, index) =>
              userMessage.user.userName !== "LobbyBot" ? (
                <Pressable onPress={() => handlePressMessage(userMessage.user)} key={index}>
                  <ChatMessage
                    lastSender={index != 0 ? lobbyMessages[index - 1].user.userName == lobbyMessages[index].user.userName : false}
                    userMessage={userMessage}
                    latestMessage={lobbyMessages.length === index + 1}
                  />
                </Pressable>
              ) : (
                <View key={index}>
                  <ChatMessage
                    lastSender={index != 0 ? lobbyMessages[index - 1].user.userName == lobbyMessages[index].user.userName : false}
                    userMessage={userMessage}
                    latestMessage={lobbyMessages.length === index + 1}
                  />
                </View>
              )
            )}
          </ChatWindow>
        </ChatContainer>
        <MessageForm chatName="Lobby" />
      </View>
      <Modalize ref={usersOnlineModalize} rootStyle={{}} modalStyle={{ backgroundColor: colors.surface, padding: 5 }} adjustToContentHeight>
        <OnlinePlayersText variant="titleMedium">Players online:</OnlinePlayersText>
        {connectedUsers.map((user, index) => (
          <OnlineUserCard online key={index} user={user} closeModal={() => usersOnlineModalize.current?.close()} />
        ))}
      </Modalize>
    </Background>
  );
};

export default LobbyChat;

const ChatWindow = styled.ScrollView`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
`;

const ChatContainer = styled.View`
  flex: 1;
`;

const OnlineUsers = styled(Badge)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const OnlinePlayersText = styled(Text)`
  margin: 0 0 10px 5px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderTitle = styled(Text)`
  margin-right: auto;
`;
