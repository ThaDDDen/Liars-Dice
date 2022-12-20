import React from "react";
import { ColorSchemeName } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import ConnectionProvider from "./contexts/ConnectionContext";
import GameProvider from "./contexts/GameContext";
import { useTheme } from "./contexts/ThemeContext";
import UserProvider from "./contexts/UserContext";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { getTheme } from "./theme";

const Main = () => {
  const { theme } = useTheme();
  const colorScheme = useColorScheme(theme as NonNullable<ColorSchemeName>);

  return (
    <PaperProvider theme={getTheme(colorScheme)}>
      <GameProvider>
        <UserProvider>
          <ConnectionProvider>
            <Navigation colorScheme={colorScheme} />
          </ConnectionProvider>
        </UserProvider>
      </GameProvider>
    </PaperProvider>
  );
};

export default Main;
