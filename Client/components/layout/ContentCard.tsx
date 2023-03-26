import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { StyleProps } from "react-native-reanimated";
import styled from "styled-components/native";

interface Props {
  label?: string;
  children: React.ReactNode;
  borderColor: string;
  compact?: boolean;
  styles?: StyleProp<ViewStyle>;
}

const ContentCard = ({ label, children, compact, borderColor, styles }: Props) => {
  const { colors } = useTheme();
  return (
    <Container style={styles} backgroundColor={colors.primaryContainer} compact={compact ? compact : false}>
      <LabelBox compact={compact ? compact : false} background={colors.secondary} borderColor={borderColor}>
        <Text style={{ fontFamily: "Manrope-Bold" }} variant={compact ? "labelSmall" : "labelMedium"}>
          {label?.toUpperCase()}
        </Text>
      </LabelBox>
      {children}
    </Container>
  );
};

export default ContentCard;

const Container = styled.View<{ backgroundColor: string; compact: boolean }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ compact }) => (compact ? "10px" : "25px 10px 10px 10px")};
  border-radius: ${({ compact }) => (compact ? "10px" : "15px")};
  margin: ${({ compact }) => (compact ? "10px 10px" : "20px 10px")};
`;

const LabelBox = styled.View<{ background: string; borderColor: string; compact: boolean }>`
  background-color: ${({ background }) => background};
  justify-content: center;
  padding: ${({ compact }) => (compact ? "2.5px 7.5px" : "2.5px 5px")};
  flex-direction: row;
  position: absolute;
  border-radius: 50px;
  border-width: ${({ compact }) => (compact ? "3px" : "3px")};
  border-style: solid;
  border-color: ${({ borderColor }) => borderColor};
  top: -12px;
  left: 15px;
`;
