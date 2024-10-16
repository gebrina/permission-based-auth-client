import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import { Product } from "../types";

const ITEMS_SIZE = 50;
const products: Product[] = [];

for (let i = 0; i < ITEMS_SIZE; i++) {
  products.push({
    id: uuid(),
    name: faker.commerce.productName(),
    category: faker.commerce.productMaterial(),
    description: faker.lorem.sentences(),
    image: faker.image.urlPicsumPhotos(),
    price: parseFloat(faker.finance.amount()),
  });
}

export { products };
