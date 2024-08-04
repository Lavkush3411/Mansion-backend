import { All } from "../model/products.js";
import mongoose from "mongoose";
import cache from "../utils/cache.js";

export const getAllProducts = async (req, res) => {
  const cachedData = cache.get("all");
  if (cachedData) {
    console.log("cached data");
    res.send(cachedData);
    return;
  }

  const alldata = await All.find().lean();
  const data = alldata.flat();
  res.send(data);
  cache.set("all", data);
};

export const getProducts = async (req, res) => {
  const product = req.params.product;
  if (product) {
    try {
      const Product = mongoose.model(product);
      const data = await Product.find().lean();
      return res.send(data);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ err: "Products not found" });
    }
  } else {
    return res.send([]);
  }
};
