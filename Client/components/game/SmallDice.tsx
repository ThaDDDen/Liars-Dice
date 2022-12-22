import React from "react";
import styled from "styled-components/native";
import dice from "../../assets/images/small_dice.png";

interface Props {
  size: "small" | "medium" | "large";
}

// rename to dice since size is dynamic?
const SmallDice = ({ size }: Props) => {
  return <SmallDiceImg size={size} source={dice} />;
};

export default SmallDice;

const SmallDiceImg = styled.Image<{ size: string }>`
  ${(props) => props.size === "small" && "height: 15px; width: 15px; margin: 0 1px;"}
  ${(props) => props.size === "medium" && "height: 30px; width: 30px; margin: 0 5px;"}
  ${(props) => props.size === "large" && "height: 40px; width: 40px; margin: 0 10px;"}
  resize-mode: contain;
`;
