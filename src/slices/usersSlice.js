import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as UsersAPIUtil from "../util/users_api_util";

// Async Thunks
export const addUserToTrip = createAsyncThunk(
  "users/addUserToTrip",
  async (user, thunkAPI) => {
    try {
      const response = await UsersAPIUtil.addUserToTrip(user);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const removeUserFromTrip = createAsyncThunk(
  "users/removeUserFromTrip",
  async (user, thunkAPI) => {
    try {
      const response = await UsersAPIUtil.removeUserFromTrip(user);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: {},
    errors: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserToTrip.fulfilled, (state, action) => {
        state.users = action.payload;
        state.errors = {};
      })
      .addCase(removeUserFromTrip.fulfilled, (state, action) => {
        state.users = action.payload;
        state.errors = {};
      })
      .addCase(addUserToTrip.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(removeUserFromTrip.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export default usersSlice.reducer;
