import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Portal, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { initialGameState, useGame } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import { User } from "../../types/types";
import { INITIAL_GAME_PROPERTIES, INVOKE_LEAVE_GAME } from "../../utils/constants";
import BetTimeSlider from "../game/game-settings/BetTimeSlider";
import DrawerDicePicker from "../game/game-settings/DrawerDicePicker";
import DrawerOrderSorter from "../game/game-settings/DrawerOrderSorter";
import DrawerPlayerPicker from "../game/game-settings/DrawerPlayerPicker";
import DrawerSaveChangesButtons from "../game/game-settings/DrawerSaveChangesButtons";
import ThemePicker from "../profile/ThemePicker";
import Button from "./Button";
import CustomDialog from "./CustomDialog";
import DrawerContentCard from "./DrawerContentCard";

const LeftDrawerContent = (props: DrawerContentComponentProps) => {
  const { game, setGame } = useGame();
  const { currentUser, setCurrentUser, setGameMessages, logout } = useUser();
  const { connection, closeConnection } = useConnection();
  const [players, setPlayers] = useState<User[]>(game.players);
  const [playerCount, setPlayerCount] = useState(0);
  const [betTime, setBetTime] = useState(game.betTime);
  const [diceCount, setDiceCount] = useState(0);
  const [leaveDialogVisible, setLeaveDialogVisible] = useState(false);
  const [viewGameSettings, setViewGameSettings] = useState(false);

  useEffect(() => {
    if (game !== initialGameState) {
      setDiceCount(game.diceCount);
      setPlayerCount(game.playerCount);
      setPlayers(game.players);
      setBetTime(game.betTime);
    }
  }, [game]);

  const handleLogout = () => {
    logout();
    closeConnection();
  };

  const handleLeaveGame = () => {
    setLeaveDialogVisible(false);
    setGame(initialGameState);
    setGameMessages([]);
    setCurrentUser({ ...currentUser, gameProperties: INITIAL_GAME_PROPERTIES });
    currentUser.gameProperties.gameHost = false;
    connection.invoke(INVOKE_LEAVE_GAME, currentUser);
  };

  const orderHasChanged = () => {
    for (let i = 0; i < game.players.length; i++) {
      const playerOne = game.players[i];
      const playerTwo = players[i];

      if (JSON.stringify(playerOne) !== JSON.stringify(playerTwo)) return true;
    }
    return false;
  };
  const changesMade = diceCount !== game.diceCount || playerCount !== game.playerCount || betTime !== game.betTime || orderHasChanged();

  const resetSettings = () => {
    setPlayers(game.players);
    setBetTime(game.betTime);
    setDiceCount(game.diceCount);
    setPlayerCount(game.playerCount);
  };
  return (
    <SafeAreaView>
      <View style={{ width: "100%" }}>
        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
          <Button compact title={"App settings"} mode="text" onPress={() => setViewGameSettings(false)} />
          <Button disabled={game === initialGameState} compact title={"Game settings"} mode="text" onPress={() => setViewGameSettings(true)} />
        </View>
        {viewGameSettings ? (
          <View>
            <SettingsContainer>
              {currentUser.gameProperties.gameHost && !game.gameStarted && (
                <>
                  <DrawerContentCard title={"dice"} content={<DrawerDicePicker diceCount={diceCount} setDiceCount={setDiceCount} />} />
                  <DrawerContentCard title={"players"} content={<DrawerPlayerPicker playerCount={playerCount} setPlayerCount={setPlayerCount} />} />
                  <DrawerContentCard title={"bet time"} content={<BetTimeSlider betTime={betTime} setBetTime={setBetTime} />} />
                  <DrawerContentCard title={"play order"} content={<DrawerOrderSorter setPlayers={setPlayers} />} />
                  {changesMade && (
                    <DrawerSaveChangesButtons
                      players={players}
                      diceCount={diceCount}
                      playerCount={playerCount}
                      betTime={betTime}
                      playOrderHasChanged={orderHasChanged()}
                      closeDrawer={() => props.navigation.closeDrawer()}
                      resetSettings={resetSettings}
                    />
                  )}
                </>
              )}
              <LeaveGameContainer>
                <Button title={"Leave Game"} mode={"contained"} onPress={() => setLeaveDialogVisible(true)} />
              </LeaveGameContainer>
            </SettingsContainer>
          </View>
        ) : (
          <SettingsContainer>
            <View>
              <DrawerContentCard title={"Theme"} content={<ThemePicker />} />

              <Button title={"Log out"} mode={"text"} onPress={handleLogout} />
            </View>
          </SettingsContainer>
        )}
      </View>
      <Portal>
        <CustomDialog
          visible={leaveDialogVisible}
          headerLabel={"LEAVE GAME"}
          content={
            <Text style={{ fontFamily: "Manrope-SemiBold", letterSpacing: 0.25, lineHeight: 23, textAlign: "center" }}>
              Are you sure you want to leave the game?
            </Text>
          }
          leftButtonLabel={"LEAVE"}
          leftButtonAction={() => handleLeaveGame()}
          rightButtonLabel={"STAY"}
          rightButtonAction={() => {
            setLeaveDialogVisible(false);
            props.navigation.closeDrawer();
          }}
        />
      </Portal>
    </SafeAreaView>
  );
};

export default LeftDrawerContent;

const SettingsContainer = styled.View`
  padding: 5px;
  height: 100%;
`;

const LeaveGameContainer = styled.View`
  align-self: center;
  margin-bottom: auto;
`;
