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
  isVeg: {
    type: Boolean,
    default: true,
  },
});

export default model("Food", FoodSchema);
