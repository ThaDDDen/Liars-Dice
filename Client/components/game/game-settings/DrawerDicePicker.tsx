import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import styled from "styled-components/native";
import SmallDice from "../game-layout/SmallDice";

interface Props {
  diceCount: number;
  setDiceCount: React.Dispatch<React.SetStateAction<number>>;
}

const DrawerDicePicker = ({ diceCount, setDiceCount }: Props) => {
  const increaseDiceCount = () => {
    diceCount !== 6 && setDiceCount((prev) => prev + 1);
  };
  const decreaseDiceCount = () => {
    diceCount !== 1 && setDiceCount((prev) => prev - 1);
  };
  return (
    <View>
      <DiceContainer>
        {Array.from({ length: diceCount }, (value, key) => (
          <SmallDice size={"medium"} key={key} />
        ))}
      </DiceContainer>
      <SettingsButtonContainer>
        <SettingsButton icon="minus" onPress={decreaseDiceCount} />
        <SettingsButton icon="plus" onPress={increaseDiceCount} />
      </SettingsButtonContainer>
    </View>
  );
};

export default DrawerDicePicker;

const SettingsButton = styled(IconButton)`
  margin: 0 10px;
`;

const SettingsButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const DiceContainer = styled.View`
  margin-right: auto;
  flex-direction: row;
`;
