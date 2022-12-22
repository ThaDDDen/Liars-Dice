import { StyleSheet, View } from "react-native";
import React from "react";
import { IconButton, useTheme, Text } from "react-native-paper";
import styled from "styled-components/native";

interface Props {
  playerCount: number;
  setPlayerCount: React.Dispatch<React.SetStateAction<number>>;
}

const PlayerPicker = ({ playerCount, setPlayerCount }: Props) => {
  const { colors } = useTheme();

  const playerCountArray = [1, 2, 3, 4, 5, 6, 7, 8];

  const playerCountSelector = playerCountArray.map((number, index) => {
    return (
      <Text
        key={index}
        variant={number === playerCount ? "headlineLarge" : "headlineMedium"}
        style={{ marginHorizontal: 8, color: number === playerCount ? colors.primary : colors.onSurface }}
      >
        {number}
      </Text>
    );
  });
  return (
    <PlayerSetting>
      <IconButton
        style={{ borderRadius: 5, backgroundColor: colors.surfaceVariant }}
        icon="minus"
        size={20}
        onPress={() => playerCount !== 1 && setPlayerCount((prev) => prev - 1)}
      />
      <PlayerContainer>{playerCountSelector}</PlayerContainer>
      <IconButton
        style={{ borderRadius: 5, backgroundColor: colors.surfaceVariant }}
        icon="plus"
        size={20}
        onPress={() => playerCount !== 8 && setPlayerCount((prev) => prev + 1)}
      />
    </PlayerSetting>
  );
};

export default PlayerPicker;

const PlayerSetting = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const PlayerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
