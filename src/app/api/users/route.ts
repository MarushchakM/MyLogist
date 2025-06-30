import { NextResponse } from 'next/server';
import { getUsers } from '@/features/users/queries/getUsers';

export async function GET() {
    const users = await getUsers();
    return NextResponse.json(users, { status: 200 });
}