'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { INITIAL_PRODUCTS } from '@/data/products';
import { formatINR } from '@/lib/utils';

export default function HeroSection() {
  const { addItem } = useCart();
  const [showHotspot, setShowHotspot] = useState(false);
  const heroProduct = INITIAL_PRODUCTS[0]; // "Arch of Serenity 3D Painting"

  return (
    <section className="relative overflow-hidden bg-[#F8F1E6] pt-6 pb-12 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-24">
      {/* Soft Botanical Shadow Overlay on Left */}
      <div 
        className="pointer-events-none absolute -top-12 -left-16 w-96 h-96 opacity-15 sm:opacity-20 animate-botanical select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%234B2E1E' d='M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,87.6,-1.4C85.2,13.5,77.7,27.1,69.5,39.8C61.3,52.5,52.4,64.3,40.4,71.8C28.4,79.3,13.2,82.5,-1.3,84.7C-15.8,87,-31.6,88.3,-45.3,82.4C-59,76.5,-70.7,63.4,-77.8,48.5C-85,33.5,-87.6,16.8,-86.3,0.8C-85,-15.2,-79.8,-30.5,-71.4,-43.8C-62.9,-57.2,-51.2,-68.6,-37.8,-76.1C-24.4,-83.6,-12.2,-87.2,1.3,-89.4C14.8,-91.6,29.7,-92.4,44.7,-76.4Z' transform='translate(100 100)' /%3E%3C/svg%3E")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(30px)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Brand Tagline, Headline, Button (Matches mockup exactly!) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10 text-left">
            
            {/* Subtitle with fine horizontal rules */}
            <div className="inline-flex items-center gap-3">
              <span className="w-8 sm:w-12 h-[1px] bg-[#C9A67A]"></span>
              <span className="text-xs sm:text-sm tracking-[0.28em] font-medium uppercase text-[#4B2E1E]">
                HANDMADE ART &amp; DÉCOR
              </span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#C9A67A]"></span>
            </div>

            {/* Headline with calligraphic script "home." */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.12] tracking-tight font-serif text-[#4B2E1E]">
              Art that makes <br />
              a space feel <span className="font-script-home text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-[#4B2E1E] italic font-normal ml-1">home.</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#4B2E1E]/80 max-w-lg leading-relaxed font-light">
              Elevate your sanctuary with luxury 3D texture paintings, tactile plaster wall reliefs, and bespoke thread art handcrafted in our artisan atelier.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Primary Pill Button: Explore Collection → */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#4B2E1E] text-[#F8F1E6] rounded-full text-sm font-medium tracking-wide shadow-luxury hover:bg-[#382216] hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF7A] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Secondary Button: Bespoke Commission */}
              <Link
                href="/custom-orders"
                className="inline-flex items-center gap-2 px-6 py-4 bg-[#E6D5C1]/60 text-[#4B2E1E] rounded-full text-sm font-medium tracking-wide border border-[#C9A67A]/50 hover:bg-[#E6D5C1] transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-[#C9A67A]" />
                <span>Custom Commission</span>
              </Link>
            </div>

            {/* Atelier Note */}
            <div className="pt-2 flex items-center gap-3 text-xs tracking-wider text-[#8C6F54]">
              <span className="w-2 h-2 rounded-full bg-[#C9A67A] animate-ping"></span>
              <span>Each piece is an original archival creation signed by the artisan</span>
            </div>
          </div>

          {/* Right Column: Staged Artwork Interior View (Dual Arch 3D Texture Paintings, Console, Dried Florals) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Luxury Frame Container with Split Wall Aesthetic */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF6F0] bg-gradient-to-r from-[#F8F1E6] via-[#E6D5C1] to-[#4B2E1E]/90 p-1">
                
                {/* Visual Staging Mockup View */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-xl bg-[#E6D5C1]">
                  
                  {/* High Quality Staged Artwork Scene */}
                  <img
                    src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop"
                    alt="TINTOZA Signature 3D Textured Arch Wall Art Staged in Modern Interior"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Light Sheen & Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4B2E1E]/40 via-transparent to-transparent pointer-events-none" />

                  {/* Interactive Hotspot Pin: "Shop This Look" */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <button
                      onClick={() => setShowHotspot(!showHotspot)}
                      className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-[#4B2E1E]/90 text-[#F8F1E6] shadow-lg border-2 border-[#D4AF7A] hover:scale-110 transition-transform"
                      aria-label="View Artwork Details"
                    >
                      <span className="absolute -inset-1 rounded-full bg-[#D4AF7A] opacity-30 animate-ping"></span>
                      <Eye className="w-4 h-4 text-[#D4AF7A]" />
                    </button>

                    {/* Hotspot Popover Card */}
                    {showHotspot && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-[#FAF6F0] p-4 rounded-xl shadow-2xl border border-[#DEC49E] z-30 animate-fadeIn">
                        <div className="text-xs uppercase tracking-widest text-[#C9A67A] font-semibold mb-1">
                          Signature Archival Piece
                        </div>
                        <h4 className="font-serif text-sm font-bold text-[#4B2E1E] leading-snug">
                          {heroProduct.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-base font-semibold text-[#4B2E1E]">{formatINR(heroProduct.price)}</span>
                          {heroProduct.originalPrice && (
                            <span className="text-xs text-[#8C6F54] line-through">{formatINR(heroProduct.originalPrice)}</span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#4B2E1E]/70 mt-1 line-clamp-2">
                          Hand-sculpted dual concentric arches with French limestone plaster and mineral earth pigments.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => {
                              addItem(heroProduct);
                              setShowHotspot(false);
                            }}
                            className="flex-1 py-1.5 px-3 bg-[#4B2E1E] text-[#F8F1E6] text-xs font-medium rounded-full flex items-center justify-center gap-1.5 hover:bg-[#382216]"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF7A]" />
                            <span>Add to Cart</span>
                          </button>
                          <Link
                            href="/shop"
                            className="p-1.5 bg-[#E6D5C1] rounded-full text-[#4B2E1E] hover:bg-[#C9A67A] transition-colors"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Corner Brand Seal */}
                  <div className="absolute bottom-3 right-3 bg-[#F8F1E6]/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#DEC49E]/70 text-[10px] tracking-widest uppercase font-serif text-[#4B2E1E] flex items-center gap-1.5">
                    <span className="text-[#D4AF7A]">✦</span>
                    <span>TINTOZA Atelier Original</span>
                  </div>

                </div>

              </div>

              {/* Decorative Subtle Background Arch Line */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full border border-[#C9A67A]/30 -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
