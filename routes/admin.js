import express from "express";
import {
  addProduct,
  deleteProudctController,
  updateProductController,
} from "../controllers/adminProuductController.js";
import {
  getAllProducts,
  getProducts,
} from "../controllers/productController.js";
import { getAllUsers } from "../controllers/userController.js";
import { deleteOrder, getAllOrders } from "../controllers/order.js";

export const adminRouter = express.Router();

adminRouter.delete("/delete/:type", deleteProudctController);
adminRouter.delete("/order/:id", deleteOrder);

adminRouter.post("/new/:product", addProduct);
adminRouter.patch("/:product", updateProductController);
adminRouter.get("/all", getAllProducts);
adminRouter.get("/orders", getAllOrders);
adminRouter.get("/users", getAllUsers);
adminRouter.get("/:product", getProducts);
