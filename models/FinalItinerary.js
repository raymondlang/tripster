import mongoose from "mongoose";

const { Schema } = mongoose;

const FinalItinerarySchema = new Schema({
  itineraryItems: [ItineraryItemSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("FinalItinerary", FinalItinerarySchema);
