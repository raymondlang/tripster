import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  author: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  comment: {
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

export default Comment = mongoose.model("Comment", CommentSchema);
