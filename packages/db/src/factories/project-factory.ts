import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";

import type { Project } from "../types";
import type { Factory } from "../utils/types";

export const createPopulatedProject: Factory<Project> = ({
  id = createId(),
  name = faker.commerce.productName(),
  description = faker.lorem.sentence(),
  organizationId = createId(),
  createdById = null,
  createdAt = faker.date.past({ years: 1 }),
  updatedAt = faker.date.recent({ days: 5 }),
} = {}) => ({
  id,
  name,
  description,
  organizationId,
  createdAt,
  updatedAt,
  createdById,
});
