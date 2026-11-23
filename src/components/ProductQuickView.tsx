'use client';

import React, { useState } from 'react';
import { X, Star, Check, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/utils';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#DEC49E] overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FAF6F0]/80 text-[#4B2E1E] hover:bg-[#E6D5C1] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 p-6 bg-[#E6D5C1]/40 flex flex-col justify-between">
          <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden shadow-inner bg-[#E6D5C1]">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImage === idx ? 'border-[#4B2E1E] shadow-sm' : 'border-[#DEC49E] opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Information & Purchase */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-[#8C6F54] uppercase tracking-wider mb-2">
              <span>{product.categoryLabel}</span>
              <div className="flex items-center gap-1 text-[#C9A67A]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-semibold text-[#4B2E1E]">{product.rating.toFixed(1)}</span>
                <span>({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4B2E1E] leading-tight">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-serif text-2xl font-bold text-[#4B2E1E]">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#8C6F54] line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-[#C9A67A] font-medium tracking-wide">
                Archival Authenticity Certificate Included
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#4B2E1E]/80 mt-4 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="mt-4 pt-4 border-t border-[#DEC49E]/50 space-y-2 text-xs">
              <div className="flex justify-between text-[#8C6F54]">
                <span>Dimensions:</span>
                <span className="font-semibold text-[#4B2E1E]">{product.dimensions}</span>
              </div>
              <div className="flex justify-between text-[#8C6F54]">
                <span>Medium:</span>
                <span className="font-semibold text-[#4B2E1E]">{product.medium}</span>
              </div>
              <div className="flex justify-between text-[#8C6F54]">
                <span>Profile Depth:</span>
                <span className="font-semibold text-[#4B2E1E]">{product.depth}</span>
              </div>
            </div>

            {/* Color Palette Swatches */}
            <div className="mt-4">
              <span className="text-xs uppercase tracking-wider text-[#8C6F54] block mb-1.5">
                Artisan Palette:
              </span>
              <div className="flex items-center gap-2">
                {product.colorPalette.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded-full border border-[#DEC49E] shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-[#DEC49E]/50 space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-[#DEC49E] rounded-full bg-[#FAF6F0] px-3 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-base text-[#4B2E1E] hover:text-[#C9A67A] px-2"
                >
                  -
                </button>
                <span className="text-xs font-semibold px-2 text-[#4B2E1E]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-base text-[#4B2E1E] hover:text-[#C9A67A] px-2"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => {
                  addItem(product, quantity);
                  onClose();
                }}
                className="flex-1 py-3 px-6 bg-[#4B2E1E] text-[#F8F1E6] rounded-full text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-luxury hover:bg-[#382216] transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF7A]" />
                <span>Add to Cart • {formatINR(product.price * quantity)}</span>
              </button>
            </div>

            {/* Atelier Guarantees */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#8C6F54] pt-2">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#C9A67A]" />
                <span>Insured Wooden Crate</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#C9A67A]" />
                <span>Lifetime Archival Seal</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#C9A67A]" />
                <span>30-Day Gallery Return</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
