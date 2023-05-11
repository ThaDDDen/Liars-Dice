import React, { useEffect } from "react";
import LobbyChat from "../components/Lobby/LobbyChat";
import { useConnection } from "../contexts/ConnectionContext";
import { initialUserState, useUser } from "../contexts/UserContext";

const LobbyScreen = () => {
  const { joinLobby } = useConnection();
  const { token, currentUser } = useUser();

  useEffect(() => {
    if (token && currentUser !== initialUserState) joinLobby(token);
  }, [token]);

  return (
    <>
      <LobbyChat />
    </>
  );
};

export default LobbyScreen;
