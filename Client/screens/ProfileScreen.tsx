import multiavatar from "@multiavatar/multiavatar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";
import Background from "../components/layout/Background";
import { useConnection } from "../contexts/ConnectionContext";
import { useUser } from "../contexts/UserContext";
import { RootStackParams } from "../navigation/RootStackNavigator";

type NavigationProps = NativeStackScreenProps<RootStackParams>;

const ProfileScreen = ({ navigation }: NavigationProps) => {
  const { logout, setToken, setMessages } = useUser();
  const { closeConnection } = useConnection();
  const { colors } = useTheme();
  const { currentUser, token, setCurrentUser } = useUser();
  const [randomAvatarCode, setRandomAvatarCode] = useState("");

  const handleLogout = () => {
    logout();
    setToken("");
    setMessages([]);
    closeConnection();
  };

  const randomAvatar = () => {
    var randomNumber = Math.random() * (474747474747 - 100000000000) + 100000000000;
    setRandomAvatarCode(Math.floor(randomNumber).toString());
  };

  const saveAvatar = async () => {
    const response = await fetch(`http://192.168.0.4:5141/api/auth/updateavatar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(randomAvatarCode),
    });

    if (response.status === 200) {
      var userCopy = currentUser;
      userCopy.avatarCode = randomAvatarCode;
      setCurrentUser(userCopy);
    }
  };

  return (
    <Background>
      <Container>
        <Header>
          <HeaderTitle variant="headlineSmall" color={colors.secondaryContainer}>
            Lobby
          </HeaderTitle>
        </Header>
        <View>
          <SvgXml xml={multiavatar(randomAvatarCode ? randomAvatarCode : currentUser.avatarCode)} width={150} height={150} />
          <IconButton icon="shuffle-variant" iconColor={colors.primary} size={20} onPress={() => randomAvatar()} />
          {randomAvatarCode && <IconButton icon="content-save" iconColor={colors.primary} size={20} onPress={() => saveAvatar()} />}
          <Button mode="contained" onPress={() => handleLogout()}>
            Log out
          </Button>
        </View>
      </Container>
    </Background>
  );
};

export default ProfileScreen;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const HeaderTitle = styled(Text)<{ color: string }>`
  color: ${({ color }) => color};
  margin-right: auto;
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 10px;
`;
