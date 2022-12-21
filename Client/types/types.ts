export type User = {
  userName: string;
  avatarCode: string;
  gameHost: boolean;
  dice: number[];
};

export type GameSettings = {
  gameName: string;
  diceCount: number;
  playerCount: number;
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
  gameHost: User;
  gameName: string;
  diceCount: number;
  playerCount: number;
  players: User[];
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
