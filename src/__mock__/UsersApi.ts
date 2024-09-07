import { mock } from "../api";
import { users } from "../data/mock-users";

mock.onGet("users").reply(() => [200, users]);
mock.onPut("users").reply((params) => {
  const { data } = params;
  return [200, data];
});
