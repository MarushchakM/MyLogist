import { prisma } from '@/lib/prisma';

export const getTruck = async (id: string) => {
  return await prisma.truck.findUnique({
    where: {
      id,
    },
  });
};