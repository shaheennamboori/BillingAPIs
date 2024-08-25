import { Schema, model } from "mongoose";

const TableSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
  capacity: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

export default model("Table", TableSchema);
