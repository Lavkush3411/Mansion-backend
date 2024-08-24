import mongoose from "mongoose";
import Orders from "../model/orders.js";
import { ordersDb } from "../db.js";
import { All } from "../model/products.js";

export default async function updateOrder(req, res) {
  if (req.status === 200 && req.data.code === "PAYMENT_SUCCESS") {
    const orderID = req.data.data.merchantTransactionId;
    // const session = await ordersDb.startSession();

    try {
      const order = await Orders.findByIdAndUpdate(
        orderID,
        { orderStatus: "Success" },
        { new: true }
      );
      const products = order.products;
      console.log(products);

      const data = await Promise.all(
        products.map((item) => {
          return All.findOneAndUpdate(
            { _id: item.productId, "stock.size": item.size },
            {
              $inc: {
                "stock.$.quantity": -item.qty,
                "stock.$.reservedQuantity": -item.qty,
              },
            }
          );
        })
      );

      console.log(data);

      res.status(200).send("Success");
    } catch (e) {
      console.error(`Failed to update item`, e);
    }
  } else {
    if (req.data.code === "PAYMENT_PENDING") {
      const orderID = req.data.data.merchantTransactionId;
      await Orders.findByIdAndUpdate(orderID, { orderStatus: "Pending" });
      res.status(200).send("Pending");
    } else {
      const orderID = req.data.data.merchantTransactionId;
      await Orders.findByIdAndUpdate(orderID, { orderStatus: "Failed" });
      res.status(200).send("Failed");
    }
  }
}
