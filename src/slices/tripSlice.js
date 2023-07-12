import { createSlice } from "@reduxjs/toolkit";
import * as APIUtil from "../util/trip_api_util";

const initialState = {
  user: {},
  trip: {},
  new: undefined,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    receiveUserTrips: (state, action) => {
      state.user = {};
      action.payload.trips.data.forEach((trip) => {
        state.user[trip._id] = trip;
      });
    },
    receiveATrip: (state, action) => {
      state.trip = action.payload.trip.data;
    },
    receiveNewTrip: (state, action) => {
      state.new = action.payload.trip.data;
    },
    receiveErrors: (state, action) => {
      state.errors = action.payload;
    },
    removeTrip: (state, action) => {
      delete state.user[action.payload.tripId];
    },
  },
});

export const {
  receiveUserTrips,
  receiveATrip,
  receiveNewTrip,
  receiveErrors,
  removeTrip,
} = tripSlice.actions;

export const fetchUserTrips = (userId) => async (dispatch) => {
  try {
    const trips = await APIUtil.fetchAllTrips(userId);
    dispatch(receiveUserTrips(trips));
  } catch (err) {
    dispatch(receiveErrors(err));
  }
};

export const fetchATrip = (tripId) => async (dispatch) => {
  try {
    const trip = await APIUtil.fetchTrip(tripId);
    dispatch(receiveATrip(trip));
  } catch (err) {
    dispatch(receiveErrors(err));
  }
};

export const createTrip = (data) => async (dispatch) => {
  try {
    const trip = await APIUtil.createTrip(data);
    dispatch(receiveNewTrip(trip));
  } catch (err) {
    dispatch(receiveErrors(err.response.data));
  }
};

export const updateTrip = (data) => async (dispatch) => {
  try {
    const trip = await APIUtil.updateTrip(data);
    dispatch(receiveATrip(trip));
  } catch (err) {
    dispatch(receiveErrors(err.response.data));
  }
};

export const deleteTrip = (tripId) => async (dispatch) => {
  try {
    await APIUtil.deleteTrip(tripId);
    dispatch(removeTrip(tripId));
  } catch (err) {
    dispatch(receiveErrors(err));
  }
};

export default tripSlice.reducer;
