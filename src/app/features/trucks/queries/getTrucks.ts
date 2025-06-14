import { prisma } from '@/lib/prisma';

export const getTrucks = async () => {
  return await prisma.truck.findMany();
}