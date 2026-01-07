import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../generated/prisma/client.ts";

import { envValidate } from "./env.js";

const env = envValidate();
const connectionString = env.DATABASE_URL;

const adapter = new PrismaPg({
  connectionString,
});
const prisma = new PrismaClient({ adapter });

export { prisma };
