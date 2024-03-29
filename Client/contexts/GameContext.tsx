import React, { createContext, ReactNode, useContext, useState } from "react";

import { Game, GameBet, RoundResult, User } from "../types/types";

interface Props {
  children: ReactNode;
}

interface GameContext {
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  game: Game;
}

const GameContext = createContext<GameContext>({
  setGame: () => console.warn("no provider found"),
  game: {} as Game,
});

export const initialGameState = {
  id: "",
  gameOver: false,
  gameHost: {} as User,
  gameName: "",
  diceCount: 0,
  playerCount: 0,
  round: 0,
  players: [] as User[],
  currentBet: {} as GameBet,
  previousBetter: {} as User,
  currentBetter: {} as User,
  gameStarted: false,
  roundStarted: false,
  betTime: 0,
  roundResult: {} as RoundResult,
};

function GameProvider({ children }: Props) {
  const [game, setGame] = useState<Game>(initialGameState);

  return <GameContext.Provider value={{ game, setGame }}>{children}</GameContext.Provider>;
}

export const useGame = () => useContext(GameContext);

export default GameProvider;
