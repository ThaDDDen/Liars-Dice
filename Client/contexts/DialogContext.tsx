import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import { AcceptedRequest, GameInvitation, User } from "../types/types";
import { useGame } from "./GameContext";

interface Props {
  children: ReactNode;
}

interface DialogContext {
  setInvitation: React.Dispatch<React.SetStateAction<GameInvitation>>;
  invitation: GameInvitation;
  invitationAccepted: boolean;
  setInvitationAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  playersRequestingToJoin: User[];
  setPlayersRequestingToJoin: React.Dispatch<React.SetStateAction<User[]>>;
  acceptedRequests: AcceptedRequest[];
  setAcceptedRequests: React.Dispatch<React.SetStateAction<AcceptedRequest[]>>;
}

const DialogContext = createContext<DialogContext>({
  setInvitation: () => console.warn("no provider found"),
  invitation: {} as GameInvitation,
  invitationAccepted: false,
  setInvitationAccepted: () => console.warn("no provider found."),
  playersRequestingToJoin: [],
  setPlayersRequestingToJoin: () => console.warn("no provider found"),
  acceptedRequests: [],
  setAcceptedRequests: () => console.warn("no provider found."),
});

export const initialInvitationState: GameInvitation = {
  gameHost: "",
  gameName: "",
};

const DialogProvider = ({ children }: Props) => {
  const [invitation, setInvitation] = useState<GameInvitation>(initialInvitationState);
  const [invitationDialogVisible, setInvitationDialogVisible] = useState(false);
  const [joinRequestDialogVisible, setJoinRequestDialogVisible] = useState(false);
  const [invitationAccepted, setInvitationAccepted] = useState(false);
  const [playersRequestingToJoin, setPlayersRequestingToJoin] = useState<User[]>([]);
  const [acceptedRequests, setAcceptedRequests] = useState<AcceptedRequest[]>([]);
  const { game } = useGame();

  useEffect(() => {
    if (invitation !== initialInvitationState) setInvitationDialogVisible(true);
  }, [invitation]);

  const acceptInvitation = () => {
    setInvitationAccepted(true);
    setInvitationDialogVisible(false);
  };

  const rejectInvitation = () => {
    setInvitationAccepted(false);
    setInvitation(initialInvitationState);
    setInvitationDialogVisible(false);
  };

  const acceptJoinRequest = (user: User) => {
    setAcceptedRequests((prev) => [...prev, { user: user, gameName: game.gameName }]);
    var requestsArrayCopy = [...playersRequestingToJoin];
    requestsArrayCopy.splice(0, 1);
    setPlayersRequestingToJoin(requestsArrayCopy);
  };

  const rejectJoinRequest = () => {
    if (playersRequestingToJoin.length > 1) {
      var requestsArrayCopy = [...playersRequestingToJoin];
      requestsArrayCopy.splice(0, 1);
      setPlayersRequestingToJoin(requestsArrayCopy);
    } else {
      setPlayersRequestingToJoin([]);
    }
  };

  return (
    <DialogContext.Provider
      value={{
        invitation,
        setInvitation,
        invitationAccepted,
        setInvitationAccepted,
        playersRequestingToJoin,
        setPlayersRequestingToJoin,
        acceptedRequests,
        setAcceptedRequests,
      }}
    >
      {children}
      {invitation !== initialInvitationState && (
        <Portal>
          <Dialog visible={invitationDialogVisible}>
            <Dialog.Title>You have been invited to a game!</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {invitation.gameHost} has invited you to their game "{invitation.gameName}"! Would you like to join?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => acceptInvitation()}>Lets play!</Button>
              <Button onPress={() => rejectInvitation()}>Nah.</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
      {playersRequestingToJoin.length !== 0 && (
        <Portal>
          <Dialog visible={playersRequestingToJoin.length !== 0}>
            <Dialog.Title>Someone wants to play!</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {playersRequestingToJoin[0].userName} {playersRequestingToJoin.length} wants to join your game!
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => acceptJoinRequest(playersRequestingToJoin[0])}>Accept!</Button>
              <Button onPress={() => rejectJoinRequest()}>Decline.</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);

export default DialogProvider;
