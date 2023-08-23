import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as UsersAPIUtil from "../util/users_api_util";

export const getUsersForTrip = createAsyncThunk(
  "users/getUsersForTrip",
  async (tripId, { rejectWithValue }) => {
    try {
      const users = await UsersAPIUtil.fetchUsersForTrip(tripId);
      return users.data; // Return the array of users
    } catch (error) {
      return rejectWithValue(error.response.data); // Return the error response data
    }
  }
);

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

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // Storing users as an object with user IDs as keys and user objects as values
    errors: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersForTrip.fulfilled, (state, action) => {
        const uniqueUsers = new Set(action.payload.map((user) => user._id));
        // Convert the Set back to an array of users
        state.users = Array.from(uniqueUsers).map((userId) =>
          action.payload.find((user) => user._id === userId)
        );
        state.errors = {};
      })
      .addCase(getUsersForTrip.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(addUserToTrip.fulfilled, (state, action) => {
        state.users.push(action.payload); // Push the new user object to the array
        state.errors = {};
      })
      .addCase(removeUserFromTrip.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
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
