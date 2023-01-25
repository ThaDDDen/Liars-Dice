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
    <>
      <ChatMessageContainer latestMessage={latestMessage} lastSender={lastSender}>
        {!lastSender && (
          <AvatarContainer>
            <UserAvatar size={40} avatarCode={userMessage.user.avatarCode} />
          </AvatarContainer>
        )}
        <View style={{ marginLeft: 10, flexGrow: 1, flex: 1 }}>
          {!lastSender && (
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text variant="titleMedium" style={{ marginRight: 10 }}>
                {userMessage.user.userName}
              </Text>
              <Text variant="bodySmall" style={{ fontStyle: "italic", color: "gray" }}>
                {userMessage.time}
              </Text>
            </View>
          )}
          <View style={{ marginLeft: lastSender ? 45 : 0 }}>
            <Text variant="bodyMedium">{userMessage.message}</Text>
          </View>
        </View>
      </ChatMessageContainer>
    </>
  );
};

export default ChatMessage;

const AvatarContainer = styled.View`
  padding: 5px 5px 0 0;
  align-self: flex-start;
`;

const ChatMessageContainer = styled.View<{ latestMessage: boolean; lastSender: boolean }>`
  flex-direction: row;
  ${({ latestMessage }) => latestMessage && "padding-bottom: 20px;"};
  ${({ lastSender }) => !lastSender && "margin-top: 10px;"};
`;
