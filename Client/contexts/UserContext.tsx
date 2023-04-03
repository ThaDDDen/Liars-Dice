import React, { createContext, ReactNode, useContext, useState } from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { User, UserMessage } from "../types/types";
import { INITIAL_GAME_PROPERTIES, INITIAL_STATISTICS_PROPERTIES } from "../utils/constants";
import { initialGameState, useGame } from "./GameContext";

interface UserContext {
  currentUser: User;
  token: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
  gameMessages: UserMessage[];
  setGameMessages: React.Dispatch<React.SetStateAction<UserMessage[]>>;
  lobbyMessages: UserMessage[];
  setLobbyMessages: React.Dispatch<React.SetStateAction<UserMessage[]>>;
  setFirstVisit: React.Dispatch<React.SetStateAction<boolean>>;
  firstVisit: boolean;
}

const UserContext = createContext<UserContext>({
  currentUser: {} as User,
  token: "",
  setCurrentUser: () => console.warn("No provider found."),
  setToken: () => console.warn("No provider found."),
  logout: () => console.warn("No provider found."),
  gameMessages: [],
  setGameMessages: () => console.warn("No provider found."),
  lobbyMessages: [],
  setLobbyMessages: () => console.warn("No provider found."),
  setFirstVisit: () => console.warn("No provider found."),
  firstVisit: {} as boolean,
});

interface Props {
  children: ReactNode;
}

export const initialUserState = {
  id: "",
  userName: "",
  avatarCode: "",
  connectionId: "",
  gameProperties: INITIAL_GAME_PROPERTIES,
  friends: [],
  statistics: INITIAL_STATISTICS_PROPERTIES,
};

function UserProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User>(initialUserState);
  const [lobbyMessages, setLobbyMessages] = useState<UserMessage[]>([]);
  const [gameMessages, setGameMessages] = useState<UserMessage[]>([]);
  const [token, setToken] = useAsyncStorage("user", "");
  const { setGame } = useGame();
  const [firstVisit, setFirstVisit] = useAsyncStorage("firstVisit", true);

  const logout = () => {
    setCurrentUser(initialUserState);
    setToken("");
    setLobbyMessages([]);
    setGame(initialGameState);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logout,
        lobbyMessages,
        setLobbyMessages,
        gameMessages,
        setGameMessages,
        token,
        setToken,
        setFirstVisit,
        firstVisit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
