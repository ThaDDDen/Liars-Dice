import React from "react";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";

const JokerStraights = () => {
  const { colors } = useTheme();
  return (
    <Container backgroundColor={colors.surface}>
      <Text variant="displaySmall" style={{ fontFamily: "Manrope-SemiBold" }}>
        Jokers & Straights
      </Text>
      <Text variant="bodyLarge" style={{ fontFamily: "Manrope-SemiBold", marginTop: 20, textAlign: "center" }}>
        Ones are considered jokers! When a call is made all the ones are counted as the called value!
      </Text>
      <Text variant="bodyLarge" style={{ fontFamily: "Manrope-SemiBold", textAlign: "center" }}>
        When a player rolls a straight all their dice are recognized as jokers!
      </Text>
      <Text variant="bodyLarge" style={{ fontFamily: "Manrope-SemiBold", textAlign: "center" }}>
        A straight must start with one, include the entire hand and be at least 3 dice. For example, 2-3-4-5 is not a valid straight when a player has
        four dice left but 1-2-3-4 is a valid straight!
      </Text>
    </Container>
  );
};

export default JokerStraights;

const Container = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;
