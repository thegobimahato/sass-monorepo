import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";

import { Invite } from "../types";
import { Factory } from "../utils/types";

export const createPopulatedInvite: Factory<Invite> = ({
  id = createId(),
  token = createId(),
  organizationId = createId(),
  expiresAt = faker.date.future(),
  createdAt = faker.date.past({ years: 1 }),
} = {}) => ({
  id,
  token,
  organizationId,
  expiresAt,
  createdAt,
});
