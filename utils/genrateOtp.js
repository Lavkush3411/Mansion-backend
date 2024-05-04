import crypto from "crypto";

export default function genrateOtp() {
  const availableNumbers = "0123456789";
  let OTP = "";
  const otpLength = 6;

  const array = new Uint8Array(6);
  crypto.getRandomValues(array);

  for (let i = 0; i < otpLength; i++) {
    OTP += availableNumbers[array[i] % 10];
  }
  return OTP;
}
