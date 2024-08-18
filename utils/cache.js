import NodeCache from "node-cache";
import { All } from "../model/products.js";
const productList = ["cargos", "bottoms", "hoodies", "tshirts", "shirts"];

const cache = new NodeCache({ stdTTL: 0 });
async function cacheData() {
  cache.flushAll();
  const alldata = await Promise.all(
    productList.map((item) => All.find({ type: item }).lean())
  );
  const data = alldata.flat();
  cache.set("all", data);
}

cacheData();

// setInterval(cacheData, 30 * 1000 * 60);
export { cacheData };
export default cache;
