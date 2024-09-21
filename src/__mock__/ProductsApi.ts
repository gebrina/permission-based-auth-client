import { mock } from "../api";
import { products } from "../data/mock-product";

mock.onGet("products").reply(() => [200, products]);
