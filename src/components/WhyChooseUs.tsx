'use client';

import React from 'react';
import { Palette, Shield, Sparkles, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Palette,
      title: 'Original Tactile Sculpting',
      description: 'Every texture painting is hand-carved with bespoke palette knives, combining mineral earth, natural sand, and archival plaster for breathtaking 3D depth.',
    },
    {
      icon: Sparkles,
      title: 'Warm Timeless Palette',
      description: 'Consciously composed in Warm Ivory, Sand Beige, Taupe, and Chocolate Brown. We craft art that harmonizes effortlessly with peaceful, elegant living spaces.',
    },
    {
      icon: Shield,
      title: 'Gallery Archival Longevity',
      description: 'Mounted onto warp-resistant solid kiln-dried wood bars with UV-protective satin finish and hand-applied champagne gold accents that endure for generations.',
    },
    {
      icon: HeartHandshake,
      title: 'Bespoke Atelier Care',
      description: 'Each piece arrives with a certificate of authenticity signed by our artisan, packaged in reinforced eco-conscious protective gallery crates.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#E6D5C1]/30 border-y border-[#DEC49E]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 sm:w-12 h-[1px] bg-[#C9A67A]"></span>
            <span className="text-xs sm:text-sm tracking-[0.28em] font-medium uppercase text-[#C9A67A]">
              The TINTOZA Difference
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#C9A67A]"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#4B2E1E] tracking-tight">
            Why Choose TINTOZA
          </h2>

          <p className="mt-4 text-base text-[#8C6F54] font-light leading-relaxed">
            We reject mass-produced prints in favor of mindful, tactile craftsmanship. Real texture, soulful warmth, and original works designed to elevate modern home sanctuaries.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#FAF6F0] p-8 border border-[#DEC49E]/70 shadow-sm hover:shadow-luxury hover:border-[#C9A67A] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#E6D5C1]/60 flex items-center justify-center text-[#4B2E1E] mb-6">
                    <Icon className="w-6 h-6 text-[#C9A67A]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#4B2E1E] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8C6F54] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DEC49E]/40 text-[11px] font-semibold tracking-widest uppercase text-[#C9A67A]">
                  0{idx + 1} • Pillar
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
