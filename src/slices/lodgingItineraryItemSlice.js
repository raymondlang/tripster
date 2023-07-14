import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as ItemAPIUtil from "../util/lodging_itinerary_item_api_util";

export const fetchAllLodgingItineraryItems = createAsyncThunk(
  "lodgingItineraryItems/fetchAll",
  async () => {
    const response = await ItemAPIUtil.fetchAllLodgingItineraryItems();
    return response.data;
  }
);

export const fetchLodgingItineraryItem = createAsyncThunk(
  "lodgingItineraryItems/fetch",
  async (itemId) => {
    const response = await ItemAPIUtil.fetchItineraryItem(itemId);
    return response.data;
  }
);

export const createLodgingItineraryItem = createAsyncThunk(
  "lodgingItineraryItems/create",
  async (data) => {
    const response = await ItemAPIUtil.createItineraryItem(data);
    return response.data;
  }
);

export const deleteLodgingItem = createAsyncThunk(
  "lodgingItineraryItems/delete",
  async (itemId) => {
    await ItemAPIUtil.deleteItineraryItem(itemId);
    return itemId;
  }
);

const lodgingItineraryItemSlice = createSlice({
  name: "lodgingItineraryItems",
  initialState: {
    items: {},
    new: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLodgingItineraryItems.fulfilled, (state, action) => {
        state.items = action.payload.reduce((map, item) => {
          map[item._id] = item;
          return map;
        }, {});
      })
      .addCase(fetchLodgingItineraryItem.fulfilled, (state, action) => {
        state.items[action.payload._id] = action.payload;
      })
      .addCase(createLodgingItineraryItem.fulfilled, (state, action) => {
        state.items[action.payload._id] = action.payload;
      })
      .addCase(deleteLodgingItem.fulfilled, (state, action) => {
        delete state.items[action.payload];
      })
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") &&
          action.type.includes("lodgingItineraryItems"),
        (state, action) => {
          state.error = action.error.message;
        }
      );
  },
});

export const {
  receiveItineraryItem,
  receiveNewItineraryItem,
  receiveAllLodgingItineraryItems,
  receiveErrors,
  removeItem,
} = lodgingItineraryItemSlice.actions;

export default lodgingItineraryItemSlice.reducer;
