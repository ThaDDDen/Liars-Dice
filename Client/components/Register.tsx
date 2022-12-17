import { Formik } from "formik";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import * as yup from "yup";
import Background from "./layout/Background";
import Logo from "./layout/Logo";

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
  const postRegisterModel = (registerModel: RegisterModel) => {
    //TODO catch errors

    fetch(`http://192.168.0.4:5141/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerModel),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((deserializedResponse) => {
          console.log(deserializedResponse.message);
        });
      }
    });
  };

  return (
    <Background>
      <Logo size={"medium"} />
      <FormContainer>
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
                <RegisterButton onPress={() => handleSubmit()}>
                  <Text style={{ color: "white" }}>Register</Text>
                </RegisterButton>
              </>
            );
          }}
        </Formik>
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

const Input = styled.TextInput`
  color: black;
  background-color: white;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
`;

const RegisterButton = styled.Pressable`
  background-color: #2ec4b6;
  border-radius: 5px;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
`;
