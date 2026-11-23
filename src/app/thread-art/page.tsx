'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Compass, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductQuickView from '@/components/ProductQuickView';
import { INITIAL_PRODUCTS } from '@/data/products';
import { Product } from '@/types';

export default function ThreadArtPage() {
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);

  const threadProducts = INITIAL_PRODUCTS.filter((p) => p.category === 'thread');

  return (
    <div className="bg-[#F8F1E6] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Thread Art Banner */}
        <div className="rounded-3xl bg-[#FAF6F0] border border-[#DEC49E] p-8 sm:p-14 mb-16 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#C9A67A] font-semibold">
              <Compass className="w-4 h-4" />
              <span>Tension &amp; Geometric Artistry</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-[#4B2E1E] leading-tight">
              Handmade Thread Designs &amp; Personalised String Art
            </h1>

            <p className="text-sm sm:text-base text-[#8C6F54] font-light leading-relaxed max-w-xl">
              Thousands of organic silk, cotton, and metallic champagne gold strands woven under precise tension across antiqued brass pins. An optical illusion of curved three-dimensional geometry floating in space.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#4B2E1E]">
              <span className="flex items-center gap-1.5 bg-[#E6D5C1]/50 px-3 py-1 rounded-full border border-[#DEC49E]">
                ✦ 800+ Hand-Strung Intersections
              </span>
              <span className="flex items-center gap-1.5 bg-[#E6D5C1]/50 px-3 py-1 rounded-full border border-[#DEC49E]">
                ✦ Solid Oak &amp; Walnut Backing
              </span>
              <span className="flex items-center gap-1.5 bg-[#E6D5C1]/50 px-3 py-1 rounded-full border border-[#DEC49E]">
                ✦ Custom Monograms &amp; Silhouettes Available
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-[#DEC49E]">
            <img
              src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop"
              alt="Handmade Thread Art Design"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Collection Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4B2E1E]">
              Thread Art Designs ({threadProducts.length} Pieces)
            </h2>
            <Link
              href="/custom-orders?artType=thread"
              className="text-xs uppercase tracking-wider font-semibold text-[#4B2E1E] hover:text-[#C9A67A] flex items-center gap-1"
            >
              <span>Personalise Monogram String Art</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {threadProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedQuickView(p)}
              />
            ))}
          </div>
        </div>

        {/* Personalized Thread Art Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#4B2E1E] text-[#F8F1E6] text-center max-w-4xl mx-auto shadow-xl">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3 text-[#F8F1E6]">
            Personalised Family Monograms &amp; Anniversaries
          </h3>
          <p className="text-xs sm:text-sm text-[#E6D5C1]/90 font-light max-w-xl mx-auto mb-6 leading-relaxed">
            Create an enduring family keepsake. We weave custom letters, wedding dates, and silhouettes with warm taupe and champagne gold threads on solid oak.
          </p>
          <Link
            href="/custom-orders?artType=thread"
            className="inline-block px-8 py-3.5 rounded-full bg-[#D4AF7A] text-[#4B2E1E] text-xs uppercase tracking-widest font-bold hover:bg-[#E8CA9B] transition-colors"
          >
            Commission Custom String Art
          </Link>
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
