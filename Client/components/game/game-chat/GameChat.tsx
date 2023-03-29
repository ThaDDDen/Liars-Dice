import React, { useRef } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useGame } from "../../../contexts/GameContext";
import MessageForm from "../../Lobby/MessageForm";
import GameMessages from "./GameMessages";

const GameChat = () => {
  const { colors } = useTheme();
  const { game } = useGame();

  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <ChatContainer>
      <ChatWindow ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })} bg={colors.surfaceVariant}>
        <GameMessages />
      </ChatWindow>
      <MessageForm chatName={game.gameName} />
    </ChatContainer>
  );
};

export default GameChat;

const ChatWindow = styled.ScrollView<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  height: 400px;
  border-radius: 10px;
  padding: 10px;
`;

const ChatContainer = styled.View`
  width: 100%;
  flex: 1;
  padding: 10px;
  padding-bottom: 25px;
`;
