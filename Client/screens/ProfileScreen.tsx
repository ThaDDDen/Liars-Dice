import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Dialog, Portal, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import Background from "../components/layout/Background";
import ContentCard from "../components/layout/ContentCard";
import DoubleButtons from "../components/layout/DoubleButtons";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import Statistics from "../components/profile/Statistics";
import ThemePicker from "../components/profile/ThemePicker";
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
        <ProfileAvatar />
        <View style={{ flex: 1, backgroundColor: "#161545", margin: -10, marginTop: 50, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          <Surface style={{ borderRadius: 15, marginBottom: 5, marginTop: -40, marginHorizontal: 10, flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: colors.surface,
                width: "50%",
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
          <ThemePicker />
        </View>
      </Container>
      {/* <Portal>
        <Dialog visible={true} style={{ backgroundColor: colors.surface, borderRadius: 15 }}>
          <LabelBox compact={false} background={colors.primary} borderColor={colors.primaryContainer}>
            <Text variant="labelMedium">INVITATION</Text>
          </LabelBox>
          <View
            style={{
              backgroundColor: colors.primaryContainer,
              marginVertical: 30,
              marginHorizontal: 10,
              padding: 5,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "Manrope-SemiBold", letterSpacing: 0.25, lineHeight: 23, textAlign: "center" }}>
              Longname has invited you to their game "Longname's game".
            </Text>
          </View>
          <DoubleButtons
            leftButtonLabel={"JOIN"}
            leftButtonAction={() => console.log("joining game")}
            rightButtonLabel={"HIDE"}
            rightButtonAction={() => console.log("hiding invitation")}
          />
        </Dialog>
      </Portal> */}
    </Background>
  );
};

export default ProfileScreen;

const Container = styled.View`
  flex: 1;
`;

const LabelBox = styled.View<{ background: string; borderColor: string; compact: boolean }>`
  background-color: ${({ background }) => background};
  justify-content: center;
  padding: ${({ compact }) => (compact ? "2.5px 7.5px" : "10px 10px 5px 10px")};
  flex-direction: row;
  position: absolute;
  border-radius: 50px;
  border-width: ${({ compact }) => (compact ? "3px" : "3px")};
  border-style: solid;
  border-color: ${({ borderColor }) => borderColor};
  top: -45px;
  align-self: center;
`;
