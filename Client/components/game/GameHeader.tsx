import React, { useState } from "react";
import { View } from "react-native";
import { IconButton, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";
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
      <GameHeaderContainer>
        <Text variant="headlineSmall">{game.gameName}</Text>
        <ButtonContainer>
          <IconButton icon="chat-outline" onPress={() => openChatModal()} />
          {currentUser.gameHost && <IconButton icon="cog" onPress={() => setGameHostPanelVisible((prev) => !prev)} />}
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
`;

const GameSettingsContainer = styled.View`
  position: absolute;
  width: 100%;
  top: 55px;
  z-index: 5;
`;
