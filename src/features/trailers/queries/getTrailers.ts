import { prisma } from '@/lib/prisma';

export const getTrailers = async () => {
  return await prisma.trailer.findMany();
};