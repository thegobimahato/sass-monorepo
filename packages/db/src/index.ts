import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { env } from "node:process";

import { PrismaClient } from "../generated/prisma/client";

const connectionString = env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg(connectionString);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export type {
  Invite,
  Organization,
  OrganizationMembership,
  Project,
  Role,
  User,
} from "./types";

export { Prisma } from "../generated/prisma/client";
