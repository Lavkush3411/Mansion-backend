import { genrateToken } from "../middlewares/jwt.js";
import User from "../model/users.js";
import createHashedString from "../utils/createHash.js";

export const createUser = (req, res) => {
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
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const hashedPassword = createHashedString(password);
    if (!user) throw { msg: "NonExistingError" };
    if (user.password !== hashedPassword) throw { msg: "WrongPasswordError" };
    const { _id, __v, ...data } = user._doc; // **password is being removed when token is generated as here password vaiable is already declared
    res
      .status(200)
      .json({ Token: genrateToken(data), msg: "Login Successfull" });
  } catch (err) {
    res.status(404).json({ msg: err.msg });
  }
};

export const verifyUser = (req, res) => {
  if (req.body.valid) {
    res.status(200).json({ msg: "User Is Verified" });
  } else {
    {
      res.status(501).json({ msg: "User Verification failed" });
    }
  }
};

export const verifyAdminUser = (req, res) => {
  if (req.body.isAdmin) {
    res.status(200).send({ isAdmin: req.body.isAdmin, msg: "Verified Admin" });
  } else {
    res
      .status(501)
      .send({ isAdmin: req.body.isAdmin, msg: "Admin Verification failed" });
  }
};