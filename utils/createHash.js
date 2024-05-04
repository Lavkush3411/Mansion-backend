import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
export default function createHashedString(str) {
  return crypto.createHash("sha256").update(str).digest("hex");
}
