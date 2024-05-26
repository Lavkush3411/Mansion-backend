import express from "express";
import {
  Cargos,
  Sweatpants,
  Hoodies,
  Tshirts,
  Shirts,
} from "../model/products.js";

const productRouter = express.Router();

const productList = [Cargos, Sweatpants, Hoodies, Tshirts, Shirts];

let alldata;

// setInterval(() => {}, interval);

productRouter.get("/all", async (req, res) => {
  const alldata = await Promise.all(
    productList.map((item) => item.find().lean())
  );
  res.send(alldata.flat());
});

productRouter.get("/sweatpants", async (req, res) => {
  const data = await Sweatpants.find().lean();
  res.send(data);
});

productRouter.get("/cargos", async (req, res) => {
  const data = await Cargos.find().lean();
  res.send(data);
});

productRouter.get("/tshirts", async (req, res) => {
  const data = await Tshirts.find().lean();
  res.send(data);
});
productRouter.get("/shirts", async (req, res) => {
  const data = await Shirts.find().lean();
  res.send(data);
});
productRouter.get("/hoodies", async (req, res) => {
  const data = await Hoodies.find().lean();
  res.send(data);
});
export default productRouter;
