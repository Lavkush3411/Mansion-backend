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
const Cargos = mongoose.model("cargos", productSchema);
const Bottoms = mongoose.model("bottoms", productSchema);
const Shirts = mongoose.model("shirts", productSchema);
const Tshirts = mongoose.model("tshirts", productSchema);
const Hoodies = mongoose.model("hoodies", productSchema);

export { Cargos, Bottoms, Shirts, Tshirts, Hoodies, All };
