import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import { GameInvitation } from "../types/types";

interface Props {
  children: ReactNode;
}

interface InvitationContext {
  setInvitation: React.Dispatch<React.SetStateAction<GameInvitation>>;
  invitation: GameInvitation;
  invitationAccepted: boolean;
  setInvitationAccepted: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvitationContext = createContext<InvitationContext>({
  setInvitation: () => console.warn("no provider found"),
  invitation: {} as GameInvitation,
  invitationAccepted: false,
  setInvitationAccepted: () => console.warn("no provider found."),
});

export const initialInvitationState: GameInvitation = {
  gameHost: "",
  gameName: "",
};

const InvitationProvider = ({ children }: Props) => {
  const [invitation, setInvitation] = useState<GameInvitation>(initialInvitationState);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [invitationAccepted, setInvitationAccepted] = useState(false);

  useEffect(() => {
    if (invitation !== initialInvitationState) setDialogVisible(true);
  }, [invitation]);

  const acceptInvitation = () => {
    setInvitationAccepted(true);
    setDialogVisible(false);
  };

  const rejectInvitation = () => {
    setInvitationAccepted(false);
    setInvitation(initialInvitationState);
    setDialogVisible(false);
  };

  return (
    <InvitationContext.Provider value={{ invitation, setInvitation, invitationAccepted, setInvitationAccepted }}>
      {children}
      {invitation !== initialInvitationState && (
        <Portal>
          <Dialog visible={dialogVisible}>
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
    </InvitationContext.Provider>
  );
};

export const useInvitation = () => useContext(InvitationContext);

export default InvitationProvider;
