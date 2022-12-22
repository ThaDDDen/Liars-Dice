import React from "react";
import { View } from "react-native";
import RandomDice from "./assets/RandomDice";

interface Props {
  dice: number[] | undefined;
  size: "small" | "medium" | "large";
}

const PlayerHand = ({ dice, size }: Props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {dice &&
        dice.map((x, index) => (
          <View key={index}>
            <RandomDice size={size} />
          </View>
        ))}
    </View>
  );
};

export default PlayerHand;
