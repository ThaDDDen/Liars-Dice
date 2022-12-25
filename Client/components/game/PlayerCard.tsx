import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Surface } from "react-native-paper";
import styled from "styled-components/native";
import { User } from "../../types/types";
import UserAvatar from "../Lobby/UserAvatar";
import ValueDice from "./assets/ValueDice";

interface Props {
  player: User;
}

const PlayerCard = ({ player }: Props) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <UserAvatar size={50} avatarCode={player.avatarCode} />
      <NameContainer>
        <Text numberOfLines={1} style={{ width: "100%", paddingHorizontal: 2 }}>
          {player.userName}
        </Text>
      </NameContainer>
      {player.gameHost && (
        <GameHostCrown>
          <MaterialCommunityIcons name="crown" size={18} color="yellow" />
        </GameHostCrown>
      )}

      {/* Experiment with viewing one dice with a value to represent nr of dice left */}
      <View style={{ position: "absolute", left: -5, top: -7 }}>
        <ValueDice size={25} value={player.dice.length} />
      </View>

      {/* <DiceContainer>
        <PlayerHand size={"small"} dice={player.dice} />
      </DiceContainer> */}
    </View>
  );
};

export default PlayerCard;

const GameHostCrown = styled.View`
  position: absolute;
  top: -10px;
  right: 2px;
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
