import express from "express";
import "./db.js";
import {
  Cargos,
  Sweatpants,
  Hoodies,
  Tshirts,
  Shirts,
} from "./Database/products.js";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import "./plugins/cloudinary.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

//posting product data

app.post("/admin/new/cargos", async (req, res) => {
  try {
    const files = req.files.image;
    //if multiple files are sent by the server then it will be in array form that can be handled as below
    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/cargos",
            resource_type: "auto",
          });
          await fs.promises.unlink(file.tempFilePath);
          return url.url;
        })
      );
      await Cargos.create({ ...req.body, image: urls });
    }
    //if single file is being sent
    else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/cargos",
        resource_type: "auto",
      });
      await Cargos.create({ ...req.body, image: [url.url] });
    }
  } catch (e) {
    console.log(e);
  }
  res.send({ message: "Cargo is added" });
});

app.post("/admin/new/sweatpants", async (req, res) => {
  try {
    const files = req.files.image;
    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/sweatpants",
          });
          return url.url;
        })
      );
      await Sweatpants.create({ ...req.body, image: urls });
    } else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/sweatpants",
      });
      await Sweatpants.create({ ...req.body, image: [url.url] });
    }
  } catch (e) {
    console.log(e);
  }
  res.send({ message: "Sweatpants is added" });
});

app.post("/admin/new/tshirts", async (req, res) => {
  try {
    const files = req.files.image;
    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/tshirts",
          });
          return url.url;
        })
      );
      await Tshirts.create({ ...req.body, image: urls });
      res.send({ message: "Tshirt is added" });
    } else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/tshirts",
      });
      await Tshirts.create({ ...req.body, image: [url.url] });
      res.send({ message: "Tshirt is added" });
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/admin/new/shirts", async (req, res) => {
  try {
    const files = req.files.image;
    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/shirts",
          });
          return url.url;
        })
      );
      await Shirts.create({ ...req.body, image: urls });
      res.send({ message: "Shirt is added" });
    } else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/shirts",
      });
      await Shirts.create({ ...req.body, image: [url.url] });
      res.send({ message: "Shirt is added" });
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/admin/new/hoodies", async (req, res) => {
  try {
    const files = req.files.image;
    console.log(files);

    if (Array.isArray(files)) {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "/products/hoodies",
          });
          return url.url;
        })
      );
      await Hoodies.create({ ...req.body, image: urls });
      res.send({ message: "Hoodie is added" });
    } else {
      const url = await cloudinary.uploader.upload(files.tempFilePath, {
        folder: "/products/hoodies",
      });
      await Hoodies.create({ ...req.body, image: [url.url] });
      res.send({ message: "Hoodie is added" });
    }
  } catch (e) {
    console.log(e);
    res.send({ e: e });
  }
});

// getting product data

app.get("/admin/get/cargos", async (req, res) => {
  const data = await Cargos.find();

  res.send(data);
});

app.get("/get/cargos", async (req, res) => {
  const data = await Cargos.find();

  res.send(data);
});

app.get("/admin/get/sweatpants", async (req, res) => {
  const data = await Sweatpants.find();

  res.send(data);
});

app.get("/get/sweatpants", async (req, res) => {
  const data = await Sweatpants.find();

  res.send(data);
});

app.get("/admin/get/shirts", async (req, res) => {
  const data = await Shirts.find();
  res.send(data);
});

app.get("/admin/get/tshirts", async (req, res) => {
  const data = await Tshirts.find();

  res.send(data);
});

app.get("/admin/get/hoodies", async (req, res) => {
  const data = await Hoodies.find();
  res.send(data);
});

app.listen(3000, () => console.log("server is running on port 3000"));
