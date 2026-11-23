import { NextResponse } from 'next/server';
import { ensureDatabaseTables } from '@/lib/db-init';

export async function GET() {
  try {
    const result = await ensureDatabaseTables();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Database initialization failed' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const result = await ensureDatabaseTables();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Database initialization failed' },
      { status: 500 }
    );
  }
}
