import React, { useEffect } from "react";
import styled from "styled-components/native";
import { initialUserState, useUser } from "../contexts/UserContext";
import { HomeNavProps } from "../screens/HomeScreen";
import Background from "./layout/Background";
import Button from "./layout/Button";
import Logo from "./layout/Logo";

const Home = ({ navigation }: HomeNavProps) => {
  const { token, setToken, setCurrentUser, currentUser } = useUser();

  const getAuth = async (token: string) => {
    if (token) {
      var response = await fetch("http://192.168.0.4:5141/api/auth/isAuthenticated", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const deserializedResponse = await response.json();
        setCurrentUser({
          ...initialUserState,
          id: deserializedResponse.id,
          userName: deserializedResponse.username,
          avatarCode: deserializedResponse.avatarCode,
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
        <Button title={"log in"} mode={"contained"} styles={{ marginBottom: 20 }} onPress={() => navigation.navigate("LogIn")} />
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
