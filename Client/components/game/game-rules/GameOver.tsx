import React from "react";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";

const GameOver = () => {
  const { colors } = useTheme();
  return (
    <Container backgroundColor={colors.primary}>
      <Text variant="displaySmall" style={{ fontFamily: "Manrope-SemiBold" }}>
        Game Over
      </Text>
      <Text variant="bodyLarge" style={{ fontFamily: "Manrope-SemiBold", marginTop: 20, textAlign: "center" }}>
        The winner is the last player standing with dice left!
      </Text>
    </Container>
  );
};

export default GameOver;

const Container = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;
