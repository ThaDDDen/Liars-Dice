import React from "react";
import { Pressable } from "react-native";
import { useGame } from "../../../contexts/GameContext";
import { useProfileModalize } from "../../../contexts/ProfileModalizeContext";
import { useUser } from "../../../contexts/UserContext";
import { User } from "../../../types/types";
import {
  EIGHT_SEAT_TABLE,
  FIVE_SEAT_TABLE,
  FOUR_SEAT_TABLE,
  SEVEN_SEAT_TABLE,
  SIX_SEAT_TABLE,
  THREE_SEAT_TABLE,
  TWO_SEAT_TABLE,
} from "../../../utils/constants";
import PlayerCard from "./PlayerCard";

interface Props {
  setBetTime: React.Dispatch<React.SetStateAction<number>>;
}

const Players = ({ setBetTime }: Props) => {
  const { setFetchUser } = useProfileModalize();
  const { game } = useGame();
  const { currentUser } = useUser();

  const handlePressUser = (player: User) => {
    if (player.id !== currentUser.id) setFetchUser(player);
  };

  return (
    <>
      {game.players.map((player, index) => (
        <Pressable
          key={index}
          onPress={() => handlePressUser(player)}
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
        </Pressable>
      ))}
    </>
  );
};

export default Players;
