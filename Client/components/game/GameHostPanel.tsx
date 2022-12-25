import React, { useState } from "react";
import { View } from "react-native";
import { IconButton, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useGame } from "../../contexts/GameContext";
import { User } from "../../types/types";
import { INVOKE_UPDATE_GAME_SETTINGS } from "../../utils/constants";
import Button from "../layout/Button";
import PlayOrderSorter from "./PlayOrderSorter";

interface Props {
  setGameHostPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameHostPanel = ({ setGameHostPanelVisible }: Props) => {
  const { connection } = useConnection();
  const { game } = useGame();
  const [diceCount, setDiceCount] = useState(game.diceCount);
  const [playerCount, setPlayerCount] = useState(game.playerCount);
  const [orderSorterVisible, setOrderSorterVisible] = useState(false);

  const updatePlayerOrder = (players: User[]) => {
    connection.invoke("UpdatePlayerOrder", players);
  };
  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
      <SettingsRow elevation={3}>
        <Setting variant="bodyLarge">Number of dice: {diceCount}</Setting>
        <SettingsButton
          icon="minus"
          onPress={() => {
            diceCount !== 1 && setDiceCount((prev) => prev - 1);
          }}
        />
        <SettingsButton
          icon="plus"
          onPress={() => {
            diceCount !== 6 && setDiceCount((prev) => prev + 1);
          }}
        />
      </SettingsRow>
      <SettingsRow elevation={3}>
        <Setting variant="bodyLarge">Max number of players: {playerCount}</Setting>
        <SettingsButton
          icon="minus"
          onPress={() => {
            playerCount !== 2 && setPlayerCount((prev) => prev - 1);
          }}
        />
        <SettingsButton
          icon="plus"
          onPress={() => {
            playerCount !== 8 && setPlayerCount((prev) => prev + 1);
          }}
        />
      </SettingsRow>
      <SettingsRow elevation={3}>
        <Button toLower styles={{ marginBottom: 0 }} title="Change play order" mode="text" onPress={() => setOrderSorterVisible(true)} />
      </SettingsRow>
      <View style={{ flexDirection: "row-reverse" }}>
        <Button
          styles={{ marginBottom: 0, borderRadius: 5, marginLeft: 10 }}
          mode="text"
          compact
          title="Save"
          onPress={() => {
            connection.invoke(INVOKE_UPDATE_GAME_SETTINGS, { gameName: game.gameName, diceCount: diceCount, playerCount: playerCount });
            setGameHostPanelVisible(false);
          }}
        />
        <Button compact styles={{ marginBottom: 0, borderRadius: 5 }} mode="text" title="Cancel" onPress={() => setGameHostPanelVisible(false)} />
      </View>
      <PlayOrderSorter orderSorterVisible={orderSorterVisible} setOrderSorterVisible={setOrderSorterVisible} updatePlayerOrder={updatePlayerOrder} />
    </View>
  );
};

export default GameHostPanel;

const SettingsRow = styled(Surface)`
  flex-direction: row;
  padding-left: 10px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const Setting = styled(Text)`
  flex: 1;
`;

const SettingsButton = styled(IconButton)`
  margin: 0;
`;
