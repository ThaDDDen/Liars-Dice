import React from "react";
import { useGame } from "../../contexts/GameContext";
import Player from "./Player";

const Game = () => {
  const { game } = useGame();
  console.log(game);

  return (
    <>
      {game &&
        game.players.map((player, index) => {
          <Player key={index} player={player} />;
        })}
    </>
  );
};

export default Game;
