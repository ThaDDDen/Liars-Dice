import React, { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useUser } from "../../../contexts/UserContext";
import DoubleButtons from "../../layout/DoubleButtons";
import CurrentBet from "../game-layout/CurrentBet";
import PillBox from "../game-layout/PillBox";
import UserHand from "../game-layout/UserHand";
import BetPickers from "../game-logic/BetPickers";

const RaiseCall = () => {
  const { colors } = useTheme();
  const { currentUser } = useUser();

  const [handWidth, setHandWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setHandWidth(event.nativeEvent.layout.width);
  };

  return (
    <Container backgroundColor={colors.primary}>
      <Text variant="displaySmall" style={{ fontFamily: "Manrope-SemiBold" }}>
        Raise or Call
      </Text>
      <Text variant="bodyLarge" style={{ fontFamily: "Manrope-SemiBold", marginVertical: 10, textAlign: "center" }}>
        Every next player has to either raise or call the previous bet!
      </Text>
      <View style={{ backgroundColor: colors.secondary, paddingHorizontal: 20, width: "100%", borderRadius: 15 }}>
        <CurrentBetContainer backgroundColor={colors.primaryContainer}>
          <CurrentBet bet={{ gameName: "Götes Game", better: currentUser, diceAmount: 1, diceValue: 4 }} />
        </CurrentBetContainer>

        <PillBox label={`${currentUser.userName.toUpperCase()} DICE LEFT`} value={6} />

        <PillBox label="TOTAL DICE LEFT" value={10} />

        <PillBox label="TIME" value={26} />
        <ContentContainer onLayout={onLayout} backgroundColor={colors.primaryContainer}>
          <ContainerHeader backgroundColor={colors.secondary} borderColor={colors.primaryContainer}>
            <Text style={{ fontFamily: "Manrope-Bold", fontSize: 14 }}>YOUR HAND</Text>
          </ContainerHeader>
          <UserHand size={handWidth / 6.5} dice={[1, 4, 5, 1]} />
        </ContentContainer>

        <ContentContainer backgroundColor={colors.primaryContainer}>
          <ContainerHeader backgroundColor={colors.secondary} borderColor={colors.primaryContainer}>
            <Text style={{ fontFamily: "Manrope-Bold", fontSize: 14 }}>YOUR BET</Text>
          </ContainerHeader>

          <BetPickers diceValue={5} diceAmount={2} />
        </ContentContainer>

        <DoubleButtons
          leftButtonLabel={`BET ${2} x ${5}`}
          leftButtonAction={() => console.log}
          rightButtonLabel={"CALL"}
          rightButtonAction={() => console.log}
        />
      </View>
    </Container>
  );
};

export default RaiseCall;

const Container = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 100%;
  align-items: center;
  padding: 30px;
`;

const CurrentBetContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  flex-direction: row;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const ContentContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 5px;
  margin-top: 20px;
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
