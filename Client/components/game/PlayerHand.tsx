import React from "react";
import { View } from "react-native";
import { useGame } from "../../contexts/GameContext";
import SmallDice from "./SmallDice";

interface Props {
  dice: number[];
  size: "small" | "medium" | "large";
}

const PlayerHand = ({ dice, size }: Props) => {
  const { game } = useGame();

  return (
    <View style={{ flexDirection: "row" }}>
      {dice.map((x, index) => (
        <SmallDice key={index} size={size} />
      ))}
    </View>
  );
};

export default PlayerHand;
