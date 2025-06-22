import { PrismaClient, TruckStatus, TrailerStatus } from '@prisma/client';

const prisma = new PrismaClient();

const trailers = [
  { number: 'BC8203XO', status: TrailerStatus.FREE },
  { number: 'BC8374AE', status: TrailerStatus.IN_WORKSHOP },
  { number: 'BC5637AM', status: TrailerStatus.ON_ROAD },
];

const trucks = [
  { number: 'KA8336IO', status: TruckStatus.FREE },
  { number: 'BC8307XO', status: TruckStatus.IN_WORKSHOP },
  { number: 'BC3245AM', status: TruckStatus.ON_ROAD },
];

const seed = async () => {
  console.log('Очистка бази...');
  await prisma.trailer.deleteMany();
  await prisma.truck.deleteMany();

  console.log('Створення записів...');
  for (let i = 0; i < trucks.length; i++) {
    const trailer = await prisma.trailer.create({
      data: trailers[i],
    });

    await prisma.truck.create({
      data: {
        ...trucks[i],
        trailerId: trailer.id,
      },
    });
  }

  console.log('Seed завершено!');
  await prisma.$disconnect();
};

seed().catch((e) => {
  console.error('Помилка при seed:', e);
  prisma.$disconnect();
  process.exit(1);
});
