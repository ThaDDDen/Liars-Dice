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

export type UserConnection = {
  user: User;
  room: string;
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
