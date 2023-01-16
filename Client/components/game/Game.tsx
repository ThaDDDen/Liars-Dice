import React, { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useGame } from "../../contexts/GameContext";
import { useSound } from "../../contexts/SoundContext";
import { useUser } from "../../contexts/UserContext";
import { INVOKE_ROLL_DICE } from "../../utils/constants";
import Background from "../layout/Background";
import Button from "../layout/Button";
import OnlineUserCard from "../Lobby/OnlineUserCard";
import GameChat from "./game-chat/GameChat";
import GameHeader from "./game-layout/GameHeader";
import Table from "./game-layout/Table";
import UserHand from "./game-layout/UserHand";
import BettingDialog from "./game-logic/BettingDialog";

const Game = () => {
  const { game, setGame } = useGame();
  const { currentUser } = useUser();
  const { connection, connectedUsers } = useConnection();
  const { colors } = useTheme();
  const { playRollDice } = useSound();

  const [bettingDialogVisible, setBettingDialogVisible] = useState(false);

  const chatModalize = useRef<Modalize>(null);
  const usersOnlineModalize = useRef<Modalize>(null);

  useEffect(() => {
    if (game.currentBetter && game.roundStarted)
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
      {game.gameStarted && !game.gameOver && !currentUser.gameProperties.isOut && (
        <GameBar>
          {!currentUser.gameProperties.hasRolled && (
            <Button
              title={"roll"}
              mode={"contained"}
              onPress={() => {
                connection.invoke(INVOKE_ROLL_DICE, currentUser);
                playRollDice();
              }}
            />
          )}
          {currentUser.gameProperties.hasRolled && (
            <UserHand dice={game.players.find((x) => x.userName === currentUser.userName)?.gameProperties.dice} />
          )}
        </GameBar>
      )}

      <Modalize ref={chatModalize} rootStyle={{}} modalStyle={{ backgroundColor: colors.surface }} adjustToContentHeight>
        <GameChat />
      </Modalize>

      <Modalize ref={usersOnlineModalize} rootStyle={{}} modalStyle={{ backgroundColor: colors.surface, padding: 5 }} adjustToContentHeight>
        <OnlinePlayersText variant="titleMedium">Invite players:</OnlinePlayersText>
        {connectedUsers.map((user, index) => (
          <OnlineUserCard key={index} user={user} closeModal={() => usersOnlineModalize.current?.close()} />
        ))}
      </Modalize>

      <BettingDialog bettingDialogVisible={bettingDialogVisible} setBettingDialogVisible={setBettingDialogVisible} />
    </Background>
  );
};

export default Game;

const GameBar = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
`;

const OnlinePlayersText = styled(Text)`
  margin: 0 0 10px 5px;
`;
