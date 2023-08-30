import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "@/slices/commentSlice.js";
import sessionReducer from "@/slices/sessionSlice.js";
import tripReducer from "@/slices/tripSlice.js";
import itineraryItemReducer from "@/slices/intineraryItemSlice.js";
import flightItineraryItemReducer from "@/slices/flightItineraryItemSlice.js";
import foodItineraryItemReducer from "@/slices/foodItineraryItemSlice";
import lodingingItemItineraryItemReducer from "@/slices/lodgingItineraryItemSlice";
import usersReducer from "@/slices/usersSlice.js";

const store = configureStore({
  reducer: {
    users: usersReducer,
    comments: commentsReducer,
    session: sessionReducer,
    trip: tripReducer,
    itineraryItem: itineraryItemReducer,
    foodItineraryItem: foodItineraryItemReducer,
    flightItineraryItem: flightItineraryItemReducer,
    lodgingItem: lodingingItemItineraryItemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  //   //   devTools: process.env.NODE_ENV !== "production",
  //   preloadedState: {},
});

export default store;
