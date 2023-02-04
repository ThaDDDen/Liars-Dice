import React from "react";
import styled from "styled-components/native";
import Dice from "../game-assets/ValueDice";

interface Props {
  dice: number[] | undefined;
}
const UserHand = ({ dice }: Props) => {
  return <DiceContainer>{dice && dice.map((value, index) => <Dice size={55} key={index} value={value} />)}</DiceContainer>;
};

export default UserHand;

const DiceContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
