"use server";

import { prisma } from "@/lib/prisma";
import { TruckStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createTruck = async (number: string) => {
  await prisma.truck.create({
    data: {
      number: number,
      status: TruckStatus.FREE,
    },
  });

  revalidatePath('/trucks');
};
