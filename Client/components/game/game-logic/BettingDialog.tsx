import React, { useEffect, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { Dialog, Portal, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../../contexts/ConnectionContext";
import { useGame } from "../../../contexts/GameContext";
import { initialUserState, useUser } from "../../../contexts/UserContext";
import { INVOKE_CALL, INVOKE_SET_BET } from "../../../utils/constants";
import DoubleButtons from "../../layout/DoubleButtons";
import CurrentBet from "../game-layout/CurrentBet";
import PillBox from "../game-layout/PillBox";
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
  const { colors } = useTheme();
  const [handWidth, setHandWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setHandWidth(event.nativeEvent.layout.width);
  };

  //BET VALUES AND AMOUNT
  const [diceAmount, setDiceAmount] = useState<number>(1);
  const [diceValue, setDiceValue] = useState<2 | 3 | 4 | 5 | 6>(2);

  const diceLeft = game.players.map((x) => x.gameProperties.dice.length).reduce((x, c) => x + c, 0);
  const maxBet = 6 * game.players.map((x) => x.gameProperties.dice.length).reduce((x, c) => x + c, 0);

  const handleBet = () => {
    setBettingDialogVisible(false);

    setGame((prev) => {
      return { ...prev, ...(prev.currentBetter = initialUserState) };
    });
    setBetTime(game.betTime);
    connection.invoke(INVOKE_SET_BET, { gameName: game.gameName, better: currentUser, diceAmount: diceAmount, diceValue: diceValue });
  };

  const handleCall = () => {
    setBettingDialogVisible(false);
    connection.invoke(INVOKE_CALL, currentUser);
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
  }, [game.currentBet]);

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
    if (game.currentBetter && betTime === 0 && game.currentBetter.userName === currentUser.userName) {
      if (game.currentBet.diceAmount === diceLeft && game.currentBet.diceValue === 6) {
        handleCall();
      } else {
        handleBet();
      }
    }
  }, [betTime]);

  console.log("rerender");
  return (
    <Portal>
      <BetDialog backgroundColor={colors.surface} visible={bettingDialogVisible}>
        <Header borderColor={colors.surface} backgroundColor={colors.primary}>
          <Text style={{ fontFamily: "Manrope-Bold", fontSize: 16 }}>IT&apos;S YOUR TURN</Text>
        </Header>

        <CurrentBetContainer backgroundColor={colors.primaryContainer}>
          {game.currentBet ? (
            <CurrentBet bet={game.currentBet} />
          ) : (
            <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 16 }}>You start betting this round!</Text>
          )}
        </CurrentBetContainer>

        {game.currentBet && (
          <PillBox label={`${game.currentBet.better.userName.toUpperCase()} DICE LEFT`} value={game.currentBet.better.gameProperties.dice.length} />
        )}

        <PillBox label="TOTAL DICE LEFT" value={diceLeft} />

        <PillBox label="TIME" value={betTime} />

        <ContentContainer onLayout={onLayout} backgroundColor={colors.primaryContainer}>
          <ContainerHeader backgroundColor={colors.secondary} borderColor={colors.primaryContainer}>
            <Text style={{ fontFamily: "Manrope-Bold", fontSize: 14 }}>YOUR HAND</Text>
          </ContainerHeader>
          <UserHand size={handWidth / 6.5} dice={currentUser.gameProperties.dice} />
        </ContentContainer>

        {maxBet !== game.currentBet?.diceAmount * game.currentBet?.diceValue && (
          <ContentContainer backgroundColor={colors.primaryContainer}>
            <ContainerHeader backgroundColor={colors.secondary} borderColor={colors.primaryContainer}>
              <Text style={{ fontFamily: "Manrope-Bold", fontSize: 14 }}>YOUR BET</Text>
            </ContainerHeader>

            <BetPickers game={game} diceValue={diceValue} setDiceValue={setDiceValue} diceAmount={diceAmount} setDiceAmount={setDiceAmount} />
          </ContentContainer>
        )}
        {maxBet === game.currentBet?.diceAmount * game.currentBet?.diceValue ? (
          <ButtonContainer onPress={() => handleCall()} backgroundColor={colors.primaryContainer} borderColor={colors.secondary}>
            <ButtonText>CALL</ButtonText>
          </ButtonContainer>
        ) : game.currentBet ? (
          <DoubleButtons
            leftButtonLabel={`BET ${diceAmount} x ${diceValue}`}
            leftButtonAction={handleBet}
            rightButtonLabel={"CALL"}
            rightButtonAction={handleCall}
          />
        ) : (
          <ButtonContainer onPress={() => handleBet()} backgroundColor={colors.primaryContainer} borderColor={colors.secondary}>
            <ButtonText>
              BET {diceAmount} x {diceValue}
            </ButtonText>
          </ButtonContainer>
        )}
      </BetDialog>
    </Portal>
  );
};

export default BettingDialog;

const Header = styled.View<{ backgroundColor: string; borderColor: string }>`
  position: absolute;
  top: -40px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  padding: 5px 15px;
  border-radius: 25px;
  margin: auto;
  align-self: center;
`;

const ContainerHeader = styled.View<{ backgroundColor: string; borderColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 5px 10px;
  border-radius: 25px;
  margin-top: -25px;
  margin-bottom: 10px;
  border-width: 3px;
  border-color: ${({ borderColor }) => borderColor};
`;

const ContentContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 5px;
  margin-top: 20px;
`;

const CurrentBetContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  flex-direction: row;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.Pressable<{ backgroundColor: string; borderColor: string }>`
  flex-direction: row;
  width: 50%;
  align-self: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-color: ${({ borderColor }) => borderColor};
  border-width: 3px;
  justify-content: space-evenly;
  border-radius: 25px;
  overflow: hidden;
  margin-bottom: -20px;
  margin-top: 10px;
  padding: 3px;
`;

const ButtonText = styled(Text)`
  font-family: "Manrope-SemiBold";
  font-size: 20px;
  letter-spacing: 1.5px;
  color: white;
`;

const BetDialog = styled(Dialog)<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 0 20px;
  border-radius: 15px;
  margin: 0 10px;
`;
