import axios from "axios";
import apiBaseUrl from "./config";

export const addUserToTrip = (data) => {
  return axios.post(`${apiBaseUrl}/api/trips/${data.tripId}/user`, data);
};

export const removeUserFromTrip = (data) => {
  return axios.delete(
    `${apiBaseUrl}/api/trips/${data.tripId}/user/${data.userId}`,
    data
  );
};
