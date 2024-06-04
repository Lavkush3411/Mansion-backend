import NodeCache from "node-cache";
import {
  Cargos,
  Sweatpants,
  Hoodies,
  Tshirts,
  Shirts,
} from "../model/products.js";
const productList = [Cargos, Sweatpants, Hoodies, Tshirts, Shirts];

const cache = new NodeCache({ stdTTL: 30 });
async function cacheData() {
  cache.flushAll();
  const alldata = await Promise.all(
    productList.map((item) => item.find().lean())
  );
  const data = alldata.flat();
  cache.set("all", data);
}

cacheData();

setInterval(cacheData, 30 * 1000 * 60);
export { cacheData };
export default cache;
