import { View } from "react-native";
import { useGame } from "../../../contexts/GameContext";
import {
  EIGHT_SEAT_TABLE,
  FIVE_SEAT_TABLE,
  FOUR_SEAT_TABLE,
  SEVEN_SEAT_TABLE,
  SIX_SEAT_TABLE,
  THREE_SEAT_TABLE,
  TWO_SEAT_TABLE,
} from "../../../utils/constants";
import PlayerCard from "./PlayerCard";

interface Props {
  setBetTime: React.Dispatch<React.SetStateAction<number>>;
}

const Players = ({ setBetTime }: Props) => {
  const { game } = useGame();

  return (
    <>
      {game.players.map((player, index) => (
        <View
          key={index}
          style={
            game.playerCount == 7
              ? SEVEN_SEAT_TABLE[index]
              : game.playerCount == 6
              ? SIX_SEAT_TABLE[index]
              : game.playerCount == 5
              ? FIVE_SEAT_TABLE[index]
              : game.playerCount == 4
              ? FOUR_SEAT_TABLE[index]
              : game.playerCount == 3
              ? THREE_SEAT_TABLE[index]
              : game.playerCount == 2
              ? TWO_SEAT_TABLE[index]
              : EIGHT_SEAT_TABLE[index]
          }
        >
          <PlayerCard setBetTime={setBetTime} disabled={player.gameProperties.isOut} player={player} />
        </View>
      ))}
    </>
  );
};

export default Players;
