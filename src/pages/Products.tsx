import { useEffect, useState } from "react";
import { getAll } from "../api/Requests";
import { Loader, Notification, ProductCard } from "../components";
import { Product } from "../types";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    getAll<Product>("products")
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-red-50 w-full h-full bg-opacity-10">
      <Notification message={errorMessage} />
      {!!products.length &&
        products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
    </div>
  );
};
