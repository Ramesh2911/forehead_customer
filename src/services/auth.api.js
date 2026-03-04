import API from "./api";
import {
  OTPS,
  AUTH,
  COMPANIES,
  SUBCRIPTIONS,
  TICKETS,
} from "./endpoints";

export const sendOtpApi = (payload) => {
  return API.post(OTPS.SENDOTP, payload);
};

export const resendOtpApi = (payload) => {
  return API.post(OTPS.RESENDOTP, payload);
};

export const verifyOtpApi = (payload) => {
  return API.post(OTPS.VERIFYOTP, payload);
};

export const getStatesApi = () => {
  return API.get("/states");
};

export const getDistrictsApi = (stateId) => {
  return API.get("/districts", {
    params: { state_id: stateId },
  });
}

export const getCitiesApi = (districtId) => {
  return API.get("/cities", {
    params: { dist_id: districtId },
  });
}

export const getPoliceStationsApi = (cityId) => {
  return API.get("/police-stations", {
    params: { city_id: cityId },
  });
}

export const registrationApi = (payload) => {
  return API.post(AUTH.REGISTRATION, payload);
};

export const loginApi = (payload) => {
  return API.post(AUTH.LOGIN, payload);
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

export const getTicketListByWeek = (id, week, ticketNo) => {
  return API.get(TICKETS.TICKETSEARCHBYWEEK, {
    params: {
      company_id: id,
      week: week,
      ticket_no: ticketNo,
    },
  });
};









