import { Pressable, View } from "react-native";
import { Divider, Menu } from "react-native-paper";
import { useConnection } from "../../../contexts/ConnectionContext";
import { useUser } from "../../../contexts/UserContext";
import { User } from "../../../types/types";
import { INVOKE_KICK_PLAYER, INVOKE_REMOVE_FRIEND, INVOKE_SEND_FRIEND_REQUEST } from "../../../utils/constants";
import UserAvatar from "../../Lobby/UserAvatar";

interface Props {
  player: User;
  menuVisible: boolean;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const PlayerCardMenu = ({ player, menuVisible, setMenuVisible, disabled }: Props) => {
  const { currentUser } = useUser();
  const { connection } = useConnection();

  const PLAYER_IS_A_FRIEND = currentUser.friends.find((friend) => friend.userName === player.userName);
  const PLAYER_IS_GAME_HOST = currentUser.gameProperties.gameHost;
  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <Pressable onPress={() => setMenuVisible((prev) => !prev)}>
          <UserAvatar size={50} avatarCode={player.avatarCode} disabled={disabled} />
        </Pressable>
      }
      style={{ zIndex: 500, position: "absolute" }}
      anchorPosition="bottom"
    >
      {PLAYER_IS_A_FRIEND ? (
        <Menu.Item
          title="Remove friend"
          onPress={() => {
            connection.invoke(INVOKE_REMOVE_FRIEND, currentUser.id, player.id);
          }}
        />
      ) : (
        <Menu.Item
          title="Send friend request"
          onPress={() => {
            connection.invoke(INVOKE_SEND_FRIEND_REQUEST, currentUser.id, player.id);
          }}
        />
      )}

      <Menu.Item
        onPress={() => {
          console.log("LIGGA?");
        }}
        title="Send Message"
      />
      {PLAYER_IS_GAME_HOST && (
        <>
          <Divider />
          <Menu.Item onPress={() => connection.invoke(INVOKE_KICK_PLAYER, player)} title="Kick" />
        </>
      )}
    </Menu>
  );
};

export default PlayerCardMenu;
