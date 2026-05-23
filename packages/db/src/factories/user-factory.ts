import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";

import type { User } from "../types";
import type { Factory } from "../utils/types";

export const createPopulatedUser: Factory<User> = ({
  id = createId(),
  email = faker.internet.email(),
  password = faker.internet.password(),
  name = faker.person.fullName(),
  createdAt = faker.date.past({ years: 1 }),
  updatedAt = faker.date.recent({ days: 5 }),
} = {}) => ({
  id,
  email,
  password,
  name,
  createdAt,
  updatedAt,
});
