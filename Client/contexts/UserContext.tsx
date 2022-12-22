import { createContext, ReactNode, useContext, useState } from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { User, UserMessage } from "../types/types";

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
});

interface Props {
  children: ReactNode;
}

export const initialUserState = {
  userName: "",
  avatarCode: "",
  gameHost: false,
  dice: [],
  connectionId: "",
};

function UserProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User>(initialUserState);
  const [lobbyMessages, setLobbyMessages] = useState<UserMessage[]>([]);
  const [gameMessages, setGameMessages] = useState<UserMessage[]>([]);
  const [token, setToken] = useAsyncStorage("user", "");

  const logout = () => {
    setCurrentUser(initialUserState);
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, logout, lobbyMessages, setLobbyMessages, gameMessages, setGameMessages, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
