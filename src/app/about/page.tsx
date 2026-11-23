'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, Feather, ShieldCheck, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';

export default function AboutPage() {
  return (
    <div className="bg-[#F8F1E6] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 sm:w-12 h-[1px] bg-[#C9A67A]"></span>
            <span className="text-xs uppercase tracking-[0.28em] text-[#C9A67A] font-semibold">
              The Brand Story
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#C9A67A]"></span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-[#4B2E1E] tracking-tight leading-tight">
            Art that makes <br />
            a space feel <span className="font-script-home text-5xl sm:text-7xl italic font-normal text-[#4B2E1E]">home.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#8C6F54] font-light leading-relaxed">
            TINTOZA was founded on a simple truth: our living spaces profoundly shape our inner peace. We craft handmade tactile art that softens modern living, inviting stillness, warmth, and timeless grace into every room.
          </p>
        </div>

        {/* Story Section with Staged Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury border-2 border-[#DEC49E] bg-[#E6D5C1]">
            <img
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000&auto=format&fit=crop"
              alt="Artisan sculpting 3D texture in studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4B2E1E]/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-[#F8F1E6]">
              <span className="text-xs uppercase tracking-widest text-[#D4AF7A] font-serif">Atelier Workshop</span>
              <p className="font-serif text-lg font-bold">Every groove carved with patient intention</p>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <h2 className="font-serif text-3xl font-bold text-[#4B2E1E]">
              From Raw Minerals to Soulful Sculptures
            </h2>
            <p className="text-sm text-[#8C6F54] font-light leading-relaxed">
              In a digital world saturated with mass-produced flat prints, we yearned for art that could be felt. Art with physical weight, tactile ridges, and the organic imperfections of the artisan's hand.
            </p>
            <p className="text-sm text-[#8C6F54] font-light leading-relaxed">
              Every TINTOZA piece begins as raw limestone plaster, natural silica sand, and pure mineral earth pigments mixed in small, mindful batches in our atelier. Using custom-shaped wooden spatulas and palette knives, our artisans carve architectural arches, concentric sunbursts, and flowing dunes.
            </p>
            <p className="text-sm text-[#8C6F54] font-light leading-relaxed">
              As the daylight transitions throughout the day, the 3D relief creates shifting shadow play—giving your walls a living, breathing serenity.
            </p>
          </div>
        </div>

        {/* The Exact Palette Philosophy */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF6F0] border border-[#DEC49E] text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.28em] text-[#C9A67A] font-semibold">
            Color Psychology
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4B2E1E]">
            Our Intentional Color Palette
          </h3>
          <p className="text-sm text-[#8C6F54] font-light max-w-2xl mx-auto leading-relaxed">
            We intentionally refrain from harsh primary or neon colors. Our curated palette reflects timeless earthen serenity:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-[#F8F1E6] border border-[#DEC49E]/70 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#F8F1E6] border-2 border-[#DEC49E] mb-2 shadow-sm" />
              <strong className="text-xs text-[#4B2E1E]">Warm Ivory</strong>
              <span className="text-[10px] text-[#8C6F54]">#F8F1E6</span>
              <span className="text-[10px] text-[#8C6F54] mt-1 font-light">Primary Calm</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#DEC49E]/70 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#E6D5C1] border-2 border-[#DEC49E] mb-2 shadow-sm" />
              <strong className="text-xs text-[#4B2E1E]">Sand Beige</strong>
              <span className="text-[10px] text-[#8C6F54]">#E6D5C1</span>
              <span className="text-[10px] text-[#8C6F54] mt-1 font-light">Soft Warmth</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#DEC49E]/70 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#C9A67A] border-2 border-[#DEC49E] mb-2 shadow-sm" />
              <strong className="text-xs text-[#4B2E1E]">Warm Taupe</strong>
              <span className="text-[10px] text-[#8C6F54]">#C9A67A</span>
              <span className="text-[10px] text-[#8C6F54] mt-1 font-light">Earthy Anchor</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#DEC49E]/70 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#4B2E1E] border-2 border-[#DEC49E] mb-2 shadow-sm" />
              <strong className="text-xs text-[#4B2E1E]">Chocolate</strong>
              <span className="text-[10px] text-[#8C6F54]">#4B2E1E</span>
              <span className="text-[10px] text-[#8C6F54] mt-1 font-light">Bold Structure</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#DEC49E]/70 flex flex-col items-center col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-full bg-[#D4AF7A] border-2 border-[#DEC49E] mb-2 shadow-sm" />
              <strong className="text-xs text-[#4B2E1E]">Champagne Gold</strong>
              <span className="text-[10px] text-[#8C6F54]">#D4AF7A</span>
              <span className="text-[10px] text-[#8C6F54] mt-1 font-light">Subtle Luxury</span>
            </div>
          </div>
        </div>

        {/* 3 Core Crafts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-2xl bg-[#E6D5C1]/40 border border-[#DEC49E]">
            <span className="text-xl font-serif text-[#C9A67A] font-bold block mb-2">01.</span>
            <h4 className="font-serif text-lg font-bold text-[#4B2E1E] mb-2">3D Texture Art</h4>
            <p className="text-xs text-[#8C6F54] font-light leading-relaxed">
              Dimensional sculptural paintings built on museum cotton canvases with non-cracking plaster formulas that last a lifetime.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#E6D5C1]/40 border border-[#DEC49E]">
            <span className="text-xl font-serif text-[#C9A67A] font-bold block mb-2">02.</span>
            <h4 className="font-serif text-lg font-bold text-[#4B2E1E] mb-2">Thread &amp; String Art</h4>
            <p className="text-xs text-[#8C6F54] font-light leading-relaxed">
              Geometric illusions and personalized monograms hand-strung on solid oak panels with high-tensile organic silk and metallic fibers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#E6D5C1]/40 border border-[#DEC49E]">
            <span className="text-xl font-serif text-[#C9A67A] font-bold block mb-2">03.</span>
            <h4 className="font-serif text-lg font-bold text-[#4B2E1E] mb-2">Modern Canvas Art</h4>
            <p className="text-xs text-[#8C6F54] font-light leading-relaxed">
              Rich acrylic washes and delicate botanical silhouettes layered on heavy Belgian linen with champagne gold leaf accents.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#4B2E1E] text-[#F8F1E6] rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#382216] transition-colors shadow-luxury"
          >
            <span>Explore the Gallery Collection</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF7A]" />
          </Link>
        </div>

      </div>
    </div>
  );
}
