import Orders from "../model/orders.js";

export default async function updateOrder(req, res) {
  if (req.status === 200 && req.data.code === "PAYMENT_SUCCESS") {
    const orderID = req.data.data.merchantTransactionId;
    await Orders.findByIdAndUpdate(orderID, { orderStatus: "Success" });
    res.status(200).send("Success");
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
