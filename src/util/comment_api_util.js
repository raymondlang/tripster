import axios from "axios";
import apiBaseUrl from "./config";

export const fetchAllComments = (tripId) => {
  return axios.get(`${apiBaseUrl}/api/trips/${tripId}/comments/`);
};
export const fetchComment = (commentId) => {
  return axios.get(`${apiBaseUrl}/api/trips/comments/${commentId}`);
};

export const createComment = (data) => {
  return axios.post(`${apiBaseUrl}/api/trips/${data.tripId}/comment/`, data);
};

export const updateComment = (data) => {
  return axios.patch(`${apiBaseUrl}/api/trips/comments/${data.id}`, data);
};

export const deleteComment = (commentId) => {
  return axios.delete(`${apiBaseUrl}/api/trips/comments/${commentId}`);
};
