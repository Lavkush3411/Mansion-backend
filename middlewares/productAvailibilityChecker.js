import mongoose from "mongoose";
import { All } from "../model/products.js";

export const checkAvailabilityForAllProducts = async (req, res, next) => {
  // Create a match condition to find the products and relevant stock items
  const { cartList: requestedProducts } = req.body;
  if (!requestedProducts || Object.keys(requestedProducts).length <= 0) {
    res.send("products not send");
    return;
  }

  const matchConditions = requestedProducts.map((item) =>
    mongoose.Types.ObjectId.createFromHexString(item._id)
  );

  // Use the aggregation framework
  const products = await All.aggregate([
    {
      $match: {
        _id: { $in: matchConditions },
      },
    },
    {
      $unwind: "$stock",
    },
    {
      $match: {
        $or: requestedProducts.map((item) => ({
          _id: mongoose.Types.ObjectId.createFromHexString(item._id),
          "stock.size": item.size,
        })),
      },
    },
  ]);
  // Check availability for each requested product
  req.unwindedProductsFromDb = products; // setting products data for further usecases
  const errList = [];
  for (const item of requestedProducts) {
    try {
      const product = products.find(
        (p) => p._id.toString() === item._id && p.stock.size === item.size
      );

      if (
        !product ||
        product.stock.quantity - product.stock.reservedQuantity <= 0
      ) {
        errList.push(
          `We're sorry, but the requested product ${item.productName} in size ${item.size} is out of stock, kindly remove from cart to proceed.`
        );
      } else if (
        product &&
        product.stock.quantity > 0 &&
        product.stock.quantity - product.stock.reservedQuantity < item.qty
      ) {
        errList.push(
          `We're sorry, but the requested quantity (${item.qty}) for ${item.productName} in size ${item.size} is unavailable. Please reduce the quantity to continue.`
        );
      }
    } catch (err) {
      console.log(err);
      res.status(404).send(err.message);
      return;
    }
  }
  req.errList = errList;

  if (errList.length > 0) {
    res.status(400).json({ availibility: false, msg: errList });
  } else {
    next();
  }
};
