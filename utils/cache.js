import NodeCache from "node-cache";
import { All } from "../model/products.js";
const productList = ["cargos", "bottoms", "hoodies", "tshirts", "shirts"];

const cache = new NodeCache({ stdTTL: 0 });
async function cacheData() {
  cache.flushAll();
  const alldata = await All.find().lean();
  cache.set("all", alldata);
}

cacheData();

// setInterval(cacheData, 30 * 1000 * 60);
export { cacheData };
export default cache;
