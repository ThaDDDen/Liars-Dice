import React, { useEffect } from "react";
import LobbyChat from "../components/Lobby/LobbyChat";
import { useConnection } from "../contexts/ConnectionContext";
import { useUser } from "../contexts/UserContext";

const LobbyScreen = () => {
  const { joinLobby } = useConnection();
  const { token } = useUser();

  useEffect(() => {
    if (token) joinLobby(token);
  }, [token]);

  return (
    <>
      <LobbyChat />
    </>
  );
};

export default LobbyScreen;
