'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Heart } from 'lucide-react';
import { INSTAGRAM_POSTS } from '@/data/products';

export default function InstagramFeed() {
  return (
    <section className="py-16 sm:py-24 bg-[#E6D5C1]/20 border-t border-[#DEC49E]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2 text-xs uppercase tracking-[0.26em] text-[#C9A67A] font-semibold">
            <Instagram className="w-4 h-4" />
            <span>@TINTOZA.ART</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-[#4B2E1E] tracking-tight">
            Follow Our Creative Journey
          </h2>

          <p className="mt-2 text-sm text-[#8C6F54] font-light">
            Behind the scenes of our texture carvings, studio rituals, and collector homes. Tag <span className="font-semibold text-[#4B2E1E]">#TintozaArt</span> to be featured.
          </p>
        </div>

        {/* 4 Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#E6D5C1] shadow-sm"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-[#4B2E1E]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-[#F8F1E6]">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-[#D4AF7A]" />
                </div>
                <div>
                  <p className="text-[11px] line-clamp-3 leading-snug font-light opacity-90">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#D4AF7A]">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Instagram Follow CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#4B2E1E] text-xs font-semibold uppercase tracking-wider text-[#4B2E1E] hover:bg-[#4B2E1E] hover:text-[#F8F1E6] transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Join Our 25k+ Art Community</span>
          </a>
        </div>

      </div>
    </section>
  );
}
