import express from "express";
import fs from "fs";
import axios from "axios";
import { Cargos, Bottoms, Hoodies, Tshirts, Shirts } from "./model/products.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import deleteProduct from "./controllers/deleteProduct.js";
import createHashedString from "./utils/createHash.js";
import dotenv from "dotenv";
dotenv.config();

const test = express.Router();
test.delete("/delete:type", async (req, res) =>
  deleteProduct(req, res, req.params.type)
);

test.post("/buy", async (req, res) => {
  const phonePayEndPoint = "/pg/v1/pay";
  const payLoad = {
    merchantId: "PGTESTPAYUAT86",
    merchantTransactionId: "MT7850590068188104d",
    merchantUserId: "MUID123d",
    amount: 10000,
    redirectUrl: process.env.BACKEND_HOME_URL + "/test/status",
    redirectMode: "POST",
    callbackUrl: process.env.BACKEND_HOME_URL + "/test/status",
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const base64Payload = Buffer.from(JSON.stringify(payLoad)).toString("base64");
  const checksum =
    createHashedString(
      base64Payload + phonePayEndPoint + process.env.PHONEPAY_SALT_KEY
    ) +
    "###" +
    process.env.PHONEPAY_SALT_INDEX;

  const options = {
    method: "post",
    url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
    headers: {
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
    },
    data: {
      request: base64Payload,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res
        .json({ url: response.data.data.instrumentResponse.redirectInfo.url })
        .status(200);
    })
    .catch(function (error) {
      console.error(error);
    });
});

test.post("/status", (req, res) => {
  console.log("status is verified");
  res.redirect(process.env.FRONEND_HOME_URL);
});

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
