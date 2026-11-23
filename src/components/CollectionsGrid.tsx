'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function CollectionsGrid() {
  const collections = [
    {
      id: 'texture-art',
      title: 'Texture Art',
      subtitle: '3D Sculpted Plaster & Arch Reliefs',
      description: 'Tactile waves, concentric arches, and organic mineral plaster that bring sculpted dimensionality to your walls.',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
      href: '/texture-art',
      count: '12 Original Pieces',
    },
    {
      id: 'thread-art',
      title: 'Thread Art',
      subtitle: 'Geometric String Creations & Monograms',
      description: 'Thousands of silk and metallic strands woven under precise tension to create floating optical symmetries.',
      image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop',
      href: '/thread-art',
      count: '8 Bespoke Designs',
    },
    {
      id: 'canvas-art',
      title: 'Canvas Art',
      subtitle: 'Modern Acrylics & Warm Minimalist Abstracts',
      description: 'Soulful earth pigments, raw linen backgrounds, and fine champagne gold leaf accents on premium stretched canvas.',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop',
      href: '/canvas-art',
      count: '15 Curated Artworks',
    },
    {
      id: 'custom-orders',
      title: 'Custom Orders',
      subtitle: 'Bespoke Personalised Commissions',
      description: 'Collaborate directly with our atelier to commission tailor-made sizes, textures, and bespoke palettes for your home.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
      href: '/custom-orders',
      count: 'Custom Dimensions',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F8F1E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching mockup view: "— Our Collections — Discover unique handmade pieces" */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 sm:w-12 h-[1px] bg-[#C9A67A]"></span>
            <span className="text-xs sm:text-sm tracking-[0.28em] font-medium uppercase text-[#C9A67A]">
              Curated Mediums
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#C9A67A]"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#4B2E1E] tracking-tight">
            Our Collections
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#8C6F54] font-light">
            Discover unique handmade pieces, each crafted with intentional stillness and tactile beauty.
          </p>
        </div>

        {/* Collections 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={col.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#FAF6F0] border border-[#DEC49E]/70 shadow-sm hover:shadow-luxury hover:border-[#C9A67A] transition-all duration-500 transform hover:-translate-y-1"
            >
              {/* Image Container with Soft Zoom */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E6D5C1]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
                
                {/* Subtle Gradient Veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4B2E1E]/80 via-[#4B2E1E]/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                {/* Top Badge: Item Count */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FAF6F0]/90 backdrop-blur-sm text-[11px] font-medium tracking-wider text-[#4B2E1E] uppercase border border-[#DEC49E]/50">
                    {col.count}
                  </span>
                </div>

                {/* Bottom Overlay Content inside image */}
                <div className="absolute bottom-4 left-4 right-4 text-[#F8F1E6]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-[#D4AF7A] font-medium">
                        {col.subtitle}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F8F1E6] mt-0.5">
                        {col.title}
                      </h3>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#FAF6F0]/20 backdrop-blur-sm flex items-center justify-center border border-[#F8F1E6]/40 group-hover:bg-[#4B2E1E] group-hover:text-[#F8F1E6] transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-[#F8F1E6]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                <p className="text-xs text-[#8C6F54] leading-relaxed line-clamp-2 font-light">
                  {col.description}
                </p>
                <div className="mt-4 pt-3 border-t border-[#DEC49E]/40 flex items-center justify-between text-xs font-medium text-[#4B2E1E] group-hover:text-[#C9A67A]">
                  <span>Explore Series</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
