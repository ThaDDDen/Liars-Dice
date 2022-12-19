import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import { UserMessage } from "../../types/types";
import UserAvatar from "./UserAvatar";

interface Props {
  userMessage: UserMessage;
  latestMessage: boolean;
}

const ChatMessage = ({ userMessage, latestMessage }: Props) => {
  return (
    <MessageContainer latestMessage={latestMessage}>
      <AvatarContainer>
        <UserAvatar avatarCode={userMessage.avatarCode} />
      </AvatarContainer>
      <View style={{ flexGrow: 1, flex: 1 }}>
        <Text variant="bodyMedium">
          {userMessage.username} {userMessage.time}
        </Text>
        <Text>{userMessage.message}</Text>
      </View>
    </MessageContainer>
  );
};

export default ChatMessage;

const MessageContainer = styled.View<{ latestMessage: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: "green";
  ${({ latestMessage }) => latestMessage && "padding-bottom: 20px;"}
`;

const AvatarContainer = styled.View`
  padding: 5px 5px 5px 0;
  align-self: flex-start;
`;
