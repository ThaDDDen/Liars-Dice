import React, { useRef, useState } from "react";
import { Dimensions, ImageBackground, ScrollView, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { IconButton, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import table from "../../assets/images/table.png";
import { useConnection } from "../../contexts/ConnectionContext";
import { useGame } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import { EIGHT_SEAT_TABLE, FOUR_SEAT_TABLE, INVOKE_ROLL_DICE, SIX_SEAT_TABLE } from "../../utils/constants";
import Background from "../layout/Background";
import Button from "../layout/Button";
import ContentCard from "../layout/ContentCard";
import ChatMessage from "../Lobby/ChatMessage";
import MessageForm from "../Lobby/MessageForm";
import UserAvatar from "../Lobby/UserAvatar";
import GameHostPanel from "./GameHostPanel";
import PlayerCard from "./PlayerCard";
import UserHand from "./UserHand";

const GameLobby = () => {
  const { game } = useGame();
  const { currentUser } = useUser();
  const { connection } = useConnection();
  const { colors } = useTheme();
  const { gameMessages } = useUser();
  const [gameHostPanelVisible, setGameHostPanelVisible] = useState(false);

  const scrollViewRef = useRef<ScrollView | null>(null);
  const usersOnlineModalize = useRef<Modalize>(null);

  const openModal = () => {
    usersOnlineModalize.current?.open();
  };

  // STÄDA KODEN FÖR HELVETE TOMMY! DET SER UT SOM FAAN
  const tableHeight = game.playerCount > 6 ? 0.6 : game.playerCount > 4 ? 0.4 : 0.35;

  const playersInGameLobby = game.players.map((player, index) => {
    return (
      <View
        key={index}
        style={game.playerCount > 6 ? EIGHT_SEAT_TABLE[index] : game.playerCount > 4 ? SIX_SEAT_TABLE[index] : FOUR_SEAT_TABLE[index]}
      >
        <PlayerCard player={player} />
      </View>
    );
  });

  const placeHolderAvatars = Array.from({ length: game.playerCount - game.players.length }, (value, index) => (
    <View
      key={index}
      style={
        game.playerCount > 6
          ? EIGHT_SEAT_TABLE[index + game.players.length]
          : game.playerCount > 4
          ? SIX_SEAT_TABLE[index + game.players.length]
          : FOUR_SEAT_TABLE[index + game.players.length]
      }
    >
      <UserAvatar size={50} avatarCode="PlaceHolder" />
    </View>
  ));

  const gameMessagesJsx = gameMessages.map((userMessage, index) => (
    <View key={index}>
      <ChatMessage userMessage={userMessage} latestMessage={gameMessages.length === index + 1} />
    </View>
  ));

  return (
    <Background>
      {game.players.find((p) => p.userName == currentUser.userName)?.gameHost &&
        (gameHostPanelVisible ? (
          // Fix padding with SafeArea (?)
          <View style={{ zIndex: 1000 }}>
            <ContentCard title="Game settings">
              <GameHostPanel setGameHostPanelVisible={setGameHostPanelVisible} />
            </ContentCard>
          </View>
        ) : (
          <View style={{ flexDirection: "row-reverse" }}>
            <IconButton icon="cog" onPress={() => setGameHostPanelVisible(true)} />
          </View>
        ))}
      <Table>
        <TableBackground
          source={table}
          resizeMode="cover"
          width={Dimensions.get("window").width * 0.7}
          height={Dimensions.get("window").height * tableHeight}
        />
        <TableOverlay width={Dimensions.get("window").width * 0.7} height={Dimensions.get("window").height * tableHeight}>
          {playersInGameLobby}
          {placeHolderAvatars}
        </TableOverlay>
      </Table>

      <GameBar style={{ backgroundColor: "red" }}>
        <Button
          title={"roll"}
          mode={"contained"}
          onPress={() => {
            connection.invoke(INVOKE_ROLL_DICE, currentUser);
          }}
        />

        <UserHand dice={game.players.find((x) => x.userName === currentUser.userName)?.dice} />
        <IconButton icon="chat-outline" iconColor={colors.secondaryContainer} size={30} onPress={() => openModal()} style={{ margin: 0 }} />
      </GameBar>

      <Modalize ref={usersOnlineModalize} rootStyle={{}} modalStyle={{ backgroundColor: colors.surface, padding: 5 }} adjustToContentHeight>
        <ChatContainer>
          <ChatWindow
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            bg={colors.surfaceVariant}
          >
            {gameMessagesJsx}
          </ChatWindow>
        </ChatContainer>
        <MessageForm chatName={game.gameName} />
      </Modalize>
    </Background>
  );
};

export default GameLobby;

const Table = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TableBackground = styled(ImageBackground)<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  justify-content: center;
  border-radius: 1000px;
  border-width: 20px;
  overflow: hidden;
  border-color: #513624;
`;

const TableOverlay = styled.View<{ width: number; height: number }>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const GameBar = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
`;

const ChatWindow = styled.ScrollView<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  /* flex: 1; */
  height: 200px;
  padding: 10px;
  border-radius: 10px;
`;

const ChatContainer = styled.View`
  /* flex: 1; */
  width: 100%;
  padding: 10px;
`;
