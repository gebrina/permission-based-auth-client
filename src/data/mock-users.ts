import { User } from "../types";

export const users: User[] = [
  {
    id: "8b39a419-6f72-450f-b6a9-1a58eeac726b",
    email: "test@user.com",
    firstName: "Test",
    lastName: "User",
    occupation: "SW",
    roles: ["admin", "editor"],
    username: "test",
  },
  {
    id: "a06d9af9-016f-4579-97e2-d9f845f526b3",
    email: "test2@user.com",
    firstName: "Test2",
    lastName: "User2",
    occupation: "DR",
    roles: ["editor"],
    username: "test2",
  },
  {
    id: "856b5190-e132-4a76-8549-43caa676bc0d",
    email: "cool@user.com",
    firstName: "Cool",
    lastName: "Man",
    occupation: "HR",
    roles: ["blogger,manager"],
    username: "cooler",
  },
];
