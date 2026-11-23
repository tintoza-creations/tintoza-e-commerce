'use client';

import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Check, Tag, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatINR } from '@/lib/utils';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    couponCode,
    applyCoupon,
  } = useCart();

  const { user } = useAuth();

  const [inputCode, setInputCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Checkout form
  const [fullName, setFullName] = useState(user?.name || 'Priya Sundaram');
  const [email, setEmail] = useState(user?.email || 'collector@tintoza.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [street, setStreet] = useState(user?.addresses?.[0]?.street || '42, Indiranagar 100ft Road');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'Bengaluru');
  const [state, setState] = useState(user?.addresses?.[0]?.state || 'Karnataka');
  const [postalCode, setPostalCode] = useState(user?.addresses?.[0]?.postalCode || '560038');
  const [country, setCountry] = useState('India');

  if (!isCartOpen && !isCheckoutOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const res = applyCoupon(inputCode);
    setCouponFeedback(res);
  };

  const freeShippingThreshold = 4999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingOrder(true);

    try {
      const orderPayload = {
        userId: user?.id,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: {
          fullName,
          street,
          city,
          state,
          postalCode,
          country,
        },
        items: items.map((it) => ({
          productId: it.product.id,
          productName: it.product.name,
          price: it.product.price,
          quantity: it.quantity,
          image: it.product.images[0],
          size: it.selectedSize,
        })),
        subtotal,
        discount,
        shipping,
        total,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (data.order) {
        setCompletedOrder(data.order);
        clearCart();
      }
    } catch (err) {
      console.error('Error creating order', err);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <>
      {/* Slide-Over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FAF6F0] border-l border-[#DEC49E] shadow-2xl flex flex-col">
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#DEC49E]/70 flex items-center justify-between bg-[#F8F1E6]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C9A67A]" />
                  <h3 className="font-serif text-lg font-bold text-[#4B2E1E]">
                    Your Art Cart ({items.reduce((s, i) => s + i.quantity, 0)})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full text-[#4B2E1E] hover:bg-[#E6D5C1] transition-colors"
                  aria-label="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Meter */}
              <div className="bg-[#E6D5C1]/40 px-5 py-3 border-b border-[#DEC49E]/40 text-xs">
                {subtotal >= freeShippingThreshold ? (
                  <div className="flex items-center gap-2 text-[#4B2E1E] font-medium">
                    <Sparkles className="w-4 h-4 text-[#D4AF7A]" />
                    <span>Unlocked: Complimentary Insured Delivery across India!</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-[#8C6F54]">
                      Add <strong className="text-[#4B2E1E]">{formatINR(amountToFreeShipping)}</strong> more to qualify for Free Insured Delivery
                    </span>
                    <div className="w-full bg-[#FAF6F0] rounded-full h-1.5 mt-2 overflow-hidden border border-[#DEC49E]/50">
                      <div
                        className="bg-[#C9A67A] h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 text-[#8C6F54]">
                    <ShoppingBag className="w-12 h-12 mx-auto text-[#C9A67A]/50 mb-3" />
                    <p className="font-serif text-lg text-[#4B2E1E]">Your cart is currently empty</p>
                    <p className="text-xs text-[#8C6F54] mt-1 font-light">
                      Explore our 3D texture art and handmade creations to fill your space with warmth.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 px-6 py-2.5 bg-[#4B2E1E] text-[#F8F1E6] rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#382216]"
                    >
                      Browse Collections
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 rounded-xl bg-[#F8F1E6] border border-[#DEC49E]/50"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#E6D5C1] flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-sm font-bold text-[#4B2E1E] leading-snug line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-[#8C6F54] hover:text-red-700 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#8C6F54] mt-0.5">
                            {item.selectedSize || item.product.dimensions}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-[#DEC49E] rounded-full bg-[#FAF6F0] px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="text-xs text-[#4B2E1E] px-1 hover:text-[#C9A67A]"
                            >
                              -
                            </button>
                            <span className="text-xs font-medium px-2 text-[#4B2E1E]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-xs text-[#4B2E1E] px-1 hover:text-[#C9A67A]"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-serif text-sm font-bold text-[#4B2E1E]">
                            {formatINR(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer: Promo & Totals */}
              {items.length > 0 && (
                <div className="p-5 border-t border-[#DEC49E] bg-[#F8F1E6] space-y-4">
                  {/* Promo code form */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A67A]" />
                      <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Promo code (e.g. TINTOZA10)"
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[#DEC49E] bg-[#FAF6F0] text-[#4B2E1E] uppercase placeholder-[#8C6F54] focus:outline-none focus:border-[#4B2E1E]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#E6D5C1] text-[#4B2E1E] text-xs font-medium rounded-lg hover:bg-[#C9A67A] transition-colors"
                    >
                      Apply
                    </button>
                  </form>

                  {couponFeedback && (
                    <p className={`text-[11px] ${couponFeedback.success ? 'text-green-700' : 'text-red-700'}`}>
                      {couponFeedback.message}
                    </p>
                  )}

                  {couponCode && (
                    <div className="flex items-center justify-between text-xs text-green-800 bg-green-50 px-2.5 py-1 rounded border border-green-200">
                      <span>Applied: <strong>{couponCode}</strong></span>
                      <span>-{formatINR(discount)}</span>
                    </div>
                  )}

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-[#8C6F54]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#4B2E1E]">{formatINR(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-700">
                        <span>Collector Discount</span>
                        <span>-{formatINR(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Insured Gallery Shipping</span>
                      <span>{shipping === 0 ? <strong className="text-[#C9A67A]">FREE</strong> : formatINR(shipping)}</span>
                    </div>
                    <div className="pt-2 border-t border-[#DEC49E]/40 flex justify-between text-base font-serif font-bold text-[#4B2E1E]">
                      <span>Estimated Total</span>
                      <span>{formatINR(total)}</span>
                    </div>
                  </div>

                  {/* Proceed to Checkout Button */}
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 px-6 bg-[#4B2E1E] text-[#F8F1E6] rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-luxury hover:bg-[#382216] transition-colors"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF7A]" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Interactive Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#DEC49E] overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="p-5 border-b border-[#DEC49E] bg-[#F8F1E6] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#4B2E1E]">
                  {completedOrder ? 'Order Confirmed!' : 'Atelier Checkout'}
                </h3>
                <p className="text-xs text-[#8C6F54]">
                  {completedOrder ? 'Thank you for supporting authentic handmade art.' : 'Secure insured shipping directly across India'}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setCompletedOrder(null);
                }}
                className="p-1.5 rounded-full text-[#4B2E1E] hover:bg-[#E6D5C1]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {completedOrder ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#E6D5C1] text-[#4B2E1E] mx-auto flex items-center justify-center border-2 border-[#D4AF7A]">
                    <Check className="w-8 h-8 text-[#4B2E1E]" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#4B2E1E]">
                    Order #{completedOrder.orderNumber}
                  </h4>
                  <p className="text-sm text-[#4B2E1E]/80 max-w-md mx-auto font-light leading-relaxed">
                    We have received your commission! A confirmation receipt has been sent to <strong>{completedOrder.customerEmail}</strong>. Our artisans are preparing your archival shipment.
                  </p>

                  <div className="mt-6 p-4 rounded-xl bg-[#F8F1E6] border border-[#DEC49E] max-w-md mx-auto text-left text-xs space-y-1.5 text-[#8C6F54]">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <strong className="text-[#4B2E1E] uppercase">{completedOrder.status}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping to:</span>
                      <span className="text-[#4B2E1E]">{completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Paid:</span>
                      <strong className="text-[#4B2E1E] font-serif text-sm">{formatINR(completedOrder.total)}</strong>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsCheckoutOpen(false);
                        setCompletedOrder(null);
                      }}
                      className="px-8 py-3 bg-[#4B2E1E] text-[#F8F1E6] rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#382216]"
                    >
                      Return to Gallery
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePlaceOrder} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#4B2E1E] mb-1">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4B2E1E] mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#4B2E1E] mb-1">Phone (for courier delivery)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4B2E1E] mb-1">Street Address</label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#4B2E1E] mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full px-3 py-2.5 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4B2E1E] mb-1">State</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        className="w-full px-3 py-2.5 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4B2E1E] mb-1">PIN Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        className="w-full px-3 py-2.5 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      />
                    </div>
                  </div>

                  {/* Order Summary in Checkout */}
                  <div className="mt-4 p-4 rounded-xl bg-[#F8F1E6] border border-[#DEC49E] space-y-2 text-xs">
                    <div className="font-serif font-bold text-[#4B2E1E] text-sm">Order Total: {formatINR(total)}</div>
                    <div className="text-[#8C6F54]">{items.length} artwork(s) including custom wooden crate protective packaging & insurance.</div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingOrder}
                    className="w-full py-3.5 bg-[#4B2E1E] text-[#F8F1E6] rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#382216] transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmittingOrder ? (
                      <span>Securing Order...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#D4AF7A]" />
                        <span>Place Order • {formatINR(total)}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
