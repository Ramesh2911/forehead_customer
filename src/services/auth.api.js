import API from "./api";
import {
  AUTH,
  COMPANIES,
  SUBCRIPTIONS,
  TICKETS,
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

export const getSubscriptionsDetails = (id) => {
  return API.get(SUBCRIPTIONS.DETAILS, {
    params: { id },
  });
};

export const getAllCompanies = () => {
  return API.get(COMPANIES.LIST);
};

export const getFirstPrizeListByCompany = (id) => {
  return API.get(TICKETS.FIRSTPRIZELIST, {
    params: { company_id: id },
  });
};







