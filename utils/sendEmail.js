import nodemailer from "nodemailer";
import dotenv from "dotenv";
import genrateOtp from "./genrateOtp.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function sendEmail(to) {
  const OTP = genrateOtp();
  const message = {
    from: process.env.EMAIL,
    to: to,
    subject: "Password Reset For Mansion StreetWear",
    text: `Your OTP to reset password is ${OTP}`,
  };

  return new Promise((resolve, reject) =>
    transporter.sendMail(message, (err) => {
      if (err) {
        reject({
          status: 400,
          error: err,
          msg: "Some Error Encountered While Sending OTP",
        });
      }
      resolve({ status: 200, msg: "OTP sent", otp: OTP });
    })
  );
}

export async function sendOrderPlacedEmail(to, order) {
  const message = {
    from: process.env.EMAIL,
    to: to,
    subject: `New Order Received`,
    text: `New Order has been recieved for ${order}`,
  };

  return await new Promise((resolve, reject) =>
    transporter.sendMail(message, (err) => {
      if (err) {
        reject({
          status: 400,
          error: err,
          msg: "Some Error Encountered While sending order detils",
        });
      }
      resolve({ status: 200, msg: "OTP sent", otp: OTP });
    })
  );
}
