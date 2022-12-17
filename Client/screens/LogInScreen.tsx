import React from "react";
import LogIn from "../components/LogIn";
import { HomeNavProps } from "./HomeScreen";

const LogInScreen = ({ navigation, route }: HomeNavProps) => {
  return <LogIn navigation={navigation} route={route} />;
};

export default LogInScreen;
