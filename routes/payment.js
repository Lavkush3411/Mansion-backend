import express from "express";
import {
  initiatePayment,
  paymentCallback,
  paymentStatus,
} from "../controllers/paymentController.js";
import createOrder from "../middlewares/createOrder.middleware.js";
const paymentRouter = express.Router();

paymentRouter.route("/initiate").post(createOrder, initiatePayment);
paymentRouter.route("/status/:transactionID").post(paymentStatus);
paymentRouter.route("/callback/:transactionID").post(paymentCallback);

export default paymentRouter;
