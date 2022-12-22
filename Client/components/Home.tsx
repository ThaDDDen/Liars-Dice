import React, { useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { useUser } from "../contexts/UserContext";
import { HomeNavProps } from "../screens/HomeScreen";
import Background from "./layout/Background";
import Logo from "./layout/Logo";

const Home = ({ navigation }: HomeNavProps) => {
  const { token, setCurrentUser } = useUser();

  const getAuth = async (token: string) => {
    if (token) {
      var response = await fetch("http://192.168.0.4:5141/api/auth/isAuthenticated", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const deserializedResponse = await response.json();
        setCurrentUser({
          userName: deserializedResponse.username,
          avatarCode: deserializedResponse.avatarCode,
          gameHost: false,
          dice: [],
          connectionId: deserializedResponse.connectionId,
        });
      }
    }
  };

  useEffect(() => {
    if (token) {
      getAuth(token);
    }
  }, [token]);

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
