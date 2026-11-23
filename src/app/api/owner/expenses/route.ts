import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const expenses = db.getExpenses();
    const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    return NextResponse.json({ success: true, totalExpenses, expenses });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch studio expenses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, amount, date, notes } = body;

    if (!title || !amount) {
      return NextResponse.json({ success: false, error: 'Expense title and amount are required' }, { status: 400 });
    }

    const newExpense = db.addExpense({
      title,
      category: category || 'Raw Materials',
      amount: Number(amount),
      date: date || new Date().toISOString().split('T')[0],
      notes: notes || ''
    });

    return NextResponse.json({ success: true, expense: newExpense }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to record expense' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Expense ID required' }, { status: 400 });
    db.deleteExpense(id);
    return NextResponse.json({ success: true, message: 'Expense deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete expense' }, { status: 500 });
  }
}
