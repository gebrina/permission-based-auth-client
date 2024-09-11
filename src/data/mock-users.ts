import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types";

const users: User[] = [];
const DATA_SIZE = 50;

for (let i = 0; i < DATA_SIZE; i++) {
  console.log(uuidv4());
  users.push({
    id: uuidv4(),
    username: faker.person.bio(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    roles: i % 2 == 0 ? ["Admin", "HR"] : ["Editor"],
    occupation: faker.commerce.department(),
  });
}

export { users };
