export type User = {
  username: string;
  token: string;
  avatarCode: string;
};

export type UserMessage = {
  username: string;
  avatarCode: string;
  message: string;
  time: string;
};

export type UserConnection = {
  user: {
    userName: string;
    avatarCode: string;
  };
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
