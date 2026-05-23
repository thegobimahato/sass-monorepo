import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";

import type { Organization } from "../types";
import type { Factory } from "../utils/types";

export const createPopulatedOrganization: Factory<Organization> = ({
  id = createId(),
  name = faker.company.name(),
  slug = `${faker.helpers.slugify(name).toLowerCase()}-${createId().slice(0, 8)}`,
  createdAt = faker.date.past({ years: 1 }),
  updatedAt = faker.date.recent({ days: 5 }),
} = {}) => ({
  id,
  name,
  slug,
  createdAt,
  updatedAt,
});
