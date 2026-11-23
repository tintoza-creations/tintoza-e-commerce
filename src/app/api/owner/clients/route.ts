import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const clients = db.getClients();
    return NextResponse.json({ success: true, count: clients.length, clients });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch client list' }, { status: 500 });
  }
}
