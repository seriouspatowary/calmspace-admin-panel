import mongoose, { Schema } from "mongoose";

const priceSchema = new Schema({
  counselorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chat: {
    type: Number,
    // required: true,
  },
  video: {
    type: Number,
    // required: true,
  },
  audio: {
    type: Number,
    // required: true,
  },
});

export const Price = mongoose.models.Price || mongoose.model("Price", priceSchema);



