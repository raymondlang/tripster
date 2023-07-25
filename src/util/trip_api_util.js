import axios from "axios";
import apiBaseUrl from "./config";

export const fetchAllTrips = (userId) => {
  return axios.get(`${apiBaseUrl}/api/trips/user/${userId}`);
};
export const fetchTrip = (tripId) => {
  return axios.get(`${apiBaseUrl}/api/trips/${tripId}`);
};

export const createTrip = (data) => {
  console.log(data);
  return axios.post(`${apiBaseUrl}/api/trips/`, data);
};

export const updateTrip = (data) => {
  return axios.patch(`${apiBaseUrl}/api/trips/${data.id}`, data);
}; //unsure of data.id

export const deleteTrip = (tripId) => {
  return axios.delete(`${apiBaseUrl}/api/trips/${tripId}`);
};
