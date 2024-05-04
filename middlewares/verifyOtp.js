import otpStore from "../model/tempOtp.js";

export default async function verifyOtp(req, res, next) {
  const { email, otp } = req.body;
  const result = await otpStore.findOneAndDelete({ email });
  if (result) {
    if (result._doc.otp === otp) {
      next();
    } else {
      res.status(400).json({ msg: "Wrong OTP" });
    }
  } else {
    res.status(400).json({
      msg: "OTP Expried",
    });
  }
}
