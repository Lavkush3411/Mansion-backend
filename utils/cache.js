import NodeCache from "node-cache";
import {
  Cargos,
  Hoodies,
  Tshirts,
  Shirts,
  Bottoms,
} from "../model/products.js";
const productList = [Cargos, Bottoms, Hoodies, Tshirts, Shirts];

const cache = new NodeCache({ stdTTL: 0 });
async function cacheData() {
  cache.flushAll();
  const alldata = await Promise.all(
    productList.map((item) => item.find().lean())
  );
  const data = alldata.flat();
  cache.set("all", data);
}

cacheData();

// setInterval(cacheData, 30 * 1000 * 60);
export { cacheData };
export default cache;
