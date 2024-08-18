import express from "express";
import {
  getAllProducts,
  getProductByID,
  getProducts,
} from "../controllers/productController.js";

export const productRouter = express.Router();

productRouter.get("/all", getAllProducts);
productRouter.get("/id/:productid",getProductByID)
productRouter.get("/:product", getProducts);
