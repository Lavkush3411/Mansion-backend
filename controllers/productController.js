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

  const alldata = await All.find().lean();
  const data = alldata.flat();
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

// export const productAvailibilityCheck = async (req, res) => {
//   const products = req.body;
//   const productsList = products.map((product) => ({
//     productId: product._id,
//     productName: product.productName,
//     productPrice: product.productPrice,
//     size: product.size,
//     image: product.image[0],
//     qty: product.qty,
//   }));

//   const productIDList = [];
//   const productIDQtyMapping = {};
//   const productIDSizeMapping = {};
//   for (let pdct of productsList) {
//     productIDList.push(
//       mongoose.Types.ObjectId.createFromHexString(pdct.productId)
//     );
//     productIDQtyMapping[pdct.productId] = pdct.qty;
//     productIDSizeMapping[pdct.productId]=pdct.size
//   }

//   const productsFromDb = await All.find({ _id: { $in: productIDList },stock:{size:} });
//   if (!productsFromDb) return res.staus(404).json("No products found");
// };

export const checkAvailabilityForMultipleProducts = async (req, res) => {
  // Create a match condition to find the products and relevant stock items
  const { cartList: requestedProducts } = req.body;

  if (Object.keys(requestedProducts).length <= 0) {
    res.send("products not send");
    return;
  }
  const matchConditions = requestedProducts.map((item) => ({
    _id: mongoose.Types.ObjectId.createFromHexString(item._id),
    // "stock.size": item.size,
  }));

  // Use the aggregation framework
  const products = await All.aggregate([
    {
      $match: {
        $or: matchConditions,
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
    {
      $project: {
        _id: 1,
        "stock.size": 1,
        "stock.quantity": 1,
      },
    },
  ]);

  // Check availability for each requested product
  const errList = [];
  for (const item of requestedProducts) {
    try {
      const product = products.find(
        (p) => p._id.toString() === item._id && p.stock.size === item.size
      );

      if (!product || product.stock.quantity <= 0) {
        errList.push(
          `We're sorry, but the requested product ${item.productName} is not available anymore, kindly remove from cart to proceed.`
        );
      }

      if (product.stock.quantity > 0 && product.stock.quantity < item.qty) {
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
  if (errList.length === 0) {
    res.status(200).json({ availibility: true });
  } else {
    res.status(400).json({ availibility: false, msg: errList });
  }
};
