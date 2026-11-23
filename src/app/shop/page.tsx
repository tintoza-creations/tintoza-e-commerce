'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, Search, ArrowUpDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductQuickView from '@/components/ProductQuickView';
import { INITIAL_PRODUCTS } from '@/data/products';
import { Product, ProductCategory } from '@/types';
import { useWishlist } from '@/context/WishlistContext';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialFilter = searchParams.get('filter') || '';

  const { wishlist } = useWishlist();

  const [category, setCategory] = useState<string>(initialCategory);
  const [search, setSearch] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);
  const [priceRange, setPriceRange] = useState<number>(50000);
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(initialFilter === 'wishlist');

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...INITIAL_PRODUCTS];

    if (showWishlistOnly) {
      const wishlistIds = new Set(wishlist.map((w) => w.id));
      list = list.filter((p) => wishlistIds.has(p.id));
    }

    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.medium.toLowerCase().includes(q)
      );
    }

    list = list.filter((p) => p.price <= priceRange);

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [category, search, sortBy, priceRange, showWishlistOnly, wishlist]);

  return (
    <div className="bg-[#F8F1E6] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#C9A67A]"></span>
            <span className="text-xs uppercase tracking-[0.28em] text-[#C9A67A] font-semibold">
              The Full Gallery
            </span>
            <span className="w-8 h-[1px] bg-[#C9A67A]"></span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-[#4B2E1E] tracking-tight">
            Handmade Art &amp; Décor Collection
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#8C6F54] font-light leading-relaxed">
            Every piece is an authentic original sculpted and crafted in our studio with natural minerals, plaster, and mindful tactile artistry.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#FAF6F0] rounded-2xl p-4 sm:p-6 border border-[#DEC49E]/70 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {[
                { id: 'all', label: 'All Artwork' },
                { id: 'texture', label: 'Texture Art' },
                { id: 'thread', label: 'Thread Art' },
                { id: 'canvas', label: 'Canvas Art' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCategory(tab.id);
                    setShowWishlistOnly(false);
                  }}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                    category === tab.id && !showWishlistOnly
                      ? 'bg-[#4B2E1E] text-[#F8F1E6]'
                      : 'bg-[#F8F1E6] text-[#4B2E1E] hover:bg-[#E6D5C1]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              {/* Wishlist toggle filter */}
              <button
                onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                  showWishlistOnly
                    ? 'bg-[#C9A67A] text-[#F8F1E6]'
                    : 'bg-[#F8F1E6] text-[#4B2E1E] hover:bg-[#E6D5C1]'
                }`}
              >
                Wishlist ({wishlist.length})
              </button>
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A67A]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by name or style..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-full border border-[#DEC49E] bg-[#F8F1E6] text-[#4B2E1E] placeholder-[#8C6F54] focus:outline-none focus:border-[#4B2E1E]"
                />
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <ArrowUpDown className="w-4 h-4 text-[#C9A67A] flex-shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 text-xs rounded-full border border-[#DEC49E] bg-[#F8F1E6] text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                >
                  <option value="featured">Featured / Curated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

          </div>

          {/* Results count indicator */}
          <div className="pt-3 border-t border-[#DEC49E]/40 flex justify-between items-center text-xs text-[#8C6F54]">
            <span>Showing {filteredProducts.length} original pieces</span>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-xs text-[#4B2E1E] underline hover:text-[#C9A67A]"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Artworks Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-[#FAF6F0] border border-[#DEC49E]/60 p-8">
            <p className="font-serif text-xl text-[#4B2E1E]">No artworks match your criteria</p>
            <p className="text-xs text-[#8C6F54] mt-2 font-light">
              Try adjusting your filters, or consider requesting a bespoke commission.
            </p>
            <button
              onClick={() => {
                setCategory('all');
                setSearch('');
                setShowWishlistOnly(false);
              }}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#4B2E1E] text-[#F8F1E6] text-xs uppercase tracking-wider font-semibold hover:bg-[#382216]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedQuickView(p)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      {selectedQuickView && (
        <ProductQuickView
          product={selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
        />
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F1E6] flex items-center justify-center font-serif text-[#4B2E1E]">Loading Gallery...</div>}>
      <ShopContent />
    </Suspense>
  );
}
