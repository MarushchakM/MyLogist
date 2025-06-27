import { PrismaClient, Role, TruckStatus, TrailerStatus, TrailerType, DocumentType } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Для хешування паролів

const prisma = new PrismaClient();

// Функція для генерації випадкового номера телефону
const generatePhoneNumber = () => {
  const prefix = '0'; // Український префікс
  const remainingDigits = Math.floor(100000000 + Math.random() * 900000000).toString(); // 9 випадкових цифр
  return prefix + remainingDigits;
};

// Функція для генерації випадкової пошти
const generateEmail = (prefix: string) => {
  return `${prefix}_${Math.random().toString(36).substring(2, 8)}@example.com`;
};

// Функція для генерації випадкового номера для Truck/Trailer
const generateVehicleNumber = () => {
  const letters = 'ABCEHKMOPTX'; // Латинські літери, схожі на кирилицю
  const numDigits = Math.floor(1000 + Math.random() * 9000);
  const letter1 = letters.charAt(Math.floor(Math.random() * letters.length));
  const letter2 = letters.charAt(Math.floor(Math.random() * letters.length));
  return `BC${numDigits}${letter1}${letter2}`;
};

const seed = async () => {
  console.log('--- Початок Seed ---');
  console.log('Очистка бази даних...');

  // Порядок очистки важливий через зовнішні ключі
  await prisma.document.deleteMany();
  await prisma.trailer.deleteMany();
  await prisma.truck.deleteMany();
  await prisma.user.deleteMany(); // Остання, оскільки на неї посилаються інші моделі

  console.log('Очистка завершена.');
  console.log('Створення записів...');

  // --- 1. Створення Адміна ---
  const hashedPasswordAdmin = await bcrypt.hash('adminpassword123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: generateEmail('admin'),
      password: hashedPasswordAdmin,
      role: Role.ADMIN,
      phoneNumber: generatePhoneNumber(),
      firstName: 'Адмін',
      lastName: 'Адміненко',
    },
  });
  console.log(`Створено Admin: ${adminUser.email}`);

  // --- 2. Створення Диспетчера ---
  const hashedPasswordDispatcher = await bcrypt.hash('dispatcherpassword', 10);
  const dispatcherUser = await prisma.user.create({
    data: {
      email: generateEmail('dispatcher'),
      password: hashedPasswordDispatcher,
      role: Role.DISPATCHER,
      phoneNumber: generatePhoneNumber(),
      firstName: 'Диспетчер',
      lastName: 'Петренко',
    },
  });
  console.log(`Створено Dispatcher: ${dispatcherUser.email}`);

  // --- 3. Створення Водіїв ---
  const drivers = [];
  for (let i = 0; i < 3; i++) { // Створюємо 3 водіїв
    const hashedPasswordDriver = await bcrypt.hash(`driverpassword${i + 1}`, 10);
    const driver = await prisma.user.create({
      data: {
        email: generateEmail(`driver${i + 1}`),
        password: hashedPasswordDriver,
        role: Role.DRIVER,
        phoneNumber: generatePhoneNumber(),
        firstName: `Водій${i + 1}`,
        lastName: `Іванов${i + 1}`,
        dispatcherId: dispatcherUser.id, // Прив'язуємо до диспетчера
      },
    });
    drivers.push(driver);
    console.log(`Створено Driver ${i + 1}: ${driver.email}`);
  }

  // --- 4. Створення Вантажівок ---
  const trucks = [];
  for (let i = 0; i < 3; i++) { // Створюємо 3 вантажівки
    const truck = await prisma.truck.create({
      data: {
        number: generateVehicleNumber(),
        status: i === 0 ? TruckStatus.FREE : (i === 1 ? TruckStatus.IN_WORKSHOP : TruckStatus.ON_ROAD),
        driverId: drivers[i % drivers.length].id, // Прив'язуємо до водіїв по черзі
      },
    });
    trucks.push(truck);
    console.log(`Створено Truck ${i + 1}: ${truck.number}`);
  }

  // --- 5. Створення Причепів ---
  const trailers = [];
  const trailerTypes = Object.values(TrailerType);
  for (let i = 0; i < 3; i++) { // Створюємо 3 причепи
    const trailer = await prisma.trailer.create({
      data: {
        number: generateVehicleNumber(),
        status: i === 0 ? TrailerStatus.FREE : (i === 1 ? TrailerStatus.IN_WORKSHOP : TrailerStatus.ON_ROAD),
        type: trailerTypes[i % trailerTypes.length], // Різні типи причепів
        driverId: drivers[i % drivers.length].id, // Прив'язуємо до водіїв по черзі
      },
    });
    trailers.push(trailer);
    console.log(`Створено Trailer ${i + 1}: ${trailer.number}`);
  }

  // --- 6. Прив'язка Причепів до Вантажівок (Один до одного) ---
  // Припустимо, перша вантажівка отримує перший причеп, друга - другий
  if (trucks.length > 0 && trailers.length > 0) {
    // Важливо: через @unique на trailerId у Truck, один причеп може бути прикріплений лише до однієї вантажівки.
    // Якщо ти вже прикріпив причеп до водія, він все одно може бути прикріплений і до вантажівки.
    await prisma.truck.update({
      where: { id: trucks[0].id },
      data: {
        trailer: { connect: { id: trailers[0].id } },
      },
    });
    console.log(`Причеп ${trailers[0].number} прикріплено до вантажівки ${trucks[0].number}`);
  }
  if (trucks.length > 1 && trailers.length > 1) {
    await prisma.truck.update({
      where: { id: trucks[1].id },
      data: {
        trailer: { connect: { id: trailers[1].id } },
      },
    });
    console.log(`Причеп ${trailers[1].number} прикріплено до вантажівки ${trucks[1].number}`);
  }

  // --- 7. Створення Документів ---
  const documentTypes = Object.values(DocumentType);
  for (let i = 0; i < 5; i++) { // Створюємо 5 документів
    const isForTruck = Math.random() > 0.5; // Випадково, чи документ для вантажівки чи для причепа
    const docData: any = {
      type: documentTypes[i % documentTypes.length],
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + Math.floor(Math.random() * 3) + 1)), // Термін дії 1-3 роки
    };

    if (isForTruck && trucks.length > 0) {
      docData.truck = { connect: { id: trucks[i % trucks.length].id } };
    } else if (trailers.length > 0) {
      docData.trailer = { connect: { id: trailers[i % trailers.length].id } };
    } else {
      // Якщо немає ні вантажівок, ні причепів, пропустимо цей документ
      continue;
    }

    const document = await prisma.document.create({ data: docData });
    console.log(`Створено Document: ${document.type} для ${document.truckId ? 'вантажівки' : 'причепа'}`);
  }

  console.log('--- Seed завершено успішно! ---');
};

seed()
  .catch((e) => {
    console.error('Помилка при виконанні seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });