import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useUser } from "../contexts/UserContext";
import { HomeNavProps } from "../screens/HomeScreen";
import Background from "./layout/Background";
import Button from "./layout/Button";
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
        <Button title={"log in"} mode={"contained"} onPress={() => navigation.navigate("LogIn")} />
        <Button title={"register"} mode={"contained"} onPress={() => navigation.navigate("Register")} />
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
