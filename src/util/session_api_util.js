import axios from "axios";

const baseURL = "http://localhost:3001";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const signup = (userData) => {
  return axios.post(`${baseURL}/api/users/register`, userData);
};

export const login = (userData) => {
  return axios.post(`${baseURL}/api/users/login`, userData);
};
