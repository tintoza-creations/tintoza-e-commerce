'use client';

import React from 'react';
import { Sparkles, Home, Heart, Feather } from 'lucide-react';

export default function FeatureBar() {
  const features = [
    {
      icon: Feather,
      title: 'Handcrafted with Love',
      subtitle: 'Sculpted strand by strand & layer by layer in our atelier',
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      subtitle: 'Archival French plaster, linen & champagne gold leaf',
    },
    {
      icon: Home,
      title: 'Perfect for Every Space',
      subtitle: 'Living rooms, serene bedrooms & contemporary galleries',
    },
    {
      icon: Heart,
      title: 'Art with Heart',
      subtitle: 'Authentic passion that turns walls into soulful sanctuaries',
    },
  ];

  return (
    <section className="bg-[#E6D5C1]/40 border-y border-[#DEC49E]/60 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#C9A67A]/40">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className={`flex items-center gap-3.5 px-3 sm:px-6 ${index > 0 ? 'pt-4 md:pt-0' : ''}`}
              >
                {/* Icon Circle */}
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#FAF6F0] border border-[#DEC49E] flex items-center justify-center text-[#4B2E1E] shadow-sm">
                  <Icon className="w-5 h-5 text-[#C9A67A] stroke-[1.8]" />
                </div>
                
                {/* Text Content */}
                <div className="text-left">
                  <h3 className="font-serif text-sm sm:text-[15px] font-bold text-[#4B2E1E] tracking-wide leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#8C6F54] mt-0.5 line-clamp-1 font-light">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
