import React from "react";
import { View } from "react-native";
import { useUser } from "../../../contexts/UserContext";
import ChatMessage from "../../Lobby/ChatMessage";

const GameMessages = () => {
  const { gameMessages } = useUser();
  return (
    <>
      {gameMessages.map((userMessage, index) => (
        <View key={index}>
          <ChatMessage
            lastSender={index != 0 ? gameMessages[index - 1].user.userName == gameMessages[index].user.userName : false}
            userMessage={userMessage}
            latestMessage={gameMessages.length === index + 1}
          />
        </View>
      ))}
    </>
  );
};

export default GameMessages;
