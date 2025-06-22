import { prisma } from '@/lib/prisma';

export const getNumbersTrailers = async () => {
  return await prisma.trailer.findMany({
    select: {
      id: true,
      number: true,
    },
  });
};