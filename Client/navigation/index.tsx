import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootNavigation from "./RootStackNavigator";

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
