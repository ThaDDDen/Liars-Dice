import React from "react";
import { Text, View } from "react-native";
import { UserMessage } from "../types/types";

interface Props {
  userMessage: UserMessage;
}

const ChatMessage = ({ userMessage }: Props) => {
  return (
    <View>
      <Text>
        {userMessage.username !== "LobbyBot" && userMessage.username + ": "}
        {userMessage.message}
      </Text>
    </View>
  );
};

export default ChatMessage;
