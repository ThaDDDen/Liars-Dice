import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button as PaperButton, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import Background from "../components/layout/Background";
import Logo from "../components/layout/Logo";
import { GameStackParams } from "../navigation/GameStackNavigator";

export type GameHomeNavProps = NativeStackScreenProps<GameStackParams>;

const GameHomeScreen = ({ navigation }: GameHomeNavProps) => {
  const { colors } = useTheme();

  return (
    <Background>
      <Logo size={"medium"} />
      <ButtonContainer>
        <Button
          mode="contained"
          uppercase
          onPress={() => {
            navigation.navigate("CreateGameScreen");
          }}
        >
          Create Game
        </Button>
        <Button
          mode="contained"
          uppercase
          onPress={() => {
            navigation.navigate("JoinGameScreen");
          }}
        >
          Join Game
        </Button>
      </ButtonContainer>
    </Background>
  );
};

export default GameHomeScreen;

const ButtonContainer = styled.View`
  padding: 10px 80px;
  margin-top: 20px;
`;

const Button = styled(PaperButton)`
  border-radius: 8px;
  margin-bottom: 20px;
`;
