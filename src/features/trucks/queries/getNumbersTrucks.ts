import { prisma } from '@/lib/prisma';

export const getNumbersTrucks = async () => {
  return await prisma.truck.findMany({
    select: {
      id: true,
      number: true,
    },
  });
};