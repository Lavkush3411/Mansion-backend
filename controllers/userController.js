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
    const token = genrateToken(data);
    res.cookie("token", token, {
      httpOnly: true, // The cookie is only accessible by the server, not client-side JavaScript
      secure: true, // The cookie will only be sent over HTTPS (important for SameSite=None)
    });
    res.status(200).json({ Token: token, msg: "Login Successfull" });
  } catch (err) {
    res.status(404).json({ msg: err.msg });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "logged out" });
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { password: 0, isAdmin: 0, __v: 0, orders: 0 }
    )
      .lean()
      .sort({ _id: -1 });
    res.status(200).json(users);
  } catch {
    res.status(500).json("Some error occured while getting users data");
  }
};

export const updateAddress = async (req, res) => {
  const address = req.body.address;
  try {
    await User.findOneAndUpdate({ email: req.email }, { address });
    res.status(200).json({ msg: "Address is updated" });
  } catch {
    res
      .status(401)
      .json({ msg: "Some error occured while updating the address" });
  }
};

export const getAddress = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.email });
    res.status(200).json({ address: user.address });
  } catch {
    res
      .status(401)
      .json({ msg: "Some error occured while getting the address" });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.email },
      { isAdmin: 0, orders: 0, password: 0, _id: 0, __v: 0 }
    );
    res.status(200).json({ user });
  } catch {
    res
      .status(401)
      .json({ msg: "Some error occured while getting user details" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.email },
      { ...req.body },
      {
        isAdmin: 0,
        orders: 0,
        password: 0,
        _id: 0,
        __v: 0,
        runValidators: true,
      }
    );
    res.status(200).json({ user });
  } catch {
    res
      .status(401)
      .json({ msg: "Some error occured while getting user details" });
  }
};
