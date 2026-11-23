'use client';

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { INITIAL_REVIEWS } from '@/data/products';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? INITIAL_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev === INITIAL_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = INITIAL_REVIEWS[activeIndex];

  return (
    <section className="py-20 sm:py-28 bg-[#F8F1E6] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 sm:w-12 h-[1px] bg-[#C9A67A]"></span>
            <span className="text-xs sm:text-sm tracking-[0.28em] font-medium uppercase text-[#C9A67A]">
              Collector Testimonials
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#C9A67A]"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#4B2E1E] tracking-tight">
            Loved in Homes Worldwide
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative rounded-3xl bg-[#FAF6F0] border border-[#DEC49E] p-8 sm:p-14 shadow-luxury text-center">
          
          <Quote className="w-12 h-12 text-[#C9A67A]/30 mx-auto mb-6" />

          {/* Stars */}
          <div className="flex items-center justify-center gap-1.5 text-[#C9A67A] mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          {/* Title & Comment */}
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#4B2E1E] max-w-2xl mx-auto leading-snug">
            "{current.title}"
          </h3>

          <p className="text-base sm:text-lg text-[#4B2E1E]/80 max-w-2xl mx-auto mt-6 leading-relaxed font-light italic">
            "{current.comment}"
          </p>

          {/* Author Details */}
          <div className="mt-8 pt-6 border-t border-[#DEC49E]/50 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2">
              <span className="font-serif text-base sm:text-lg font-bold text-[#4B2E1E]">
                {current.author}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-[#C9A67A] font-medium bg-[#E6D5C1]/50 px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3 text-[#C9A67A]" />
                Verified Collector
              </span>
            </div>
            <span className="text-xs text-[#8C6F54] mt-1 font-light">
              {current.city} • Purchased: {current.artworkPurchased}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="p-3 rounded-full border border-[#DEC49E] bg-[#F8F1E6] text-[#4B2E1E] hover:bg-[#4B2E1E] hover:text-[#F8F1E6] transition-colors"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {INITIAL_REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === i ? 'w-6 bg-[#4B2E1E]' : 'w-2 bg-[#DEC49E]'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextReview}
              className="p-3 rounded-full border border-[#DEC49E] bg-[#F8F1E6] text-[#4B2E1E] hover:bg-[#4B2E1E] hover:text-[#F8F1E6] transition-colors"
              aria-label="Next Review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
