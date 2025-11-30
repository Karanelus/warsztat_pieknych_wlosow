const baseUrl = import.meta.env.VITE_API_URL;
import axios from "axios";
import { Users } from "../@types/users.type";

export const tokenProve = async () => {
  const res = await axios.get(baseUrl + "api/login/me", {
    withCredentials: true,
  });

  return res.data;
};

export const logIn = async (login: string, password: string) => {
  const res = await axios.post<{ user: Users }>(
    baseUrl + "api/login",
    {
      login,
      password,
    },
    { withCredentials: true },
  );

  return res.data;
};

export const logOut = async () => {
  const res = await axios.post<{ user: Users }>(
    baseUrl + "api/logout",
    {},
    { withCredentials: true },
  );

  return res.data;
};
