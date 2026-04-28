import { PrismaClient } from "@prisma/client";
import "dotenv/config";

try {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const prisma = new PrismaClient({
    // @ts-ignore
    datasourceUrl: process.env.DATABASE_URL
  });
  console.log("Prisma initialized successfully");
} catch (e) {
  console.error("Failed to initialize Prisma:", e);
}
