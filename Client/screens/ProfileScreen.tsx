import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import Background from "../components/layout/Background";
import Button from "../components/layout/Button";
import ContentCard from "../components/layout/ContentCard";
import AvatarPicker from "../components/profile/AvatarPicker";
import Statistics from "../components/profile/Statistics";
import ThemePicker from "../components/profile/ThemePicker";
import { useConnection } from "../contexts/ConnectionContext";
import { initialGameState, useGame } from "../contexts/GameContext";
import { useUser } from "../contexts/UserContext";
import { RootStackParams } from "../navigation/RootStackNavigator";

type NavigationProps = NativeStackScreenProps<RootStackParams>;

const ProfileScreen = ({ navigation }: NavigationProps) => {
  const { logout, setToken, setLobbyMessages, currentUser } = useUser();
  const { setGame } = useGame();
  const { closeConnection } = useConnection();

  const handleLogout = () => {
    logout();
    setToken("");
    setLobbyMessages([]);
    setGame(initialGameState);
    closeConnection();
  };

  return (
    <Background>
      <Container>
        <Header>
          <HeaderTitle variant="headlineSmall">{currentUser.userName}</HeaderTitle>
        </Header>
        <Content>
          <ContentCard title="Avatar">
            <AvatarPicker />
          </ContentCard>
          <ContentCard title="Settings">
            <ThemePicker />
          </ContentCard>
          <ContentCard title="Statistics">
            <Statistics />
          </ContentCard>
          <Button title={"log out"} mode={"contained"} onPress={() => handleLogout()} styles={{ marginTop: "auto", borderRadius: 5 }} />
        </Content>
      </Container>
    </Background>
  );
};

export default ProfileScreen;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderTitle = styled(Text)`
  margin-right: auto;
`;

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
`;
