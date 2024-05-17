import express from "express";
import "./db.js";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import "./plugins/cloudinary.js";
import dotenv from "dotenv";
import adminRoute from "./routes/admin.js";
import productRouter from "./routes/product.js";
import userRoute from "./routes/user.js";
import { verifyToken } from "./middlewares/jwt.js";
import { verifyAdmin } from "./middlewares/verifyAdmin.js";
dotenv.config();

const app = express();
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const corsOptions = {
  origin: "https://mansionstreetwear.netlify.app", // Replace with your client URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If you need to send cookies or authentication headers
  optionsSuccessStatus: 204, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(cors());

app.use("/get", productRouter);
app.use("/admin", verifyToken, verifyAdmin, adminRoute);
app.use("/user", userRoute);

app.listen(3000, () => console.log("server is running on port 3000"));
