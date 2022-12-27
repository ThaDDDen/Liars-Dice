import multiavatar from "@multiavatar/multiavatar";
import { View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";

interface Props {
  avatarCode: string;
  size: number;
  disabled?: boolean;
}

const UserAvatar = ({ avatarCode, size, disabled }: Props) => {
  const { colors } = useTheme();
  return (
    <Container>
      {avatarCode === "BotAvatar" ? (
        <Avatar.Icon size={size} icon="robot-happy-outline" />
      ) : avatarCode === "PlaceHolder" ? (
        <Avatar.Icon size={size} icon="account-plus" style={{ backgroundColor: colors.tertiary }} />
      ) : (
        <View style={disabled && { opacity: 0.3, transform: [{ rotate: "180deg" }] }}>
          <SvgXml xml={multiavatar(avatarCode)} width={size} height={size} />
        </View>
      )}
    </Container>
  );
};

export default UserAvatar;

const Container = styled.View`
  border-radius: "50%";
`;
