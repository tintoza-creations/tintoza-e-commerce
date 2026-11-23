import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') || undefined;
    const reviews = db.getReviews(productId);
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { author, city, rating, title, comment, productId, artworkPurchased } = body;

    if (!author || !comment || !rating) {
      return NextResponse.json({ success: false, error: 'Missing required review fields' }, { status: 400 });
    }

    const review = db.addReview({
      author,
      city: city || 'Private Collector',
      rating: Number(rating) || 5,
      title: title || 'Exceptional Piece',
      comment,
      productId,
      artworkPurchased: artworkPurchased || 'Handmade Artwork',
      verifiedBuyer: true
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to submit review' }, { status: 500 });
  }
}
