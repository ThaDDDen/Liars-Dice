export type User = {
  userName: string;
  avatarCode: string;
  gameHost: boolean;
  dice: number[];
  connectionId: string;
  hasRolled: boolean;
};

export type GameSettings = {
  gameName: string;
  diceCount: number;
  playerCount: number;
};

export type GameInvitation = {
  gameHost: string;
  gameName: string;
};

export type GameBet = {
  gameName: string;
  better: User;
  diceAmount: number;
  diceValue: number;
};

export type UserMessage = {
  user: User;
  message: string;
  time: string;
};

export type ResponseMessage = {
  status: string;
  message: string;
};

export type UserConnection = {
  user: User;
  room: string;
};

export type Game = {
  gameName: string;
  diceCount: number;
  playerCount: number;
  players: User[];
  currentBet: GameBet;
  previousBetter: User;
  currentBetter: User;
  gameStarted: boolean;
  roundStarted: boolean;
  roundResult: RoundResult;
};

export type RoundResult = {
  roundWinner: string;
  roundLoser: string;
  caller: string;
  gameBet: GameBet;
  callResult: number;
};

export interface LogInModel {
  username: string;
  password: string;
}

export interface RegisterModel {
  email: string;
  username: string;
  password: string;
}
