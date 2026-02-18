import API from "./api";
import {
  AUTH,
  SUBCRIPTIONS,
} from "./endpoints";

export const loginApi = (payload) => {
  return API.post(AUTH.LOGIN, payload);
};

export const logoutApi = () => {
  return API.post(AUTH.LOGOUT);
};

export const getAllSubcription = () => {
  return API.get(SUBCRIPTIONS.LIST);
};








