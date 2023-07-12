import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "@/slices/commentSlice.js";
// import session from "./session_api_reducer";
// import errors from "./errors_reducer";
// import trips from "./trip_reducer";
// import items from "./item_reducer";
// import flightItems from "./flight_item_reducer";
// import foodItems from "./food_item_reducer";
// import lodgingItems from "./lodging_item_reducer";
// import users from "./users_reducer";
// import thunk from "redux-thunk";

const store = configureStore({
  reducer: { comment: commentReducer },
  //   //   devTools: process.env.NODE_ENV !== "production",
  //   preloadedState: {},
});

export default store;
