import { LogInModel } from "../components/LogIn";
import { RegisterModel } from "../components/Register";

export const postLogInModel = async (logInModel: LogInModel) => {
  var response = await fetch(`http://192.168.0.4:5141/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logInModel),
  });

  var deserializedResponse = await HandleLogInResponse(response);

  return deserializedResponse;
};

export const postRegisterModel = async (registerModel: RegisterModel) => {
  var response = await fetch(`http://192.168.0.4:5141/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerModel),
  });

  var deserializedResponse = await HandleRegisterResponse(response);

  return deserializedResponse;
};

export const HandleLogInResponse = async (response: Response) => {
  switch (response.status) {
    case 200:
      return await response.json();
    case 401:
      return { token: null };
  }
};

export const HandleRegisterResponse = async (response: Response) => {
  switch (response.status) {
    case 200:
      return await response.json();
    case 500:
      return await response.json();
  }
};