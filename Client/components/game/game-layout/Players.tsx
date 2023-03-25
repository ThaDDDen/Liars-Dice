import { Pressable, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useGame } from "../../../contexts/GameContext";
import { useProfileModalize } from "../../../contexts/ProfileModalizeContext";
import { useUser } from "../../../contexts/UserContext";
import { User } from "../../../types/types";

import {
  EIGHT_SEAT_TABLE,
  FIVE_SEAT_TABLE,
  FOUR_SEAT_TABLE,
  SEVEN_SEAT_TABLE,
  SIX_SEAT_TABLE,
  THREE_SEAT_TABLE,
  TWO_SEAT_TABLE,
} from "../../../utils/constants";
import ValueDice from "../game-assets/ValueDice";
import PlayerCard from "./PlayerCard";

interface Props {
  setBetTime: React.Dispatch<React.SetStateAction<number>>;
}

const Players = ({ setBetTime }: Props) => {
  const { setFetchUser } = useProfileModalize();
  const { game } = useGame();
  const { currentUser } = useUser();
  const { colors } = useTheme();

  const handlePressUser = (player: User) => {
    if (player.id !== currentUser.id) setFetchUser(player);
  };

  return (
    <>
      {game.players.map((player, index) => (
        <Pressable
          key={index}
          onPress={() => handlePressUser(player)}
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
          {game.currentBet && game.currentBet.better.userName === player.userName && (
            <View
              style={{
                position: "absolute",
                zIndex: 5000,
                width: 65,
                flexDirection: "row",
                flexWrap: "nowrap",
                backgroundColor: colors.primary,
                padding: 5,
                borderRadius: 20,
                top: -40,
                left: 15,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: colors.primary,
                  position: "absolute",
                  transform: [{ rotate: "60deg" }],
                  bottom: -2,
                  left: 15,
                }}
              ></View>
              <Text style={{ fontFamily: "Manrope-Bold", fontSize: 15 }}>
                {game.currentBet.diceAmount} x <ValueDice value={game.currentBet.diceValue} size={15} />
              </Text>
            </View>
          )}
          {!game.roundStarted && game.roundResult.round !== 0 && game.roundResult.caller === player.userName && (
            <View
              style={{
                position: "absolute",
                zIndex: 5000,
                width: 65,
                flexDirection: "row",
                flexWrap: "nowrap",
                backgroundColor: colors.primary,
                padding: 5,
                borderRadius: 20,
                top: -40,
                left: 15,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: colors.primary,
                  position: "absolute",
                  transform: [{ rotate: "60deg" }],
                  bottom: -2,
                  left: 15,
                }}
              ></View>
              <Text style={{ fontFamily: "Manrope-Bold", fontSize: 15 }}>CALL!</Text>
            </View>
          )}
          <PlayerCard setBetTime={setBetTime} disabled={player.gameProperties.isOut} player={player} />
        </Pressable>
      ))}
    </>
  );
};

export default Players;
