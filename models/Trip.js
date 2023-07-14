import mongoose from "mongoose";

const { Schema } = mongoose;

// import ItineraryItemSchema from "./ItineraryItem";
// import FlightItineraryItemSchema from "./FlightItineraryItem";
// import LodgingItineraryItemSchema from "./LodgingItineraryItem";
// import FoodItineraryItemSchema from "./FoodItineraryItem";
// import UserSchema from "./User";
// import CommentSchema from "./Comment";

const TripSchema = new Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  destination: {
    type: String,
    required: true,
  },
  tripName: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  itineraryItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ItineraryItem",
    },
  ],
  flightItineraryItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FlightItineraryItem",
    },
  ],
  lodgingItineraryItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LodgingItineraryItem",
    },
  ],
  foodItineraryItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItineraryItem",
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Trip = mongoose.model("Trip", TripSchema);
export default Trip;
