import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types';

// Registered accounts database
// Owner: 8300602443 -> OTP 654321
// Normal user: 9090909090 -> OTP 123456
const PRESET_ACCOUNTS: Record<string, { otp: string; user: User }> = {
  '8300602443': {
    otp: '654321',
    user: {
      id: 'usr-owner-01',
      name: 'Indhu Vijay (Founder & Atelier Director)',
      email: 'owner@tintoza.com',
      phone: '8300602443',
      role: 'owner',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    },
  },
  '9090909090': {
    otp: '123456',
    user: {
      id: 'usr-client-90',
      name: 'Ananya Sharma (Collector)',
      email: 'ananya@tintoza.com',
      phone: '9090909090',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      addresses: [
        {
          fullName: 'Ananya Sharma',
          street: 'B-12, Greater Kailash Part 1',
          city: 'New Delhi',
          state: 'Delhi',
          postalCode: '110048',
          country: 'India',
          isDefault: true,
        },
      ],
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const { action, phone, otp } = await request.json();
    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);

    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ success: false, error: 'Please enter a valid 10-digit mobile number' }, { status: 400 });
    }

    // ACTION: SEND OTP
    if (action === 'send_otp') {
      return NextResponse.json({
        success: true,
        message: `A 6-digit verification code has been sent to +91 ${cleanPhone}`,
        phone: cleanPhone,
      });
    }

    // ACTION: VERIFY OTP
    if (action === 'verify_otp') {
      const trimmedOtp = (otp || '').trim();

      if (!trimmedOtp || trimmedOtp.length !== 6) {
        return NextResponse.json({ success: false, error: 'Please enter a valid 6-digit verification code' }, { status: 400 });
      }

      // 1. Check Owner account (8300602443 -> 654321)
      if (cleanPhone === '8300602443') {
        if (trimmedOtp === '654321') {
          return NextResponse.json({
            success: true,
            user: PRESET_ACCOUNTS['8300602443'].user,
            message: 'Authenticated successfully.',
          });
        }
        return NextResponse.json({ success: false, error: 'Invalid verification code. Please check and try again.' }, { status: 400 });
      }

      // 2. Check Customer account (9090909090 -> 123456)
      if (cleanPhone === '9090909090') {
        if (trimmedOtp === '123456') {
          return NextResponse.json({
            success: true,
            user: PRESET_ACCOUNTS['9090909090'].user,
            message: 'Signed in successfully.',
          });
        }
        return NextResponse.json({ success: false, error: 'Invalid verification code. Please check and try again.' }, { status: 400 });
      }

      // 3. Dynamic client / new patron (default OTP 123456 for test environment)
      if (trimmedOtp === '123456') {
        const newUser: User = {
          id: `usr-${Date.now()}`,
          name: `Collector ${cleanPhone.slice(-4)}`,
          email: `collector${cleanPhone.slice(-4)}@tintoza.com`,
          phone: cleanPhone,
          role: 'customer',
          addresses: [],
        };
        return NextResponse.json({
          success: true,
          user: newUser,
          message: 'Signed in successfully.',
        });
      }

      return NextResponse.json({ success: false, error: 'Invalid verification code. Please try again.' }, { status: 400 });
    }

    return NextResponse.json({ success: false, error: 'Invalid authentication request' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Authentication service temporarily unavailable' }, { status: 500 });
  }
}
