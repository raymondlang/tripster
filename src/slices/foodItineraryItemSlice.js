import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as ItemAPIUtil from "../util/food_itinerary_item_api_util";

export const fetchAllFoodItineraryItems = createAsyncThunk(
  "foodItineraryItems/fetchAll",
  async () => {
    const response = await ItemAPIUtil.fetchAllFoodItineraryItems();
    return response.data;
  }
);

export const fetchFoodItineraryItem = createAsyncThunk(
  "foodItineraryItems/fetch",
  async (itemId) => {
    const response = await ItemAPIUtil.fetchItineraryItem(itemId);
    return response.data;
  }
);

export const createFoodItineraryItem = createAsyncThunk(
  "foodItineraryItems/create",
  async (data) => {
    const response = await ItemAPIUtil.createItineraryItem(data);
    return response.data;
  }
);

export const deleteFoodItem = createAsyncThunk(
  "foodItineraryItems/delete",
  async (itemId) => {
    const response = await ItemAPIUtil.deleteItineraryItem(itemId);
    return itemId;
  }
);

const foodItinerarySlice = createSlice({
  name: "foodItineraryItems",
  initialState: {
    items: {},
    new: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFoodItineraryItems.fulfilled, (state, action) => {
        state.items = action.payload.reduce((map, item) => {
          map[item._id] = item;
          return map;
        }, {});
      })
      .addCase(fetchFoodItineraryItem.fulfilled, (state, action) => {
        state.items[action.payload._id] = action.payload;
      })
      .addCase(createFoodItineraryItem.fulfilled, (state, action) => {
        state.items[action.payload._id] = action.payload;
      })
      .addCase(deleteFoodItem.fulfilled, (state, action) => {
        delete state.items[action.payload];
      })
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") &&
          action.type.includes("foodItineraryItems"),
        (state, action) => {
          state.error = action.error.message;
        }
      );
  },
});

export default foodItinerarySlice.reducer;