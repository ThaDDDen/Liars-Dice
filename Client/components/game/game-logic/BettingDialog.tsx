import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Dialog, Divider, Portal, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../../contexts/ConnectionContext";
import { useGame } from "../../../contexts/GameContext";
import { initialUserState, useUser } from "../../../contexts/UserContext";
import { diceValues, INVOKE_CALL, INVOKE_SET_BET, valuesToWords } from "../../../utils/constants";
import { getDiceAmountArray, getDiceValueArray } from "../../../utils/gameFunctions";
import Button from "../../layout/Button";
import ValueDice from "../game-assets/ValueDice";
import DiceBetAmountPicker from "./DiceBetAmountPicker";
import DiceBetValuePicker from "./DiceBetValuePicker";

interface Props {
  bettingDialogVisible: boolean;
  setBettingDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  betTime: number;
  setBetTime: React.Dispatch<React.SetStateAction<number>>;
}

const BettingDialog = ({ bettingDialogVisible, setBettingDialogVisible, betTime, setBetTime }: Props) => {
  const { game, setGame } = useGame();
  const { connection } = useConnection();
  const { currentUser } = useUser();
  const { colors } = useTheme();

  //BET VALUES AND AMOUNT
  const [diceAmount, setDiceAmount] = useState<number>(1);
  const [diceValue, setDiceValue] = useState<2 | 3 | 4 | 5 | 6>(2);

  //PICKER ARRAY VALUES AND AMOUNT
  const [dicePickerAmount, setDicePickerAmount] = useState<number[]>([]);
  const [dicePickerValue, setDicePickerValue] = useState<number[]>([]);

  const maxBet = 6 * game.players.map((x) => x.gameProperties.dice.length).reduce((x, c) => x + c, 0);

  const handleBet = () => {
    setGame((prev) => {
      return { ...prev, ...(prev.currentBetter = initialUserState) };
    });
    setBetTime(game.betTime);
    setBettingDialogVisible(false);
    connection.invoke(INVOKE_SET_BET, { gameName: game.gameName, better: currentUser, diceAmount: diceAmount, diceValue: diceValue });
  };

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

  // ---- IF SOMEONE LEAVES DURING ROUND STARTED CLOSE MODAL ----
  useEffect(() => {
    if (!game.roundStarted) setBettingDialogVisible(false);
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

  useEffect(() => {
    if (game.currentBetter && betTime === 0 && game.currentBetter.userName === currentUser.userName) handleBet();
  }, [betTime]);

  return (
    <Portal>
      <Dialog visible={bettingDialogVisible}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 40,
            justifyContent: "space-between",
            position: "absolute",
            left: 25,
            top: -10,
          }}
        >
          <MaterialCommunityIcons name="timer-outline" size={24} color={colors.primary} />

          <Text variant="titleLarge" style={{ color: betTime > 10 ? "green" : betTime > 5 ? "orange" : "red" }}>
            {betTime}
          </Text>
        </View>
        <Dialog.Title style={{ alignSelf: "center" }}>
          <Text>Your turn!</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Divider bold />
          <View>
            {game.currentBet ? (
              <CurrentBetInfo>
                <CurrentBet>
                  <Text variant="titleMedium">
                    {game.currentBet.better.userName} bet {game.currentBet.diceAmount} x{" "}
                  </Text>
                  <ValueDice value={game.currentBet.diceValue} size={22} />
                  <Text variant="bodyLarge">!</Text>
                </CurrentBet>
                <Text variant="bodyLarge">You can either raise their bet or call!</Text>
              </CurrentBetInfo>
            ) : (
              <CurrentBetInfo>
                <Text>You start the betting this round!</Text>
              </CurrentBetInfo>
            )}
          </View>
          <Divider bold />
          <BetContainer>
            {maxBet !== game.currentBet?.diceAmount * game.currentBet?.diceValue && (
              <PickerContainer>
                <View>
                  <PickerTitle>Dice</PickerTitle>
                  <DiceBetAmountPicker setDiceAmount={setDiceAmount} dicePickerAmount={dicePickerAmount} />
                </View>
                <Feather name="x" size={20} color={colors.onSurface} style={{ marginTop: 20 }} />
                <View>
                  <PickerTitle>Value</PickerTitle>
                  <DiceBetValuePicker setDiceValue={setDiceValue} dicePickerValue={dicePickerValue} defaultValue={diceValue} />
                </View>
              </PickerContainer>
            )}
          </BetContainer>
          <Divider bold />
        </Dialog.Content>

        <Dialog.Actions>
          {maxBet !== game.currentBet?.diceAmount * game.currentBet?.diceValue && (
            <Button
              mode="outlined"
              onPress={() => {
                handleBet();
              }}
              title={"Bet " + valuesToWords[diceAmount - 1] + " " + (diceAmount === 1 ? valuesToWords[diceValue - 1] : diceValues[diceValue - 2])}
              styles={{ marginRight: 10 }}
            />
          )}
          {game.currentBet && (
            <Button
              mode="contained"
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

const CurrentBetInfo = styled.View`
  border-radius: 5px;
  padding: 5px;
  align-items: center;
  margin-bottom: 5px;
`;

const CurrentBet = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BetContainer = styled.View`
  padding: 5px;
  margin-bottom: 5px;
`;

const PickerContainer = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 0 80px;
  justify-content: space-around;
`;

const PickerTitle = styled(Text)`
  align-self: center;
  margin-bottom: 5px;
`;
