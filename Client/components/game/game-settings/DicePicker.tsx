import React from "react";
import { IconButton, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import SmallDice from "../game-layout/SmallDice";

interface Props {
  diceAmount: number;
  setDiceAmount: React.Dispatch<React.SetStateAction<number>>;
}

const DicePicker = ({ diceAmount, setDiceAmount }: Props) => {
  const { colors } = useTheme();
  return (
    <DiceSettings>
      <IconButton
        style={{ borderRadius: 5, backgroundColor: colors.surfaceVariant }}
        icon="minus"
        size={20}
        onPress={() => diceAmount !== 1 && setDiceAmount((prev) => prev - 1)}
      />
      <DiceContainer>
        <>
          {Array.from({ length: diceAmount }, (value, key) => (
            <SmallDice size={"medium"} key={key} />
          ))}
        </>
      </DiceContainer>
      <IconButton
        style={{ borderRadius: 5, backgroundColor: colors.surfaceVariant }}
        icon="plus"
        size={20}
        onPress={() => diceAmount !== 6 && setDiceAmount((prev) => prev + 1)}
      />
    </DiceSettings>
  );
};

export default DicePicker;

const DiceSettings = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const DiceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
