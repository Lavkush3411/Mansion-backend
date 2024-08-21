import "./db.js";
import "./plugins/cloudinary.js";
import "./utils/cache.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import { indexRouter } from "./routes/indexRouter.js";
import { gloabalCatch } from "./utils/gloabalCatch.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    origin: [
      process.env.FRONTEND_HOME_URL,
      "https://mansion-react.vercel.app",
      "https://mansionhub.in",
    ],
  })
);
app.use("/", indexRouter);
app.use(gloabalCatch);

app.listen(3000, () => console.log("server is running on port 3000"));
