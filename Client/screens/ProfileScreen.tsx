import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import Background from "../components/layout/Background";
import ContentCard from "../components/layout/ContentCard";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import Statistics from "../components/profile/Statistics";
import { useConnection } from "../contexts/ConnectionContext";
import { useUser } from "../contexts/UserContext";
import { RootStackParams } from "../navigation/RootStackNavigator";

type NavigationProps = NativeStackScreenProps<RootStackParams>;

const ProfileScreen = ({ navigation }: NavigationProps) => {
  const { logout, currentUser } = useUser();
  const { closeConnection } = useConnection();
  const { colors } = useTheme();

  const handleLogout = () => {
    logout();
    closeConnection();
  };

  return (
    <Background>
      <Container>
        {/* <Content> */}
        {/* <ContentCard title="Avatar">
            <AvatarPicker />
          </ContentCard> */}
        <ProfileAvatar />
        {/* <ContentCard title="Settings">
          <Header>
            <HeaderTitle variant="headlineSmall">{currentUser.userName}</HeaderTitle>
          </Header>
            <ThemePicker />
          </ContentCard> */}
        <View style={{ flex: 1, backgroundColor: "#161545", margin: -10, marginTop: 50, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          <Surface style={{ borderRadius: 15, marginBottom: 5, marginTop: -40, marginHorizontal: 10, flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: colors.surface,
                width: "50%",
                // margin: -10,
                borderRadius: 15,
                alignItems: "center",
                padding: 10,
                paddingTop: 5,
              }}
            >
              <Text style={{ fontFamily: "Manrope-Regular", fontSize: 35 }}>{currentUser.statistics.gamesPlayed}</Text>
              <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 16 }}>GAMES PLAYED</Text>
            </View>
            <View
              style={{
                backgroundColor: colors.secondary,
                width: "50%",
                // margin: -10,
                borderRadius: 15,
                alignItems: "center",
                padding: 10,
                paddingTop: 5,
                borderTopLeftRadius: 0,
              }}
            >
              <Text style={{ fontFamily: "Manrope-Regular", fontSize: 35 }}>{currentUser.statistics.gamesWon}</Text>
              <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 16 }}>GAMES WON</Text>
            </View>
          </Surface>
          <ContentCard borderColor="#161545" label="rolls">
            <Statistics statistics={currentUser.statistics} />
          </ContentCard>
          {/* <ContentCard title="Statistics">
            <Statistics />
          </ContentCard> */}
          {/* <Button title={"log out"} mode={"contained"} onPress={() => handleLogout()} styles={{ marginTop: "auto", borderRadius: 5 }} /> */}
        </View>
        {/* </Content> */}
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
