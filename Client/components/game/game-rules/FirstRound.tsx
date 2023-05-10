import React, { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import UserHand from "../game-layout/UserHand";
import BetPickers from "../game-logic/BetPickers";

const FirstRound = () => {
  const { colors } = useTheme();
  const [handWidth, setHandWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setHandWidth(event.nativeEvent.layout.width);
  };
  return (
    <Container backgroundColor={colors.surface}>
      <Text variant="displaySmall" style={{ fontFamily: "Manrope-SemiBold" }}>
        First round
      </Text>
      <Text variant="bodyLarge" style={{ fontFamily: "Manrope-SemiBold", marginVertical: 10, textAlign: "center" }}>
        When the game host starts the game all players gets to roll their dice. Then a random player gets selected to start betting!
      </Text>
      <View style={{ backgroundColor: colors.secondary, paddingHorizontal: 20, width: "100%", borderRadius: 15, marginHorizontal: 10 }}>
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

          <BetPickers diceValue={4} diceAmount={1} />
        </ContentContainer>

        <ButtonContainer onPress={() => console.log()} backgroundColor={colors.primaryContainer} borderColor={colors.secondary}>
          <ButtonText>
            BET {1} x {4}
          </ButtonText>
        </ButtonContainer>
      </View>
    </Container>
  );
};

export default FirstRound;

const Container = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 30px;
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
