import API from "./api";
import {
  OTPS,
  LOCATIONS,
  AUTH,
  COMPANIES,
  SUBCRIPTIONS,
  TICKETS,
  RETAILERS,
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
  return API.get(LOCATIONS.STATES);
};

export const getDistrictsApi = (stateId) => {
  return API.get(LOCATIONS.DISTRICTS, {
    params: { state_id: stateId },
  });
}

export const getCitiesApi = (districtId) => {
  return API.get(LOCATIONS.CITIES, {
    params: { dist_id: districtId },
  });
}

export const getPoliceStationsApi = (cityId) => {
  return API.get(LOCATIONS.POLICESTATIONS, {
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

export const getNearbyRetailers = (id, latitude, longitude) => {
  return API.get(RETAILERS.NEARBYRETAILERS, {
    params: {
      company_id: id,
      latitude: latitude,
      longitude: longitude,
    },
  });
}

export const followRetailer = (payload) => {
  return API.post(RETAILERS.FOLLOWRETAILERS, payload);
};

export const customerFollowRetailers = (customerId) => {
  return API.get(RETAILERS.FOLLOWEDRETAILERS, {
    params: {
      customer_id: customerId
    }
  });
};







