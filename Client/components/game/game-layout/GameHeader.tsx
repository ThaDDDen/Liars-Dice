import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { Dialog, IconButton, Paragraph, Portal, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../../contexts/ConnectionContext";
import { useGame } from "../../../contexts/GameContext";
import { useSnackBar } from "../../../contexts/SnackContext";
import { useUser } from "../../../contexts/UserContext";
import { INVOKE_START_GAME, INVOKE_UPDATE_GAME_SETTINGS } from "../../../utils/constants";
import Button from "../../layout/Button";
import OrangeDice from "../game-assets/OrangeDice";

interface Props {
  openChatModal: () => void;
}

const GameHeader = ({ openChatModal }: Props) => {
  const { game, setGame } = useGame();
  const { currentUser, setCurrentUser, setGameMessages } = useUser();
  const { setResponseMessage } = useSnackBar();
  const { connection } = useConnection();
  const [tableNotFullDialogVisible, setTableNotFullDialogVisible] = useState(false);
  const [gameHostPanelVisible, setGameHostPanelVisible] = useState(false);
  const [leaveDialogVisible, setLeaveDialogVisible] = useState(false);
  const navigation = useNavigation();

  const startGame = () => {
    if (game.players.length === 1) {
      setResponseMessage({ status: "Error", message: "You can't play with yourself!" });
      return;
    }
    if (game.playerCount !== game.players.length) {
      setTableNotFullDialogVisible(true);
    } else {
      connection.invoke(INVOKE_START_GAME, currentUser);
    }
  };

  const reduceSeatsAndStart = () => {
    connection.invoke(INVOKE_UPDATE_GAME_SETTINGS, {
      gameName: game.gameName,
      diceCount: game.diceCount,
      playerCount: game.players.length,
      betTime: game.betTime,
    });
    connection.invoke(INVOKE_START_GAME, currentUser);
    setTableNotFullDialogVisible(false);
  };

  return (
    <>
      <View>
        <GameHeaderContainer>
          <Text variant="headlineSmall">{game.gameName}</Text>
          <ButtonContainer>
            <IconButton icon="chat-outline" onPress={() => openChatModal()} style={{ margin: 0 }} />
            {currentUser.gameProperties.gameHost && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton iconColor={game.gameStarted ? "green" : undefined} icon="play" onPress={startGame} style={{ margin: 0 }} />
              </View>
            )}
            <OrangeDice size={"medium"} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
          </ButtonContainer>
        </GameHeaderContainer>
      </View>
      <Portal>
        <Dialog visible={tableNotFullDialogVisible}>
          <Dialog.Title>Table is not full!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              You are trying to start the game before all seats are taken. Would you like to reduce the amount of seats and start the game?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={{ flexDirection: "column" }}>
            <Button mode="text" onPress={() => reduceSeatsAndStart()} title="Reduce seats and start!" />
            <Button mode="text" onPress={() => setTableNotFullDialogVisible(false)} title="Wait for more players!" />
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* TODO: The following button has moved to drawer. Also move the dialog */}

      {/* <Portal>
        <Dialog visible={leaveDialogVisible}>
          <Dialog.Title>You're about to leave!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to leave the game?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={{ flexDirection: "column" }}>
            <Button
              mode="text"
              onPress={() => {
                setGame(initialGameState);
                setGameMessages([]);
                setCurrentUser({ ...currentUser, gameProperties: INITIAL_GAME_PROPERTIES });
                currentUser.gameProperties.gameHost = false;
                connection.invoke(INVOKE_LEAVE_GAME, currentUser);
              }}
              title="Chicken out and leave! 🐥"
            />
            <Button mode="text" onPress={() => setLeaveDialogVisible(false)} title="No, I want to play!" />
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
    </>
  );
};

export default GameHeader;

const GameHeaderContainer = styled(Surface)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-radius: 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const GameSettingsContainer = styled.View`
  position: absolute;
  width: 100%;
  top: 55px;
  z-index: 5;
`;
