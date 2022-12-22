import React from "react";
import { View } from "react-native";
import RandomDice from "./assets/RandomDice";

interface Props {
  dice: number[] | undefined;
  size: "small" | "medium" | "large";
}

const PlayerHand = ({ dice, size }: Props) => {
  return <View style={{ flexDirection: "row" }}>{dice && dice.map((x, index) => <RandomDice size={size} />)}</View>;
};

export default PlayerHand;
