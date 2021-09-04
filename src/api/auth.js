import axios from "axios";
import { SERVER_URL } from "../app-config";
import { handleAxiosData } from "../utils/api";

const AUTH_URL = {
  VERIFY_USERNAME: `${SERVER_URL}/verify-username`,
};

export const verifyUsername = (username) => {
  return handleAxiosData(() => axios.get(`${AUTH_URL.VERIFY_USERNAME}/${username}`));
}
