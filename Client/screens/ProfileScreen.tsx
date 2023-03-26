import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import Background from "../components/layout/Background";
import ContentCard from "../components/layout/ContentCard";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import Statistics from "../components/profile/Statistics";
import { useUser } from "../contexts/UserContext";

const ProfileScreen = () => {
  const { currentUser } = useUser();

  const { colors } = useTheme();

  return (
    <Background>
      <Container>
        <ProfileAvatar />
        <View style={{ flex: 1, backgroundColor: colors.surface, margin: -10, marginTop: 50, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          <View
            style={{
              backgroundColor: colors.primaryContainer,
              borderRadius: 15,
              marginBottom: 5,
              marginTop: -40,
              marginHorizontal: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                backgroundColor: colors.primaryContainer,
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
          </View>
          {currentUser.statistics.gamesPlayed !== 0 ? (
            <ContentCard borderColor="#161545" label="statistics">
              <View
                style={{
                  marginLeft: 10,
                  backgroundColor: colors.primary,
                  paddingVertical: 2.5,
                  paddingHorizontal: 8,
                  borderRadius: 20,
                  alignSelf: "center",
                }}
              >
                <Text style={{ fontFamily: "Manrope-Bold" }}>All-time rolls</Text>
              </View>
              <Statistics statistics={currentUser.statistics} />
              <View
                style={{
                  marginVertical: 10,
                  marginLeft: 10,
                  backgroundColor: colors.primary,
                  paddingVertical: 2.5,
                  paddingHorizontal: 8,
                  borderRadius: 20,
                  alignSelf: "center",
                }}
              >
                <Text style={{ fontFamily: "Manrope-Bold" }}>All-time number of straights</Text>
              </View>
              <Text variant="headlineLarge" style={{ alignSelf: "center", marginLeft: 18 }}>
                {currentUser.statistics.straights}
              </Text>
            </ContentCard>
          ) : (
            <ContentCard styles={{ flex: 1 }} borderColor="#161545" label="statistics">
              <View style={{ padding: 10, alignSelf: "center", flex: 1, justifyContent: "center" }}>
                <Text style={{ textDecorationStyle: "dashed", fontFamily: "Manrope-Bold", fontStyle: "italic" }}>
                  Statistics will show up once you&apos;ve played a game!
                </Text>
              </View>
            </ContentCard>
          )}
        </View>
      </Container>
    </Background>
  );
};

export default ProfileScreen;

const Container = styled.View`
  flex: 1;
`;
