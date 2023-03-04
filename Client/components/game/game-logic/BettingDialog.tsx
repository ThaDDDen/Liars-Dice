import React, { useEffect, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";
import { useConnection } from "../../../contexts/ConnectionContext";
import { useGame } from "../../../contexts/GameContext";
import { initialUserState, useUser } from "../../../contexts/UserContext";
import { INVOKE_CALL, INVOKE_SET_BET } from "../../../utils/constants";
import Button from "../../layout/Button";
import OldContetCard from "../../layout/OldContentCard";
import CurrentBet from "../game-layout/CurrentBet";
import UserHand from "../game-layout/UserHand";
import BetPickers from "./BetPickers";

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
  const [handWidth, setHandWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setHandWidth(event.nativeEvent.layout.width);
  };

  //BET VALUES AND AMOUNT
  const [diceAmount, setDiceAmount] = useState<number>(1);
  const [diceValue, setDiceValue] = useState<2 | 3 | 4 | 5 | 6>(2);

  const maxBet = 6 * game.players.map((x) => x.gameProperties.dice.length).reduce((x, c) => x + c, 0);

  const handleBet = () => {
    setGame((prev) => {
      return { ...prev, ...(prev.currentBetter = initialUserState) };
    });
    setBetTime(game.betTime);
    setBettingDialogVisible(false);
    connection.invoke(INVOKE_SET_BET, { gameName: game.gameName, better: currentUser, diceAmount: diceAmount, diceValue: diceValue });
  };

  const handleCall = () => {
    connection.invoke(INVOKE_CALL, currentUser);
    setBettingDialogVisible(false);
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
    // if someone leaves mid-round
    if (!game.roundStarted) setBettingDialogVisible(false);
  }, [game]);

  // ------ SET ALLOWED DICE VALUE PICKER ARRAY ------
  useEffect(() => {
    if (game.currentBet) {
      if (diceAmount === game.currentBet.diceAmount) {
        if (diceValue <= game.currentBet.diceValue) {
          setDiceValue((game.currentBet.diceValue + 1) as 2 | 3 | 4 | 5 | 6);
        }
      }
    }
  }, [diceAmount]);

  useEffect(() => {
    if (game.currentBetter && betTime === 0 && game.currentBetter.userName === currentUser.userName) handleBet();
  }, [betTime]);

  return (
    <Portal>
      <Dialog visible={bettingDialogVisible} style={{ borderRadius: 5, marginHorizontal: 10 }}>
        <Dialog.Title style={{ alignSelf: "center", marginTop: 10, marginBottom: 0 }}>
          <Text variant="titleMedium">{game.currentBet ? "Your turn!" : "You start betting this round!"}</Text>
        </Dialog.Title>
        <Dialog.Content>
          <View>
            {game.currentBet && <CurrentBet bet={game.currentBet} />}
            <OldContetCard title="Your bet">
              {maxBet !== game.currentBet?.diceAmount * game.currentBet?.diceValue && (
                <BetPickers game={game} diceValue={diceValue} setDiceValue={setDiceValue} diceAmount={diceAmount} setDiceAmount={setDiceAmount} />
              )}
              <View style={{ flexDirection: "row" }}>
                {maxBet !== game.currentBet?.diceAmount * game.currentBet?.diceValue && (
                  <Button mode="outlined" onPress={() => handleBet()} title={`Bet ${diceAmount} x ${diceValue}`} />
                )}
                {game.currentBet && <Button mode="contained" onPress={() => handleCall()} title="Call" />}
              </View>
            </OldContetCard>

            <OldContetCard title="Your hand">
              <View onLayout={onLayout}>
                <UserHand size={handWidth / 6} dice={currentUser.gameProperties.dice} />
              </View>
            </OldContetCard>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default BettingDialog;
