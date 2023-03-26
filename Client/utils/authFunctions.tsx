import { LogInModel, RegisterModel } from "../types/types";

export const postLogInModel = async (logInModel: LogInModel) => {
  const response = await fetch(`http://192.168.0.4:5141/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logInModel),
  });

  const deserializedResponse = await HandleLogInResponse(response);

  return deserializedResponse;
};

export const postRegisterModel = async (registerModel: RegisterModel) => {
  const response = await fetch(`http://192.168.0.4:5141/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerModel),
  });

  const deserializedResponse = await HandleRegisterResponse(response);

  return deserializedResponse;
};

export const putSaveAvatar = async (avatarCode: string, token: string) => {
  const response = await fetch(`http://192.168.0.4:5141/api/auth/updateavatar`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(avatarCode),
  });

  return response.status === 200;
};

export const HandleLogInResponse = async (response: Response) => {
  switch (response.status) {
    case 200:
      return await response.json();
    case 401:
      return await response.json();
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
