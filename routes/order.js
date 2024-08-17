import express from "express";
import { userOrders } from "../controllers/order.js";
import { verifyToken } from "../middlewares/jwt.js";

export const orderRouter = express.Router();

orderRouter.get("/userOrders", verifyToken, userOrders);
