import React, { useRef } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useProfileModalize } from "../../contexts/ProfileModalizeContext";
import { useUser } from "../../contexts/UserContext";
import { User } from "../../types/types";
import Background from "../layout/Background";
import ChatMessage from "./ChatMessage";
import MessageForm from "./MessageForm";
const LobbyChat = () => {
  const { lobbyMessages } = useUser();
  const { setFetchUser } = useProfileModalize();
  const { colors } = useTheme();
  const { currentUser } = useUser();

  const scrollViewRef = useRef<ScrollView | null>(null);

  const handlePressMessage = (player: User) => {
    if (player.id !== currentUser.id) setFetchUser(player);
  };

  return (
    <Background>
      <View
        style={{
          paddingBottom: 25,
          flex: 1,
          backgroundColor: colors.primaryContainer,
          margin: -10,
          marginTop: 70,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <ChatContainer>
          <Header color={colors.primary}>
            <Text variant="headlineSmall">LOBBY</Text>
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

const Header = styled.View<{ color: string }>`
  align-items: center;
  background: ${(props) => props.color};
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 30px;
  transform: translateY(-25px);
`;
