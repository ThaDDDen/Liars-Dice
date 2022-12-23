import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppColorSchemeName, getTheme } from "../theme";
import RootNavigation from "./RootStackNavigator";

const Navigation = ({ colorScheme }: { colorScheme: AppColorSchemeName }) => {
  return (
    <NavigationContainer theme={getTheme(colorScheme)}>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
