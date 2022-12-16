import { Formik } from "formik";
import React, { useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import * as yup from "yup";
import { useConnection } from "../contexts/ConnectionContext";

interface LogInModel {
  username: string;
  password: string;
}

export interface User {
  username: string;
  token: string;
}

type LogInYupObject = Record<keyof LogInModel, yup.AnySchema>;

const loginValidationSchema = yup.object<LogInYupObject>({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LogIn = () => {
  const [tempToken, setTempToken] = useState("");
  const { joinLobby } = useConnection();

  const postLogInModel = (logInModel: LogInModel) => {
    fetch(`http://10.0.2.2:5141/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logInModel),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((deserializedResponse) => {
          //TODO set token to current user, maybe save it in asyncstorage too?
          console.log(deserializedResponse.token);
          setTempToken(deserializedResponse.token);
          joinLobby(tempToken);
        });
      }

      if (response.status === 401) {
        console.log("Unauthorized");
        return;
      }
    });
  };

  return (
    <View>
      <Text>Log In</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          postLogInModel({ username: values.username, password: values.password });
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <>
              <Input placeholder="username" value={values.username} onChangeText={handleChange("username")} />
              <Input placeholder="password" value={values.password} onChangeText={handleChange("password")} secureTextEntry={true} />
              <LoginButton
                title={"Log in"}
                onPress={() => {
                  handleSubmit();
                }}
              />
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default LogIn;

const Input = styled.TextInput`
  color: black;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 20px;
`;

const LoginButton = styled.Button``;
