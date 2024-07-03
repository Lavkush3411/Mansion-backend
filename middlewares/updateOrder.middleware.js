import Orders from "../model/orders.js";

export default async function updateOrder(req, res, data) {
  if (!req.error) {
    const orderID = req.data.data.merchantTransactionId;
    if (req.data.success) {
      await Orders.findByIdAndUpdate(orderID, { orderStatus: "Success" });
    } else {
      if (req.data.code === "PAYMENT_PENDING") {
        await Orders.findByIdAndUpdate(orderID, { orderStatus: "Pending" });
      } else {
        await Orders.findByIdAndUpdate(orderID, { orderStatus: "Failed" });
      }
    }
  } else {
  }
  res.status(200).send();
}
