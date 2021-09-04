import axios from "axios";
import { SERVER_URL } from "../app-config";

const AUTH_URL = {
  LOGIN: `${SERVER_URL}/login`,
  LOGOUT: `${SERVER_URL}/logout`,
  UPDATE: `${SERVER_URL}/update`,
};

export const logIn = (username) => {
  return axios.post(AUTH_URL.LOGIN, { username });
}

export const updateUser = (id, data) => {
  return axios.patch(`${AUTH_URL.UPDATE}/${id}`, data);
};
