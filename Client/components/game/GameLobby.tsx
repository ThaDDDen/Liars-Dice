import React from "react";
import { Dimensions, ImageBackground, View } from "react-native";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import table from "../../assets/images/table.png";
import { useGame } from "../../contexts/GameContext";
import { EIGHT_SEAT_TABLE, FOUR_SEAT_TABLE, SIX_SEAT_TABLE } from "../../utils/constants";
import UserAvatar from "../Lobby/UserAvatar";
import PlayerCard from "./PlayerCard";

const GameLobby = () => {
  const { game } = useGame();

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

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{game.gameName}</Text>
        <TableBackground
          source={table}
          resizeMode="cover"
          width={Dimensions.get("window").width * 0.7}
          height={Dimensions.get("window").height * tableHeight}
        ></TableBackground>
        <TableOverlay width={Dimensions.get("window").width * 0.7} height={Dimensions.get("window").height * tableHeight}>
          {playersInGameLobby}
          {placeHolderAvatars}
        </TableOverlay>
      </View>
    </>
  );
};

export default GameLobby;

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
