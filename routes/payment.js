import express from "express";
import {
  initiatePayment,
  paymentStatus,
} from "../controllers/paymentController.js";
import createOrder from "../middlewares/createOrder.middleware.js";
export const paymentRouter = express.Router();
paymentRouter.route("/initiate").post(createOrder, initiatePayment);
paymentRouter.route("/status/:transactionID").post(paymentStatus);
