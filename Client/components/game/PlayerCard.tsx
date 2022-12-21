import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { User } from "../../types/types";
import UserAvatar from "../Lobby/UserAvatar";
import PlayerHand from "./PlayerHand";

interface Props {
  player: User;
}

const PlayerCard = ({ player }: Props) => {
  const { colors } = useTheme();
  return (
    <View style={{ position: "absolute", justifyContent: "center", alignItems: "center" }}>
      <UserAvatar size={50} avatarCode={player.avatarCode} />
      <NameContainer>
        <Text numberOfLines={1} style={{ width: "100%", paddingHorizontal: 2 }}>
          {player.userName}
        </Text>
      </NameContainer>
      {player.gameHost && (
        <GameHostCrown backgroundColor={colors.primary}>
          <MaterialCommunityIcons name="crown" size={13} color="yellow" />
        </GameHostCrown>
      )}
      <DiceContainer>
        <PlayerHand size={"small"} dice={player.dice} />
      </DiceContainer>
    </View>
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
  background-color: lightgoldenrodyellow;
  position: absolute;
  top: 50px;

  border-radius: 3px;
  padding: 0px 3px;
  margin-top: 3px;
`;

const DiceContainer = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 80px;
`;
