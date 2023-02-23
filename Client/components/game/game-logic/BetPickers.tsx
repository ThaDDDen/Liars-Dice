import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { Pressable, Text, View } from "react-native";
import styled from "styled-components/native";
import { Game, GameBet } from "../../../types/types";
import ValueDice from "../game-assets/ValueDice";

interface Props {
  diceValue: number;
  setDiceValue: React.Dispatch<React.SetStateAction<2 | 3 | 4 | 5 | 6>>;
  diceAmount: number;
  setDiceAmount: React.Dispatch<React.SetStateAction<number>>;
  game: Game;
}

const BetPickers = ({ diceAmount, setDiceAmount, diceValue, setDiceValue, game }: Props) => {
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
        <Pressable
          //   disabled={diceAmount === game.currentBet?.diceAmount && index + 1 <= game.currentBet?.diceValue}
          key={index}
          onPress={() => {
            setDiceValue((index + 1) as 2 | 3 | 4 | 5 | 6);
          }}
        >
          <ValueDice value={index + 1} size={40} selected={index + 1 === diceValue} />
        </Pressable>
      )
  );

  return (
    <PickerContainer>
      <View style={{ width: "100%" }}>
        <Slider
          renderAboveThumbComponent={() => <Text>{diceAmount}</Text>}
          step={1}
          value={diceAmount}
          onValueChange={(amount) => {
            setDiceAmount(Number(amount));
          }}
          minimumValue={nextSmallestBet?.diceAmount ? nextSmallestBet?.diceAmount : 1}
          maximumValue={diceLeft}
        />
      </View>

      <View>
        <PickerTitle>Value</PickerTitle>
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

const PickerTitle = styled(Text)`
  align-self: center;
  margin-bottom: 5px;
`;