import { All } from "./model/products.js";

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

export { updateAllProducts };
