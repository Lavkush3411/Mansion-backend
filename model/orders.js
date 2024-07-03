import mongoose from "mongoose";

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
      qty: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  orderStatus: { type: String, required: true, default: "Pending" },
  createdAt: { type: String, default: () => Date.now().toLocaleString() },
  updatedAt: { type: String, default: () => Date.now().toLocaleString() },
});

const Orders = mongoose.model("order", orderSchema);

export default Orders;
