import React from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import ThemeProvider from "./contexts/ThemeContext";
import Main from "./Main";

const App = () => {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
};

export default gestureHandlerRootHOC(App);
