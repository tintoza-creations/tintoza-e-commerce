'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import FeatureBar from '@/components/FeatureBar';
import CollectionsGrid from '@/components/CollectionsGrid';
import ProductCard from '@/components/ProductCard';
import ProductQuickView from '@/components/ProductQuickView';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import InstagramFeed from '@/components/InstagramFeed';
import { INITIAL_PRODUCTS } from '@/data/products';
import { Product, ProductCategory } from '@/types';

export default function HomePage() {
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter products for the Best-Selling & Curated Artworks section
  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    if (activeCategory === 'all') return true;
    return product.category === activeCategory;
  });

  return (
    <div>
      {/* 1. Large Hero Section (Exact visual match to supplied reference image) */}
      <HeroSection />

      {/* 2. Feature Badges Bar (Handcrafted with Love, Premium Quality, Perfect for Every Space, Art with Heart) */}
      <FeatureBar />

      {/* 3. Our Collections Section ("— Our Collections — Discover unique handmade pieces") */}
      <CollectionsGrid />

      {/* 4. Best-Selling & Featured Artworks */}
      <section className="py-16 sm:py-24 bg-[#FAF6F0] border-t border-[#DEC49E]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14">
            <div>
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="w-8 h-[1px] bg-[#C9A67A]"></span>
                <span className="text-xs tracking-[0.28em] font-medium uppercase text-[#C9A67A]">
                  Artisan Originals
                </span>
                <span className="w-8 h-[1px] bg-[#C9A67A]"></span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#4B2E1E] tracking-tight">
                Best-Selling Artworks
              </h2>
              <p className="mt-2 text-sm text-[#8C6F54] font-light max-w-md">
                Pieces sculpted with organic textures, archival pigments, and timeless elegance for your sanctuary.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Originals' },
                { id: 'texture', label: 'Texture Art' },
                { id: 'thread', label: 'Thread Art' },
                { id: 'canvas', label: 'Canvas Art' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#4B2E1E] text-[#F8F1E6] shadow-sm'
                      : 'bg-[#F8F1E6] text-[#4B2E1E] border border-[#DEC49E] hover:bg-[#E6D5C1]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedQuickView(p)}
              />
            ))}
          </div>

          {/* View Complete Collection CTA */}
          <div className="mt-14 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#4B2E1E] text-xs uppercase tracking-widest font-semibold text-[#4B2E1E] hover:bg-[#4B2E1E] hover:text-[#F8F1E6] transition-colors shadow-sm"
            >
              <span>Explore All Artworks in Gallery</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF7A]" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Custom Commission Spotlight Banner */}
      <section className="py-16 bg-[#E6D5C1]/40 border-y border-[#DEC49E]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#4B2E1E] text-[#F8F1E6] p-8 sm:p-14 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Background Texture Accents */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#D4AF7A 1px, transparent 1px)`,
                backgroundSize: '16px 16px'
              }}
            />

            <div className="space-y-4 max-w-xl text-left z-10">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF7A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Commission Studio</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#F8F1E6] leading-tight">
                Have a specific space or dimension in mind?
              </h3>
              <p className="text-sm text-[#E6D5C1]/90 font-light leading-relaxed">
                We craft custom-sized 3D plaster reliefs and personalised thread designs tailored to your interior palette, wall measurements, and architectural aesthetic.
              </p>
            </div>

            <div className="z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/custom-orders"
                className="px-8 py-4 rounded-full bg-[#D4AF7A] text-[#4B2E1E] text-xs uppercase tracking-widest font-bold hover:bg-[#E8CA9B] transition-colors text-center shadow-md"
              >
                Start Custom Commission
              </Link>
              <Link
                href="/contact"
                className="px-6 py-4 rounded-full border border-[#D4AF7A]/60 text-xs uppercase tracking-widest font-semibold text-[#F8F1E6] hover:bg-[#FAF6F0]/10 transition-colors text-center"
              >
                Inquire on WhatsApp
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Why Choose TINTOZA */}
      <WhyChooseUs />

      {/* 7. Customer Reviews & Testimonials */}
      <Testimonials />

      {/* 8. Instagram Gallery */}
      <InstagramFeed />

      {/* Global Interactive Quick View Modal */}
      {selectedQuickView && (
        <ProductQuickView
          product={selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
        />
      )}
    </div>
  );
}
