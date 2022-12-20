import React from "react";
import { Text } from "react-native";
import { useGame } from "../../contexts/GameContext";

interface Props {
  dice: number[];
}

const PlayerHand = ({ dice }: Props) => {
  const { game } = useGame();

  return (
    <>
      <Text>PlayerHand</Text>
      {dice.map((x) => (
        <Text>{x}</Text>
      ))}
    </>
  );
};

export default PlayerHand;
