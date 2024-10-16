import { FC, useEffect, useRef } from "react";
import placeholderImage from "../assets/placeholder.jpeg";
import { Product } from "../types";
import { formatNumber } from "../utils";

export const ProductCard: FC<Product> = ({
  name,
  category,
  description,
  image,
  price,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const img = entry.target as HTMLImageElement;
        const loadedImageUrl = img.getAttribute("data-src")!;
        img.src = loadedImageUrl;
      });
    });

    imgRef.current && observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-80 sm:h-48 bg-gradient-to-tr shadow-lg shadow-slate-500 rounded-lg">
      <div className="h-full flex sm:items-center gap-2 flex-col sm:flex-row">
        <img
          ref={imgRef}
          loading="lazy"
          onLoad={(e) =>
            (e.target as HTMLImageElement).classList.remove(
              "animate-pulse",
              "blur-lg"
            )
          }
          className="h-1/2 blur-lg animate-pulse  sm:h-full object-cover mix-blend-difference aspect-square rounded-lg"
          src={placeholderImage}
          data-src={image}
          alt={name}
        />
        <div className="flex flex-col justify-between h-full px-2 sm:px-0">
          <div className="flex items-center gap-1 sm:flex-col sm:items-start">
            <strong className="sm:text-xl line-clamp-1">{name}</strong>
            <em className="text-sm text-slate-400 text-opacity-80">
              {category}
            </em>
          </div>
          <p className="line-clamp-3 sm:text-lg">{description}</p>
          <div className="font-bold pb-1">Price: {formatNumber(price)}</div>
        </div>
      </div>
    </div>
  );
};
