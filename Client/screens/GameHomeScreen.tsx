import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import Background from "../components/layout/Background";
import Button from "../components/layout/Button";
import Logo from "../components/layout/Logo";
import { GameStackParams } from "../navigation/GameStackNavigator";

export type GameHomeNavProps = NativeStackScreenProps<GameStackParams>;

const GameHomeScreen = ({ navigation }: GameHomeNavProps) => {
  return (
    <Background>
      <Logo size={"medium"} />
      <ButtonContainer>
        <Button title={"create game"} mode={"contained"} styles={{ marginBottom: 20 }} onPress={() => navigation.navigate("CreateGameScreen")} />
        <Button title={"join game"} mode={"contained"} onPress={() => navigation.navigate("JoinGameScreen")} />
      </ButtonContainer>
    </Background>
  );
};

export default GameHomeScreen;

const ButtonContainer = styled.View`
  padding: 10px 110px;
  margin-top: 20px;
`;
