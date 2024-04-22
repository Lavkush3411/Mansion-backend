import express from "express";
import User from "../model/users.js";
import { genrateToken, verifyToken } from "../middlewares/jwt.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const userRoute = express.Router();

userRoute.route("/create").post((req, res) => {
  const { name, email, contact, password } = req.body;
  User.create({ name, email, contact, password, isAdmin: false })
    .then(() => {
      res.send("Success");
    })
    .catch((err) => res.send(err));
});

userRoute.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) throw { msg: "No User Found" };
    const { _id, __v, ...data } = user._doc;
    console.log("received login request");
    res.json({ Token: genrateToken(data) });
  } catch (e) {
    res.status(404).send();
  }
});

userRoute.post("/verify", verifyToken, (req, res) => {
  if (req.body.valid) {
    res.status(200).send("Token Is Verified");
  } else {
    {
      res.status(501).send("Token Is Failed");
    }
  }
});

userRoute.post("/verify-admin", verifyToken, verifyAdmin, (req, res) => {
  if (req.body.isAdmin) {
    res.status(200).send({ isAdmin: req.body.isAdmin });
  } else {
    res.status(501).send({ isAdmin: req.body.isAdmin });
  }
});

export default userRoute;
