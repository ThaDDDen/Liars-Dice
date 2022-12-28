import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import winner from "../../assets/images/winner.png";
import { useConnection } from "../../contexts/ConnectionContext";
import { useGame } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import UserAvatar from "../Lobby/UserAvatar";
import ValueDice from "./assets/ValueDice";

const RoundInfo = () => {
  const { game, setGame } = useGame();
  const { connection } = useConnection();
  const { currentUser } = useUser();

  const scaleInCurrentBetAnimation = useRef(new Animated.Value(0)).current;
  const scaleInCallAnimation = useRef(new Animated.Value(0)).current;
  const scaleInResultBetterAnimation = useRef(new Animated.Value(0)).current;
  const scaleInResultCallerAnimation = useRef(new Animated.Value(0)).current;
  const scaleInResultWinnerAnimation = useRef(new Animated.Value(0)).current;
  const scaleInWinnerAnimation = useRef(new Animated.Value(0)).current;
  const scaleInBannerAnimation = useRef(new Animated.Value(0)).current;

  const scaleInCurrentBet = () => {
    Animated.timing(scaleInCurrentBetAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const scaleInWinner = () => {
    Animated.sequence([
      Animated.timing(scaleInWinnerAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(scaleInBannerAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const scaleInCall = () => {
    Animated.sequence([
      Animated.timing(scaleInCallAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.delay(500),
      Animated.timing(scaleInResultBetterAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.delay(500),
      Animated.timing(scaleInResultCallerAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.delay(800),
      Animated.timing(scaleInResultWinnerAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    scaleInCurrentBetAnimation.setValue(0);
    scaleInCurrentBet();
  }, [game]);

  useEffect(() => {
    if (game.roundResult.round !== 0) {
      scaleInCallAnimation.setValue(0);
      scaleInResultBetterAnimation.setValue(0);
      scaleInResultCallerAnimation.setValue(0);
      scaleInResultWinnerAnimation.setValue(0);
      scaleInCall();
    }
  }, [game.roundResult.round]);

  useEffect(() => {
    if (game.gameOver) scaleInWinner();
  }, [game]);

  return (
    <>
      {game.gameOver ? (
        <View>
          <Animated.View style={{ transform: [{ scale: scaleInWinnerAnimation }], alignSelf: "center" }}>
            <UserAvatar avatarCode={game.roundResult.roundWinner.avatarCode} size={200} />
          </Animated.View>

          <WinnerBanner
            source={winner}
            style={{ transform: [{ scale: scaleInBannerAnimation }], alignSelf: "center", position: "absolute", bottom: -45 }}
          />
        </View>
      ) : (
        <>
          <Text variant="titleMedium" style={{ position: "absolute", top: "15%" }}>
            Round {game.round}
          </Text>
          <View
            style={{
              width: "50%",
              overflow: "hidden",
            }}
          >
            {!game.roundStarted && game.roundResult.round !== 0 && (
              <View>
                <Animated.View style={{ transform: [{ scale: scaleInCallAnimation }] }}>
                  <CenterText variant="bodyMedium">CALL!</CenterText>
                </Animated.View>
                <Animated.View style={{ transform: [{ scale: scaleInResultBetterAnimation }] }}>
                  <CenterText variant="bodySmall">
                    {game.roundResult.gameBet.better.userName} bet {game.roundResult.gameBet.diceAmount} x{" "}
                    <ValueDice value={game.roundResult.gameBet.diceValue} size={15} />
                  </CenterText>
                </Animated.View>
                <Animated.View style={{ transform: [{ scale: scaleInResultCallerAnimation }] }}>
                  <CenterText variant="bodySmall">{game.roundResult.caller} called!</CenterText>
                </Animated.View>
                <Animated.View style={{ transform: [{ scale: scaleInResultWinnerAnimation }] }}>
                  <CenterText variant="bodySmall">
                    There were {game.roundResult.callResult} x <ValueDice value={game.roundResult.gameBet.diceValue} size={15} />
                  </CenterText>
                  <CenterText variant="bodySmall">{game.roundResult.roundWinner.userName} wins and will start the next round!</CenterText>
                </Animated.View>
              </View>
            )}
            {game.gameStarted && (
              <>
                {!game.roundStarted && game.roundResult.round !== game.round && (
                  <>
                    <Text variant="bodySmall" style={{ textAlign: "center", marginTop: 10 }}>
                      Waiting for all players to roll.
                    </Text>
                  </>
                )}
              </>
            )}
            {game.currentBet && (
              <>
                <Animated.View style={{ transform: [{ scale: scaleInCurrentBetAnimation }] }}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <UserAvatar avatarCode={game.currentBet.better.avatarCode} size={20} />
                    <CenterText style={{ marginLeft: 5 }} variant="titleMedium">
                      {game.currentBet.better.userName}
                    </CenterText>
                  </View>
                  <View>
                    <CenterText>bet</CenterText>
                    <CenterText variant="titleMedium">
                      {game.currentBet.diceAmount} x <ValueDice value={game.currentBet.diceValue} size={18} />
                    </CenterText>
                  </View>
                </Animated.View>
              </>
            )}
            {game.currentBetter && game.roundStarted && (
              <Text style={{ textAlign: "center", marginTop: 10 }}>It's {game.currentBetter.userName}'s turn!</Text>
            )}
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

const WinnerBanner = styled(Animated.Image)`
  height: 40%;
  resize-mode: contain;
`;
