// COMPONENT IS CURRENTLY UNUSED

import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { IconButton, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../../contexts/ConnectionContext";
import { useGame } from "../../../contexts/GameContext";
import { useSnackBar } from "../../../contexts/SnackContext";
import { useUser } from "../../../contexts/UserContext";
import { INVOKE_START_GAME } from "../../../utils/constants";
import OrangeDice from "../game-assets/OrangeDice";
import ReduceTableDialog from "./ReduceTableDialog";

interface Props {
  openChatModal: () => void;
}

const GameHeader = ({ openChatModal }: Props) => {
  const { game } = useGame();
  const { currentUser } = useUser();
  const { setResponseMessage } = useSnackBar();
  const { connection } = useConnection();
  const [tableNotFullDialogVisible, setTableNotFullDialogVisible] = useState(false);
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
      <ReduceTableDialog dialogVisible={tableNotFullDialogVisible} setDialogVisible={setTableNotFullDialogVisible} />
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
