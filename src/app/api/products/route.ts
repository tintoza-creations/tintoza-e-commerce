import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { db } from '@/lib/db';
import { ensureDatabaseTables } from '@/lib/db-init';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const featured = searchParams.get('featured');

    // Background ensure tables exist
    ensureDatabaseTables().catch(() => {});

    // Try fetching from Supabase first
    try {
      let query = supabase.from('products').select('*');
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      if (featured === 'true') {
        query = query.eq('featured', true);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        let products = data.map((item) => ({
          ...item,
          categoryLabel: item.category_label || item.categoryLabel,
          originalPrice: item.original_price || item.originalPrice,
          bestSeller: item.best_seller ?? item.bestSeller,
          inStock: item.in_stock ?? item.inStock,
          reviewsCount: item.reviews_count ?? item.reviewsCount,
          colorPalette: item.color_palette || item.colorPalette
        }));

        if (search) {
          const q = search.toLowerCase();
          products = products.filter(
            (p: any) =>
              p.name.toLowerCase().includes(q) ||
              (p.description && p.description.toLowerCase().includes(q))
          );
        }

        return NextResponse.json({ success: true, count: products.length, products });
      }
    } catch (sbErr) {
      console.warn('Supabase fetch failed, falling back to local dataset:', sbErr);
    }

    // Fallback to local database
    let products = db.getProducts(category, search);
    if (featured === 'true') {
      products = products.filter((p) => p.featured);
    }

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}
