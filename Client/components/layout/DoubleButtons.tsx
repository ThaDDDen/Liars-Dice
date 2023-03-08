import React from "react";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";
import styled from "styled-components/native";

interface Props {
  leftButtonLabel: string;
  leftButtonAction: () => void;
  rightButtonLabel: string;
  rightButtonAction: () => void;
  disableRightButton?: boolean;
  disableLeftButton?: boolean;
}

const DoubleButtons = ({ leftButtonLabel, leftButtonAction, rightButtonLabel, rightButtonAction, disableLeftButton, disableRightButton }: Props) => {
  const { colors } = useTheme();

  return (
    <ButtonContainer backgroundColor={colors.primaryContainer} borderColor={colors.secondary}>
      <LeftButton onPress={() => leftButtonAction()}>
        <ButtonText disabled={false}>{leftButtonLabel}</ButtonText>
      </LeftButton>
      <RightButton buttonColor={colors.secondary} disabled={disableRightButton} onPress={() => rightButtonAction()}>
        <ButtonText disabled={disableRightButton ? disableRightButton : false}>{rightButtonLabel}</ButtonText>
      </RightButton>
    </ButtonContainer>
  );
};

export default DoubleButtons;

const ButtonContainer = styled.View<{ backgroundColor: string; borderColor: string }>`
  flex-direction: row;
  width: 80%;
  align-self: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-color: ${({ borderColor }) => borderColor};
  border-width: 3px;
  justify-content: space-evenly;
  border-radius: 25px;
  overflow: hidden;
  margin-bottom: -20px;
`;

const LeftButton = styled.Pressable`
  width: 50%;
  align-items: center;
  padding: 3px 0;
`;

const RightButton = styled.Pressable<{ buttonColor: string }>`
  background-color: ${({ buttonColor }) => buttonColor};
  width: 50%;
  align-items: center;
  border-bottom-left-radius: 14px;
  padding: 3px 0;
`;

const ButtonText = styled(Text)<{ disabled: boolean }>`
  font-family: "Manrope-SemiBold";
  font-size: 20px;
  letter-spacing: 1.5px;
  color: ${({ disabled }) => (disabled ? "grey" : "white")};
`;
