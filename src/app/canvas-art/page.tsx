'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Palette, Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductQuickView from '@/components/ProductQuickView';
import { INITIAL_PRODUCTS } from '@/data/products';
import { Product } from '@/types';

export default function CanvasArtPage() {
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);

  const canvasProducts = INITIAL_PRODUCTS.filter((p) => p.category === 'canvas');

  return (
    <div className="bg-[#F8F1E6] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Canvas Art Banner */}
        <div className="rounded-3xl bg-[#FAF6F0] border border-[#DEC49E] p-8 sm:p-14 mb-16 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#C9A67A] font-semibold">
              <Palette className="w-4 h-4" />
              <span>Modern Acrylics on Heavy Belgian Linen</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-[#4B2E1E] leading-tight">
              Canvas Art &amp; Modern Minimalist Artwork
            </h1>

            <p className="text-sm sm:text-base text-[#8C6F54] font-light leading-relaxed max-w-xl">
              Broad expressive brushwork meets earthy color harmony. Layered in warm ivory, sand beige, deep mocha, and subtle champagne gold washes to give your room depth and serenity.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#4B2E1E]">
              <span className="flex items-center gap-1.5 bg-[#E6D5C1]/50 px-3 py-1 rounded-full border border-[#DEC49E]">
                ✦ Heavyweight Belgian Linen
              </span>
              <span className="flex items-center gap-1.5 bg-[#E6D5C1]/50 px-3 py-1 rounded-full border border-[#DEC49E]">
                ✦ Golden Lightfast Pigments
              </span>
              <span className="flex items-center gap-1.5 bg-[#E6D5C1]/50 px-3 py-1 rounded-full border border-[#DEC49E]">
                ✦ Floating Natural Wood Frames
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-[#DEC49E]">
            <img
              src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop"
              alt="Canvas Painting Staged"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Collection Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4B2E1E]">
              Canvas Collection ({canvasProducts.length} Artworks)
            </h2>
            <Link
              href="/custom-orders?artType=canvas"
              className="text-xs uppercase tracking-wider font-semibold text-[#4B2E1E] hover:text-[#C9A67A] flex items-center gap-1"
            >
              <span>Custom Canvas Dimensions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {canvasProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedQuickView(p)}
              />
            ))}
          </div>
        </div>

      </div>

      {selectedQuickView && (
        <ProductQuickView
          product={selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
        />
      )}
    </div>
  );
}
