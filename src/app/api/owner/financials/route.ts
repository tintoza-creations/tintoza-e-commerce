import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const summary = db.getFinancialSummary();
    return NextResponse.json({ success: true, ...summary });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to generate financial summary' }, { status: 500 });
  }
}
