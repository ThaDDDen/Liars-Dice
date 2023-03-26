import React from "react";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";
import styled from "styled-components/native";

interface Props {
  title: string;
  content: React.ReactNode;
}

const DrawerContentCard = ({ title, content }: Props) => {
  const { colors } = useTheme();

  return (
    <ContentContainer backgroundColor={colors.primaryContainer} style={{ marginTop: 10 }}>
      <ContainerHeader backgroundColor={colors.secondary} borderColor={colors.primaryContainer}>
        <Text style={{ fontFamily: "Manrope-Bold", fontSize: 14, color: colors.onPrimary, textTransform: "uppercase" }}>{title}</Text>
      </ContainerHeader>
      {content}
    </ContentContainer>
  );
};

export default DrawerContentCard;

const ContentContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ContainerHeader = styled.View<{ backgroundColor: string; borderColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 2px 10px;
  border-radius: 25px;
  margin-top: -20px;
  margin-left: 10px;
  margin-bottom: 10px;
  border-width: 3px;
  border-color: ${({ borderColor }) => borderColor};
  margin-right: auto;
`;
