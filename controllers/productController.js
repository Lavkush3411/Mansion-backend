import { All } from "../model/products.js";
import mongoose from "mongoose";
import cache from "../utils/cache.js";

export const getProductByID = async (req, res) => {
  let id = req.params.productid;
  if (id) {
    try {
      const product = await All.findById(id).lean();
      res.status(200).json({ ...product });
    } catch (e) {
      res.status(400).json("product id notfound for specified product");
    }
  } else {
    res.status(400).json("product id notfound for specified product");
  }
};

export const getAllProducts = async (req, res) => {
  const cachedData = cache.get("all");
  if (cachedData) {
    console.log("cached data");
    res.send(cachedData);
    return;
  }

  const data = await All.find().lean();
  console.log(data);
  res.send(data);
  cache.set("all", data);
};

export const getProducts = async (req, res) => {
  const product = req.params.product;
  if (product) {
    try {
      const data = await All.find({ type: product }).lean();
      return res.send(data);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ err: "Products not found" });
    }
  } else {
    return res.send([]);
  }
};

export const availabilityResponder = async (req, res) => {
  res.status(200).json({ availibility: true });
};
