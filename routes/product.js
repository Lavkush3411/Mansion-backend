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

productRouter.get("/all", async (req, res) => {
  let allProducts = await Promise.all(
    productList.reduce((prev, current) => prev.concat(current.find()), [])
  );
  res.send(allProducts.flat());
});

productRouter.get("/sweatpants", async (req, res) => {
  const data = await Sweatpants.find();
  res.send(data);
});

productRouter.get("/cargos", async (req, res) => {
  const data = await Cargos.find();
  res.send(data);
});

productRouter.get("/tshirts", async (req, res) => {
  const data = await Tshirts.find();
  res.send(data);
});
productRouter.get("/shirts", async (req, res) => {
  const data = await Shirts.find();
  res.send(data);
});
productRouter.get("/hoodies", async (req, res) => {
  const data = await Hoodies.find();
  res.send(data);
});
export default productRouter;
