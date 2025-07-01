import { getTrailers } from '@/features/trailers/queries/getTrailers';
import { NextResponse } from 'next/server';

export async function GET() {
    const trucks = await getTrailers();
    return NextResponse.json(trucks, { status: 200 });
}