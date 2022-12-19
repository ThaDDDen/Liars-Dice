import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import Background from "../components/layout/Background";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import ProfileSettings from "../components/profile/ProfileSettings";
import ProfileStatistics from "../components/profile/ProfileStatistics";
import { useConnection } from "../contexts/ConnectionContext";
import { useUser } from "../contexts/UserContext";
import { RootStackParams } from "../navigation/RootStackNavigator";

type NavigationProps = NativeStackScreenProps<RootStackParams>;

const ProfileScreen = ({ navigation }: NavigationProps) => {
  const { logout, setToken, setMessages, currentUser } = useUser();
  const { closeConnection } = useConnection();
  const { colors } = useTheme();

  console.log(currentUser);

  const handleLogout = () => {
    logout();
    setToken("");
    setMessages([]);
    closeConnection();
  };

  return (
    <Background>
      <Container>
        <Header>
          <HeaderTitle variant="headlineSmall" color={colors.secondaryContainer}>
            {currentUser.userName}
          </HeaderTitle>
        </Header>
        <Content>
          <ProfileAvatar />
          <ProfileSettings />
          <ProfileStatistics />

          <Button mode="contained" onPress={() => handleLogout()} style={{ marginTop: "auto", width: 150, alignSelf: "center" }}>
            Log out
          </Button>
        </Content>
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

const Content = styled.View`
  flex: 1;
`;
