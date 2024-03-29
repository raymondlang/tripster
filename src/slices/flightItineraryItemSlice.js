import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as ItemAPIUtil from "../util/flight_itinerary_item_api_util";

const flightItinerarySlice = createSlice({
  name: "flightItineraryItems",
  initialState: {
    items: {},
    new: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFlightItineraryItems.fulfilled, (state, action) => {
        state.items = action.payload.reduce((map, item) => {
          map[item._id] = item;
          return map;
        }, {});
      })
      .addCase(fetchItineraryItem.fulfilled, (state, action) => {
        state.items[action.payload._id] = action.payload;
      })
      .addCase(createFlightItineraryItem.fulfilled, (state, action) => {
        state.items[action.payload._id] = action.payload;
      })
      .addCase(deleteFlightItem.fulfilled, (state, action) => {
        delete state.items[action.payload];
      })
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") &&
          action.type.includes("flightItineraryItems"),
        (state, action) => {
          state.error = action.error.message;
        }
      );
  },
});

export const fetchAllFlightItineraryItems = createAsyncThunk(
  "flightItineraryItems/fetchAll",
  async () => {
    const response = await ItemAPIUtil.fetchAllFlightItineraryItems();
    return response.data;
  }
);

export const fetchItineraryItem = createAsyncThunk(
  "flightItineraryItems/fetch",
  async (itemId) => {
    const response = await ItemAPIUtil.fetchItineraryItem(itemId);
    return response.data;
  }
);

export const createFlightItineraryItem = createAsyncThunk(
  "flightItineraryItems/create",
  async (item, { rejectWithValue }) => {
    try {
      const response = await ItemAPIUtil.createItineraryItem(item);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFlightItem = createAsyncThunk(
  "flightItineraryItems/delete",
  async (itemId) => {
    await ItemAPIUtil.deleteItineraryItem(itemId);
    return itemId;
  }
);

export default flightItinerarySlice.reducer;
