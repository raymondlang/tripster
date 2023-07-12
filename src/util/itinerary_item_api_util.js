import axios from "axios";

export const fetchAllItineraryItems = () => {
  return axios.get(`/api/itineraryitems/`).then((response) => response.data);
};

export const fetchItineraryItem = (itemId) => {
  return axios
    .get(`/api/itineraryitems/${itemId}`)
    .then((response) => response.data);
};

export const createItineraryItem = (data) => {
  return axios
    .post(`/api/trips/${data.tripId}/itineraryItem`, data)
    .then((response) => response.data);
};

export const deleteItineraryItem = (itemId) => {
  return axios
    .delete(`/api/trips/itineraryItems/${itemId}`)
    .then((response) => response.data);
};
