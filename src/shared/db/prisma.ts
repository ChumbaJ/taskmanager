/* eslint-disable @typescript-eslint/no-namespace */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma: PrismaClient = globalForPrisma.prisma || new PrismaClient();