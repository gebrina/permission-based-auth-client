import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAll, remove } from "../../api/Requests";
import { Loader, Notification, TNotification } from "../../components";
import { Header } from "../../components/Header";
import { Table, THeader } from "../../components/Table";
import { DELETE_USER_KEY, GET_ALL_USERS_KEY } from "../../constants/QueryKeys";
import { User } from "../../types";

export const Users = () => {
  const [notification, setNotification] = useState<TNotification>();

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [GET_ALL_USERS_KEY],
    queryFn: () => getAll<User>("users"),
  });

  const { mutate } = useMutation({
    mutationKey: [DELETE_USER_KEY],
    mutationFn: (rowId: string) => remove("users", rowId),
  });

  const talbeHeaders: THeader<User>[] = [
    {
      key: "id",
      styleClasses: "hidden",
    },
    {
      key: "firstName",
      name: "First Name",
    },
    {
      key: "lastName",
      name: "Last Name",
    },
    {
      key: "username",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "occupation",
      name: "Occupation",
    },
  ];

  useEffect(() => {
    error && setNotification({ type: "error", message: error.message });
  }, [error]);

  if (isLoading)
    return <Loader classStyles="absolute  left-[25%]  top-[25%]" />;

  const handleDelete = (rowId: string) =>
    mutate(rowId, {
      onSuccess: async () => {
        refetch();
        setNotification({
          type: "success",
          message: "Record removed successfully.",
        });
      },
      onError: (e) => setNotification({ type: "error", message: e.message }),
    });

  return (
    <>
      <Header title="Users" />
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!!users && (
        <Table
          filter={{
            columnKey: "username",
          }}
          columns={talbeHeaders}
          data={users}
          onDelete={handleDelete}
          paging={{
            rowsPerPage: 10,
            withDropdown: true,
          }}
        />
      )}
    </>
  );
};
