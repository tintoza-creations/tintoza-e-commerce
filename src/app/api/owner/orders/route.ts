import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const orders = db.getOrders();
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();
    if (!orderId || !status) {
      return NextResponse.json({ success: false, error: 'Order ID and status required' }, { status: 400 });
    }
    const updated = db.updateOrderStatus(orderId, status);
    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update order status' }, { status: 500 });
  }
}
