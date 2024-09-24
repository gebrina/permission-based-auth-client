import { useQuery } from "@tanstack/react-query";
import { getAll } from "../api/Requests";
import { Loader, Notification, ProductCard } from "../components";
import { GET_ALL_PRODUCTS_KEY } from "../constants/QueryKeys";
import { Product } from "../types";

export const Products = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_ALL_PRODUCTS_KEY],
    queryFn: () => getAll<Product>("products"),
  });

  if (isLoading) return <Loader />;

  return (
    <div className="px-9 w-full sm:w-full h-full xl:w-3/4  mx-auto bg-opacity-10">
      {error && <Notification type="error" message={error.message} />}
      {!!data?.length && (
        <div className="products-card">
          {data.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};
