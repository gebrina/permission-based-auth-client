import { mock } from "../api";
import { products } from "../data/mock-product";

mock.onGet("products").reply(() => {
  console.log("Products requestd", products.length);
  return [200, products];
});
