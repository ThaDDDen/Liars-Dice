import React from "react";
import { View } from "react-native";
import Dice from "../game-assets/ValueDice";

interface Props {
  dice: number[] | undefined;
}
const UserHand = ({ dice }: Props) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
      {dice && dice.map((value, index) => <Dice size={55} key={index} value={value} />)}
    </View>
  );
};

export default UserHand;
