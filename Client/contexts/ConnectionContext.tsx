import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Game, ResponseMessage, UserConnection, UserMessage } from "../types/types";
import { useGame } from "./GameContext";
import { useInvitation } from "./InvitationContext";
import { useSnackBar } from "./SnackContext";
import { useUser } from "./UserContext";

interface ConnectionContext {
  connection: HubConnection;
  closeConnection: () => void;
  joinLobby: (accessToken: string) => void;
  connectedUsers: UserConnection[];
}

const ConnectionContext = createContext<ConnectionContext>({
  connection: {} as HubConnection,
  closeConnection: () => console.warn("No provider for closing connection was found"),
  joinLobby: () => console.warn("No provider found."),
  connectedUsers: [],
});

interface Props {
  children: ReactNode;
}

function ConnectionProvider({ children }: Props) {
  const [connection, setConnection] = useState<HubConnection>({} as HubConnection);
  const { setResponseMessage } = useSnackBar();
  const { currentUser, setLobbyMessages, setGameMessages } = useUser();
  const [connectedUsers, setConnectedUsers] = useState<UserConnection[]>([]);
  const { setGame } = useGame();
  const { invitation, invitationAccepted, setInvitation } = useInvitation();

  useEffect(() => {
    if (invitationAccepted) connection.invoke("JoinGame", currentUser, invitation.gameName);
  }, [invitationAccepted]);

  const joinLobby = async (accessToken: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://192.168.0.4:5141/hubs/lobby", {
          accessTokenFactory: () => {
            return accessToken;
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (userMessage: UserMessage, room: string) => {
        room === "Lobby" ? setLobbyMessages((prev) => [...prev, userMessage]) : setGameMessages((prev) => [...prev, userMessage]);
      });

      connection.on("ReceiveGameInvitation", (name: string, game: Game) => {
        setInvitation({ gameHost: name, gameName: game.gameName });
      });

      connection.on("AlreadyConnected", (user: string, message: string) => {
        // change this to prompt error (Snackbar?)
        console.log(user + ": " + message);
      });

      connection.on("NoGameWithThatName", (responseMessage: ResponseMessage) => {
        setResponseMessage(responseMessage);
      });

      connection.on("ConnectedUsers", (connectedUsers: UserConnection[]) => {
        setConnectedUsers(connectedUsers);
      });

      connection.on("ReceiveGame", (game: Game) => {
        setGame(game);
      });

      connection.on("GameCreated", (game: Game) => {
        setGame(game);
      });

      await connection.start();

      await connection.invoke("JoinLobby");
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  return <ConnectionContext.Provider value={{ connection, closeConnection, joinLobby, connectedUsers }}>{children}</ConnectionContext.Provider>;
}

export const useConnection = () => useContext(ConnectionContext);

export default ConnectionProvider;
