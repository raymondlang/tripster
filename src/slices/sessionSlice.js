import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import * as APIUtil from "../util/session_api_util";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: {},
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    receiveCurrentUser: (state, action) => {
      state.isAuthenticated = !!action.payload.currentUser;
      state.user = action.payload.currentUser;
    },
    receiveUserSignIn: (state) => {
      state.isSignedIn = true;
    },
    receiveErrors: (state, action) => {
      state.errors = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = undefined;
    },
  },
});

export const {
  receiveCurrentUser,
  receiveUserSignIn,
  receiveErrors,
  logoutUser,
} = sessionSlice.actions;

export const signup = (user) => async (dispatch) => {
  try {
    const res = await APIUtil.signup(user);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser({ currentUser: decoded }));
  } catch (err) {
    dispatch(receiveErrors(err.response.data));
    throw err;
  }
};

export const login = (user) => async (dispatch) => {
  try {
    const res = await APIUtil.login(user);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser({ currentUser: decoded }));
    return res;
  } catch (err) {
    dispatch(receiveErrors(err.response.data));
    throw err;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
};

export default sessionSlice.reducer;
