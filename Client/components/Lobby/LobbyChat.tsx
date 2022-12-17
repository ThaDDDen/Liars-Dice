import { useRef } from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { useUser } from "../../contexts/UserContext";
import Background from "../layout/Background";
import ChatMessage from "./ChatMessage";
import MessageForm from "./MessageForm";

const LobbyChat = () => {
  const { messages } = useUser();

  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <Background>
      <ChatContainer>
        <ChatWindow ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
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

const ChatWindow = styled.ScrollView`
  background-color: white;
  flex: 1;
  padding: 10px;
  border-radius: 10px;
`;

const ChatContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 10px;
`;
