import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  image: { type: [String], required: true },
  productPrice: { type: String, required: true },
  stock: [
    {
      id: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  type: { type: String, required: true },
});

const Cargos = mongoose.model("cargo", productSchema);
const Bottoms = mongoose.model("bottom", productSchema);
const Shirts = mongoose.model("shirt", productSchema);
const Tshirts = mongoose.model("tshirt", productSchema);
const Hoodies = mongoose.model("hoodie", productSchema);

export { Cargos, Bottoms, Shirts, Tshirts, Hoodies };
