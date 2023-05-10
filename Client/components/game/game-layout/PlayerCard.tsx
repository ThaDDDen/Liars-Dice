import { MaterialCommunityIcons } from "@expo/vector-icons";
import multiavatar from "@multiavatar/multiavatar";
import React from "react";
import { Text, View } from "react-native";
import { Surface } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";
import { useGame } from "../../../contexts/GameContext";
import { User } from "../../../types/types";
import UserAvatar from "../../Lobby/UserAvatar";
import ValueDice from "../game-assets/ValueDice";
import CountDownCircle from "./CountDownCircle";

interface Props {
  player?: User;
  disabled?: boolean;
  setBetTime?: React.Dispatch<React.SetStateAction<number>>;
  name?: string;
}

const PlayerCard = ({ player, disabled, setBetTime, name }: Props) => {
  const { game } = useGame();

  if (!player || !setBetTime)
    return (
      <Container>
        <View>
          <SvgXml xml={multiavatar(Math.random().toString(36).substring(2, 9))} width={50} height={50} />
        </View>
        <NameContainer>
          <PlayerName numberOfLines={1}>{name}</PlayerName>
        </NameContainer>
        <DiceCountContainer>
          <ValueDice size={25} value={6} />
        </DiceCountContainer>
      </Container>
    );

  const IS_PLAYERS_TURN = game.currentBetter && game.roundStarted && game.currentBetter.userName === player.userName;

  return (
    <Container>
      {IS_PLAYERS_TURN && <CountDownCircle isPlaying={IS_PLAYERS_TURN} setBetTime={setBetTime} />}

      <UserAvatar size={50} user={player} disabled={disabled} />

      <NameContainer>
        <PlayerName numberOfLines={1}>{player.userName}</PlayerName>
      </NameContainer>
      {player.gameProperties.gameHost && (
        <GameHostCrown>
          <MaterialCommunityIcons name="crown" size={18} color="yellow" />
        </GameHostCrown>
      )}
      <DiceCountContainer>
        <ValueDice size={25} value={player.gameProperties.dice.length} />
      </DiceCountContainer>
    </Container>
  );
};

export default PlayerCard;

const DiceCountContainer = styled.View`
  position: absolute;
  left: -5px;
  top: -7px;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const PlayerName = styled(Text)`
  width: 100%;
  padding: 0 2px;
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
