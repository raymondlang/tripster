import axios from "axios";
import apiBaseUrl from "./config";

export const fetchAllFlightItineraryItems = () => {
  return axios.get(`${apiBaseUrl}/api/flightitineraryitems/`);
};
export const fetchItineraryItem = (itemId) => {
  return axios.get(`${apiBaseUrl}/api/flightitineraryitems/${itemId}`);
};

export const createItineraryItem = (data) => {
  return axios.post(
    `${apiBaseUrl}/api/trips/${data.tripId}/flightItineraryItem`,
    data
  );
};

// export const updateItineraryItem = (data) => {
//     return axios.patch(`${apiBaseUrl}/api/flightitineraryitems/${data.id}`, data);
// }

export const deleteItineraryItem = (itemId) => {
  return axios.delete(`${apiBaseUrl}/api/trips/flightItineraryItems/${itemId}`);
};
