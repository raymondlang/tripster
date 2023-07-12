import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as APIUtil from "../util/trip_api_util";

export const fetchUserTrips = createAsyncThunk(
  "trips/fetchUserTrips",
  async (userId, { rejectWithValue }) => {
    try {
      const trips = await APIUtil.fetchAllTrips(userId);
      return trips;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchATrip = createAsyncThunk(
  "trips/fetchATrip",
  async (tripId, { rejectWithValue }) => {
    try {
      const trip = await APIUtil.fetchTrip(tripId);
      return trip;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTrip = createAsyncThunk(
  "trips/createTrip",
  async (data, { rejectWithValue }) => {
    try {
      const trip = await APIUtil.createTrip(data);
      return trip;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTrip = createAsyncThunk(
  "trips/updateTrip",
  async (data, { rejectWithValue }) => {
    try {
      const trip = await APIUtil.updateTrip(data);
      return trip;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTrip = createAsyncThunk(
  "trips/deleteTrip",
  async (tripId, { dispatch }) => {
    try {
      await APIUtil.deleteTrip(tripId);
      return tripId;
    } catch (error) {
      throw new Error("Failed to delete trip");
    }
  }
);

const tripSlice = createSlice({
  name: "trips",
  initialState: {},
  reducers: {
    receiveUserTrips: (state, action) => {
      return action.payload.trips;
    },
    receiveATrip: (state, action) => {
      state[action.payload.trip._id] = action.payload.trip;
    },
    receiveNewTrip: (state, action) => {
      state[action.payload.trip._id] = action.payload.trip;
    },
    // receiveErrors: (state, action) => {
    //   // Handle errors if needed
    // },
    removeTrip: (state, action) => {
      delete state[action.payload.tripId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTrips.fulfilled, (state, action) => {
        return action.payload.reduce((result, trip) => {
          result[trip._id] = trip;
          return result;
        }, {});
      })
      .addCase(fetchATrip.fulfilled, (state, action) => {
        state[action.payload.trip._id] = action.payload.trip;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state[action.payload.trip._id] = action.payload.trip;
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        state[action.payload.trip._id] = action.payload.trip;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        delete state[action.payload];
      });
  },
});

export const {
  receiveUserTrips,
  receiveATrip,
  receiveNewTrip,
  receiveErrors,
  removeTrip,
} = tripSlice.actions;

export default tripSlice.reducer;
