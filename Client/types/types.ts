export type User = {
  id: string;
  userName: string;
  avatarCode: string;
  connectionId: string;
  gameProperties: GameProperties;
};

export type GameProperties = {
  gameHost: boolean;
  dice: number[];
  hasRolled: boolean;
  isOut: boolean;
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

export type AcceptedRequest = {
  user: User;
  gameName: string;
};

export type Game = {
  id: string;
  gameOver: boolean;
  gameName: string;
  diceCount: number;
  playerCount: number;
  round: number;
  players: User[];
  currentBet: GameBet;
  previousBetter: User;
  currentBetter: User;
  gameStarted: boolean;
  roundStarted: boolean;
  roundResult: RoundResult;
};

export type RoundResult = {
  round: number;
  roundWinner: User;
  roundLoser: User;
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
