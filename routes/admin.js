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

const adminRoute = express.Router();

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
          return url.url;
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
        image: [url.url],
      });
    }
  } catch (e) {
    console.log(e);
  }
  res.send({ message: "Cargo is added" });
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

          return url.url;
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
        image: [url.url],
      });
    }
  } catch (e) {
    console.log(e);
  }
  res.send({ message: "Sweatpants is added" });
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

          return url.url;
        })
      );
      await Tshirts.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: urls,
      });
      res.send({ message: "Tshirt is added" });
    } else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/tshirts",
      });
      fs.unlinkSync(files.tempFilePath);

      await Tshirts.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: [url.url],
      });
      res.send({ message: "Tshirt is added" });
    }
  } catch (e) {
    console.log(e);
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

          return url.url;
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
        image: [url.url],
      });
      res.send({ message: "Shirt is added" });
    }
  } catch (e) {
    console.log(e);
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

          return url.url;
        })
      );
      await Hoodies.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: urls,
      });
      res.send({ message: "Hoodie is added" });
    } else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/hoodies",
      });
      fs.unlinkSync(files.tempFilePath);

      await Hoodies.create({
        ...req.body,
        stock: JSON.parse(req.body.stock),
        image: [url.url],
      });
      res.send({ message: "Hoodie is added" });
    }
  } catch (e) {
    console.log(e);
    res.send({ e: e });
  }
});

// getting product data

adminRoute.get("/get/cargos", async (req, res) => {
  const data = await Cargos.find();

  res.send(data);
});

adminRoute.get("/get/sweatpants", async (req, res) => {
  const data = await Sweatpants.find();

  res.send(data);
});

adminRoute.get("/get/shirts", async (req, res) => {
  const data = await Shirts.find();
  res.send(data);
});

adminRoute.get("/get/tshirts", async (req, res) => {
  const data = await Tshirts.find();

  res.send(data);
});

adminRoute.get("/get/hoodies", async (req, res) => {
  const data = await Hoodies.find();
  res.send(data);
});

export default adminRoute;
