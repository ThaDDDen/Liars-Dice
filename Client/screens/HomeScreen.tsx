import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable } from "react-native";
import { Text } from "react-native-paper";
import Home from "../components/Home";
import { useUser } from "../contexts/UserContext";
import { BottomTabStackParams } from "../navigation/BottomTabStackNavigator";
import { RootStackParams } from "../navigation/RootStackNavigator";

export type HomeNavProps = CompositeScreenProps<BottomTabScreenProps<RootStackParams>, NativeStackScreenProps<BottomTabStackParams>>;

const HomeScreen = ({ navigation, route }: HomeNavProps) => {
  // const [firstVisit, setFirstVisit] = useAsyncStorage("firstVisit", true);
  const { firstVisit, setFirstVisit } = useUser();

  return (
    <>
      <Home navigation={navigation} route={route} />
      <Pressable onPress={() => setFirstVisit(true)}>
        <Text variant="bodySmall">reset</Text>
      </Pressable>
    </>
  );
};

export default HomeScreen;
