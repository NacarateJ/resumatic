import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  // In production, reuse the existing Prisma Client instance
  prisma = new PrismaClient();
} else {
  // In development, create a new Prisma Client instance for each request
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
}

export default prisma;