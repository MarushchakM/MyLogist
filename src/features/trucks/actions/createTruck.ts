'use server';

import { prisma } from '@/lib/prisma';
import { trucksPath } from '@/paths';
import { TruckStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

type CreateTruckResult = {
  success: boolean;
  error?: string;
  message?: string;
  truck?: any;
};

export async function createTruck(truckNumber: string): Promise<CreateTruckResult> {
  try {
    const existingTruck = await prisma.truck.findUnique({
      where: { number: truckNumber.trim() },
    });

    if (existingTruck) {
      return { success: false, error: 'Автомобіль з таким номером вже зареєстрований.' };
    }

    const newTruck = await prisma.truck.create({
      data: {
        number: truckNumber.toUpperCase().trim(),
        status: TruckStatus.FREE,
      },
    });
    
    revalidatePath(trucksPath());

    return { success: true, message: 'Автомобіль успішно додано.', truck: newTruck };

  } catch (error: any) {
    return { success: false, error: 'Сталася внутрішня помилка сервера при додаванні авто.' };
  }
}
