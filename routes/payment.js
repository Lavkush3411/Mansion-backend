import express from "express";
import {
  initiatePayment,
  paymentStatus,
} from "../controllers/paymentController.js";
import createOrder from "../middlewares/createOrder.middleware.js";
import { compareOrderAmount } from "../middlewares/compareOrderAmount.js";
import { verifyToken } from "../middlewares/jwt.js";
export const paymentRouter = express.Router();
paymentRouter
  .route("/initiate")
  .post(verifyToken, compareOrderAmount, createOrder, initiatePayment);
paymentRouter.route("/status/:transactionID").post(paymentStatus); //this route is post because this one is called by paytm webhook for updating payment status
