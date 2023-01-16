import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Game, GameInvitation, ResponseMessage, User, UserMessage } from "../types/types";
import {
  BASE_URL,
  INITIAL_GAME_PROPERTIES,
  INVOKE_ACCEPT_JOIN_REQUEST,
  INVOKE_JOIN_GAME,
  INVOKE_JOIN_LOBBY,
  RECEIVE_ALREADY_CONNECTED,
  RECEIVE_CONNECTED_USERS,
  RECEIVE_ERROR,
  RECEIVE_GAME,
  RECEIVE_GAME_INVITATION,
  RECEIVE_JOIN_REQUEST,
  RECEIVE_KICKED,
  RECEIVE_MESSAGE,
} from "../utils/constants";
import { initialInvitationState, useDialog } from "./DialogContext";
import { initialGameState, useGame } from "./GameContext";
import { useSnackBar } from "./SnackContext";
import { useUser } from "./UserContext";

interface ConnectionContext {
  connection: HubConnection;
  closeConnection: () => void;
  joinLobby: (accessToken: string) => void;
  connectedUsers: User[];
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
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const { invitation, invitationAccepted, setInvitation, setInvitationAccepted, setPlayersRequestingToJoin, acceptedRequests, setAcceptedRequests } =
    useDialog();
  const { currentUser, setLobbyMessages, setGameMessages, setCurrentUser } = useUser();
  const { setResponseMessage } = useSnackBar();
  const { setGame } = useGame();

  useEffect(() => {
    if (invitationAccepted) connection.invoke(INVOKE_JOIN_GAME, currentUser, invitation.gameName);
    setInvitation(initialInvitationState);
    setInvitationAccepted(false);
  }, [invitationAccepted]);

  useEffect(() => {
    if (acceptedRequests.length !== 0) {
      connection.invoke(INVOKE_ACCEPT_JOIN_REQUEST, acceptedRequests[0].user, acceptedRequests[0].gameName);
      var acceptedArrayCopy = acceptedRequests;
      acceptedArrayCopy.splice(0, 1);
      setAcceptedRequests(acceptedArrayCopy);
    }
  }, [acceptedRequests]);

  const connectToHub = async (accessToken: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`${BASE_URL}hub`, {
          accessTokenFactory: () => {
            return accessToken;
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on(RECEIVE_MESSAGE, (userMessage: UserMessage, room: string) => {
        room === "Lobby" ? setLobbyMessages((prev) => [...prev, userMessage]) : setGameMessages((prev) => [...prev, userMessage]);
      });

      connection.on(RECEIVE_GAME_INVITATION, (gameInvitation: GameInvitation) => {
        setInvitation({ gameHost: gameInvitation.gameHost, gameName: gameInvitation.gameName });
      });

      connection.on(RECEIVE_ALREADY_CONNECTED, (user: string, message: string) => {
        // change this to prompt error (Snackbar?)
        console.log(user + ": " + message);
      });

      connection.on(RECEIVE_ERROR, (responseMessage: ResponseMessage) => {
        setResponseMessage(responseMessage);
      });

      connection.on(RECEIVE_KICKED, () => {
        setGame(initialGameState);
        setCurrentUser({ ...currentUser, gameProperties: INITIAL_GAME_PROPERTIES });
      });

      connection.on(RECEIVE_CONNECTED_USERS, (connectedUsers: User[]) => {
        setConnectedUsers(connectedUsers);
      });

      connection.on(RECEIVE_GAME, (game: Game) => {
        setGame(game);
        const updatedCurrentUser = game.players.find((p) => p.userName === currentUser.userName);
        updatedCurrentUser && setCurrentUser(updatedCurrentUser);
      });

      connection.on(RECEIVE_JOIN_REQUEST, (player: User) => {
        setPlayersRequestingToJoin((prev) => [...prev, player]);
      });

      await connection.start();

      await connection.invoke(INVOKE_JOIN_LOBBY);
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

  return (
    <ConnectionContext.Provider value={{ connection, closeConnection, joinLobby: connectToHub, connectedUsers }}>
      {children}
    </ConnectionContext.Provider>
  );
}

export const useConnection = () => useContext(ConnectionContext);

export default ConnectionProvider;
