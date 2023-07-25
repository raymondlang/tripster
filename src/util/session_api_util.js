import axios from "axios";
import apiBaseUrl from "./config";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const signup = (userData) => {
  return axios.post(`${apiBaseUrl}/api/users/register`, userData);
};

export const login = (userData) => {
  console.log(userData);
  return axios.post(`${apiBaseUrl}/api/users/login`, userData);
};
