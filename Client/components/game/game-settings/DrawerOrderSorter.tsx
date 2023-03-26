import React from "react";
import { Dimensions, Text, View } from "react-native";
import { DragSortableView } from "react-native-drag-sort";
import { useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useGame } from "../../../contexts/GameContext";
import { User } from "../../../types/types";
import UserAvatar from "../../Lobby/UserAvatar";

const { width } = Dimensions.get("window");

const parentWidth = width;
const childrenWidth = width;
const childrenHeight = 48;

interface Props {
  setPlayers: React.Dispatch<React.SetStateAction<User[]>>;
}

const DrawerOrderSorter = ({ setPlayers }: Props) => {
  const { game } = useGame();
  const { colors } = useTheme();
  return (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <DragSortableView
        dataSource={game.players}
        parentWidth={parentWidth}
        childrenWidth={childrenWidth}
        childrenHeight={childrenHeight}
        scaleStatus={"scale"}
        maxScale={1.5}
        onDataChange={(playerList) => {
          if (playerList != game.players) setPlayers(playerList);
        }}
        delayLongPress={0}
        renderItem={(player) => {
          return (
            <PlayerContainer>
              <UserAvatar size={30} user={player} />
              <Text style={{ fontFamily: "Manrope-SemiBold", color: colors.onPrimaryContainer, fontSize: 16, marginHorizontal: 15 }}>
                {player.userName}
              </Text>
            </PlayerContainer>
          );
        }}
      />
    </View>
  );
};

export default DrawerOrderSorter;

const PlayerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 5px 10px 5px;
  padding: 5px;
  border-radius: 10px;
  align-self: center;
`;
