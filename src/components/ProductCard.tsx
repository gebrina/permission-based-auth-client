import { FC } from "react";
import { Product } from "../types";

export const ProductCard: FC<Product> = ({
  name,
  category,
  description,
  image,
  price,
}) => {
  return (
    <div>
      <div>
        <strong>{name}</strong>
        <em>{category}</em>
      </div>

      <div>
        <img src={image} alt={name} />
        <p>{description}</p>
      </div>
      <div>{price}</div>
    </div>
  );
};
