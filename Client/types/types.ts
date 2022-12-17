export type User = {
  username: string;
  token: string;
};

export type UserMessage = {
  username: string;
  message: string;
  time: string;
};

export type UserConnection = {
  user: string;
  room: string;
};
