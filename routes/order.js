import express from "express";
import { userOrders } from "../controllers/order.js";

export const orderRouter = express.Router();

orderRouter.post("/userOrders", userOrders);
