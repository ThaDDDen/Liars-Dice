import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { DragSortableView } from "react-native-drag-sort";
import { Button, Dialog, Portal, Surface } from "react-native-paper";
import styled from "styled-components/native";
import { useGame } from "../../contexts/GameContext";
import { User } from "../../types/types";
import UserAvatar from "../Lobby/UserAvatar";

const { width } = Dimensions.get("window");

const parentWidth = width;
const childrenWidth = width;
const childrenHeight = 48;

interface Props {
  orderSorterVisible: boolean;
  setOrderSorterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updatePlayerOrder: (players: User[]) => void;
}

const GameLobby = ({ orderSorterVisible, setOrderSorterVisible, updatePlayerOrder }: Props) => {
  const { game } = useGame();
  const [players, setPlayers] = useState<User[]>(game.players);

  useEffect(() => {
    setPlayers(game.players);
  }, [game]);

  return (
    <Portal>
      <Dialog visible={orderSorterVisible} onDismiss={() => setOrderSorterVisible(false)}>
        <Text>Drag and drop to change the play order!</Text>
        <Dialog.Content>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <DragSortableView
              dataSource={players}
              parentWidth={parentWidth}
              childrenWidth={childrenWidth}
              childrenHeight={childrenHeight}
              scaleStatus={"scale"}
              maxScale={1.5}
              onDataChange={(playerList) => {
                if (playerList != players) setPlayers(playerList);
              }}
              delayLongPress={0}
              renderItem={(item, index) => {
                return (
                  <PlayerContainer>
                    <UserAvatar size={30} avatarCode={item.avatarCode} />
                    <Text>{item.userName}</Text>
                  </PlayerContainer>
                );
              }}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              updatePlayerOrder(players);
              setOrderSorterVisible(false);
            }}
          >
            Done
          </Button>
          <Button onPress={() => setOrderSorterVisible(false)}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default GameLobby;

const PlayerContainer = styled(Surface)`
  flex-direction: row;
  align-items: center;
  margin: 0 5px 10px 5px;
  padding: 5px;
  border-radius: 10px;
`;