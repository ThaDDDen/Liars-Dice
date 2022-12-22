import React from "react";
import Register from "../components/Register";
import { HomeNavProps } from "./HomeScreen";

const RegisterScreen = ({ navigation, route }: HomeNavProps) => {
  return <Register navigation={navigation} route={route} />;
};

export default RegisterScreen;
