import multiavatar from "@multiavatar/multiavatar";
import { View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { SvgXml } from "react-native-svg";

interface Props {
  avatarCode: string;
  size: number;
}

const UserAvatar = ({ avatarCode, size }: Props) => {
  const { colors } = useTheme();
  return (
    <View>
      {avatarCode === "BotAvatar" ? (
        <Avatar.Icon size={size} icon="robot-happy-outline" />
      ) : avatarCode === "PlaceHolder" ? (
        <Avatar.Icon size={size} icon="account" style={{ backgroundColor: colors.tertiary }} />
      ) : (
        <SvgXml xml={multiavatar(avatarCode)} width={size} height={size} />
      )}
    </View>
  );
};

export default UserAvatar;
