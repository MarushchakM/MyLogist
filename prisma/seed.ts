import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const trucks = [
  {
    number: 'KA8336IO',
    status: 'FREE' as const,
  },
  {
    number: 'BC8307XO',
    status: 'IN_WORKSHOP' as const,
  },
  {
    number: 'BC3245AM',
    status: 'ON_ROAD' as const,
  },
];

const seed = async () => {
  await prisma.truck.deleteMany();
  
  await prisma.truck.createMany({
    data: trucks,
  });
};

seed();
