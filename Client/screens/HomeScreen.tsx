import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import Home from "../components/Home";
import OnBoarding from "../components/OnBoarding";
import { useUser } from "../contexts/UserContext";
import { BottomTabStackParams } from "../navigation/BottomTabStackNavigator";
import { RootStackParams } from "../navigation/RootStackNavigator";

export type HomeNavProps = CompositeScreenProps<BottomTabScreenProps<RootStackParams>, NativeStackScreenProps<BottomTabStackParams>>;

const HomeScreen = ({ navigation, route }: HomeNavProps) => {
  const { firstVisit } = useUser();

  return firstVisit ? <OnBoarding /> : <Home navigation={navigation} route={route} />;
};

export default HomeScreen;
