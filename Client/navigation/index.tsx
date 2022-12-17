import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ColorSchemeName } from "react-native";
import { getTheme } from "../theme";
import RootNavigation from "./RootStackNavigator";

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <NavigationContainer theme={getTheme(colorScheme)}>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
