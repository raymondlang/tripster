import axios from "axios";
import apiBaseUrl from "./config";

export const fetchAllFoodItineraryItems = () => {
  return axios.get(`${apiBaseUrl}/api/fooditineraryitems/`);
};
export const fetchItineraryItem = (itemId) => {
  return axios.get(`${apiBaseUrl}/api/fooditineraryitems/${itemId}`);
};

export const createItineraryItem = (data) => {
  return axios.post(
    `${apiBaseUrl}/api/trips/${data.tripId}/foodItineraryItem`,
    data
  );
};

// export const updateItineraryItem = (data) => {
//     return axios.patch(`${apiBaseUrl}/api/fooditineraryitems/${data.id}`, data);
// }

export const deleteItineraryItem = (itemId) => {
  return axios.delete(`${apiBaseUrl}/api/trips/foodItineraryItems/${itemId}`);
};
