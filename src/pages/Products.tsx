import { useEffect, useState } from "react";
import { getAll } from "../api/Requests";
import { Loader } from "../components/Loader";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAll<Product>("products")
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-red-50 w-full h-full bg-opacity-10">
      {!!products.length &&
        products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
    </div>
  );
};
