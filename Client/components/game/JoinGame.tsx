import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { Surface, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useSnackBar } from "../../contexts/SnackContext";
import { useUser } from "../../contexts/UserContext";
import { INVOKE_REQUEST_TO_JOIN_GAME } from "../../utils/constants";
import Background from "../layout/Background";
import Button from "../layout/Button";

const JoinGame = () => {
  const { currentUser } = useUser();
  const { connection } = useConnection();
  const { setSnackMessage } = useSnackBar();

  return (
    <Background>
      <View style={{ padding: 10 }}>
        <Formik
          initialValues={{ GameName: "" }}
          onSubmit={(values) => {
            connection.invoke(INVOKE_REQUEST_TO_JOIN_GAME, currentUser, values.GameName);
            setSnackMessage({ status: "Success", message: `A request to join "${values.GameName}" has been sent to the game host.` });
          }}
        >
          {({ handleChange, handleSubmit, values }) => {
            return (
              <>
                <InputSurface>
                  <Text variant="labelLarge">Game name</Text>
                  <Input value={values.GameName} onChangeText={handleChange("GameName")} />
                </InputSurface>
                <Button title={"send request"} mode={"contained"} onPress={() => handleSubmit()} />
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
