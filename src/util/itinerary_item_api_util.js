import axios from "axios";
import apiBaseUrl from "./config";

export const fetchAllItineraryItems = () => {
  return axios
    .get(`${apiBaseUrl}/api/itineraryitems/`)
    .then((response) => response.data);
};

export const fetchItineraryItem = (itemId) => {
  return axios
    .get(`${apiBaseUrl}/api/itineraryitems/${itemId}`)
    .then((response) => response.data);
};

export const createItineraryItem = (data) => {
  return axios
    .post(`${apiBaseUrl}/api/trips/${data.tripId}/itineraryItem`, data)
    .then((response) => response.data);
};

export const deleteItineraryItem = (itemId) => {
  return axios
    .delete(`${apiBaseUrl}/api/trips/itineraryItems/${itemId}`)
    .then((response) => response.data);
};
