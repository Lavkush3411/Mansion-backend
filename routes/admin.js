import express from "express";
import fs from "fs";
import {
  Cargos,
  Bottoms,
  Hoodies,
  Tshirts,
  Shirts,
} from "../model/products.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import deleteProduct from "../controllers/deleteProduct.js";
import cache, { cacheData } from "../utils/cache.js";

export const adminRouter = express.Router();

adminRouter.delete("/delete/:type", async (req, res) => {
  await deleteProduct(req, res, req.params.type);
  cache.del(req.params.type);
  console.log(req.params.type);
  cache.del("all");
  cacheData();
});

adminRouter.post("/new/cargos", async (req, res) => {
  try {
    const files = req.files.image;
    //if multiple files are sent by the server then it will be in array form that can be handled as below

    console.log("We have received Files now uploading to the server");
    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/cargos",
            resource_type: "auto",
            format: "webp",
          });
          fs.unlinkSync(file.tempFilePath);
          return url.secure_url;
        })
      );
      await Cargos.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: urls,
      });
    }
    //if single file is being sent
    else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/cargos",
        resource_type: "auto",
        format: "webp",
      });
      fs.unlinkSync(files.tempFilePath);

      await Cargos.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: [url.secure_url],
      });
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: e });
  } finally {
    cache.del("all");
    cacheData();
  }
  res.send({ msg: "Cargo is added" });
});

adminRouter.post("/new/bottoms", async (req, res) => {
  try {
    const files = req.files.image;
    console.log("We have received Files now uploading to the server");

    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/sweatpants",
            format: "webp",
          });
          fs.unlinkSync(file.tempFilePath);

          return url.secure_url;
        })
      );
      await Bottoms.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: urls,
      });
    } else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/sweatpants",
        format: "webp",
      });
      fs.unlinkSync(files.tempFilePath);

      await Bottoms.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: [url.secure_url],
      });
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: e });
  } finally {
    cache.del("all");
    cacheData();
  }
  res.send({ msg: "Sweatpants is added" });
});

adminRouter.post("/new/tshirts", async (req, res) => {
  try {
    const files = req.files.image;
    console.log("We have received Files now uploading to the server");

    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/tshirts",
            format: "webp",
          });
          fs.unlinkSync(file.tempFilePath);

          return url.secure_url;
        })
      );
      await Tshirts.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: urls,
      });
      res.send({ msg: "Tshirt is added" });
    } else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/tshirts",
        format: "webp",
      });
      fs.unlinkSync(files.tempFilePath);

      await Tshirts.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: [url.secure_url],
      });
      res.send({ msg: "Tshirt is added" });
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: e });
  } finally {
    cache.del("all");
    cacheData();
  }
});

adminRouter.post("/new/shirts", async (req, res) => {
  try {
    const files = req.files.image;
    console.log("We have received Files now uploading to the server");

    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/shirts",
            format: "webp",
          });
          fs.unlinkSync(file.tempFilePath);

          return url.secure_url;
        })
      );
      await Shirts.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: urls,
      });
      res.send({ message: "Shirt is added" });
    } else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/shirts",
        format: "webp",
      });
      fs.unlinkSync(files.tempFilePath);

      await Shirts.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: [url.secure_url],
      });
      res.send({ msg: "Shirt is added" });
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: e });
  } finally {
    cache.del("all");
    cacheData();
  }
});

adminRouter.post("/new/hoodies", async (req, res) => {
  try {
    const files = req.files.image;
    console.log("We have received Files now uploading to the server");

    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/hoodies",
            format: "webp",
          });
          fs.unlinkSync(file.tempFilePath);

          return url.secure_url;
        })
      );
      await Hoodies.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: urls,
      });
      res.json({ msg: "Hoodie is added" });
    } else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/hoodies",
        format: "webp",
      });
      fs.unlinkSync(files.tempFilePath);

      await Hoodies.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: [url.secure_url],
      });
      res.json({ msg: "Hoodie is added" });
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: e });
  } finally {
    cache.del("all");
    cacheData();
  }
});

// getting product data
const productList = [Cargos, Bottoms, Hoodies, Tshirts, Shirts];

adminRouter.post("/post/all", async (req, res) => {
  const alldata = await Promise.all(
    productList.map((item) => item.find().lean())
  );
  res.send(alldata.flat());
});

adminRouter.post("/post/:product", async (req, res) => {
  const product = req.params.product;
  if (product) {
    const Product = mongoose.model(product);
    const data = await Product.find().lean();
    res.send(data);
  } else {
    res.send([]);
  }
});
