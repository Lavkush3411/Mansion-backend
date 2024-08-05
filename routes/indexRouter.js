import express from "express";
import { productRouter } from "./product.js";
import { verifyToken } from "../middlewares/jwt.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { adminRouter } from "./admin.js";
import { userRouter } from "./user.js";
import { paymentRouter } from "./payment.js";
import { orderRouter } from "./order.js";
import test from "../test.js";

export const indexRouter = express.Router();

indexRouter.use("/products", productRouter);
indexRouter.use("/admin", verifyToken, verifyAdmin, adminRouter);
indexRouter.use("/user", userRouter);
indexRouter.use("/payment", verifyToken, paymentRouter);
indexRouter.use("/order", orderRouter);
indexRouter.use("/test", test);
