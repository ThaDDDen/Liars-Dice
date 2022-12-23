import { Formik } from "formik";
import React, { useRef } from "react";
import { Pressable, TextInput, View } from "react-native";
import { IconButton, Text, Tooltip } from "react-native-paper";
import styled from "styled-components/native";
import * as yup from "yup";
import { useSnackBar } from "../contexts/SnackContext";
import { useUser } from "../contexts/UserContext";
import { HomeNavProps } from "../screens/HomeScreen";
import { ResponseMessage } from "../types/types";
import { postLogInModel, postRegisterModel } from "../utils/authFunctions";
import Background from "./layout/Background";
import Button from "./layout/Button";
import Logo from "./layout/Logo";

const registerSchema = yup.object().shape({
  email: yup.string().email("Provide a valid email").required(),
  username: yup.string().min(2).required(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/, "Not a valid password"),
  passwordConfirmation: yup.string().oneOf([yup.ref("password"), null], "passwords do not match"),
});

const Register = ({ navigation, route }: HomeNavProps) => {
  const { setCurrentUser } = useUser();
  const { setResponseMessage } = useSnackBar();

  const emailRef = useRef<TextInput>(null);
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <Background>
      <Logo size={"medium"} />
      <FormContainer>
        <Formik
          validationSchema={registerSchema}
          initialValues={{ email: "", username: "", password: "", passwordConfirmation: "" }}
          onSubmit={async (values) => {
            var registerResponse = await postRegisterModel({ email: values.email, username: values.username, password: values.password });

            if (registerResponse.status === "Success") {
              var loginResponse = await postLogInModel({ username: values.username, password: values.password });
              setCurrentUser({
                userName: values.username,
                avatarCode: loginResponse.avatarCode,
                gameHost: false,
                dice: [],
                connectionId: loginResponse.connectionId,
              });
            } else {
              setResponseMessage(registerResponse as ResponseMessage);
            }
          }}
        >
          {({ handleChange, handleBlur, touched, handleSubmit, values, errors }) => {
            return (
              <>
                <InputContainer>
                  <Input
                    ref={emailRef}
                    placeholder="email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    onSubmitEditing={() => usernameRef.current?.focus()}
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />
                  {errors.email && touched.email && (
                    <Tooltip title={errors.email}>
                      <IconButton icon={"alert-circle-outline"} size={20} iconColor={"red"} style={{ margin: 0 }} />
                    </Tooltip>
                  )}
                </InputContainer>

                <InputContainer>
                  <Input
                    ref={usernameRef}
                    placeholder="username"
                    value={values.username}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />
                  {errors.username && touched.username && (
                    <Tooltip title={errors.username}>
                      <IconButton icon={"alert-circle-outline"} size={20} iconColor={"red"} style={{ margin: 0 }} />
                    </Tooltip>
                  )}
                </InputContainer>

                <InputContainer>
                  <Input
                    ref={passwordRef}
                    placeholder="password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />
                  {errors.password && touched.password && (
                    <Tooltip title={errors.password}>
                      <IconButton icon={"alert-circle-outline"} size={20} iconColor={"red"} style={{ margin: 0 }} />
                    </Tooltip>
                  )}
                </InputContainer>
                <InputContainer>
                  <Input
                    ref={confirmPasswordRef}
                    placeholder="confirm password"
                    value={values.passwordConfirmation}
                    onChangeText={handleChange("passwordConfirmation")}
                    secureTextEntry
                    onBlur={handleBlur("passwordConfirmation")}
                  />
                  {errors.passwordConfirmation && touched.passwordConfirmation && (
                    <Tooltip title={errors.passwordConfirmation}>
                      <IconButton icon={"alert-circle-outline"} size={20} iconColor={"red"} style={{ margin: 0 }} />
                    </Tooltip>
                  )}
                </InputContainer>
                <Button title={"register"} mode={"contained"} styles={{ marginBottom: 20 }} onPress={() => handleSubmit()} />
              </>
            );
          }}
        </Formik>
        <View style={{ flexDirection: "row" }}>
          <Text>Dont have a user yet? please </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("LogIn");
            }}
            style={{ justifyContent: "flex-end" }}
          >
            <Text style={{ color: "#ffa32a" }}>log in here!</Text>
          </Pressable>
        </View>
      </FormContainer>
    </Background>
  );
};

export default Register;

const FormContainer = styled.View`
  justify-content: center;
  width: 100%;
  padding: 50px 50px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border: 1px solid black;
  border-radius: 5px;
  background: white;
  margin-bottom: 12px;
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 5px 10px;
`;
