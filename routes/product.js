import express from "express";
import {
  Cargos,
  Sweatpants,
  Hoodies,
  Tshirts,
  Shirts,
} from "../model/products.js";
import cache from "../utils/cache.js";

const productRouter = express.Router();

const productList = [Cargos, Sweatpants, Hoodies, Tshirts, Shirts];

productRouter.get("/all", async (req, res) => {
  const cachedData = cache.get("all");
  if (cachedData) {
    console.log("cached data");
    res.send(cachedData);
    return;
  }

  const alldata = await Promise.all(
    productList.map((item) => item.find().lean())
  );
  const data = alldata.flat();
  res.send(data);
  cache.set("all", data);
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
