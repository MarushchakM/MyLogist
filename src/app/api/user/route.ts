import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { id } = await request.json();
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return NextResponse.json(user, { status: 200 });
}