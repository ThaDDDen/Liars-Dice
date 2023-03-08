import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Portal, Text } from "react-native-paper";
import CustomDialog from "../components/layout/CustomDialog";
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
  friendRequests: string[];
  setFriendRequests: React.Dispatch<React.SetStateAction<string[]>>;
  acceptedFriendRequests: string[];
  setAcceptedFriendRequests: React.Dispatch<React.SetStateAction<string[]>>;
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
  friendRequests: [],
  setFriendRequests: () => console.warn("no provider found."),
  acceptedFriendRequests: [],
  setAcceptedFriendRequests: () => console.warn("no provider found."),
});

export const initialInvitationState: GameInvitation = {
  gameHost: "",
  gameName: "",
};

const DialogProvider = ({ children }: Props) => {
  const [invitation, setInvitation] = useState<GameInvitation>(initialInvitationState);
  const [invitationDialogVisible, setInvitationDialogVisible] = useState(false);
  const [invitationAccepted, setInvitationAccepted] = useState(false);
  const [playersRequestingToJoin, setPlayersRequestingToJoin] = useState<User[]>([]);
  const [acceptedRequests, setAcceptedRequests] = useState<AcceptedRequest[]>([]);
  const [friendRequests, setFriendRequests] = useState<string[]>([]);
  const [acceptedFriendRequests, setAcceptedFriendRequests] = useState<string[]>([]);
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

  const acceptFriendRequest = (friend: string) => {
    setAcceptedFriendRequests((prev) => [...prev, friend]);
    setFriendRequests((prev) => prev.filter((f) => f !== friend));
  };

  const rejectFriendRequest = (friend: string) => {
    setFriendRequests((prev) => prev.filter((f) => f !== friend));
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
        friendRequests,
        setFriendRequests,
        acceptedFriendRequests,
        setAcceptedFriendRequests,
      }}
    >
      {children}
      {invitation !== initialInvitationState && (
        <Portal>
          <CustomDialog
            visible={invitationDialogVisible}
            headerLabel={"INVITATION"}
            content={
              <Text style={{ fontFamily: "Manrope-SemiBold", letterSpacing: 0.25, lineHeight: 23, textAlign: "center" }}>
                {invitation.gameHost} has invited you to their game "{invitation.gameName}"! Would you like to join?
              </Text>
            }
            leftButtonLabel={"JOIN"}
            leftButtonAction={acceptInvitation}
            rightButtonLabel={"HIDE"}
            rightButtonAction={rejectInvitation}
          />
        </Portal>
      )}
      {playersRequestingToJoin.length !== 0 && (
        <Portal>
          <CustomDialog
            visible={playersRequestingToJoin.length !== 0}
            headerLabel={"JOIN REQUEST"}
            content={
              <Text style={{ fontFamily: "Manrope-SemiBold", letterSpacing: 0.25, lineHeight: 23, textAlign: "center" }}>
                {playersRequestingToJoin[0].userName} wants to join your game!
              </Text>
            }
            leftButtonLabel={"OK"}
            leftButtonAction={() => acceptJoinRequest(playersRequestingToJoin[0])}
            rightButtonLabel={"DENY"}
            rightButtonAction={rejectJoinRequest}
          />
        </Portal>
      )}
      {friendRequests.length !== 0 && (
        <Portal>
          <CustomDialog
            visible={friendRequests.length !== 0}
            headerLabel={"FRIEND REQUEST"}
            content={
              <Text style={{ fontFamily: "Manrope-SemiBold", letterSpacing: 0.25, lineHeight: 23, textAlign: "center" }}>
                {friendRequests[0]} would like to add you as a friend!
              </Text>
            }
            leftButtonLabel={"ACCEPT"}
            leftButtonAction={() => acceptFriendRequest(friendRequests[0])}
            rightButtonLabel={"DENY"}
            rightButtonAction={() => rejectFriendRequest(friendRequests[0])}
          />
        </Portal>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);

export default DialogProvider;
