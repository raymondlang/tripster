import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as UsersAPIUtil from "../util/users_api_util";

export const getUsersForTrip = createAsyncThunk(
  "users/getUsersForTrip",
  async (tripId, { rejectWithValue }) => {
    try {
      const users = await UsersAPIUtil.fetchUsersForTrip(tripId);
      return users;
    } catch (error) {
      return rejectWithValue(error.message);
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
    users: {}, // Storing users as an object with user IDs as keys and user objects as values
    errors: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersForTrip.fulfilled, (state, action) => {
        // Store the fetched users in the users slice
        const usersArray = action.payload.data;
        const userIds = usersArray.map((user) => user._id);
        console.log(userIds);
        state.errors = {};
      })
      .addCase(getUsersForTrip.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(addUserToTrip.fulfilled, (state, action) => {
        state.users[action.payload._id] = action.payload;
        state.errors = {};
      })
      .addCase(removeUserFromTrip.fulfilled, (state, action) => {
        state.users[action.payload._id] = action.payload;
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
