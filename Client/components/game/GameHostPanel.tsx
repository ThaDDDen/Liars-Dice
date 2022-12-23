import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, IconButton, Surface, Text, useTheme } from "react-native-paper";
import { useConnection } from "../../contexts/ConnectionContext";
import { useGame } from "../../contexts/GameContext";
import { User } from "../../types/types";
import PlayOrderSorter from "./PlayOrderSorter";

const GameHostPanel = () => {
  const { connection } = useConnection();
  const { game } = useGame();
  const [diceCount, setDiceCount] = useState(game.diceCount);
  const [playerCount, setPlayerCount] = useState(game.playerCount);
  const { colors } = useTheme();
  const [orderSorterVisible, setOrderSorterVisible] = useState(false);

  const updatePlayerOrder = (players: User[]) => {
    connection.invoke("UpdatePlayerOrder", players);
  };
  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
      <Surface elevation={3} style={{ flexDirection: "row", paddingLeft: 10, borderRadius: 10, alignItems: "center", marginBottom: 10 }}>
        <Text variant="bodyLarge" style={{ flex: 1 }}>
          Number of dice: {diceCount}
        </Text>
        <IconButton
          icon="minus"
          style={{ margin: 0 }}
          onPress={() => {
            diceCount !== 1 && setDiceCount((prev) => prev - 1);
          }}
        />
        <IconButton
          icon="plus"
          style={{ margin: 0 }}
          onPress={() => {
            diceCount !== 6 && setDiceCount((prev) => prev + 1);
          }}
        />
      </Surface>
      <Surface elevation={3} style={{ flexDirection: "row", paddingLeft: 10, borderRadius: 10, alignItems: "center", marginBottom: 10 }}>
        <Text variant="bodyLarge" style={{ flex: 1 }}>
          Max number of players: {playerCount}
        </Text>
        <IconButton
          icon="minus"
          style={{ margin: 0 }}
          onPress={() => {
            playerCount !== 2 && setPlayerCount((prev) => prev - 1);
          }}
        />
        <IconButton
          icon="plus"
          style={{ margin: 0 }}
          onPress={() => {
            playerCount !== 8 && setPlayerCount((prev) => prev + 1);
          }}
        />
      </Surface>
      <Surface elevation={3} style={{ flexDirection: "row", borderRadius: 10, alignItems: "center", marginBottom: 10 }}>
        <Button onPress={() => setOrderSorterVisible(true)}>Change play order</Button>
      </Surface>
      <View style={{ paddingHorizontal: 100 }}>
        <Button mode="outlined" onPress={() => {}}>
          Save
        </Button>
      </View>
      <PlayOrderSorter orderSorterVisible={orderSorterVisible} setOrderSorterVisible={setOrderSorterVisible} updatePlayerOrder={updatePlayerOrder} />
    </View>
  );
};

export default GameHostPanel;

const styles = StyleSheet.create({});
