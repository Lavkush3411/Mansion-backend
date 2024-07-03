import Orders from "../model/orders.js";

async function createOrder(req, res, next) {
  const { user, totalAmount, products } = req.body;
  const productsList = products.map((product) => ({
    productId: product._id,
    productName: product.productName,
    productPrice: product.productPrice,
    size: product.size,
    qty: product.qty,
  }));
  const newOrder = { userId: user.email, products: productsList, totalAmount };

  const order = await Orders.create(newOrder);
  console.log(order._id);
  req.body.paymentUUID = order._id;
  next();
}

export default createOrder;
