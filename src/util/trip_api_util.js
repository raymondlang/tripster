import axios from "axios";
const baseURL = "http://localhost:3001";

export const fetchAllTrips = (userId) => {
  return axios.get(`${baseURL}/api/trips/user/${userId}`);
};
export const fetchTrip = (tripId) => {
  return axios.get(`${baseURL}/api/trips/${tripId}`);
};

export const createTrip = (data) => {
  return axios.post(`${baseURL}/api/trips/`, data);
};

export const updateTrip = (data) => {
  return axios.patch(`${baseURL}/api/trips/${data.id}`, data);
}; //unsure of data.id

export const deleteTrip = (tripId) => {
  return axios.delete(`${baseURL}api/trips/${tripId}`);
};
