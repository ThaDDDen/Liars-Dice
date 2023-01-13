import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../../contexts/ConnectionContext";
import { initialGameState, useGame } from "../../../contexts/GameContext";
import { useSound } from "../../../contexts/SoundContext";
import { useUser } from "../../../contexts/UserContext";
import { INITIAL_GAME_PROPERTIES, INVOKE_LEAVE_GAME } from "../../../utils/constants";
import Button from "../../layout/Button";
import WinnerSvg from "../../layout/WinnerSvg";
import UserAvatar from "../../Lobby/UserAvatar";
import ValueDice from "../game-assets/ValueDice";

const RoundInfo = () => {
  const { game } = useGame();
  const { colors } = useTheme();
  const { playWinnerSound } = useSound();
  const { connection } = useConnection();
  const { currentUser, setGameMessages, setCurrentUser } = useUser();
  const { setGame } = useGame();
  const scaleInCurrentBetAnimation = useRef(new Animated.Value(0)).current;
  const scaleInCallAnimation = useRef(new Animated.Value(0)).current;
  const scaleInResultBetterAnimation = useRef(new Animated.Value(0)).current;
  const scaleInResultCallerAnimation = useRef(new Animated.Value(0)).current;
  const scaleInResultWinnerAnimation = useRef(new Animated.Value(0)).current;
  const scaleInWinnerAnimation = useRef(new Animated.Value(0)).current;
  const scaleInBannerAnimation = useRef(new Animated.Value(0)).current;

  const scaleInGameResultAnimation = useRef(new Animated.Value(0)).current;
  const scaleHightLastGameResultAnimation = useRef(new Animated.Value(0)).current;
  const scaleLastGameResultTextAnimation = useRef(new Animated.Value(0)).current;

  const scaleInCurrentBet = () => {
    Animated.timing(scaleInCurrentBetAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const scaleInWinner = () => {
    Animated.sequence([
      Animated.delay(1800),
      Animated.timing(scaleInWinnerAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.delay(400),
      Animated.timing(scaleInBannerAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(scaleInGameResultAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(scaleHightLastGameResultAnimation, {
        toValue: 100,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(scaleLastGameResultTextAnimation, {
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
    if (game.gameOver) {
      playWinnerSound();
      scaleInWinner();
    }
  }, [game]);

  return (
    <>
      {game.gameOver ? (
        <View>
          <WinnerAvatar style={{ transform: [{ scale: scaleInWinnerAnimation }] }}>
            <UserAvatar avatarCode={game.roundResult.roundWinner.avatarCode} size={200} />
          </WinnerAvatar>

          <BannerContainer style={{ transform: [{ scale: scaleInBannerAnimation }] }}>
            <WinnerSvg svgColor={colors.primary} />
          </BannerContainer>
          <GameResultContainer
            backgroundColor={colors.surface}
            borderColor={colors.primaryContainer}
            style={{ minHeight: scaleHightLastGameResultAnimation, transform: [{ scale: scaleInGameResultAnimation }] }}
          >
            <GameResultText style={{ transform: [{ scale: scaleLastGameResultTextAnimation }] }}>
              <CenterText variant="bodySmall">
                {game.roundResult.gameBet.better.userName} bet {game.roundResult.gameBet.diceAmount} x{" "}
                <ValueDice value={game.roundResult.gameBet.diceValue} size={15} />
              </CenterText>
              <CenterText variant="bodySmall">{game.roundResult.caller} called!</CenterText>
              <CenterText variant="bodySmall">
                There were {game.roundResult.callResult} x <ValueDice value={game.roundResult.gameBet.diceValue} size={15} />
              </CenterText>
              <CenterText variant="bodySmall" style={{ marginTop: 10 }}>
                {game.roundResult.roundWinner.userName} wins the game! 🎉
              </CenterText>
              <Button
                toLower
                compact
                title="Leave Game"
                mode="text"
                onPress={() => {
                  setGame(initialGameState);
                  setGameMessages([]);
                  setCurrentUser({ ...currentUser, gameProperties: INITIAL_GAME_PROPERTIES });
                  connection.invoke(INVOKE_LEAVE_GAME, currentUser);
                }}
              />
            </GameResultText>
          </GameResultContainer>
        </View>
      ) : (
        <>
          <Round>Round {game.round}</Round>
          <RoundInfoContainer>
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
          </RoundInfoContainer>
        </>
      )}
    </>
  );
};

export default RoundInfo;

const CenterText = styled(Text)`
  text-align: center;
`;

const WinnerAvatar = styled(Animated.View)`
  align-self: center;
`;

const BannerContainer = styled(Animated.View)`
  z-index: 500;
  align-self: center;
  position: absolute;
  bottom: -45px;
  height: 100px;
  width: 100%;
`;

const GameResultContainer = styled(Animated.View)<{ backgroundColor: string; borderColor: string }>`
  position: absolute;
  top: 170px;
  min-width: 170px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-width: 2px;
  border-color: ${({ borderColor }) => borderColor};
  align-self: center;
  border-radius: 10px;
  padding: 10px;
`;

const GameResultText = styled(Animated.View)`
  margin-top: 40px;
`;

const Round = styled(Text)`
  position: absolute;
  top: 15%;
`;

const RoundInfoContainer = styled.View`
  width: 50%;
`;
