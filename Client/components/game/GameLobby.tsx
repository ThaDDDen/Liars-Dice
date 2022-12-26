import React, { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useGame } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import { INVOKE_ROLL_DICE } from "../../utils/constants";
import Background from "../layout/Background";
import Button from "../layout/Button";
import OnlineUserCard from "../Lobby/OnlineUserCard";
import BettingDialog from "./BettingDialog";
import GameChat from "./GameChat";
import GameHeader from "./GameHeader";
import Table from "./Table";
import UserHand from "./UserHand";

const GameLobby = () => {
  const { game } = useGame();
  const { currentUser } = useUser();
  const { connection, connectedUsers } = useConnection();
  const { colors } = useTheme();

  const [bettingDialogVisible, setBettingDialogVisible] = useState(false);

  const chatModalize = useRef<Modalize>(null);
  const usersOnlineModalize = useRef<Modalize>(null);

  useEffect(() => {
    if (game.currentBetter)
      if (currentUser.userName === game.currentBetter.userName) {
        setBettingDialogVisible(true);
      }
  }, [game]);

  //------- OPEN MODAL FUNCTIONS -------

  const openChatModal = () => {
    chatModalize.current?.open();
  };

  const openOnlineUsersModal = () => {
    usersOnlineModalize.current?.open();
  };

  return (
    <Background>
      <GameHeader openChatModal={openChatModal} />
      <Table openOnlineUsersModal={openOnlineUsersModal} />
      {game.gameStarted && (
        <GameBar>
          {!currentUser.hasRolled && (
            <Button
              title={"roll"}
              mode={"contained"}
              onPress={() => {
                connection.invoke(INVOKE_ROLL_DICE, currentUser);
              }}
            />
          )}
          {currentUser.hasRolled && <UserHand dice={game.players.find((x) => x.userName === currentUser.userName)?.dice} />}
        </GameBar>
      )}

      <Modalize ref={chatModalize} rootStyle={{}} modalStyle={{ backgroundColor: colors.surface }} adjustToContentHeight>
        <GameChat />
      </Modalize>

      <Modalize ref={usersOnlineModalize} rootStyle={{}} modalStyle={{ backgroundColor: colors.surface, padding: 5 }} adjustToContentHeight>
        <OnlinePlayersText variant="titleMedium">Invite players:</OnlinePlayersText>
        {connectedUsers.map((user, index) => (
          <OnlineUserCard key={index} userConnection={user} closeModal={() => usersOnlineModalize.current?.close()} />
        ))}
      </Modalize>

      <BettingDialog bettingDialogVisible={bettingDialogVisible} setBettingDialogVisible={setBettingDialogVisible} />
    </Background>
  );
};

export default GameLobby;

const GameBar = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
`;

const OnlinePlayersText = styled(Text)`
  margin: 0 0 10px 5px;
`;
