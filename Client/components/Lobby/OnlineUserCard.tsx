import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Divider, Menu, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { initialGameState, useGame } from "../../contexts/GameContext";
import { useSnackBar } from "../../contexts/SnackContext";
import { useUser } from "../../contexts/UserContext";
import { User } from "../../types/types";
import { INVOKE_INVITE_PLAYER, INVOKE_SEND_FRIEND_REQUEST } from "../../utils/constants";
import UserAvatar from "./UserAvatar";

interface Props {
  user: User;
  closeModal?: () => void;
  online?: boolean;
}

const OnlineUserCard = ({ user, closeModal, online }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { currentUser } = useUser();
  const { connection } = useConnection();
  const { game } = useGame();
  const { setResponseMessage } = useSnackBar();

  const invitePlayer = () => {
    connection.invoke(INVOKE_INVITE_PLAYER, currentUser, user.userName);
    if (closeModal) closeModal();
    setResponseMessage({ status: "Success", message: `You have invited ${user.userName} to join ${game.gameName}!` });
  };

  if (user.userName === currentUser.userName)
    return (
      <OnlineUserContainer>
        <UserAvatar size={30} avatarCode={user.avatarCode} />
        <UserName>{user.userName} (you)</UserName>
      </OnlineUserContainer>
    );

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <Pressable onPress={() => setMenuVisible((prev) => !prev)}>
          <OnlineUserContainer>
            <View style={{ flexDirection: "row", alignItems: "center", opacity: online ? 1 : 0.4 }}>
              <UserAvatar size={30} avatarCode={user.avatarCode} />
              <UserName>{user.userName}</UserName>
            </View>
          </OnlineUserContainer>
        </Pressable>
      }
      style={{ zIndex: 500, position: "absolute" }}
      anchorPosition="bottom"
    >
      {currentUser.userName !== user.userName && game !== initialGameState && online && !game.players.find((p) => p.userName == user.userName) && (
        <>
          <Menu.Item onPress={() => invitePlayer()} title="Invite to game" />
          <Divider />
        </>
      )}

      {currentUser.friends.find((friend) => friend.userName === user.userName) ? (
        <Menu.Item
          onPress={() => {
            console.log("HERE I REMOVE YO AS FREND! FUK U");
          }}
          title="Remove friend"
        />
      ) : (
        <Menu.Item
          onPress={() => {
            connection.invoke(INVOKE_SEND_FRIEND_REQUEST, currentUser.id, user.id);
          }}
          title="Send friend request"
        />
      )}
      <Menu.Item
        onPress={() => {
          console.log("LIGGA?");
        }}
        title="Send Message"
      />
    </Menu>
  );
};

export default OnlineUserCard;

const OnlineUserContainer = styled(Surface)`
  flex-direction: row;
  align-items: center;
  margin: 0 5px 10px 5px;
  padding: 5px;
  border-radius: 10px;
`;

const UserName = styled(Text)`
  margin-left: 15px;
  flex: 1;
`;
