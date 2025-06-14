"use server";

import { prisma } from "@/lib/prisma";
import { trucksPath } from "@/paths";
import { redirect } from "next/navigation";

export const deleteTruck = async (id: string) => {
  await prisma.truck.delete({
    where: {
      id,
    },
  });

  redirect(trucksPath());
};
