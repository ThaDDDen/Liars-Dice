import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, View } from "react-native";
import { useUser } from "../contexts/UserContext";
import { RootStackParams } from "../navigation/RootStackNavigator";

type NavigationProps = NativeStackScreenProps<RootStackParams>;

const ProfileScreen = ({ navigation }: NavigationProps) => {
  const { currentUser, logout, messages } = useUser();

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button color="gray" title="Log out" onPress={() => logout()} />
      {/* <Text>{currentUser.token}</Text> */}
      {messages.map((m, i) => (
        <Text key={i}>{m.message}</Text>
      ))}
    </View>
  );
};

export default ProfileScreen;
