import mongoose from "mongoose";
import { usersDb } from "../db.js";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: "India" },
  },
  isAdmin: { type: Boolean, default: false },
  orders: { type: [mongoose.Schema.Types.ObjectId], default: [] },
});

// UserSchema.index({ email: 1 });
const User = usersDb.model("User", UserSchema);

export default User;
