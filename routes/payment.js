import express from "express";
import {
  initiatePayment,
  paymentStatusChecker,
  paymentStatusHook,
} from "../controllers/paymentController.js";
import createOrder, {
  createCodOrder,
} from "../middlewares/createOrder.middleware.js";
import { compareOrderAmount } from "../middlewares/compareOrderAmount.js";
import { verifyToken } from "../middlewares/jwt.js";
import {
  decreaseItemQuantityPostCodOrder,
  increaseReservedQuantity,
  stockUpdatePostPayment,
} from "../utils/manageReservedQuantity.js";
import { checkAvailabilityForAllProducts } from "../middlewares/productAvailibilityChecker.js";
export const paymentRouter = express.Router();
paymentRouter
  .route("/initiate")
  .post(
    verifyToken,
    compareOrderAmount,
    checkAvailabilityForAllProducts,
    increaseReservedQuantity,
    createOrder,
    initiatePayment
  );
paymentRouter
  .route("/initiate-cod")
  .post(
    verifyToken,
    compareOrderAmount,
    checkAvailabilityForAllProducts,
    decreaseItemQuantityPostCodOrder,
    createCodOrder
  );
paymentRouter.route("/status-checker/:transactionID").get(paymentStatusChecker); // only for status check this route will not update the paymenst status in db
// use below hook route if we need to update the payament status/stock in db
paymentRouter
  .route("/status-update-hook/:transactionID")
  .post(paymentStatusHook, stockUpdatePostPayment); //this route is post because this one is called by paytm webhook for updating payment status
