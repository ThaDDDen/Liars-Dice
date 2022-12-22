import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import Background from "../components/layout/Background";
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
  const { colors } = useTheme();

  console.log(currentUser);

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
          <HeaderTitle variant="headlineSmall" color={colors.secondaryContainer}>
            {currentUser.userName}
          </HeaderTitle>
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
