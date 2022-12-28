import React, { useRef } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useGame } from "../../../contexts/GameContext";
import { useUser } from "../../../contexts/UserContext";
import ChatMessage from "../../Lobby/ChatMessage";
import MessageForm from "../../Lobby/MessageForm";

const GameChat = () => {
  const { colors } = useTheme();
  const { gameMessages } = useUser();
  const { game } = useGame();

  const scrollViewRef = useRef<ScrollView | null>(null);

  const gameMessagesJsx = gameMessages.map((userMessage, index) => (
    <View key={index}>
      <ChatMessage userMessage={userMessage} latestMessage={gameMessages.length === index + 1} />
    </View>
  ));

  return (
    <ChatContainer>
      <ChatWindow ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })} bg={colors.surfaceVariant}>
        {gameMessagesJsx}
      </ChatWindow>
      <MessageForm chatName={game.gameName} />
    </ChatContainer>
  );
};

export default GameChat;

const ChatWindow = styled.ScrollView<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  height: 200px;
  border-radius: 10px;
  padding: 10px;
`;

const ChatContainer = styled.View`
  width: 100%;
  flex: 1;
  padding: 10px;
`;
