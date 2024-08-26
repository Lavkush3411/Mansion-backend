import mongoose from "mongoose";
import { ordersDb } from "../db.js";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      _id: false,
      productId: mongoose.Schema.Types.ObjectId,
      productName: String,
      productPrice: Number,
      size: String,
      image: String,
      qty: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  orderStatus: { type: String, required: true, default: "Order Placed" },
  paymentStatus: { type: String, required: true, default: "Initiated" },
  createdAt: {
    type: String,
    default: () =>
      new Date().toLocaleDateString() + " " + new Date().toTimeString(),
  },
  updatedAt: {
    type: String,
    default: () =>
      new Date().toLocaleDateString() + " " + new Date().toTimeString(),
  },
});

const Orders = ordersDb.model("order", orderSchema);

export default Orders;
