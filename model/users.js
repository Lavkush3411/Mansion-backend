import mongoose from "mongoose";

const UserSchema = {
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // validate: {
    //   validator: function (v) {
    //     return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
    //   },
    //   message: (v) => "not valid email",
    // },
  },
  password: { type: String, required: true },
  contact: {
    type: Number,
    required: true,
  },
  isAdmin: { type: Boolean, default: false },
};

const User = new mongoose.model("User", UserSchema);

export default User;
