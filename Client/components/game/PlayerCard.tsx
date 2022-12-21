import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { User } from "../../types/types";
import UserAvatar from "../Lobby/UserAvatar";

interface Props {
  player: User;
}

const PlayerCard = ({ player }: Props) => {
  const { colors } = useTheme();
  return (
    <>
      <UserAvatar size={50} avatarCode={player.avatarCode} />
      <NameContainer>
        <Text>{player.userName}</Text>
      </NameContainer>
      {player.gameHost && (
        <GameHostCrown backgroundColor={colors.primary}>
          <MaterialCommunityIcons name="crown" size={13} color="yellow" />
        </GameHostCrown>
      )}
    </>
  );
};

export default PlayerCard;

const GameHostCrown = styled.View<{ backgroundColor: string }>`
  position: absolute;
  top: -6px;
  right: 6px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 50px;
  padding: 2px;
`;

const NameContainer = styled(Surface)`
  border-radius: 3px;
  padding: 0px 3px;
  margin-top: 3px;
`;
