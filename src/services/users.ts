import axios from "axios";
import { IUser } from "../types";

const baseUrl = `${import.meta.env.VITE_API_URL}/api/user`;

const generateConfig = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const getInfo = async (token: string) => {
  const { data } = await axios.get<IUser>(baseUrl, generateConfig(token));

  return data;
};

export const userService = { getInfo };
