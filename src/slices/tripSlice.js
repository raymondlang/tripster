import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as APIUtil from "../util/trip_api_util";

const initialState = {
  trips: [],
  trip: null,
  errors: null,
};

export const fetchUserTrips = createAsyncThunk(
  "trips/fetchUserTrips",
  async (userId) => {
    try {
      const response = await APIUtil.fetchAllTrips(userId);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const fetchATrip = createAsyncThunk(
  "trips/fetchATrip",
  async (tripId) => {
    try {
      const response = await APIUtil.fetchTrip(tripId);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const createTrip = createAsyncThunk("trips/createTrip", async (data) => {
  try {
    const response = await APIUtil.createTrip(data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const updateTrip = createAsyncThunk("trips/updateTrip", async (data) => {
  try {
    const response = await APIUtil.updateTrip(data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const deleteTrip = createAsyncThunk(
  "trips/deleteTrip",
  async (tripId) => {
    try {
      await APIUtil.deleteTrip(tripId);
      return tripId;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTrips.fulfilled, (state, action) => {
        state.trips = action.payload;
      })
      .addCase(fetchATrip.fulfilled, (state, action) => {
        state.trip = action.payload;
        state.errors = null;
      })
      .addCase(fetchATrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.trip = action.payload;
        state.trips.push(action.payload);
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        state.trip = action.payload;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        const tripIdToDelete = action.payload;
        state.trips = state.trips.filter((trip) => trip._id !== tripIdToDelete);
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected") && action.error.message,
        (state, action) => {
          state.errors = action.error.message;
        }
      );
  },
});

export default tripsSlice.reducer;

export const selectTripById = (state, tripId) =>
  state.trip.trips.find((trip) => trip._id === tripId);
