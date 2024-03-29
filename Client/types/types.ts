export type User = {
  id: string;
  userName: string;
  avatarCode: string;
  connectionId: string;
  gameProperties: GameProperties;
  friends: User[];
  statistics: Statistics;
};

export type Profile = {
  id: string;
  userName: string;
  avatarCode: string;
  statistics: Statistics;
};

export type GameProperties = {
  gameHost: boolean;
  dice: number[];
  hasRolled: boolean;
  isOut: boolean;
};
export type LoadedProfile = {
  profile: Profile;
  onInvite: () => void;
  onKick: () => void;
  onAddFriend: () => void;
  onRemoveFriend: () => void;
};

export type GameSettings = {
  gameName: string;
  diceCount: number;
  playerCount: number;
  betTime: number;
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

export type Statistics = {
  userId: string;
  ones: number;
  twoes: number;
  threes: number;
  fours: number;
  fives: number;
  sixes: number;
  roundsWon: number;
  calls: number;
  straights: number;
  gamesPlayed: number;
  gamesWon: number;
};

export type UserMessage = {
  user: User;
  message: string;
  time: string;
};

export type SnackMessage = {
  status: string;
  message: string;
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
  betTime: number;
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
