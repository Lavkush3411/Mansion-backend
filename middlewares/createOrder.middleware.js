import Orders from "../model/orders.js";
import User from "../model/users.js";

async function createOrder(req, res, next) {
  const order = await Orders.create(req.newOrder);
  await User.findOneAndUpdate(
    { email: req.email },
    { $push: { orders: order._id } }
  );
  req.body.paymentUUID = order._id;
  next();
}

export default createOrder;
