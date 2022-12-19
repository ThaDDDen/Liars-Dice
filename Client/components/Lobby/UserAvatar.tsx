import multiavatar from "@multiavatar/multiavatar";
import { Avatar } from "react-native-paper";
import { SvgXml } from "react-native-svg";

interface Props {
  avatarCode: string;
}

const UserAvatar = ({ avatarCode }: Props) => {
  return (
    <>
      {avatarCode === "BotAvatar" ? (
        <Avatar.Icon size={30} icon="robot-happy-outline" />
      ) : (
        <SvgXml xml={multiavatar(avatarCode)} width={30} height={30} />
      )}
    </>
  );
};

export default UserAvatar;
