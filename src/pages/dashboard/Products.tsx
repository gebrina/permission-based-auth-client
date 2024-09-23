import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAll } from "../../api/Requests";
import {
  Loader,
  Notification,
  Table,
  THeader,
  TNotification,
} from "../../components";
import { Header } from "../../components/Header";
import { GET_ALL_PRODUCTS_KEY } from "../../constants/QueryKeys";
import { Product } from "../../types";

export const Products = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_ALL_PRODUCTS_KEY],
    queryFn: () => getAll<Product>("products"),
  });

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
