import mongoose from "mongoose";

const otpStoreSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

const otpStore = new mongoose.model("otpStore", otpStoreSchema);

export default otpStore;
