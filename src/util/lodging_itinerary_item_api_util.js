import axios from "axios";
import apiBaseUrl from "./config";

export const fetchAllLodgingItineraryItems = () => {
  return axios.get(`${apiBaseUrl}/api/lodgingitineraryitems/`);
};
export const fetchItineraryItem = (itemId) => {
  return axios.get(`${apiBaseUrl}/api/lodgingitineraryitems/${itemId}`);
};

export const createItineraryItem = (data) => {
  return axios.post(
    `${apiBaseUrl}/api/trips/${data.tripId}/lodgingItineraryItem`,
    data
  );
};

// export const updateItineraryItem = (data) => {
//     return axios.patch(`${apiBaseUrl}/api/lodgingitineraryitems/${data.id}`, data);
// }

export const deleteItineraryItem = (itemId) => {
  return axios.delete(
    `${apiBaseUrl}/api/trips/lodgingItineraryItems/${itemId}`
  );
};
