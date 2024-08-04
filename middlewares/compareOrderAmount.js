import mongoose from "mongoose";

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

  const productIDList = productsList.map((product) => product.productId);

  const totalAmountFromDB = await mongoose.aggregate([
    {
      $match: {
        _id: { $in: productIDList },
      },
    },
    {
      $group: {
        _id: null,
        totalValue: { $sum: "$value" },
      },
    },
  ]);
  return res.send(totalAmountFromDB);

  req.newOrder = { userId: user.email, products: productsList, totalAmount };
};
