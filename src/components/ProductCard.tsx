'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatINR } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-[#FAF6F0] border border-[#DEC49E]/60 shadow-sm hover:shadow-luxury hover:border-[#C9A67A] transition-all duration-300 overflow-hidden">
      
      {/* Product Image Area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E6D5C1]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Secondary Image Hover cross-fade if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full bg-[#4B2E1E] text-[#F8F1E6] text-[10px] uppercase tracking-wider font-medium shadow-sm">
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-1 rounded-full bg-[#D4AF7A] text-[#4B2E1E] text-[10px] font-bold tracking-wide shadow-sm">
              Save {formatINR(product.originalPrice - product.price)}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-transform duration-200 hover:scale-110 z-10 ${
            isWishlisted 
              ? 'bg-[#4B2E1E] text-[#D4AF7A]' 
              : 'bg-[#FAF6F0]/85 text-[#4B2E1E] hover:text-[#C9A67A]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Pill */}
        <div className="absolute inset-x-4 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex gap-2">
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="flex-1 py-2 px-3 bg-[#FAF6F0]/95 backdrop-blur-sm text-[#4B2E1E] rounded-full text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 shadow-md hover:bg-[#FAF6F0] hover:text-[#C9A67A] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => addItem(product)}
            className="py-2 px-3 bg-[#4B2E1E] text-[#F8F1E6] rounded-full text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 shadow-md hover:bg-[#382216] transition-colors"
            aria-label="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF7A]" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between text-left space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#8C6F54] uppercase tracking-wider mb-1">
            <span>{product.categoryLabel}</span>
            <div className="flex items-center gap-1 text-[#C9A67A]">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-semibold text-[#4B2E1E]">{product.rating.toFixed(1)}</span>
              <span>({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#4B2E1E] leading-snug group-hover:text-[#8C6F54] transition-colors">
            {product.name}
          </h3>

          {/* Dimensions & Medium */}
          <p className="text-xs text-[#8C6F54] mt-1 font-light line-clamp-1">
            {product.dimensions} • {product.medium.split('&')[0]}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-[#DEC49E]/40 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold text-[#4B2E1E]">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#8C6F54] line-through font-light">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Instant Add to Cart for mobile & desktop */}
          <button
            type="button"
            onClick={() => addItem(product)}
            className="text-xs font-medium text-[#4B2E1E] hover:text-[#C9A67A] transition-colors flex items-center gap-1"
          >
            <span>Add to Cart</span>
            <span>+</span>
          </button>
        </div>

      </div>

    </div>
  );
}
