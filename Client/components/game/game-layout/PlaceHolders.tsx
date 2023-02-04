import { Pressable } from "react-native";
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
import UserAvatar from "../../Lobby/UserAvatar";

interface Props {
  openOnlineUsersModal: () => void;
}

const PlaceHolders = ({ openOnlineUsersModal }: Props) => {
  const { game } = useGame();

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
          onPress={() => openOnlineUsersModal()}
        >
          <UserAvatar size={50} avatarCode="PlaceHolder" />
        </Pressable>
      ))}
    </>
  );
};

export default PlaceHolders;
