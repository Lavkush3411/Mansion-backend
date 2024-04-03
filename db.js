import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGO_URI;

mongoose
  .connect(URI)
  .then(() => console.log("connection Success to Database"))
  .catch((error) => console.log("some Error ", error));
