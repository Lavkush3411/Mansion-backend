import mongoose from "mongoose";

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
const User = new mongoose.model("User", UserSchema);

export default User;
