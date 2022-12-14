import { Formik } from "formik";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import * as yup from "yup";

interface RegisterModel {
  email: string;
  username: string;
  password: string;
}

type RegisterYupObject = Record<keyof RegisterModel, yup.AnySchema>;

const registerValidationSchema = yup.object<RegisterYupObject>({
  email: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
});

const Register = () => {
  const PORT = 5141;
  const LOCAL_IP = "192.168.0.4";

  const postRegisterModel = (registerModel: RegisterModel) => {
    //TODO catch errors

    fetch(`http://${LOCAL_IP}:${PORT}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerModel),
    }).then((data) => {
      data.json().then((deserializedResponse) => console.log(deserializedResponse.message));
    });
  };

  return (
    <View>
      <View>
        <Text>Register</Text>
      </View>
      <Formik
        validationSchema={registerValidationSchema}
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          postRegisterModel({ email: values.email, username: values.username, password: values.password });
        }}
      >
        {({ handleChange, handleBlur, touched, handleSubmit, values, errors }) => {
          return (
            <>
              <Input placeholder="email" value={values.email} onChangeText={handleChange("email")} />
              <Input placeholder="username" value={values.username} onChangeText={handleChange("username")} />
              <Input placeholder="password" value={values.password} onChangeText={handleChange("password")} secureTextEntry={true} />
              <RegisterButton title={"Register"} onPress={() => handleSubmit()} />
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default Register;

const Input = styled.TextInput`
  color: black;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 20px;
`;

const RegisterButton = styled.Button``;
