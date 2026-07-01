import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:51214/template1";

let prismaInstance: PrismaClient;

if (process.env.NODE_ENV === "production") {
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  prismaInstance = new PrismaClient({ adapter });
} else {
  if (!globalThis.prisma) {
    const pool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    globalThis.prisma = new PrismaClient({ adapter });
  }
  prismaInstance = globalThis.prisma;
}

export default prismaInstance;
export const db = prismaInstance;
