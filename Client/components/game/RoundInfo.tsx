import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { getCurrentRound } from "../../utils/gameFunctions";
import { useGame } from "../../contexts/GameContext";
import ValueDice from "./assets/ValueDice";
import styled from "styled-components/native";

const RoundInfo = () => {
  const { game } = useGame();
  return (
    <>
      <Text variant="titleMedium" style={{ position: "absolute", top: "15%" }}>
        Round {getCurrentRound(game)}{" "}
      </Text>
      <View style={{ width: "50%" }}>
        {game.gameStarted && (
          <>
            {!game.roundStarted && !game.roundResult && (
              <>
                <Text style={{ textAlign: "center" }}>Waiting for all players to roll.</Text>
              </>
            )}
          </>
        )}
        {!game.roundStarted && game.roundResult && (
          <>
            <CenterText variant="bodySmall">
              {game.roundResult.gameBet.better.userName} bet {game.roundResult.gameBet.diceAmount} x{" "}
              <ValueDice value={game.roundResult.gameBet.diceValue} size={15} />
            </CenterText>
            <CenterText variant="bodySmall">{game.roundResult.caller} called!</CenterText>
            <CenterText variant="bodySmall">
              There were {game.roundResult.callResult} x <ValueDice value={game.roundResult.gameBet.diceValue} size={15} />
            </CenterText>
            <CenterText variant="bodySmall">{game.roundResult.roundWinner} won and will start the next round!</CenterText>
          </>
        )}
        {game.currentBet && (
          <CenterText variant="titleMedium">
            {game.currentBet.better.userName} bet {game.currentBet.diceAmount} x <ValueDice value={game.currentBet.diceValue} size={18} />
          </CenterText>
        )}
        {game.currentBetter && game.roundStarted && <Text style={{ textAlign: "center" }}>It's {game.currentBetter.userName} turn!</Text>}
      </View>
    </>
  );
};

export default RoundInfo;

const CenterText = styled(Text)`
  text-align: center;
`;
