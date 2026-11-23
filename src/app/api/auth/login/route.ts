import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    let user = db.findUserByEmail(email);
    if (!user) {
      // Auto-register friendly flow for website patrons
      user = db.createUser({
        name: name || email.split('@')[0],
        email
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Sign in failed' }, { status: 500 });
  }
}
