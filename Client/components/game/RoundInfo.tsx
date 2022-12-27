import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { initialGameState, useGame } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import { INVOKE_LEAVE_GAME } from "../../utils/constants";
import Button from "../layout/Button";
import UserAvatar from "../Lobby/UserAvatar";
import ValueDice from "./assets/ValueDice";

const RoundInfo = () => {
  const { game, setGame } = useGame();
  const { connection } = useConnection();
  const { currentUser } = useUser();
  return (
    <>
      {game.gameOver ? (
        <View>
          <UserAvatar avatarCode={game.roundResult.roundWinner.avatarCode} size={200} />
          <Button
            title="Leave game"
            mode="contained"
            onPress={() => {
              setGame(initialGameState);
              currentUser.gameHost = false;
              connection.invoke(INVOKE_LEAVE_GAME, currentUser);
            }}
          />
        </View>
      ) : (
        <>
          <Text variant="titleMedium" style={{ position: "absolute", top: "15%" }}>
            Round {game.round}
          </Text>
          <View style={{ width: "50%" }}>
            {!game.roundStarted && game.roundResult.round !== 0 && (
              <>
                <CenterText variant="bodySmall">
                  {game.roundResult.gameBet.better.userName} bet {game.roundResult.gameBet.diceAmount} x{" "}
                  <ValueDice value={game.roundResult.gameBet.diceValue} size={15} />
                </CenterText>
                <CenterText variant="bodySmall">{game.roundResult.caller} called!</CenterText>
                <CenterText variant="bodySmall">
                  There were {game.roundResult.callResult} x <ValueDice value={game.roundResult.gameBet.diceValue} size={15} />
                </CenterText>
                <CenterText variant="bodySmall">{game.roundResult.roundWinner.userName} won and will start the next round!</CenterText>
              </>
            )}
            {game.gameStarted && (
              <>
                {!game.roundStarted && game.roundResult.round !== game.round && (
                  <>
                    <Text variant="bodySmall" style={{ textAlign: "center" }}>
                      Waiting for all players to roll.
                    </Text>
                  </>
                )}
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
      )}
    </>
  );
};

export default RoundInfo;

const CenterText = styled(Text)`
  text-align: center;
`;
