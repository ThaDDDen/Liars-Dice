import React from "react";
import { Image } from "react-native";
import dice from "../../assets/images/small_dice.png";

const SmallDice = () => {
  return <Image source={dice} style={{ width: 30, height: 30, resizeMode: "contain", marginHorizontal: 5 }} />;
};

export default SmallDice;
