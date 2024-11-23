import Orders from "../model/orders.js";
import User from "../model/users.js";
import { sendOrderPlacedEmail } from "../utils/sendEmail.js";

async function createOrder(req, res, next) {
  const order = await Orders.create(req.newOrder);
  await User.findOneAndUpdate(
    { email: req.email },
    { $push: { orders: order._id } }
  );
  req.body.paymentUUID = order._id;
  next();
}

export async function createCodOrder(req, res) {
  const order = await Orders.create(req.newOrder);
  await User.findOneAndUpdate(
    { email: req.email },
    { $push: { orders: order._id } }
  );
  req.body.paymentUUID = order._id;
  sendOrderPlacedEmail("lkyadav090@gmail.com", order);
  return res.status(200).send({ message: "Order Placed SuccessFully" });
}

export default createOrder;
