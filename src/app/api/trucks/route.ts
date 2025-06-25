import { NextResponse } from 'next/server';
import { getTrucks } from '@/features/trucks/queries/getTrucks';

export async function GET() {
    const trucks = await getTrucks();
    return NextResponse.json(trucks, { status: 200 });
}