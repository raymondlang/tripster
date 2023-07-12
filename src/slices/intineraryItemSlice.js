import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as ItemAPIUtil from "../util/itinerary_item_api_util";

export const fetchAllItineraryItems = createAsyncThunk(
  "itineraryItems/fetchAll",
  async () => {
    const response = await ItemAPIUtil.fetchAllItineraryItems();
    return response.data;
  }
);

export const fetchItineraryItem = createAsyncThunk(
  "itineraryItems/fetch",
  async (itemId) => {
    const response = await ItemAPIUtil.fetchItineraryItem(itemId);
    return response.data;
  }
);

export const createItineraryItem = createAsyncThunk(
  "itineraryItems/create",
  async (data) => {
    const response = await ItemAPIUtil.createItineraryItem(data);
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  "itineraryItems/delete",
  async (itemId) => {
    await ItemAPIUtil.deleteItineraryItem(itemId);
    return itemId;
  }
);

const itemsSlice = createSlice({
  name: "itineraryItems",
  initialState: {
    items: {},
    new: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItineraryItems.fulfilled, (state, action) => {
        state.items = action.payload.reduce((map, item) => {
          map[item._id] = item;
          return map;
        }, {});
      })
      .addCase(fetchItineraryItem.fulfilled, (state, action) => {
        state.items[action.payload._id] = action.payload;
      })
      .addCase(createItineraryItem.fulfilled, (state, action) => {
        state.items[action.payload._id] = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        delete state.items[action.payload];
      })
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") &&
          action.type.includes("itineraryItems"),
        (state, action) => {
          state.error = action.error.message;
        }
      );
  },
});

export default itemsSlice.reducer;
