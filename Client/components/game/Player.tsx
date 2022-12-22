import React from "react";
import { Text } from "react-native";
import { User } from "../../types/types";
import PlayerHand from "./PlayerHand";

interface Props {
  player: User;
}

const Player = ({ player }: Props) => {
  return (
    <>
      <Text>Player</Text>
      <PlayerHand size="small" dice={player.dice} />
    </>
  );
};

export default Player;
