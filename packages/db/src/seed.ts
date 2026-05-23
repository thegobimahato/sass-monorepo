import "dotenv/config";

import { Role } from "../generated/prisma/enums";
import {
  createPopulatedOrganization,
  createPopulatedOrganizationMembership,
  createPopulatedProject,
  createPopulatedUser,
} from "./factories";
import { prisma } from "./index";

async function main() {
  const users = await Promise.all(
    Array.from({ length: 5 }, () =>
      prisma.user.create({
        data: createPopulatedUser(),
      }),
    ),
  );

  const orgs = await Promise.all(
    Array.from({ length: 2 }, () =>
      prisma.organization.create({
        data: createPopulatedOrganization(),
      }),
    ),
  );

  console.log(`🌱 Database seeded with ${orgs.length} organizations`);

  const [firstOrganization, secondOrganization] = orgs;

  const membershipSpecs = [
    { userIndex: 0, orgIndex: 0, role: Role.ADMIN },
    { userIndex: 1, orgIndex: 0, role: Role.MODERATOR },
    { userIndex: 2, orgIndex: 0, role: Role.MEMBER },
    { userIndex: 0, orgIndex: 1, role: Role.MEMBER },
    { userIndex: 3, orgIndex: 1, role: Role.ADMIN },
  ] as const;

  await Promise.all(
    membershipSpecs.map(async ({ userIndex, orgIndex, role }) =>
      prisma.organizationMembership.create({
        data: createPopulatedOrganizationMembership({
          userId: users[userIndex].id,
          organizationId: orgs[orgIndex].id,
          role,
        }),
      }),
    ),
  );

  console.log(`🌱 Database seeded with ${membershipSpecs.length} memberships`);

  await Promise.all(
    [firstOrganization, secondOrganization].flatMap((organization) =>
      Array.from({ length: 3 }, () =>
        prisma.project.create({
          data: createPopulatedProject({ organizationId: organization.id }),
        }),
      ),
    ),
  );

  console.log(
    `🌱 Database seeded with ${users.length} users, ${orgs.length} organizations, ${membershipSpecs.length} memberships`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
