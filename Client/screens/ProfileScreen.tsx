import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, View } from "react-native";
import { RootStackParams } from "../navigation/RootStackNavigator";

type NavigationProps = NativeStackScreenProps<RootStackParams>;

const ProfileScreen = ({ navigation }: NavigationProps) => {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button color="gray" title="Log out" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default ProfileScreen;
