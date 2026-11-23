import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { ensureDatabaseTables } from '@/lib/db-init';

export async function GET() {
  try {
    // 1. First ensure tables exist
    await ensureDatabaseTables();

    // 2. Query todos using Supabase client exactly as requested
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, count: data?.length || 0, data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, is_complete } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 });
    }

    await ensureDatabaseTables();

    const { data, error } = await supabase
      .from('todos')
      .insert([{ title, is_complete: is_complete || false }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, todo: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to create todo' },
      { status: 500 }
    );
  }
}
