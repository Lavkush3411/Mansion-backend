import mongoose, { ObjectId } from "mongoose";
import { All } from "../model/products.js";

export const compareOrderAmount = async (req, res, next) => {
  const { user, totalAmount, products } = req.body;
  const productsList = products.map((product) => ({
    productId: product._id,
    productName: product.productName,
    productPrice: product.productPrice,
    size: product.size,
    image: product.image[0],
    qty: product.qty,
  }));

  const productIDList = [];
  const productIDQtyMapping = {};

  for (let pdct of productsList) {
    productIDList.push(
      mongoose.Types.ObjectId.createFromHexString(pdct.productId)
    );
    productIDQtyMapping[pdct.productId] = pdct.qty;
  }

  const productsFromDb = await All.find({
    _id: { $in: productIDList },
  }).lean();

  if (!productsFromDb) return res.staus(404).json("No products found");

  let totalAmountFromDB = 0;

  for (let pdct of productsFromDb) {
    const qty = productIDQtyMapping[pdct._id];
    totalAmountFromDB += qty * pdct.productPrice;
  }

  if (
    !(totalAmountFromDB < totalAmount - 1) &&
    !(totalAmountFromDB > totalAmount + 1)
  ) {
    req.newOrder = { userId: user.email, products: productsList, totalAmount };
    next();
  } else {
    return res.staus(404).json("Some difference in amounts found from db");
  }
};
