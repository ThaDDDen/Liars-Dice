import { StyleSheet, View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { useTheme, Text } from "react-native-paper";

interface Props {
  label: string;
  value: number;
}

const PillBox = ({ label, value }: Props) => {
  const { colors } = useTheme();
  return (
    <PillContainer backgroundColor={colors.primaryContainer}>
      <Pill backgroundColor={colors.secondary}>
        <PillText>{label}</PillText>
      </Pill>
      <ValueText>{value}</ValueText>
    </PillContainer>
  );
};

export default PillBox;

const PillContainer = styled.View<{ backgroundColor: string }>`
  justify-content: space-between;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 4px 15px 4px 4px;
  flex-direction: row;
  border-radius: 15px;
  margin: 2.5px 0;
`;

const Pill = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 10px;
  padding: 2px 8px;
`;

const PillText = styled(Text)`
  font-family: "Manrope-Bold";
  font-size: 14px;
  letter-spacing: 0.75px;
`;

const ValueText = styled(Text)`
  font-family: "Manrope-Bold";
  font-size: 14px;
`;
