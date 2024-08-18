import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import fs from "fs";
import cache, { cacheData } from "../utils/cache.js";
import deleteProduct from "./deleteProduct.js";
import { All } from "../model/products.js";

export const addProduct = async (req, res) => {
  const productName = req.params.product;
  if (!productName)
    return res.send("Product should be posted inside product name");
  const session = await mongoose.startSession();
  try {
    const files = req.files.image;
    //if multiple files are sent by the server then it will be in array form that can be handled as below
    console.log("We have received Files now uploading to the server");
    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: `/products/${productName}`,
            resource_type: "auto",
            format: "webp",
          });
          fs.unlinkSync(file.tempFilePath);
          return url.secure_url;
        })
      );

      session.startTransaction();

      await All.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: urls,
      });
      await session.commitTransaction();
      session.endSession();
    }
    //if single file is being sent
    else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: `/products/${productName}`,
        resource_type: "auto",
        format: "webp",
      });
      fs.unlinkSync(files.tempFilePath);
      session.startTransaction();
      await All.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: [url.secure_url],
      });

      await session.commitTransaction();
      session.endSession();
    }
  } catch (e) {
    console.log(e);
    await session.abortTransaction();
    session.endSession();
    res.json({ msg: e });
  } finally {
    cache.del("all");
    cacheData();
  }
  res.send({ msg: `${productName} is added` });
};

export const deleteProudctController = async (req, res) => {
  await deleteProduct(req, res, req.params.type);
  cache.del(req.params.type);
  console.log(req.params.type);
  cache.del("all");
  cacheData();
};
