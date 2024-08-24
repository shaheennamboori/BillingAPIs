import { Schema, model } from "mongoose";

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  cost: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default model("Food", FoodSchema);
