import express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import verifyOtp from "../middlewares/verifyOtp.js";
import {
  createUser,
  getAddress,
  login,
  logout,
  updateAddress,
  verifyAdminUser,
  verifyUser,
} from "../controllers/userController.js";
import {
  resetPassword,
  resetPasswordOtp,
} from "../controllers/resetPasswordController.js";

export const userRouter = express.Router();

userRouter.route("/create").post(createUser);
userRouter.route("/login").post(login);
userRouter.get("/verify", verifyToken, verifyUser);
userRouter.get("/verify-admin", verifyToken, verifyAdmin, verifyAdminUser);
userRouter.post("/password-reset-otp", resetPasswordOtp);
userRouter.post("/address", verifyToken, updateAddress);
userRouter.get("/address", verifyToken, getAddress);
userRouter.post("/reset-password", verifyOtp, resetPassword);
userRouter.get("/logout", logout);
