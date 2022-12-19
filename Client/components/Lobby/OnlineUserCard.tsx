import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useUser } from "../../contexts/UserContext";
import { UserConnection } from "../../types/types";
import UserAvatar from "./UserAvatar";

interface Props {
  userConnection: UserConnection;
}

const OnlineUserCard = ({ userConnection }: Props) => {
  const { currentUser } = useUser();
  const { colors } = useTheme();
  return (
    <OnlineUserContainer>
      <UserAvatar avatarCode={userConnection.user.avatarCode} />
      <UserName>{userConnection.user.userName}</UserName>

      {currentUser.userName !== userConnection.user.userName && (
        <MaterialCommunityIcons
          name="plus-circle"
          size={24}
          color={colors.primary}
          style={{ marginRight: 10 }}
          onPress={() => console.log(`invite ${userConnection.user.userName} to your game lobby`)}
        />
      )}
    </OnlineUserContainer>
  );
};

export default OnlineUserCard;

const OnlineUserContainer = styled(Surface)`
  flex-direction: row;
  align-items: center;
  margin: 0 5px 10px 5px;
  padding: 5px;
  border-radius: 10px;
`;

const UserName = styled(Text)`
  margin-left: 15px;
  flex: 1;
`;
