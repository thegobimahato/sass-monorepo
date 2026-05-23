import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";

import { Role } from "../../generated/prisma/enums.js";
import type { OrganizationMembership } from "../types";
import type { Factory } from "../utils/types";

export const createPopulatedOrganizationMembership: Factory<
  OrganizationMembership
> = ({
  id = createId(),
  role = Role.MEMBER,
  userId = createId(),
  organizationId = createId(),
  createdAt = faker.date.past({ years: 1 }),
  updatedAt = faker.date.recent({ days: 5 }),
} = {}) => ({
  id,
  role,
  userId,
  organizationId,
  createdAt,
  updatedAt,
});
