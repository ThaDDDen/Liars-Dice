import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { Button as PaperButton, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useUser } from "../../contexts/UserContext";
import Background from "../layout/Background";

const JoinGame = () => {
  const { currentUser } = useUser();
  const { connection } = useConnection();
  const { colors } = useTheme();

  return (
    <Background>
      <View style={{ padding: 10 }}>
        <Formik
          initialValues={{ GameName: "" }}
          onSubmit={(values) => {
            connection.invoke("JoinGame", currentUser, values.GameName);
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => {
            return (
              <>
                <InputSurface>
                  <Text variant="labelLarge">Game name</Text>
                  <Input value={values.GameName} onChangeText={handleChange("GameName")} />
                </InputSurface>
                <JoinGameButton mode="contained" onPress={() => handleSubmit()}>
                  Join Game
                </JoinGameButton>
              </>
            );
          }}
        </Formik>
      </View>
    </Background>
  );
};

export default JoinGame;

const Input = styled.TextInput`
  background: white;
  border-radius: 5px;
  border: solid 1px black;
  padding: 8px;
`;

const InputSurface = styled(Surface)`
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const JoinGameButton = styled(PaperButton)`
  border-radius: 5px;
`;
