import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import { useProfileModalize } from "../../contexts/ProfileModalizeContext";
import { useUser } from "../../contexts/UserContext";
import { User } from "../../types/types";
import UserAvatar from "./UserAvatar";

interface Props {
  user: User;
  closeModal?: () => void;
  online?: boolean;
}

const OnlineUserCard = ({ user, online }: Props) => {
  const { currentUser } = useUser();
  const { setFetchUser } = useProfileModalize();

  if (user.userName === currentUser.userName)
    return (
      <OnlineUserContainer>
        <UserAvatar size={30} user={user} />
        <UserName>{user.userName} (you)</UserName>
      </OnlineUserContainer>
    );

  return (
    <Pressable onPress={() => setFetchUser(user)}>
      <OnlineUserContainer>
        <View style={{ flexDirection: "row", alignItems: "center", opacity: online ? 1 : 0.4 }}>
          <UserAvatar size={30} user={user} />
          <UserName>{user.userName}</UserName>
        </View>
      </OnlineUserContainer>
    </Pressable>
  );
};

export default OnlineUserCard;

const OnlineUserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 5px 10px 5px;
  padding: 5px;
  border-radius: 10px;
`;

const UserName = styled(Text)`
  margin-left: 15px;
  font-family: "Manrope-Bold";
  font-size: 16px;
  flex: 1;
`;
