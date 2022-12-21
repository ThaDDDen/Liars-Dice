import { Formik } from "formik";
import React from "react";
import { Pressable, Text, View } from "react-native";
import styled from "styled-components/native";
import * as yup from "yup";
import { postLogInModel } from "../authUtils/authFunctions";
import { useSnackBar } from "../contexts/SnackContext";
import { useUser } from "../contexts/UserContext";
import { HomeNavProps } from "../screens/HomeScreen";
import { LogInModel } from "../types/types";
import Background from "./layout/Background";
import Logo from "./layout/Logo";

type LogInYupObject = Record<keyof LogInModel, yup.AnySchema>;

const loginValidationSchema = yup.object<LogInYupObject>({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LogIn = ({ navigation }: HomeNavProps) => {
  const { setCurrentUser, setToken } = useUser();
  const { setResponseMessage } = useSnackBar();

  return (
    <Background>
      <Logo size={"medium"} />
      <FormContainer>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={async (values) => {
            var response = await postLogInModel({ username: values.username, password: values.password });
            if (response.status === "Success") {
              console.log(response);
              setCurrentUser({ userName: values.username, avatarCode: response.avatarCode, gameHost: false, dice: [] });
              setToken(response.token);
            } else {
              setResponseMessage(response);
            }
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => {
            return (
              <>
                <Input placeholder="username" value={values.username} onChangeText={handleChange("username")} />
                <Input placeholder="password" value={values.password} onChangeText={handleChange("password")} secureTextEntry={true} />
                <LoginButton
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text style={{ color: "white" }}>Log In</Text>
                </LoginButton>
              </>
            );
          }}
        </Formik>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white", fontSize: 12 }}>Dont have a user yet? please </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Register");
            }}
            style={{ justifyContent: "flex-end" }}
          >
            <Text style={{ color: "#ffd42a", fontSize: 12 }}>register here!</Text>
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
const LoginButton = styled.Pressable`
  background-color: #087e8b;
  border-radius: 5px;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
`;
