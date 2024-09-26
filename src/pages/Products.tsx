import { Loader, Notification, ProductCard } from "../components";
import { useProducts } from "../hooks/useProducts";

export const Products = () => {
  const { isLoading, error, data } = useProducts();
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
