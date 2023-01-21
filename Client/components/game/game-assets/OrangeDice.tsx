import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";
import orangeDice from "../../../assets/images/small_dice.png";

interface Props {
  size: string;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const OrangeDice = ({ size, styles, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles}>
      <HiddenDice source={orangeDice} size={size} />
    </Pressable>
  );
};

export default OrangeDice;

const HiddenDice = styled.Image<{ size: string }>`
  ${(props) => props.size === "small" && "height: 18px; width: 18px;"}
  ${(props) => props.size === "medium" && "height: 22px; width: 22px;"}
  ${(props) => props.size === "large" && "height: 40px; width: 40px; margin: 0 10px;"}
  resize-mode: contain;
`;
