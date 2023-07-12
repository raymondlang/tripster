import mongoose from "mongoose";
import ItineraryItemSchema from "ItineraryItem.js";

const { Schema } = mongoose;

const FinalItinerarySchema = new Schema({
  itineraryItems: [ItineraryItemSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("FinalItinerary", FinalItinerarySchema);
