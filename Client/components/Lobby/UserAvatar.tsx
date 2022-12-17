import { Avatar } from "react-native-paper";

interface Props {
  username: string;
}

const UserAvatar = ({ username }: Props) => {
  return (
    <>
      {username === "LobbyBot" ? (
        <Avatar.Icon size={30} icon="robot-happy-outline" />
      ) : (
        <Avatar.Text size={30} label={username.slice(0, 2).toUpperCase()} />
      )}
    </>
  );
};

export default UserAvatar;
