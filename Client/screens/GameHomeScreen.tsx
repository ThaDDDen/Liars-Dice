import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import Background from "../components/layout/Background";
import ContentCard from "../components/layout/ContentCard";
import Logo from "../components/layout/Logo";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import Statistics from "../components/profile/Statistics";
import { useUser } from "../contexts/UserContext";
import { GameStackParams } from "../navigation/GameStackNavigator";

export type GameHomeNavProps = NativeStackScreenProps<GameStackParams>;

const GameHomeScreen = ({ navigation }: GameHomeNavProps) => {
  const { colors } = useTheme();
  const { currentUser } = useUser();

  const profileModalize = useRef<Modalize>(null);

  const openModal = () => {
    profileModalize.current?.open();
  };

  return (
    <Background>
      <Logo size={"medium"} />
      {/* <ButtonContainer>
        <Button title={"create game"} mode={"contained"} styles={{ marginBottom: 20 }} onPress={() => navigation.navigate("CreateGameScreen")} />
        <Button title={"join game"} mode={"contained"} onPress={() => navigation.navigate("JoinGameScreen")} />
      </ButtonContainer> */}

      <Surface style={{ borderRadius: 15, marginBottom: 5, marginTop: 40, marginHorizontal: 10, flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("CreateGameScreen")}
            style={{
              backgroundColor: colors.surface,
              width: "100%",
              borderRadius: 15,
              alignItems: "center",
              padding: 10,
              paddingTop: 5,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Manrope-Regular", fontSize: 30 }}>CREATE</Text>
              <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 16 }}>GAME</Text>
            </View>
          </Pressable>
        </View>
        <View
          style={{
            width: "50%",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("JoinGameScreen")}
            style={{
              backgroundColor: colors.secondary,
              width: "100%",
              borderRadius: 15,
              alignItems: "center",
              padding: 10,
              paddingTop: 5,
              borderTopLeftRadius: 0,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Manrope-Regular", fontSize: 30 }}>JOIN</Text>
              <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 16 }}>GAME</Text>
            </View>
          </Pressable>
        </View>
      </Surface>
      <Button onPress={() => openModal()}>Hello</Button>
      <Modalize ref={profileModalize} rootStyle={{}} modalStyle={{ backgroundColor: "transparent" }} withHandle={false} adjustToContentHeight>
        <View style={{ flex: 1 }}>
          <ProfileAvatar />
          <View style={{ flex: 1, backgroundColor: "#161545", marginTop: 50, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
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
        </View>
      </Modalize>
    </Background>
  );
};

export default GameHomeScreen;

const LeftButton = styled.View``;

const ButtonContainer = styled.View`
  padding: 10px 110px;
  margin-top: 20px;
`;
