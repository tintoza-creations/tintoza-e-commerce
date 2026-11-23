import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();
    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ success: true, user: existing, message: 'Account exists, signed in' });
    }

    const newUser = db.createUser({
      name,
      email,
      phone
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
  }
}
