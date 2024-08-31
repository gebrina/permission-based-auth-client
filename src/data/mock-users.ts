import { User } from "../types";

export const users: User[] = [
  {
    id: "guid 1",
    email: "test@user.com",
    firstName: "Test",
    lastName: "User",
    occupation: "SW",
    roles: ["admin", "editor"],
    username: "test",
  },
  {
    id: "guid 2",
    email: "test2@user.com",
    firstName: "Test2",
    lastName: "User2",
    occupation: "DR",
    roles: ["editor"],
    username: "test2",
  },
];
