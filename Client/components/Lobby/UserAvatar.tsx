import multiavatar from "@multiavatar/multiavatar";
import { View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";
import { useUser } from "../../contexts/UserContext";
import { User } from "../../types/types";

interface Props {
  user?: User;
  size: number;
  disabled?: boolean;
  placeholder?: boolean;
}

const UserAvatar = ({ user, size, disabled, placeholder }: Props) => {
  const { colors } = useTheme();
  const { currentUser } = useUser();
  return (
    <>
      <Container>
        {user?.avatarCode === "BotAvatar" ? (
          <Avatar.Icon size={size} icon="robot-happy-outline" />
        ) : placeholder ? (
          <Avatar.Icon size={size} icon="account-plus" style={{ backgroundColor: colors.tertiary }} />
        ) : user && user.id !== currentUser.id ? (
          <View style={disabled && { opacity: 0.3, transform: [{ rotate: "180deg" }] }}>
            <SvgXml xml={multiavatar(user?.avatarCode)} width={size} height={size} />
          </View>
        ) : (
          user && (
            <View style={disabled && { opacity: 0.3, transform: [{ rotate: "180deg" }] }}>
              <SvgXml xml={multiavatar(user?.avatarCode)} width={size} height={size} />
            </View>
          )
        )}
      </Container>
    </>
  );
};

export default UserAvatar;

const Container = styled.View`
  border-radius: "50%";
`;
