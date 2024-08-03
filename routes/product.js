import express from "express";
import {
  getAllProducts,
  getProducts,
} from "../controllers/productController.js";

export const productRouter = express.Router();

productRouter.get("/all", getAllProducts);
productRouter.get("/:product", getProducts);
