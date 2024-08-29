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
    <div className="h-48 shadow-lg shadow-slate-500 rounded-lg">
      <div className="h-full flex items-center gap-2">
        <img
          className="h-full object-cover mix-blend-difference aspect-square rounded-lg"
          src={image}
          alt={name}
        />
        <div className="flex flex-col justify-between h-full">
          <strong className="text-xl">{name} </strong>
          <em className="text-sm  text-slate-400 text-opacity-80">
            {category}
          </em>
          <p className="line-clamp-3 text-lg">{description}</p>
          <div className="font-bold pb-1">Price: ${price}</div>
        </div>
      </div>
    </div>
  );
};
