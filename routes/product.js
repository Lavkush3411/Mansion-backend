import express from "express";
import {
  availabilityResponder,
  getAllProducts,
  getProductByID,
  getProducts,
} from "../controllers/productController.js";
import { checkAvailabilityForAllProducts } from "../middlewares/productAvailibilityChecker.js";

export const productRouter = express.Router();

productRouter.get("/all", getAllProducts);
productRouter.get("/id/:productid", getProductByID);
productRouter.get("/:product", getProducts);
productRouter.post(
  "/availiblity-check",
  checkAvailabilityForAllProducts,
  availabilityResponder
);
