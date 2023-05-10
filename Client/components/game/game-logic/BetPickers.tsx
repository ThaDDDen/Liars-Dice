import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useGame } from "../../../contexts/GameContext";
import { GameBet } from "../../../types/types";
import ValueDice from "../game-assets/ValueDice";

interface Props {
  diceValue: number;
  setDiceValue: React.Dispatch<React.SetStateAction<2 | 3 | 4 | 5 | 6>>;
  diceAmount: number;
  setDiceAmount: React.Dispatch<React.SetStateAction<number>>;
}

const BetPickers = ({ diceAmount, setDiceAmount, diceValue, setDiceValue }: Props) => {
  const { colors } = useTheme();
  const { game } = useGame();
  const diceLeft = game.diceCount * game.playerCount - game.round + 1;
  const nextSmallestBet: GameBet | null = game.currentBet
    ? {
        ...game.currentBet,
        diceAmount: game.currentBet.diceValue !== 6 ? game.currentBet.diceAmount : game.currentBet.diceAmount + 1,
        diceValue: game.currentBet.diceValue !== 6 ? game.currentBet.diceValue + 1 : 2,
      }
    : null;

  const dices = Array.from(
    { length: 6 },
    (value, index) =>
      index !== 0 &&
      !(diceAmount === game.currentBet?.diceAmount && index + 1 <= game.currentBet?.diceValue) && (
        <Pressable key={index} onPress={() => setDiceValue((index + 1) as 2 | 3 | 4 | 5 | 6)}>
          <ValueDice value={index + 1} size={40} selected={index + 1 === diceValue} />
        </Pressable>
      )
  );

  return (
    <PickerContainer>
      <View style={{ width: "100%" }}>
        <Slider
          renderAboveThumbComponent={() => (
            <Text style={{ marginLeft: 5, fontFamily: "Manrope-Bold", fontSize: 16, color: "white" }}>{diceAmount}</Text>
          )}
          step={1}
          renderThumbComponent={() => <View style={{ width: 25, height: 25, borderRadius: 20, backgroundColor: colors.primary }} />}
          value={diceAmount}
          onValueChange={(amount) => setDiceAmount(Number(amount))}
          minimumValue={nextSmallestBet?.diceAmount ? nextSmallestBet?.diceAmount : 1}
          maximumValue={diceLeft}
        />
      </View>

      <View>
        <View style={{ flexDirection: "row", maxWidth: 90, justifyContent: "center" }}>{dices}</View>
      </View>
    </PickerContainer>
  );
};

export default BetPickers;

const PickerContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 15px;
  justify-content: space-between;
`;
