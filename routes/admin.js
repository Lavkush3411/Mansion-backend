import express from "express";
import fs from "fs";
import {
  Cargos,
  Sweatpants,
  Hoodies,
  Tshirts,
  Shirts,
} from "../model/products.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import deleteProduct from "../controllers/deleteProduct.js";

const adminRoute = express.Router();

adminRoute.delete("/delete/:type", (req,res)=>deleteProduct(req,res,req.params.type));




adminRoute.post("/new/cargos", async (req, res) => {
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
  }
  res.send({ msg: "Cargo is added" });
});

adminRoute.post("/new/sweatpants", async (req, res) => {
  try {
    const files = req.files.image;
    console.log("We have received Files now uploading to the server");

    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/sweatpants",
          });
          fs.unlinkSync(file.tempFilePath);

          return url.secure_url;
        })
      );
      await Sweatpants.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: urls,
      });
    } else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/sweatpants",
      });
      fs.unlinkSync(files.tempFilePath);

      await Sweatpants.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: [url.secure_url],
      });
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: e });
  }
  res.send({ msg: "Sweatpants is added" });
});

adminRoute.post("/new/tshirts", async (req, res) => {
  try {
    const files = req.files.image;
    console.log("We have received Files now uploading to the server");

    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/tshirts",
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
  }
});

adminRoute.post("/new/shirts", async (req, res) => {
  try {
    const files = req.files.image;
    console.log("We have received Files now uploading to the server");

    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/shirts",
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
  }
});

adminRoute.post("/new/hoodies", async (req, res) => {
  try {
    const files = req.files.image;
    console.log("We have received Files now uploading to the server");

    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/hoodies",
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
  }
});

// getting product data
const productList = [Cargos, Sweatpants, Hoodies, Tshirts, Shirts];

adminRoute.post("/post/all", async (req, res) => {
  const alldata = await Promise.all(productList.map((item) => item.find().lean()));
  res.send(alldata.flat());
});

adminRoute.post("/post/:product", async (req, res) => {
  const product = req.params.product;
  if (product) {
    const Product = mongoose.model(product);
    const data = await Product.find().lean();
    res.send(data);
  } else {
    res.send([]);
  }
});
export default adminRoute;
