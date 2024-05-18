import express from "express";
import fs from "fs";
import {
  Cargos,
  Sweatpants,
  Hoodies,
  Tshirts,
  Shirts,
} from "./model/products.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import deleteProduct from "./controllers/deleteProduct.js";

const test = express.Router();
test.delete("/delete:type", async (req, res) =>
  deleteProduct(req, res, req.params.type)
);

// test.delete("/delete/cargos", async (req, res) => {
//   const { id } = req.body;
//   if (!id) {
//     return res.status(400).send({ msg: "Missing id" });
//   }
//   try {
//     const product = await Cargos.findById(id).lean();
//     if (!product) {
//       return res
//         .status(404)
//         .send({ msg: "Product not found, therefore can't delete" });
//     }
//     const v = await Promise.all(
//       product.image.map(async (imageLink) => {
//         let publicId = imageLink.split("/");
//         publicId = publicId[publicId.length - 1].split(".")[0];
//         console.log(publicId);
//         try {
//           const result = await cloudinary.uploader.destroy(
//             `products/cargos/${publicId}`,
//             { invalidate: true }
//           );
//           console.log(result);
//           return result;
//         } catch (error) {
//           console.error(`Failed to delete image ${publicId}:`, error);
//           throw error;
//         }
//       })
//     );
//     res.send({ msg: "Product deleted successfully", id: v });
//   } catch (error) {
//     console.log(error);
//     res.send({ msg: "Product not found" });
//   }
// });

export default test;
