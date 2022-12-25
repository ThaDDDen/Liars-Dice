import React from "react";
import { View } from "react-native";
import Dice from "./assets/ValueDice";

interface Props {
  dice: number[] | undefined;
}
const UserHand = ({ dice }: Props) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      {dice && dice.map((value, index) => <Dice size={40} key={index} value={value} />)}
    </View>
  );
};

export default UserHand;
