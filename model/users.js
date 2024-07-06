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
  isAdmin: { type: Boolean, default: false },
  orders: { type: [mongoose.Schema.Types.ObjectId], default: [] },
});

// UserSchema.index({ email: 1 });
const User = usersDb.model("User", UserSchema);

export default User;
