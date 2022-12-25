import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { initialGameState, useGame } from "../../contexts/GameContext";
import { useSnackBar } from "../../contexts/SnackContext";
import { useUser } from "../../contexts/UserContext";
import { UserConnection } from "../../types/types";
import { INVOKE_INVITE_PLAYER } from "../../utils/constants";
import UserAvatar from "./UserAvatar";

interface Props {
  userConnection: UserConnection;
  closeModal: () => void;
}

const OnlineUserCard = ({ userConnection, closeModal }: Props) => {
  const { currentUser } = useUser();
  const { colors } = useTheme();
  const { connection } = useConnection();
  const { game } = useGame();
  const { setResponseMessage } = useSnackBar();

  const invitePlayer = () => {
    connection.invoke(INVOKE_INVITE_PLAYER, currentUser, userConnection.user.userName);
    closeModal();
    setResponseMessage({ status: "Success", message: `You have invited ${userConnection.user.userName} to join ${game.gameName}!` });
  };

  return (
    <OnlineUserContainer>
      <UserAvatar size={30} avatarCode={userConnection.user.avatarCode} />
      <UserName>{userConnection.user.userName}</UserName>

      {currentUser.userName !== userConnection.user.userName &&
        game !== initialGameState &&
        !game.players.find((p) => p.userName == userConnection.user.userName) && (
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
