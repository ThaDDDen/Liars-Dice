import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import ContentCard from "../../layout/ContentCard";
import BetTimeSlider from "../game-settings/BetTimeSlider";
import DicePicker from "../game-settings/DicePicker";

const Customize = () => {
  const { colors } = useTheme();
  return (
    <Container backgroundColor={colors.secondary}>
      <Text variant="displaySmall" style={{ fontFamily: "Manrope-SemiBold", textAlign: "center" }}>
        Customize your game!
      </Text>
      <Text variant="bodyLarge" style={{ fontFamily: "Manrope-SemiBold", marginVertical: 20, textAlign: "center" }}>
        When creating a new game you can customize the game rules! You can change the amount of dice each player start with and how many seconds
        players have to make a decision.
      </Text>
      <View style={{ width: "100%", marginBottom: 10 }}>
        <ContentCard compact borderColor={colors.primaryContainer} label="Betting time">
          <BetTimeSlider betTime={45} />
        </ContentCard>
      </View>

      <ContentCard compact borderColor={colors.primaryContainer} label="Dice count">
        <DicePicker diceAmount={4} />
      </ContentCard>
    </Container>
  );
};

export default Customize;

const Container = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;
