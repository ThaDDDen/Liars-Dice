import React, { useRef } from "react";
import { Dimensions, ImageBackground, Pressable, ScrollView, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import table from "../../assets/images/table.png";
import { useConnection } from "../../contexts/ConnectionContext";
import { useGame } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import { EIGHT_SEAT_TABLE, FOUR_SEAT_TABLE, INVOKE_ROLL_DICE, SIX_SEAT_TABLE } from "../../utils/constants";
import Background from "../layout/Background";
import Button from "../layout/Button";
import ChatMessage from "../Lobby/ChatMessage";
import MessageForm from "../Lobby/MessageForm";
import OnlineUserCard from "../Lobby/OnlineUserCard";
import UserAvatar from "../Lobby/UserAvatar";
import GameHeader from "./GameHeader";
import PlayerCard from "./PlayerCard";
import UserHand from "./UserHand";

const GameLobby = () => {
  const { game } = useGame();
  const { currentUser } = useUser();
  const { connection, connectedUsers } = useConnection();
  const { colors } = useTheme();
  const { gameMessages } = useUser();

  const scrollViewRef = useRef<ScrollView | null>(null);
  const chatModalize = useRef<Modalize>(null);
  const usersOnlineModalize = useRef<Modalize>(null);

  const openChatModal = () => {
    chatModalize.current?.open();
  };

  const openOnlineUsersModal = () => {
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
    <Pressable
      key={index}
      style={
        game.playerCount > 6
          ? EIGHT_SEAT_TABLE[index + game.players.length]
          : game.playerCount > 4
          ? SIX_SEAT_TABLE[index + game.players.length]
          : FOUR_SEAT_TABLE[index + game.players.length]
      }
      onPress={() => openOnlineUsersModal()}
    >
      <UserAvatar size={50} avatarCode="PlaceHolder" />
    </Pressable>
  ));

  const gameMessagesJsx = gameMessages.map((userMessage, index) => (
    <View key={index}>
      <ChatMessage userMessage={userMessage} latestMessage={gameMessages.length === index + 1} />
    </View>
  ));

  return (
    <Background>
      <GameHeader openChatModal={openChatModal} />

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
          <View style={{ backgroundColor: "#ffffff33", borderRadius: 5, padding: 5, borderWidth: 2, borderColor: "black" }}>
            <Text style={{ color: "black" }} variant="titleMedium">
              Round 22
            </Text>
            <Text style={{ color: "black" }}>Dice left 4/26</Text>
            <Text style={{ color: "black" }}>thad bet 2 x 5</Text>
            <Text style={{ color: "black" }}>It's oscars turn!</Text>
          </View>
        </TableOverlay>
      </Table>

      <GameBar>
        <Button
          title={"roll"}
          mode={"contained"}
          onPress={() => {
            connection.invoke(INVOKE_ROLL_DICE, currentUser);
          }}
        />

        <UserHand dice={game.players.find((x) => x.userName === currentUser.userName)?.dice} />
      </GameBar>

      <Modalize ref={chatModalize} rootStyle={{}} modalStyle={{ backgroundColor: colors.surface, padding: 5 }} adjustToContentHeight>
        {/* TODO: Break out chat to its own component */}
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

      <Modalize ref={usersOnlineModalize} rootStyle={{}} modalStyle={{ backgroundColor: colors.surface, padding: 5 }} adjustToContentHeight>
        <OnlinePlayersText variant="titleMedium">Invite players:</OnlinePlayersText>
        {connectedUsers.map((user, index) => (
          <View key={index}>
            <OnlineUserCard userConnection={user} closeModal={() => usersOnlineModalize.current?.close()} />
          </View>
        ))}
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
  align-items: center;
  justify-content: center;
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

const OnlinePlayersText = styled(Text)`
  margin: 0 0 10px 5px;
`;
