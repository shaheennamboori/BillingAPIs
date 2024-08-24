import { Schema, model } from "mongoose";

const OrderItemSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  food: {
    type: Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export default model("OrderItem", OrderItemSchema);
