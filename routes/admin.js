import express from "express";
import {
  addProduct,
  deleteProudctController,
} from "../controllers/adminProuductController.js";
import {
  getAllProducts,
  getProducts,
} from "../controllers/productController.js";

export const adminRouter = express.Router();

adminRouter.delete("/delete/:type", deleteProudctController);
adminRouter.post("/new/:product", addProduct);
adminRouter.get("/all", getAllProducts);
adminRouter.get("/:product", getProducts);
