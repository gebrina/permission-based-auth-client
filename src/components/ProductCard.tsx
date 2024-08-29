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
    <div className="h-80 sm:h-48 shadow-lg shadow-slate-500 rounded-lg">
      <div className="h-full flex sm:items-center gap-2 flex-col sm:flex-row">
        <img
          className="h-1/2 sm:h-full object-cover mix-blend-difference aspect-square rounded-lg"
          src={image}
          alt={name}
        />
        <div className="flex flex-col justify-between h-full px-2 sm:px-0">
          <div className="flex items-center gap-1">
            <strong className="sm:text-xl">{name}</strong>
            <em className="text-sm text-slate-400 text-opacity-80">
              {category}
            </em>
          </div>
          <p className="line-clamp-3 sm:text-lg">{description}</p>
          <div className="font-bold pb-1">Price: ${price}</div>
        </div>
      </div>
    </div>
  );
};
