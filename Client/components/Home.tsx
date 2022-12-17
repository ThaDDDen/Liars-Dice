import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { HomeNavProps } from "../screens/HomeScreen";
import Background from "./layout/Background";
import Logo from "./layout/Logo";

const Home = ({ navigation }: HomeNavProps) => {
  return (
    <Background>
      <Logo size={"large"} />
      <ButtonContainer>
        <LoginButton onPress={() => navigation.navigate("LogIn")}>
          <Text style={{ color: "white" }}>Log In</Text>
        </LoginButton>
        <RegisterButton onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "white" }}>Register</Text>
        </RegisterButton>
      </ButtonContainer>
    </Background>
  );
};

export default Home;

const ButtonContainer = styled.View`
  width: 100%;
  padding: 20px 15%;
  margin-top: 40px;
`;

const LoginButton = styled.Pressable`
  background-color: #087e8b;
  border-radius: 5px;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
`;

const RegisterButton = styled.Pressable`
  background-color: #087e8b;
  border-radius: 5px;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
`;
