import mongoose from "mongoose";

const { Schema } = mongoose;

const ItineraryItemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  trip: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ItineraryItem", ItineraryItemSchema);
