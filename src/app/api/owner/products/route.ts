import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const products = db.getProducts();
    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, categoryLabel, price, originalPrice, dimensions, medium, depth, images, description, details, badge, colorPalette } = body;

    if (!name || !price || !category) {
      return NextResponse.json({ success: false, error: 'Artwork title, category and price are required' }, { status: 400 });
    }

    const newProduct = db.addProduct({
      name,
      category,
      categoryLabel: categoryLabel || (category === 'texture' ? 'Texture Art' : category === 'thread' ? 'Thread Art' : 'Canvas Art'),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      dimensions: dimensions || '24" x 36" (60 x 90 cm)',
      medium: medium || 'Plaster Relief & Mineral Pigments',
      depth: depth || '1.5" Gallery Profile',
      images: images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop'],
      description: description || 'Handcrafted archival original piece created in the TINTOZA atelier.',
      details: details && details.length > 0 ? details : ['Handcrafted archival plaster paste', 'Mounted on kiln-dried solid pine wood stretcher bars', 'Certificate of authenticity included'],
      colorPalette: colorPalette || ['#F8F1E6', '#E6D5C1', '#C9A67A', '#4B2E1E'],
      badge: badge || 'New Artwork',
      inStock: true,
      rating: 5.0,
      reviewsCount: 1,
      featured: true,
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    if (!id) return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    const updated = db.updateProduct(id, updates);
    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    db.deleteProduct(id);
    return NextResponse.json({ success: true, message: 'Product removed' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}
