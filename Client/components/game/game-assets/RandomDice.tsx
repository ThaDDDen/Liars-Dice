import React from "react";
import styled from "styled-components/native";
import randomDice from "../../../assets/images/white_dice/white_dice_random.png";

interface Props {
  size: string;
}

const RandomDice = ({ size }: Props) => {
  return <HiddenDice source={randomDice} size={size} />;
};

export default RandomDice;

const HiddenDice = styled.Image<{ size: string }>`
  ${(props) => props.size === "small" && "height: 18px; width: 18px;"}
  ${(props) => props.size === "medium" && "height: 22px; width: 22px;"}
  ${(props) => props.size === "large" && "height: 40px; width: 40px; margin: 0 10px;"}
  resize-mode: contain;
`;
