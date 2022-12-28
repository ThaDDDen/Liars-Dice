import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";
import { useConnection } from "../../../contexts/ConnectionContext";
import { useGame } from "../../../contexts/GameContext";
import { useUser } from "../../../contexts/UserContext";
import { INVOKE_CALL, INVOKE_SET_BET } from "../../../utils/constants";
import { getDiceAmountArray, getDiceValueArray } from "../../../utils/gameFunctions";
import Button from "../../layout/Button";
import ValueDice from "../game-assets/ValueDice";
import DiceBetAmountPicker from "./DiceBetAmountPicker";
import DiceBetValuePicker from "./DiceBetValuePicker";

interface Props {
  bettingDialogVisible: boolean;
  setBettingDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const BettingDialog = ({ bettingDialogVisible, setBettingDialogVisible }: Props) => {
  const { game } = useGame();
  const { connection } = useConnection();
  const { currentUser } = useUser();

  //BET VALUES AND AMOUNT
  const [diceAmount, setDiceAmount] = useState<number>(1);
  const [diceValue, setDiceValue] = useState<2 | 3 | 4 | 5 | 6>(2);

  //PICKER ARRAY VALUES AND AMOUNT
  const [dicePickerAmount, setDicePickerAmount] = useState<number[]>([]);
  const [dicePickerValue, setDicePickerValue] = useState<number[]>([]);

  const maxBet = 6 * game.players.map((x) => x.dice.length).reduce((x, c) => x + c, 0);

  useEffect(() => {
    if (game.currentBet) {
      if (game.currentBet.diceValue === 6) {
        setDiceAmount(game.currentBet.diceAmount + 1);
        setDiceValue(2);
      } else {
        setDiceAmount(game.currentBet.diceAmount);
        setDiceValue((game.currentBet.diceValue + 1) as 2 | 3 | 4 | 5 | 6);
      }
    } else {
      setDiceAmount(1);
      setDiceValue(2);
    }
    const diceValueArray = getDiceValueArray(game.currentBet, diceAmount);
    setDicePickerValue(diceValueArray);
  }, [game]);

  // --------- SET ALLOWED DICE AMOUNT PICKER ARRAY --------
  useEffect(() => {
    const diceAmountArray = getDiceAmountArray(game.players, game.currentBet);
    setDicePickerAmount(diceAmountArray);
  }, [game]);

  // ------ SET ALLOWED DICE VALUE PICKER ARRAY ------
  useEffect(() => {
    const diceValueArray = getDiceValueArray(game.currentBet, diceAmount);

    setDicePickerValue(diceValueArray);
    setDiceValue(diceValueArray[0] as 2 | 3 | 4 | 5 | 6);
  }, [diceAmount]);

  return (
    <Portal>
      <Dialog visible={bettingDialogVisible}>
        <Dialog.Title>Your turn!</Dialog.Title>
        <Dialog.Content>
          <View style={{ flexDirection: "row", paddingHorizontal: 80, justifyContent: "space-around", marginBottom: 20 }}>
            {maxBet !== game.currentBet?.diceAmount * game.currentBet?.diceValue && (
              <>
                <DiceBetAmountPicker setDiceAmount={setDiceAmount} dicePickerAmount={dicePickerAmount} />
                <DiceBetValuePicker setDiceValue={setDiceValue} dicePickerValue={dicePickerValue} defaultValue={diceValue} />
              </>
            )}
          </View>
          {game.currentBet && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text variant="bodyLarge">
                {game.currentBet.better.userName} bet {game.currentBet.diceAmount} x
              </Text>
              <ValueDice value={game.currentBet.diceValue} size={20} />
            </View>
          )}
        </Dialog.Content>
        <Dialog.Actions style={{ flexDirection: "column" }}>
          {maxBet !== game.currentBet?.diceAmount * game.currentBet?.diceValue && (
            <Button
              mode="text"
              onPress={() => {
                connection.invoke(INVOKE_SET_BET, { gameName: game.gameName, better: currentUser, diceAmount: diceAmount, diceValue: diceValue });
                setBettingDialogVisible(false);
              }}
              title="Bet"
            />
          )}
          {game.currentBet && (
            <Button
              mode="text"
              onPress={() => {
                connection.invoke(INVOKE_CALL, currentUser);
                setBettingDialogVisible(false);
              }}
              title="Call"
            />
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default BettingDialog;

const styles = StyleSheet.create({});