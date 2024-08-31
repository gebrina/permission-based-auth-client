import { mock } from "../api";
import { users } from "../data/mock-users";

mock.onGet("users").reply(() => [200, users]);
