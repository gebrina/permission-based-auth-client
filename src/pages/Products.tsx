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
    <div className="px-9 w-full sm:w-full h-full  xl:w-3/4  mx-auto bg-opacity-10">
      {errorMessage && <Notification type="error" message={errorMessage} />}
      {!!products.length && (
        <div className="products-card">
          {products.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};
