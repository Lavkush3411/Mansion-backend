import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  image: { type: [String], required: true },
  productPrice: { type: String, required: true },
  stock: [
    {
      _id: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  type: { type: String, required: true },
});
const All = mongoose.model("allProducts", productSchema);

export { All };
