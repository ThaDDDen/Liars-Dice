import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, View } from "react-native";
import { useConnection } from "../contexts/ConnectionContext";
import { useUser } from "../contexts/UserContext";
import { RootStackParams } from "../navigation/RootStackNavigator";

type NavigationProps = NativeStackScreenProps<RootStackParams>;

const ProfileScreen = ({ navigation }: NavigationProps) => {
  const { currentUser, logout, messages, setToken } = useUser();
  const { closeConnection } = useConnection();

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button
        color="gray"
        title="Log out"
        onPress={() => {
          logout();
          setToken("");
          closeConnection();
        }}
      />
      {/* <Text>{currentUser.token}</Text> */}
      {messages.map((m, i) => (
        <Text key={i}>{m.message}</Text>
      ))}
    </View>
  );
};

export default ProfileScreen;
