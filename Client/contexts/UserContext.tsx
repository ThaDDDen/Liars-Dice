import { createContext, ReactNode, useContext, useState } from "react";
import { User, UserMessage } from "../types/types";

interface UserContext {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void;
  messages: UserMessage[];
  setMessages: React.Dispatch<React.SetStateAction<UserMessage[]>>;
}

const UserContext = createContext<UserContext>({
  currentUser: {} as User,
  setCurrentUser: () => console.warn("No provider found."),
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

  const logout = () => {
    setCurrentUser(initialUserState);
  };

  return <UserContext.Provider value={{ currentUser, setCurrentUser, logout, messages, setMessages }}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
