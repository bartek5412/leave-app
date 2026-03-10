import "dotenv/config";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/app/generated/prisma/client";

function resolveSqliteUrl(connectionString: string) {
  if (!connectionString.startsWith("file:")) {
    return connectionString;
  }

  const rawPath = connectionString.slice("file:".length);

  if (!rawPath) {
    throw new Error("DATABASE_URL for SQLite must include a file path.");
  }

  const normalizedPath = path.isAbsolute(rawPath)
    ? rawPath
    : path.resolve(process.cwd(), rawPath);

  mkdirSync(path.dirname(normalizedPath), { recursive: true });

  return `file:${normalizedPath.replace(/\\/g, "/")}`;
}

const connectionString = resolveSqliteUrl(`${process.env.DATABASE_URL ?? ""}`);

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
