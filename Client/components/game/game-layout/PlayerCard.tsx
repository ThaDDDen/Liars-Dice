import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text } from "react-native";
import { Surface } from "react-native-paper";
import styled from "styled-components/native";
import { useGame } from "../../../contexts/GameContext";
import { useUser } from "../../../contexts/UserContext";
import { User } from "../../../types/types";
import UserAvatar from "../../Lobby/UserAvatar";
import ValueDice from "../game-assets/ValueDice";
import CountDownCircle from "./CountDownCircle";
import PlayerCardMenu from "./PlayerCardMenu";

interface Props {
  player: User;
  disabled?: boolean;
  setBetTime: React.Dispatch<React.SetStateAction<number>>;
}

const PlayerCard = ({ player, disabled, setBetTime }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { currentUser } = useUser();
  const { game } = useGame();

  const IS_PLAYERS_TURN = game.currentBetter && game.roundStarted && game.currentBetter.userName === player.userName;
  const PLAYER_IS_NOT_CURRENT_USER = currentUser.userName !== player.userName;

  return (
    <Container>
      {IS_PLAYERS_TURN && <CountDownCircle isPlaying={IS_PLAYERS_TURN} setBetTime={setBetTime} />}
      {PLAYER_IS_NOT_CURRENT_USER ? (
        <PlayerCardMenu player={player} menuVisible={menuVisible} setMenuVisible={setMenuVisible} disabled={disabled} />
      ) : (
        <UserAvatar size={50} avatarCode={player.avatarCode} disabled={disabled} />
      )}
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
