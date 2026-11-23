'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Layers, Box, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductQuickView from '@/components/ProductQuickView';
import { INITIAL_PRODUCTS } from '@/data/products';
import { Product } from '@/types';

export default function TextureArtPage() {
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);

  const textureProducts = INITIAL_PRODUCTS.filter((p) => p.category === 'texture');

  return (
    <div className="bg-[#F8F1E6] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section for Texture Art */}
        <div className="rounded-3xl bg-[#FAF6F0] border border-[#DEC49E] p-8 sm:p-14 mb-16 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#C9A67A] font-semibold">
              <Layers className="w-4 h-4" />
              <span>Dimensional Plaster Sculpting</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-[#4B2E1E] leading-tight">
              3D Texture Paintings &amp; Abstract Wall Décor
            </h1>

            <p className="text-sm sm:text-base text-[#8C6F54] font-light leading-relaxed max-w-xl">
              Sculpted by hand using French limestone plaster, natural beach sand, and mineral pigments. The tactile arches and ridges create living shadows that respond dynamically to daylight.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#4B2E1E]">
              <span className="flex items-center gap-1.5 bg-[#E6D5C1]/50 px-3 py-1 rounded-full border border-[#DEC49E]">
                ✦ 100% Tactile Archival Paste
              </span>
              <span className="flex items-center gap-1.5 bg-[#E6D5C1]/50 px-3 py-1 rounded-full border border-[#DEC49E]">
                ✦ 1.5" Gallery Profile Canvas
              </span>
              <span className="flex items-center gap-1.5 bg-[#E6D5C1]/50 px-3 py-1 rounded-full border border-[#DEC49E]">
                ✦ Custom Oak &amp; Walnut Framing
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-[#DEC49E]">
            <img
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop"
              alt="Hand sculpted texture painting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4B2E1E]">
              Texture Art Collection ({textureProducts.length} Originals)
            </h2>
            <Link
              href="/custom-orders?artType=texture"
              className="text-xs uppercase tracking-wider font-semibold text-[#4B2E1E] hover:text-[#C9A67A] flex items-center gap-1"
            >
              <span>Commission Custom Texture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {textureProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedQuickView(p)}
              />
            ))}
          </div>
        </div>

        {/* Craftsmanship Note */}
        <div className="p-8 rounded-2xl bg-[#E6D5C1]/40 border border-[#DEC49E] text-center max-w-3xl mx-auto">
          <h3 className="font-serif text-xl font-bold text-[#4B2E1E] mb-2">
            The Philosophy of Texture
          </h3>
          <p className="text-xs sm:text-sm text-[#8C6F54] font-light leading-relaxed">
            In an era of flat digital screens, tactile art grounds our physical senses. Our plaster works are sealed with museum-grade UV sealant to guarantee they will never crack or flake.
          </p>
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
