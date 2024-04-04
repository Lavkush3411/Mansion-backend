import express from "express";
import "./db.js";
import {
  Cargos,
  Sweatpants,
  Hoodies,
  Tshirts,
  Shirts,
} from "./Database/products.js";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import "./plugins/cloudinary.js";
import dotenv from "dotenv";
import adminRoute from "./routes/admin.js";
dotenv.config();

const app = express();
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.get("/get/sweatpants", async (req, res) => {
  const data = await Sweatpants.find();

  res.send(data);
});

app.get("/get/cargos", async (req, res) => {
  const data = await Cargos.find();

  res.send(data);
});

app.use("/admin", adminRoute);

app.listen(3000, () => console.log("server is running on port 3000"));
