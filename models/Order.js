import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  table: {
    type: Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
});

export default model("Order", OrderSchema);
