import React from "react";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import { GameBet } from "../../../types/types";
import UserAvatar from "../../Lobby/UserAvatar";
import ValueDice from "../game-assets/ValueDice";

interface Props {
  bet: GameBet;
}

const CurrentBet = ({ bet }: Props) => {
  return (
    <>
      <UserAvatar user={bet.better} size={45} />
      <UserName>{bet.better.userName} bet</UserName>
      <BetBox>
        <BetText>{bet.diceAmount} x </BetText>
        <ValueDice value={bet.diceValue} size={35} />
      </BetBox>
    </>
  );
};

export default CurrentBet;

const UserName = styled(Text)`
  font-family: "Manrope-SemiBold";
  font-size: 16px;
`;

const BetBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BetText = styled(Text)`
  font-family: "Manrope-SemiBold";
  font-size: 25px;
`;
