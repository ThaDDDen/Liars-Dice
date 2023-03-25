import React, { ReactNode } from "react";
import { View } from "react-native";
import { Dialog, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import DoubleButtons from "./DoubleButtons";

interface Props {
  visible: boolean;
  headerLabel: string;
  topContent?: ReactNode;
  content: ReactNode;
  leftButtonLabel: string;
  leftButtonAction: () => void;
  rightButtonLabel: string;
  rightButtonAction: () => void;
}

const CustomDialog = ({
  visible,
  headerLabel,
  leftButtonLabel,
  topContent,
  content,
  leftButtonAction,
  rightButtonLabel,
  rightButtonAction,
}: Props) => {
  const { colors } = useTheme();
  return (
    <Dialog visible={visible} style={{ backgroundColor: colors.surface, borderRadius: 15 }}>
      <LabelBox compact={false} background={colors.primary} borderColor={colors.surface}>
        <Text variant="labelMedium">{headerLabel}</Text>
      </LabelBox>
      <View style={{ marginTop: 30, marginBottom: 10 }}>
        {topContent && <ContentContainer backgroundColor={colors.primaryContainer}>{topContent}</ContentContainer>}
        <ContentContainer backgroundColor={colors.primaryContainer}>{content}</ContentContainer>
      </View>
      <DoubleButtons
        leftButtonLabel={leftButtonLabel}
        leftButtonAction={leftButtonAction}
        rightButtonLabel={rightButtonLabel}
        rightButtonAction={rightButtonAction}
      />
    </Dialog>
  );
};

export default CustomDialog;

const LabelBox = styled.View<{ background: string; borderColor: string; compact: boolean }>`
  background-color: ${({ background }) => background};
  justify-content: center;
  padding: ${({ compact }) => (compact ? "2.5px 7.5px" : "10px 10px 5px 10px")};
  flex-direction: row;
  position: absolute;
  border-radius: 50px;
  border-width: ${({ compact }) => (compact ? "3px" : "3px")};
  border-style: solid;
  border-color: ${({ borderColor }) => borderColor};
  top: -45px;
  align-self: center;
`;

const ContentContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin: 0px 10px 10px 10px;
  padding: 5px;
  border-radius: 10px;
  align-items: center;
`;
