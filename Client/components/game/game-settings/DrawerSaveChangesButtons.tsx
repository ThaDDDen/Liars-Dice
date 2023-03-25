import React from "react";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../../contexts/ConnectionContext";
import { useGame } from "../../../contexts/GameContext";
import { User } from "../../../types/types";
import { INVOKE_UPDATE_GAME_SETTINGS } from "../../../utils/constants";

interface Props {
  players: User[];
  diceCount: number;
  playerCount: number;
  betTime: number;
  playOrderHasChanged: boolean;
  closeDrawer: () => void;
  resetSettings: () => void;
}

const DrawerSaveChangesButtons = ({ players, diceCount, playerCount, betTime, playOrderHasChanged, closeDrawer, resetSettings }: Props) => {
  const { colors } = useTheme();
  const { connection } = useConnection();
  const { game } = useGame();

  const updatePlayerOrder = () => {
    connection.invoke("UpdatePlayerOrder", players);
  };

  return (
    <ButtonContainer backgroundColor={colors.primaryContainer} borderColor={colors.secondary}>
      <LeftButton
        onPress={() => {
          connection.invoke(INVOKE_UPDATE_GAME_SETTINGS, {
            gameName: game.gameName,
            diceCount: diceCount,
            playerCount: playerCount,
            betTime: betTime,
          });
          if (playOrderHasChanged) {
            updatePlayerOrder();
          }
          closeDrawer();
        }}
      >
        <ButtonText disabled={false}>SAVE</ButtonText>
      </LeftButton>
      <RightButton
        buttonColor={colors.secondary}
        onPress={() => {
          closeDrawer();
          resetSettings();
        }}
      >
        <ButtonText disabled={false}>CANCEL</ButtonText>
      </RightButton>
    </ButtonContainer>
  );
};

export default DrawerSaveChangesButtons;

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
  margin-top: -10px;
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
