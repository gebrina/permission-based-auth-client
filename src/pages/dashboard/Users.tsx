import { useCallback, useEffect, useState } from "react";
import { getAll, remove } from "../../api/Requests";
import { Loader, Notification, TNotification } from "../../components";
import { Header } from "../../components/Header";
import { Table, THeader } from "../../components/Table";
import { User } from "../../types";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<TNotification>();

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

  const getAllUsers = useCallback(() => {
    getAll<User>("users")
      .then((data) => setUsers(data))
      .catch((err) => setNotification({ type: "error", message: err.message }))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (isLoading)
    return <Loader classStyles="absolute  left-[25%]  top-[25%]" />;

  const handleDelete = (rowId: string) =>
    remove<boolean>("users", rowId)
      .then(() => {
        getAllUsers();
        setNotification({
          type: "success",
          message: "Record removed successfully.",
        });
      })
      .catch((err) => setNotification({ type: "error", message: err.message }));

  return (
    <>
      <Header title="Users" />
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
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
    </>
  );
};
