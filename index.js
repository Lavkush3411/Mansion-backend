import express from "express";
import "./db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import "./plugins/cloudinary.js";
import dotenv from "dotenv";
import adminRoute from "./routes/admin.js";
import productRouter from "./routes/product.js";
import userRoute from "./routes/user.js";
import { verifyAdmin } from "./middlewares/verifyAdmin.js";
import { verifyToken } from "./middlewares/jwt.js";
dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/get", productRouter);
app.use("/admin", verifyToken, verifyAdmin, adminRoute);
app.use("/user", userRoute);

app.listen(3000, () => console.log("server is running on port 3000"));
