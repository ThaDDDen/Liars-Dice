import { createContext, ReactNode, useContext, useState } from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { User, UserMessage } from "../types/types";

interface UserContext {
  currentUser: User;
  token: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
  messages: UserMessage[];
  setMessages: React.Dispatch<React.SetStateAction<UserMessage[]>>;
}

const UserContext = createContext<UserContext>({
  currentUser: {} as User,
  token: "",
  setCurrentUser: () => console.warn("No provider found."),
  setToken: () => console.warn("No provider found."),
  logout: () => console.warn("No provider found."),
  messages: [],
  setMessages: () => console.warn("No provider found."),
});

interface Props {
  children: ReactNode;
}

export const initialUserState = {
  username: "",
  token: "",
};

function UserProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User>(initialUserState);
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [token, setToken] = useAsyncStorage("user", "");

  const logout = () => {
    setCurrentUser(initialUserState);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout, messages, setMessages, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
