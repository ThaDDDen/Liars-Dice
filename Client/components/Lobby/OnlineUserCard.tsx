import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { initialGameState, useGame } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import { UserConnection } from "../../types/types";
import { INVOKE_INVITE_PLAYER } from "../../utils/constants";
import UserAvatar from "./UserAvatar";

interface Props {
  userConnection: UserConnection;
}

const OnlineUserCard = ({ userConnection }: Props) => {
  const { currentUser } = useUser();
  const { colors } = useTheme();
  const { connection } = useConnection();
  const { game } = useGame();

  const invitePlayer = () => {
    connection.invoke(INVOKE_INVITE_PLAYER, currentUser, userConnection.user.userName);
  };

  return (
    <OnlineUserContainer>
      <UserAvatar size={30} avatarCode={userConnection.user.avatarCode} />
      <UserName>{userConnection.user.userName}</UserName>

      {currentUser.userName !== userConnection.user.userName && game !== initialGameState && (
        <MaterialCommunityIcons
          name="plus-circle"
          size={24}
          color={colors.primary}
          style={{ marginRight: 10 }}
          onPress={() => {
            invitePlayer();
          }}
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
