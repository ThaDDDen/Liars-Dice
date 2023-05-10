import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import GameRules from "../components/game/GameRules";
import Background from "../components/layout/Background";
import Logo from "../components/layout/Logo";
import { useUser } from "../contexts/UserContext";
import { GameStackParams } from "../navigation/GameStackNavigator";

export type GameHomeNavProps = NativeStackScreenProps<GameStackParams>;

const GameHomeScreen = ({ navigation }: GameHomeNavProps) => {
  const { colors } = useTheme();
  const { promptGameRules } = useUser();

  if (promptGameRules) return <GameRules />;

  return (
    <Background>
      <Logo size={"medium"} />
      <ButtonContainer backgroundColor={colors.surface}>
        <ButtonWrapper>
          <Button onPress={() => navigation.navigate("CreateGameScreen")} backgroundColor={colors.surface}>
            <ButtonTextContainer>
              <Text style={{ fontFamily: "Manrope-Regular", fontSize: 30 }}>CREATE</Text>
              <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 16 }}>GAME</Text>
            </ButtonTextContainer>
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            onPress={() => navigation.navigate("JoinGameScreen")}
            style={{
              borderTopLeftRadius: 0,
            }}
            backgroundColor={colors.secondary}
          >
            <ButtonTextContainer>
              <Text style={{ fontFamily: "Manrope-Regular", fontSize: 30 }}>JOIN</Text>
              <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 16 }}>GAME</Text>
            </ButtonTextContainer>
          </Button>
        </ButtonWrapper>
      </ButtonContainer>
    </Background>
  );
};

export default GameHomeScreen;

const ButtonContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 15px;
  margin: 40px 10px 5px 10px;
  flex-direction: row;
`;

const ButtonWrapper = styled.View`
  width: 50%;
  align-items: center;
`;

const Button = styled.Pressable<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 100%;
  border-radius: 15px;
  align-items: center;
  padding: 5px 10px 10px 10px;
`;

const ButtonTextContainer = styled.View`
  align-items: center;
`;
