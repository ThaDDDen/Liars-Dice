import React from "react";
import { Dimensions, ImageBackground, Pressable, View } from "react-native";
import { ColorFormat } from "react-native-countdown-circle-timer";
import styled from "styled-components/native";
import table from "../../../assets/images/table.png";
import { useGame } from "../../../contexts/GameContext";
import {
  EIGHT_SEAT_TABLE,
  FIVE_SEAT_TABLE,
  FOUR_SEAT_TABLE,
  SEVEN_SEAT_TABLE,
  SIX_SEAT_TABLE,
  THREE_SEAT_TABLE,
  TWO_SEAT_TABLE,
} from "../../../utils/constants";
import UserAvatar from "../../Lobby/UserAvatar";
import RoundInfo from "../game-logic/RoundInfo";
import PlayerCard from "./PlayerCard";

interface Props {
  openOnlineUsersModal: () => void;
  setBetTime: React.Dispatch<React.SetStateAction<number>>;
}

const Table = ({ openOnlineUsersModal, setBetTime }: Props) => {
  const { game } = useGame();

  const tableHeight = game.playerCount > 6 ? 0.6 : game.playerCount > 4 ? 0.4 : 0.35;

  const countDownColors: ColorFormat[] = ["#ff0000", "#0000ff"];

  const playersInGameLobby = game.players.map((player, index) => {
    return (
      <View
        key={index}
        style={
          game.playerCount == 7
            ? SEVEN_SEAT_TABLE[index]
            : game.playerCount == 6
            ? SIX_SEAT_TABLE[index]
            : game.playerCount == 5
            ? FIVE_SEAT_TABLE[index]
            : game.playerCount == 4
            ? FOUR_SEAT_TABLE[index]
            : game.playerCount == 3
            ? THREE_SEAT_TABLE[index]
            : game.playerCount == 2
            ? TWO_SEAT_TABLE[index]
            : EIGHT_SEAT_TABLE[index]
        }
      >
        <PlayerCard setBetTime={setBetTime} disabled={player.gameProperties.isOut} player={player} />
      </View>
    );
  });

  const placeHolderAvatars = Array.from({ length: game.playerCount - game.players.length }, (value, index) => (
    <Pressable
      key={index}
      style={
        game.playerCount == 7
          ? SEVEN_SEAT_TABLE[index + game.players.length]
          : game.playerCount == 6
          ? SIX_SEAT_TABLE[index + game.players.length]
          : game.playerCount == 5
          ? FIVE_SEAT_TABLE[index + game.players.length]
          : game.playerCount == 4
          ? FOUR_SEAT_TABLE[index + game.players.length]
          : game.playerCount == 3
          ? THREE_SEAT_TABLE[index + game.players.length]
          : game.playerCount == 2
          ? TWO_SEAT_TABLE[index + game.players.length]
          : EIGHT_SEAT_TABLE[index + game.players.length]
      }
      onPress={() => openOnlineUsersModal()}
    >
      <UserAvatar size={50} avatarCode="PlaceHolder" />
    </Pressable>
  ));

  return (
    <TableContainer>
      <TableBackground
        source={table}
        resizeMode="cover"
        width={Dimensions.get("window").width * 0.7}
        height={Dimensions.get("window").height * tableHeight}
      />
      <TableOverlay width={Dimensions.get("window").width * 0.7} height={Dimensions.get("window").height * tableHeight}>
        {playersInGameLobby}
        {placeHolderAvatars}
        <RoundInfo />
      </TableOverlay>
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.View`
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
