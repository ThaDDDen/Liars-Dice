import React, { useEffect } from "react";
import { useTheme } from "react-native-paper";
import LobbyChat from "../components/Lobby/LobbyChat";
import { useConnection } from "../contexts/ConnectionContext";
import { useUser } from "../contexts/UserContext";

const LobbyScreen = () => {
  // move joinlobby to component later
  const { joinLobby } = useConnection();
  const { currentUser } = useUser();
  const theme = useTheme();

  useEffect(() => {
    joinLobby(currentUser.token);
  }, []);

  return (
    <>
      <LobbyChat />
    </>
  );
};

export default LobbyScreen;
