import React, { useState } from "react";
import { View } from "react-native";
import { Dialog, IconButton, Paragraph, Portal, Surface, Text, Tooltip } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { initialGameState, useGame } from "../../contexts/GameContext";
import { useSnackBar } from "../../contexts/SnackContext";
import { useUser } from "../../contexts/UserContext";
import { INVOKE_LEAVE_GAME, INVOKE_START_GAME, INVOKE_UPDATE_GAME_SETTINGS } from "../../utils/constants";
import Button from "../layout/Button";
import ContentCard from "../layout/ContentCard";
import GameHostPanel from "./GameHostPanel";

interface Props {
  openChatModal: () => void;
}

const GameHeader = ({ openChatModal }: Props) => {
  const { game, setGame } = useGame();
  const { currentUser } = useUser();
  const { setResponseMessage } = useSnackBar();
  const { connection } = useConnection();
  const [tableNotFullDialogVisible, setTableNotFullDialogVisible] = useState(false);
  const [gameHostPanelVisible, setGameHostPanelVisible] = useState(false);
  const [leaveDialogVisible, setLeaveDialogVisible] = useState(false);

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
    connection.invoke(INVOKE_UPDATE_GAME_SETTINGS, { gameName: game.gameName, diceCount: game.diceCount, playerCount: game.players.length });
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
            <IconButton icon="exit-to-app" onPress={() => setLeaveDialogVisible(true)} />
            {currentUser.gameHost && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton iconColor={game.gameStarted ? "green" : undefined} icon="play" onPress={startGame} style={{ margin: 0 }} />
                {game.gameStarted ? (
                  <Tooltip title="You cannot change settings when game has started!">
                    <IconButton disabled icon="cog" onPress={() => setGameHostPanelVisible((prev) => !prev)} style={{ margin: 0 }} />
                  </Tooltip>
                ) : (
                  <IconButton disabled={game.gameStarted} icon="cog" onPress={() => setGameHostPanelVisible((prev) => !prev)} style={{ margin: 0 }} />
                )}
              </View>
            )}
          </ButtonContainer>
        </GameHeaderContainer>
        {gameHostPanelVisible && (
          <GameSettingsContainer>
            <ContentCard title="Game settings">
              <GameHostPanel setGameHostPanelVisible={setGameHostPanelVisible} />
            </ContentCard>
          </GameSettingsContainer>
        )}
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
      <Portal>
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
                connection.invoke(INVOKE_LEAVE_GAME, currentUser);
              }}
              title="Chicken out and leave! 🐥"
            />
            <Button mode="text" onPress={() => setLeaveDialogVisible(false)} title="No, I want to play!" />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default GameHeader;

const GameHeaderContainer = styled(Surface)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
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
