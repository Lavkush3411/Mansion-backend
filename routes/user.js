import express from "express";
import User from "../model/users.js";
import { genrateToken, verifyToken } from "../middlewares/jwt.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import crypto from "crypto";

const userRoute = express.Router();

userRoute.route("/create").post((req, res) => {
  const { name, email, contact, password } = req.body;
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

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
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (!user) throw { msg: "No User Found" };
    if (user.password !== hashedPassword) throw { msg: "Incorrect Password" };
    const { _id, __v, ...data } = user._doc;
    res
      .status(200)
      .json({ Token: genrateToken(data), msg: "Login Successfull" });
  } catch (e) {
    res.status(404).json({ msg: e.msg });
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

export default userRoute;
