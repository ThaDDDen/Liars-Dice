import { useRef } from "react";
import { useTheme } from "react-native-paper";
import { ScrollView, Text, View } from "react-native";

import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useUser } from "../../contexts/UserContext";
import Background from "../layout/Background";
import ChatMessage from "./ChatMessage";
import MessageForm from "./MessageForm";

const LobbyChat = () => {
  const { messages } = useUser();
  const { colors } = useTheme();
  const { connectedUsers } = useConnection();


  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <Background>
      {connectedUsers.map((user, index) => (
        <Text key={index}>{user.user}</Text>
      ))}
      <Text>Users online: {connectedUsers.length}</Text>
      <ChatContainer>
        <ChatWindow
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          bg={colors.secondaryContainer}
        >
          {messages.map((userMessage, index) => (
            <View key={index}>
              <ChatMessage userMessage={userMessage} latestMessage={messages.length === index + 1} />
            </View>
          ))}
        </ChatWindow>
      </ChatContainer>
      <MessageForm />
    </Background>
  );
};

export default LobbyChat;

const ChatWindow = styled.ScrollView<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  flex: 1;
  padding: 10px;
  border-radius: 10px;
`;

const ChatContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 10px;
`;
