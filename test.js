import Orders from "./model/orders.js";
import { All } from "./model/products.js";
import express from "express";

export const testRouter = express.Router();

const updateAllProducts = async (req, res) => {
  const data = await All.aggregate([
    {
      $unwind: "$stock",
    },
  ]);

  for (let product of data) {
    console.log(product.stock._id);
    const doc = await All.findOneAndUpdate(
      { _id: product._id, "stock._id": product.stock._id },
      { $set: { "stock.$.reservedQuantity": 0 } }
    );
    // console.log(doc);
  }
  res.json(data);
};

testRouter.get("/update-reserved-stock-0", updateAllProducts);

testRouter.patch("/update-paymentstatus/:id", async function (req, res) {
  const orderID = req.params.id;
  let data = await Orders.findByIdAndUpdate(
    orderID,
    { orderStatus: "Success" },
    { new: true }
  );
  res.json(data.products);
});

export { updateAllProducts };
