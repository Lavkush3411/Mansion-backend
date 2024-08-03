import express from "express";
import { productRouter } from "./product.js";
import { verifyToken } from "../middlewares/jwt.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import adminRoute from "./admin.js";
import userRoute from "./user.js";
import paymentRouter from "./payment.js";
import { orderRouter } from "./order.js";
import test from "../test.js";

export const indexRouter = express.Router();

indexRouter.use("/products", productRouter);
indexRouter.use("/admin", verifyToken, verifyAdmin, adminRoute);
indexRouter.use("/user", userRoute);
indexRouter.use("/payment", paymentRouter);
indexRouter.use("/order", orderRouter);
indexRouter.use("/test", test);
