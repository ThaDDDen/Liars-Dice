import { createContext, ReactNode, useContext, useState } from "react";

import { Game, GameBet, User } from "../types/types";

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
  gameHost: {} as User,
  gameName: "",
  diceCount: 0,
  playerCount: 0,
  players: [] as User[],
  currentBet: {} as GameBet,
  currentBetter: {} as User,
  gameStarted: false,
  roundStarted: false,
};

function GameProvider({ children }: Props) {
  const [game, setGame] = useState<Game>(initialGameState);

  return <GameContext.Provider value={{ game, setGame }}>{children}</GameContext.Provider>;
}

export const useGame = () => useContext(GameContext);

export default GameProvider;
