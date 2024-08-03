import sendEmail from "../utils/sendEmail.js";
import otpStore from "../model/tempOtp.js";
import User from "../model/users.js";
import createHashedString from "../utils/createHash.js";

export const resetPasswordOtp = async (req, res) => {
  try {
    const email = req.body.email;
    const currentUser = await User.findOne({ email });
    console.log(currentUser);
    if (currentUser) {
      const resetStatus = await sendEmail(email);
      res.status(resetStatus.status).json({ msg: resetStatus.msg });
      otpStore
        .findOneAndUpdate(
          { email },
          { $set: { otp: resetStatus.otp } },
          { upsert: true, new: true }
        )
        .then(() => {
          console.log("Otp added");
        });

      return;
    } else {
      throw { status: 401, msg: "User Not Found" };
    }
  } catch (e) {
    return res.status(e.status).json({ msg: e.msg, err: e.error });
  }
};

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const hashedPassword = createHashedString(password);
  const result = await User.findOneAndUpdate(
    { email },
    { $set: { password: hashedPassword } }
  );
  res.status(200).json({ msg: "Password is updated" });
};
