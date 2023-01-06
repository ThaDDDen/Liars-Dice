import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ConnectionProvider from "./contexts/ConnectionContext";
import DialogProvider from "./contexts/DialogContext";
import GameProvider from "./contexts/GameContext";
import SnackProvider from "./contexts/SnackContext";
import SoundProvider from "./contexts/SoundContext";
import { useTheme } from "./contexts/ThemeContext";
import UserProvider from "./contexts/UserContext";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { AppColorSchemeName, getTheme } from "./theme";

const Main = () => {
  const { theme } = useTheme();
  const colorScheme = useColorScheme(theme as NonNullable<AppColorSchemeName>);

  const [statusBarColor, setStatusBarColor] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (colorScheme === "dark" || colorScheme === "thadtheme" || colorScheme === "theme1") {
      setStatusBarColor("light");
    } else {
      setStatusBarColor("dark");
    }
  }, [colorScheme]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={getTheme(colorScheme)}>
        <SoundProvider>
          <SnackProvider>
            <GameProvider>
              <UserProvider>
                <DialogProvider>
                  <ConnectionProvider>
                    <StatusBar style={statusBarColor} />
                    <Navigation colorScheme={colorScheme} />
                  </ConnectionProvider>
                </DialogProvider>
              </UserProvider>
            </GameProvider>
          </SnackProvider>
        </SoundProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default Main;
