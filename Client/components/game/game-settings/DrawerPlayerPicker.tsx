import multiavatar from "@multiavatar/multiavatar";
import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";
import { useGame } from "../../../contexts/GameContext";

interface Props {
  playerCount: number;
  setPlayerCount: React.Dispatch<React.SetStateAction<number>>;
}

const DrawerPlayerPicker = ({ playerCount, setPlayerCount }: Props) => {
  const { game } = useGame();
  return (
    <View>
      <View style={{ marginRight: "auto", flexDirection: "row" }}>
        {Array.from({ length: playerCount }, (value, key) => (
          <View key={key}>
            <SvgXml xml={multiavatar((key + 1).toString())} width={30} height={30} />
          </View>
        ))}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <SettingsButton
          icon="minus"
          onPress={() => {
            playerCount !== game.players.length && setPlayerCount((prev) => prev - 1);
          }}
        />
        <SettingsButton
          icon="plus"
          onPress={() => {
            playerCount !== 8 && setPlayerCount((prev) => prev + 1);
          }}
        />
      </View>
    </View>
  );
};

export default DrawerPlayerPicker;
const SettingsButton = styled(IconButton)`
  margin: 0 10px;
`;
