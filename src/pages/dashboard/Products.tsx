import { useEffect, useState } from "react";
import {
  Loader,
  Notification,
  Table,
  THeader,
  TNotification,
} from "../../components";
import { Header } from "../../components/Header";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types";

export const Products = () => {
  const { isLoading, error, data } = useProducts();
  const [notification, setNotification] = useState<TNotification>();

  useEffect(() => {
    error && setNotification({ type: "error", message: error.message });
  }, [error]);

  const columns: THeader<Product>[] = [
    {
      key: "id",
      styleClasses: "hidden",
    },
    {
      key: "name",
      name: "Product Name",
    },
    {
      key: "category",
      name: "Category",
    },
    {
      key: "image",
      name: "Picture",
    },
    {
      key: "description",
      name: "Description",
    },
  ];

  const handleDelete = (rowId: string) => {};

  const handleEdit = (rowData: Product) => {};

  return (
    <div className="h-full">
      <Header title="Products" />
      {isLoading && <Loader />}
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!!data && (
        <Table
          paging={{
            withDropdown: true,
            rowsPerPage: 10,
          }}
          filter={{
            columnKey: "name",
          }}
          data={data}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
