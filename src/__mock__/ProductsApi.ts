import { mock } from "../api";
import { products } from "../data/mock-product";

mock.onGet("products").reply(() => [200, products]);

mock.onGet("product").reply(({ params }) => {
  const product = products.find((p) => p.id === params.id);
  return [200, product];
});

mock.onPost("products").reply(({ data }) => {
  products.push(data);
  return [200, data];
});
