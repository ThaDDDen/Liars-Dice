import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Surface, Text } from "react-native-paper";
import { useGame } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import ContentCard from "../layout/ContentCard";
import GameHostPanel from "./GameHostPanel";

interface Props {
  openChatModal: () => void;
}

const GameHeader = ({ openChatModal }: Props) => {
  const { game } = useGame();
  const { currentUser } = useUser();

  const [gameHostPanelVisible, setGameHostPanelVisible] = useState(false);
  return (
    <View>
      <Surface style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, borderRadius: 10 }}>
        <Text variant="headlineSmall">{game.gameName}</Text>
        <View style={{ flexDirection: "row" }}>
          <IconButton icon="chat-outline" onPress={() => openChatModal()} />
          {currentUser.gameHost && <IconButton icon="cog" onPress={() => setGameHostPanelVisible((prev) => !prev)} />}
        </View>
      </Surface>
      {gameHostPanelVisible && (
        // Fix padding with SafeArea (?)
        <View style={{ position: "absolute", zIndex: 1000, width: "100%", top: 55 }}>
          <ContentCard title="Game settings">
            <GameHostPanel setGameHostPanelVisible={setGameHostPanelVisible} />
          </ContentCard>
        </View>
      )}
    </View>
  );
};

export default GameHeader;

const styles = StyleSheet.create({});
