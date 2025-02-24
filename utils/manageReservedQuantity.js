import { All } from "../model/products.js";
import cache from "./cache.js";

export const increaseReservedQuantity = async (req, res, next) => {
  const products = req.unwindedProductsFromDb;
  const orderedProducts = req.body.products;
  try {
    for (let item of orderedProducts) {
      const data = await All.findOneAndUpdate(
        { _id: item._id, "stock.size": item.size },
        {
          $inc: { "stock.$.reservedQuantity": item.qty },
        }
      );
    }
    cache.flushAll();
    next();
  } catch {
    res.status(400).json("some error while setting the reserved quantity");
  }
};

export const decreaseItemQuantityPostCodOrder = async (req, res, next) => {
  const products = req.unwindedProductsFromDb;
  const orderedProducts = req.body.products;
  try {
    for (let item of orderedProducts) {
      const data = await All.findOneAndUpdate(
        { _id: item._id, "stock.size": item.size },
        {
          $inc: { "stock.$.quantity": -item.qty },
        }
      );
    }
    cache.flushAll();
    next();
  } catch {
    res.status(400).json("some error while setting the reserved quantity");
  }
};

export const stockUpdatePostPayment = (req, res) => {};
