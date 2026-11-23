import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || undefined;
    const orders = db.getOrders(userId);
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, shippingAddress, items, subtotal, discount, shipping, total, userId } = body;

    if (!customerEmail || !items || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Missing required order details' }, { status: 400 });
    }

    const newOrder = db.createOrder({
      userId,
      customerName: customerName || 'Valued Collector',
      customerEmail,
      customerPhone,
      shippingAddress: shippingAddress || {
        fullName: customerName,
        street: '123 Artisan Lane',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States'
      },
      items,
      subtotal: subtotal || 0,
      discount: discount || 0,
      shipping: shipping || 0,
      total: total || 0,
      status: 'Crafting'
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}
