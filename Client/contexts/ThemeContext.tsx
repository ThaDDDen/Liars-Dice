import { Theme as NavigationTheme } from "@react-navigation/native";
import React, { createContext, ReactNode, useContext } from "react";
import { MD3Theme as PaperTheme } from "react-native-paper";
import useAsyncStorage from "../hooks/useAsyncStorage";

export type Theme = NavigationTheme & PaperTheme;

interface ThemeContext {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContext>({
  theme: "",
  setTheme: () => console.warn("No provider found."),
});

interface Props {
  children: ReactNode;
}

function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useAsyncStorage("theme", "dark");

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
