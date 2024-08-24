import { Schema, model } from "mongoose";

const TableSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

export default model("Table", TableSchema);
