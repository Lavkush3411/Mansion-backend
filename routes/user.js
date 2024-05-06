import express from "express";
import User from "../model/users.js";
import { genrateToken, verifyToken } from "../middlewares/jwt.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import otpStore from "../model/tempOtp.js";
import verifyOtp from "../middlewares/verifyOtp.js";
import createHashedString from "../utils/createHash.js";

const userRoute = express.Router();

userRoute.route("/create").post((req, res) => {
  const { name, email, contact, password } = req.body;
  const hashedPassword = createHashedString(password);

  User.create({
    name,
    email,
    contact,
    password: hashedPassword,
    isAdmin: false,
  })
    .then(() => {
      console.log("user is created");
      res.status(200).json({ msg: "User Successfully created" });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).json({ msg: "Email Already Exists, Please Login !!" });
      } else {
        res.status(400).json({ msg: err });
      }
    });
});

userRoute.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const hashedPassword = createHashedString(password);
    if (!user) throw { msg: "NonExistingError" };
    if (user.password !== hashedPassword) throw { msg: "WrongPasswordError" };
    const { _id, __v, ...data } = user._doc;
    res
      .status(200)
      .json({ Token: genrateToken(data), msg: "Login Successfull" });
  } catch (err) {
    res.status(404).json({ msg: err.msg });
  }
});

userRoute.post("/verify", verifyToken, (req, res) => {
  if (req.body.valid) {
    res.status(200).json({ msg: "User Is Verified" });
  } else {
    {
      res.status(501).json({ msg: "User Verification failed" });
    }
  }
});
 
userRoute.post("/verify-admin", verifyToken, verifyAdmin, (req, res) => {
  if (req.body.isAdmin) {
    res.status(200).send({ isAdmin: req.body.isAdmin, msg: "Verified Admin" });
  } else {
    res
      .status(501)
      .send({ isAdmin: req.body.isAdmin, msg: "Admin Verification failed" });
  }
});
//this route will send otp for resetting password
userRoute.post("/password-reset-otp", async (req, res) => {
  try {
    const email = req.body.email;

    const currentUser = await User.findOne({ email });
    if (currentUser) {
      const resetStatus = await sendEmail(email);
      res.status(resetStatus.status).json({ msg: resetStatus.msg });
      otpStore
        .findOneAndUpdate(
          { email },
          { $set: { otp: resetStatus.otp } },
          { upsert: true, new: true }
        )
        .then(() => {
          console.log("Otp added");
        });

      return;
    } else {
      throw { status: 401, msg: "User Not Found" };
    }
  } catch (e) {
    return res.status(e.status).json({ msg: e.msg, err: e.error });
  }
});

userRoute.post("/reset-password", verifyOtp, async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const hashedPassword = createHashedString(password);
  const result = await User.findOneAndUpdate(
    { email },
    { $set: { password: hashedPassword } }
  );
  res.status(200).json({ msg: "Password is updated" });
});

export default userRoute;
