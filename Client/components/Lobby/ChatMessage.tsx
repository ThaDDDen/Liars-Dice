import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { UserMessage } from "../../types/types";
import UserAvatar from "./UserAvatar";

interface Props {
  userMessage: UserMessage;
  latestMessage: boolean;
  lastSender: boolean;
}

const ChatMessage = ({ userMessage, latestMessage, lastSender }: Props) => {
  const { colors } = useTheme();
  return (
    <ChatMessageContainer latestMessage={latestMessage} lastSender={lastSender}>
      {!lastSender && (
        <AvatarContainer>
          <UserAvatar size={40} user={userMessage.user} />
        </AvatarContainer>
      )}
      <View style={{ marginLeft: 10 }}>
        {!lastSender && (
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text variant="titleMedium" style={{ marginRight: 10 }}>
              {userMessage.user.userName}
            </Text>
            <Text variant="titleSmall" style={{ fontSize: 12, fontStyle: "italic", color: colors.outline }}>
              {userMessage.time}
            </Text>
          </View>
        )}
        <View style={{ marginLeft: lastSender ? 45 : 0 }}>
          <Text variant="bodyMedium">{userMessage.message}</Text>
        </View>
      </View>
    </ChatMessageContainer>
  );
};

export default ChatMessage;

const AvatarContainer = styled.View`
  padding: 5px 5px 0 0;
`;

const ChatMessageContainer = styled.View<{ latestMessage: boolean; lastSender: boolean }>`
  flex-direction: row;
  ${({ latestMessage }) => latestMessage && "padding-bottom: 20px;"};
  ${({ lastSender }) => !lastSender && "margin-top: 10px;"};
`;
