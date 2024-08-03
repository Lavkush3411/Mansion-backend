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
dotenv.config();

const app = express();

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use("/", indexRouter);
app.use(gloabalCatch);

app.listen(3000, () => console.log("server is running on port 3000"));
