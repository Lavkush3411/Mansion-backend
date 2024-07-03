import express from "express";
import {
  initiatePayment,
  paymentStatus,
} from "../controllers/paymentController.js";
const paymentRouter = express.Router();

paymentRouter.route("/initiate").post(initiatePayment);
paymentRouter.route("/status/:id").post(paymentStatus);

export default paymentRouter;
