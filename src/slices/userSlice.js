import { createSlice } from "@reduxjs/toolkit";
import * as UsersAPIUtil from "../util/users_api_util";

const usersSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    receiveUser: (state, action) => {
      return action.payload.user.data;
    },
    removeUser: (state, action) => {
      return {};
    },
    receiveErrors: (state, action) => {
      state.errors = action.payload.errors;
    },
  },
});

export const { receiveUser, removeUser, receiveErrors } = usersSlice.actions;

export const addUserToTrip = (user) => async (dispatch) => {
  try {
    const response = await UsersAPIUtil.addUserToTrip(user);
    dispatch(receiveUser(response));
  } catch (err) {
    dispatch(receiveErrors(err.response.data));
  }
};

export const removeUserFromTrip = (user) => async (dispatch) => {
  try {
    const response = await UsersAPIUtil.removeUserFromTrip(user);
    dispatch(removeUser(response));
  } catch (err) {
    dispatch(receiveErrors(err.response.data));
  }
};

export default usersSlice.reducer;
