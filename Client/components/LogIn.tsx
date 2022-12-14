import { Formik } from "formik";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import * as yup from "yup";

interface LogInModel {
  username: string;
  password: string;
}

type LogInYupObject = Record<keyof LogInModel, yup.AnySchema>;

const loginValidationSchema = yup.object<LogInYupObject>({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LogIn = () => {
  const PORT = 5141;
  const LOCAL_IP = "192.168.0.4";

  const loginUser = (logInModel: LogInModel) => {
    fetch(`http://${LOCAL_IP}:${PORT}/api/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logInModel),
    });
  };

  return (
    <View>
      <Text>LogIn</Text>
      <Formik initialValues={{ username: "", password: "" }} validationSchema={loginValidationSchema} onSubmit={(values) => {}}>
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

const Input = styled.TextInput``;

const LoginButton = styled.Button``;
