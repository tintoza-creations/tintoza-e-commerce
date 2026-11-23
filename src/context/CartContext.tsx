'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode: string;
  discountRate: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tintoza_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading cart', e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tintoza_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [items]);

  const addItem = (product: Product, quantity = 1, selectedSize?: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: selectedSize || product.dimensions }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscountRate(0);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'TINTOZA10' || clean === 'WELCOME10') {
      setCouponCode(clean);
      setDiscountRate(0.10); // 10% off
      return { success: true, message: '10% Welcome Collector discount applied!' };
    }
    if (clean === 'ARTISAN15') {
      setCouponCode(clean);
      setDiscountRate(0.15); // 15% off
      return { success: true, message: '15% Patron discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Use TINTOZA10 for 10% off.' };
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountRate);
  // Free insured delivery across India over ₹4,999, otherwise flat ₹350 archival courier
  const shipping = subtotal > 4999 || subtotal === 0 ? 0 : 350;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        discount,
        shipping,
        total,
        couponCode,
        discountRate,
        applyCoupon,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
