import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Divider, Menu, Surface } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../../contexts/ConnectionContext";
import { useUser } from "../../../contexts/UserContext";
import { User } from "../../../types/types";
import { INVOKE_KICK_PLAYER, INVOKE_SEND_FRIEND_REQUEST } from "../../../utils/constants";
import UserAvatar from "../../Lobby/UserAvatar";
import ValueDice from "../game-assets/ValueDice";

interface Props {
  player: User;
  disabled?: boolean;
}

const PlayerCard = ({ player, disabled }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { currentUser } = useUser();
  const { connection } = useConnection();

  return (
    <Container>
      {currentUser.userName !== player.userName ? (
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Pressable onPress={() => setMenuVisible((prev) => !prev)}>
              <UserAvatar size={50} avatarCode={player.avatarCode} disabled={disabled} />
            </Pressable>
          }
          style={{ zIndex: 500, position: "absolute" }}
          anchorPosition="bottom"
        >
          <Menu.Item
            onPress={() => {
              connection.invoke(INVOKE_SEND_FRIEND_REQUEST, currentUser.id, player.id);
            }}
            title="Send friend request"
          />
          <Menu.Item
            onPress={() => {
              console.log("LIGGA?");
            }}
            title="Send Message"
          />
          {currentUser.gameProperties.gameHost && (
            <>
              <Divider />
              <Menu.Item onPress={() => connection.invoke(INVOKE_KICK_PLAYER, player)} title="Kick" />
            </>
          )}
        </Menu>
      ) : (
        <UserAvatar size={50} avatarCode={player.avatarCode} disabled={disabled} />
      )}

      <NameContainer>
        <Text numberOfLines={1} style={{ width: "100%", paddingHorizontal: 2 }}>
          {player.userName}
        </Text>
      </NameContainer>
      {player.gameProperties.gameHost && (
        <GameHostCrown>
          <MaterialCommunityIcons name="crown" size={18} color="yellow" />
        </GameHostCrown>
      )}

      {/* Experiment with viewing one dice with a value to represent nr of dice left */}
      <View style={{ position: "absolute", left: -5, top: -7 }}>
        <ValueDice size={25} value={player.gameProperties.dice.length} />
      </View>
    </Container>
  );
};

export default PlayerCard;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const GameHostCrown = styled.View`
  position: absolute;
  top: -10px;
  right: 2px;
  border-radius: 50px;
  padding: 2px;
`;

const NameContainer = styled(Surface)`
  background-color: lightgoldenrodyellow;
  position: absolute;
  top: 50px;

  border-radius: 3px;
  padding: 0px 3px;
  margin-top: 3px;
`;
