import React, { useRef } from "react";
import { ScrollView, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Badge, IconButton, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useUser } from "../../contexts/UserContext";
import Background from "../layout/Background";
import ChatMessage from "./ChatMessage";
import MessageForm from "./MessageForm";
import OnlineUserCard from "./OnlineUserCard";
const LobbyChat = () => {
  const { lobbyMessages } = useUser();
  const { colors } = useTheme();
  const { connectedUsers } = useConnection();

  const scrollViewRef = useRef<ScrollView | null>(null);
  const usersOnlineModalize = useRef<Modalize>(null);

  const openModal = () => {
    usersOnlineModalize.current?.open();
  };

  return (
    <Background>
      <ChatContainer>
        <Header>
          <HeaderTitle variant="headlineSmall">Lobby</HeaderTitle>

          <IconButton icon="account-multiple" size={30} onPress={() => openModal()} style={{ margin: 0 }} />
          <OnlineUsers visible={true} size={15}>
            {connectedUsers.length}
          </OnlineUsers>
        </Header>
        <Surface style={{ flex: 1, borderRadius: 10 }}>
          <ChatWindow ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
            {lobbyMessages.map((userMessage, index) => (
              <View key={index}>
                <ChatMessage userMessage={userMessage} latestMessage={lobbyMessages.length === index + 1} />
              </View>
            ))}
          </ChatWindow>
        </Surface>
      </ChatContainer>
      <MessageForm chatName="Lobby" />

      <Modalize ref={usersOnlineModalize} rootStyle={{}} modalStyle={{ backgroundColor: colors.surface, padding: 5 }} adjustToContentHeight>
        <OnlinePlayersText variant="titleMedium">Players online:</OnlinePlayersText>
        {connectedUsers.map((user, index) => (
          <OnlineUserCard key={index} user={user} closeModal={() => usersOnlineModalize.current?.close()} />
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
