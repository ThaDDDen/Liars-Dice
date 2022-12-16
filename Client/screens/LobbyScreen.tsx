import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useConnection } from "../contexts/ConnectionContext";
import { useUser } from "../contexts/UserContext";

const LobbyScreen = () => {
  // move joinlobby to component later
  const { joinLobby } = useConnection();
  const { currentUser } = useUser();

  useEffect(() => {
    joinLobby(currentUser.token);
  }, []);

  return (
    <View>
      <Text>LobbyScreen</Text>
    </View>
  );
};

export default LobbyScreen;
