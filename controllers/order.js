import Orders, { DeletedOrders } from "../model/orders.js";
import zod from "zod";
import User from "../model/users.js";

export const userOrders = async function (req, res) {
  // const idSchema = zod.array(zod.string());
  // const ordersList = req.body.orders;

  // if (!idSchema.safeParse(ordersList).success) {
  //   res.status(200).json({ msg: "Please send valid id list" });
  //   return;
  // }

  const emailSchema = zod.string().email();
  if (!emailSchema.safeParse(req.email).success) {
    res.status(200).json({ msg: "Please send valid email" });
    return;
  }
  const user = await User.findOne({ email: req.email });
  if (!user) {
    res.status(200).json({ msg: "Please send valid email" });
    return;
  }

  const ordersData = await Orders.find({
    _id: { $in: user.orders },
  });
  res.send(ordersData);
};

export const getAllOrders = async (req, res) => {
  try {
    const users = await Orders.find(
      {},
      { password: 0, isAdmin: 0, __v: 0, orders: 0 }
    )
      .lean()
      .sort({ _id: -1 });
    res.status(200).json(users);
  } catch {
    res.status(500).json("Some error occured while getting users data");
  }
};

export const deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) return res.status(404).json("No order ID Specified");
  try {
    const deletedOrder = await Orders.findByIdAndDelete(orderId);
    await DeletedOrders.create(deletedOrder);
    if (!deletedOrder) throw new Error("Order with order ID not Found");
    const pulledOrder = await User.findOneAndUpdate(
      {
        email: deletedOrder.userId,
      },
      {
        $pull: { orders: orderId },
      }
    );
    res.status(200).json({ deletedOrder, pulledOrder });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
