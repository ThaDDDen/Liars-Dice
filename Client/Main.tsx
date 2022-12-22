import React from "react";
import { ColorSchemeName } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import ConnectionProvider from "./contexts/ConnectionContext";
import GameProvider from "./contexts/GameContext";
import InvitationProvider from "./contexts/InvitationContext";
import SnackProvider from "./contexts/SnackContext";
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
      <SnackProvider>
        <GameProvider>
          <UserProvider>
            <InvitationProvider>
              <ConnectionProvider>
                <Navigation colorScheme={colorScheme} />
              </ConnectionProvider>
            </InvitationProvider>
          </UserProvider>
        </GameProvider>
      </SnackProvider>
    </PaperProvider>
  );
};

export default Main;
