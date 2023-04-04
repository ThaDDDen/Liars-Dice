import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import { useGame } from "../../../contexts/GameContext";
import { useUser } from "../../../contexts/UserContext";
import {
  EIGHT_SEAT_TABLE,
  FIVE_SEAT_TABLE,
  FOUR_SEAT_TABLE,
  SEVEN_SEAT_TABLE,
  SIX_SEAT_TABLE,
  THREE_SEAT_TABLE,
  TWO_SEAT_TABLE,
} from "../../../utils/constants";
import UserAvatar from "../../Lobby/UserAvatar";

const PlaceHolders = () => {
  const navigation = useNavigation<DrawerNavigationHelpers>();
  const { game } = useGame();
  const { currentUser } = useUser();

  return (
    <>
      {Array.from({ length: game.playerCount - game.players.length }, (value, index) => (
        <Pressable
          key={index}
          style={
            game.playerCount == 7
              ? SEVEN_SEAT_TABLE[index + game.players.length]
              : game.playerCount == 6
              ? SIX_SEAT_TABLE[index + game.players.length]
              : game.playerCount == 5
              ? FIVE_SEAT_TABLE[index + game.players.length]
              : game.playerCount == 4
              ? FOUR_SEAT_TABLE[index + game.players.length]
              : game.playerCount == 3
              ? THREE_SEAT_TABLE[index + game.players.length]
              : game.playerCount == 2
              ? TWO_SEAT_TABLE[index + game.players.length]
              : EIGHT_SEAT_TABLE[index + game.players.length]
          }
          onPress={() => currentUser.gameProperties.gameHost && navigation.getParent("rightDrawer")?.dispatch(DrawerActions.toggleDrawer())}
        >
          <UserAvatar size={50} placeholder />
        </Pressable>
      ))}
    </>
  );
};

export default PlaceHolders;
