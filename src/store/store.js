import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "@/slices/commentSlice.js";
import sessionReducer from "@/slices/sessionSlice.js";
// import errors from "@/slices/
import tripReducer from "@/slices/tripSlice.js";
import itineraryItemReducer from "@/slices/intineraryItemSlice.js";
import flightItineraryItemReducer from "@/slices/flightItineraryItemSlice.js";
import foodItineraryItemReducer from "../slices/foodItineraryItemSlice";
// import foodItemItineraryItemReducer from "@/slices/
// import lodingingItemItineraryItemReducer from "@/slices/
// import users from "@/slices/
// import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    comment: commentReducer,
    session: sessionReducer,
    trip: tripReducer,
    itineraryItem: itineraryItemReducer,
    foodItineraryItem: foodItineraryItemReducer,
    flightItineraryItem: flightItineraryItemReducer,
  },
  //   //   devTools: process.env.NODE_ENV !== "production",
  //   preloadedState: {},
});

export default store;
