import { useEffect, useState } from "react";
import { getAll } from "../../api/Requests";
import { Loader, Notification } from "../../components";
import { Header } from "../../components/Header";
import { Table, THeader } from "../../components/Table";
import { User } from "../../types";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const talbeHeaders: THeader[] = [
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
    {
      key: "actions",
      name: "actions",
    },
  ];

  useEffect(() => {
    getAll<User>("users")
      .then((data) => setUsers(data))
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return <Loader classStyles="absolute  left-[25%]  top-[25%]" />;

  return (
    <>
      <Header title="Users" />
      {errorMessage && <Notification message={errorMessage} type="error" />}
      <Table headers={talbeHeaders} data={users} />
    </>
  );
};
