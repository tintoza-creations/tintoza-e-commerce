import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const inquiries = db.getInquiries();
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch custom inquiries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, artType, dimensions, palettePreferences, roomType, budgetRange, notes, referenceUrl } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
    }

    const inquiry = db.createInquiry({
      name,
      email,
      phone: phone || '',
      artType: artType || 'texture',
      dimensions: dimensions || 'Custom Size',
      palettePreferences: palettePreferences || 'Warm Ivory, Sand Beige, Taupe, Chocolate Brown',
      roomType: roomType || 'Living Space',
      budgetRange: budgetRange || 'Standard ($400 - $800)',
      notes: notes || '',
      referenceUrl
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Inquiry ID and status required' }, { status: 400 });
    }
    const updated = db.updateInquiryStatus(id, status);
    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update inquiry status' }, { status: 500 });
  }
}
