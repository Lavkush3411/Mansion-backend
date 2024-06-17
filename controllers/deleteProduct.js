import {
  Cargos,
  Hoodies,
  Tshirts,
  Shirts,
  Bottoms,
} from "../model/products.js";
import { v2 as cloudinary } from "cloudinary";

const typeObj = {
  cargos: Cargos,
  bottoms: Bottoms,
  hoodies: Hoodies,
  tshirts: Tshirts,
  shirts: Shirts,
};

const deleteProduct = async (req, res, type) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({ msg: "Missing id" });
  }
  try {
    const product = await typeObj[type].findByIdAndDelete(id).lean();
    if (!product) {
      return res
        .status(404)
        .send({ msg: "Product not found, therefore can't delete" });
    }
    const v = await Promise.all(
      product.image.map(async (imageLink) => {
        let publicId = imageLink.split("/");
        publicId = publicId[publicId.length - 1].split(".")[0];
        try {
          const result = await cloudinary.uploader.destroy(
            `products/${type}/${publicId}`,
            { invalidate: true }
          );
          return result;
        } catch (error) {
          console.error(`Failed to delete image ${publicId}:`, error);
          throw error;
        }
      })
    );
    res.send({ msg: "Product deleted successfully", id: v });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Product not found" });
  }
};

export default deleteProduct;
