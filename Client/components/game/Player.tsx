import React from "react";
import { Text } from "react-native";
import { useGame } from "../../contexts/GameContext";
import { User } from "../../types/types";
import PlayerHand from "./PlayerHand";

interface Props {
  player: User;
}

const Player = ({ player }: Props) => {
  const { game } = useGame();

  return (
    <>
      <Text>Player</Text>
      <PlayerHand dice={player.dice} />
    </>
  );
};

export default Player;
