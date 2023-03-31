import { Formik } from "formik";
import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import * as yup from "yup";
import { useSnackBar } from "../contexts/SnackContext";
import { useUser } from "../contexts/UserContext";
import { HomeNavProps } from "../screens/HomeScreen";
import { LogInModel } from "../types/types";
import { postLogInModel } from "../utils/authFunctions";
import Background from "./layout/Background";
import Button from "./layout/Button";
import Logo from "./layout/Logo";

type LogInYupObject = Record<keyof LogInModel, yup.AnySchema>;

const loginValidationSchema = yup.object<LogInYupObject>({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LogIn = ({ navigation }: HomeNavProps) => {
  const { setToken } = useUser();
  const { setSnackMessage } = useSnackBar();

  return (
    <Background>
      <Logo size={"medium"} />
      <FormContainer>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={async (values) => {
            const response = await postLogInModel({ username: values.username, password: values.password });
            if (response.status === "Success") {
              setToken(response.token);
            } else {
              setSnackMessage(response);
            }
          }}
        >
          {({ handleChange, handleSubmit, values }) => {
            return (
              <>
                <Input placeholder="username" value={values.username} onChangeText={handleChange("username")} />
                <Input placeholder="password" value={values.password} onChangeText={handleChange("password")} secureTextEntry={true} />
                <Button title={"log in"} mode={"contained"} styles={{ marginBottom: 20 }} onPress={() => handleSubmit()} />
              </>
            );
          }}
        </Formik>
        <View style={{ flexDirection: "row" }}>
          <Text>Dont have a user yet? please </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Register");
            }}
            style={{ justifyContent: "flex-end" }}
          >
            <Text style={{ color: "#ffa32a" }}>register here!</Text>
          </Pressable>
        </View>
      </FormContainer>
    </Background>
  );
};

export default LogIn;

const Input = styled.TextInput`
  color: black;
  background-color: white;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
`;

const FormContainer = styled.View`
  justify-content: center;
  width: 100%;
  padding: 50px 50px;
`;
