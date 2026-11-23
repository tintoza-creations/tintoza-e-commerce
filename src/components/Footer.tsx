'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Instagram, Phone, Mail, MapPin, Heart, ArrowRight } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#4B2E1E] text-[#F8F1E6] pt-16 sm:pt-20 pb-12 border-t-4 border-[#C9A67A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Bar */}
        <div className="pb-16 border-b border-[#C9A67A]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.28em] text-[#D4AF7A] font-semibold">
              The Atelier Journal
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-[#F8F1E6]">
              Receive ₹1,000 off your first original commission
            </h3>
            <p className="text-xs sm:text-sm text-[#E6D5C1]/80 mt-2 font-light">
              Subscribers receive early access to new limited texture series, private exhibition invites, and interior styling guides.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#FAF6F0]/10 border border-[#D4AF7A] text-xs text-[#D4AF7A] tracking-wider text-center font-medium">
                ✦ Thank you for joining our collector circle! Use code <span className="font-bold underline">TINTOZA10</span> at checkout.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-grow px-5 py-3.5 rounded-full bg-[#FAF6F0]/10 border border-[#C9A67A]/50 text-sm text-[#F8F1E6] placeholder-[#E6D5C1]/60 focus:outline-none focus:border-[#D4AF7A]"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#D4AF7A] text-[#4B2E1E] text-xs uppercase tracking-widest font-bold hover:bg-[#E8CA9B] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-4 text-left">
            {/* Brand Logo on Footer */}
            <div className="bg-[#FAF6F0] p-2.5 rounded-2xl inline-block border border-[#DEC49E]/40 shadow-sm">
              <Logo size="md" />
            </div>

            <p className="text-sm text-[#E6D5C1]/80 font-light leading-relaxed max-w-sm">
              TINTOZA creates original handmade 3D texture paintings, intricate thread art, and modern canvas works.
              <span className="block italic text-[#D4AF7A] mt-2 font-serif text-base">
                "Art that makes a space feel home."
              </span>
            </p>

            <div className="pt-2 flex items-center space-x-3 text-[#D4AF7A]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6F0]/10 flex items-center justify-center hover:bg-[#D4AF7A] hover:text-[#4B2E1E] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF6F0]/10 flex items-center justify-center hover:bg-[#D4AF7A] hover:text-[#4B2E1E] transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@tintoza.com"
                className="w-9 h-9 rounded-full bg-[#FAF6F0]/10 flex items-center justify-center hover:bg-[#D4AF7A] hover:text-[#4B2E1E] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Artwork Collections */}
          <div className="space-y-3 text-left">
            <h4 className="font-serif text-base font-bold text-[#D4AF7A] tracking-wider uppercase">
              Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#E6D5C1]/80">
              <li>
                <Link href="/texture-art" className="hover:text-[#D4AF7A] transition-colors">
                  Texture Art (3D Paintings)
                </Link>
              </li>
              <li>
                <Link href="/thread-art" className="hover:text-[#D4AF7A] transition-colors">
                  Thread Art (String Creations)
                </Link>
              </li>
              <li>
                <Link href="/canvas-art" className="hover:text-[#D4AF7A] transition-colors">
                  Canvas Art (Modern Acrylics)
                </Link>
              </li>
              <li>
                <Link href="/custom-orders" className="hover:text-[#D4AF7A] transition-colors">
                  Custom Orders &amp; Inquiries
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#D4AF7A] transition-colors">
                  All Handmade Artworks
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Atelier & Story */}
          <div className="space-y-3 text-left">
            <h4 className="font-serif text-base font-bold text-[#D4AF7A] tracking-wider uppercase">
              The Brand
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#E6D5C1]/80">
              <li>
                <Link href="/about" className="hover:text-[#D4AF7A] transition-colors">
                  About TINTOZA Story
                </Link>
              </li>
              <li>
                <Link href="/about#craftsmanship" className="hover:text-[#D4AF7A] transition-colors">
                  Artisan Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4AF7A] transition-colors">
                  Contact Studio
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=bestseller" className="hover:text-[#D4AF7A] transition-colors">
                  Best-Selling Pieces
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Studio Contact */}
          <div className="space-y-3 text-left">
            <h4 className="font-serif text-base font-bold text-[#D4AF7A] tracking-wider uppercase">
              Atelier Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#E6D5C1]/80 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF7A] flex-shrink-0 mt-0.5" />
                <span>TINTOZA Art Atelier, Handmade Studio</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF7A] flex-shrink-0" />
                <span>WhatsApp: Direct Artisan Line</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF7A] flex-shrink-0" />
                <span>orders@tintoza.com</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/custom-orders"
                  className="inline-block px-4 py-2 bg-[#FAF6F0]/10 border border-[#D4AF7A] rounded-full text-[11px] text-[#D4AF7A] uppercase tracking-wider font-semibold hover:bg-[#D4AF7A] hover:text-[#4B2E1E] transition-colors"
                >
                  Commission Artwork
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Exact Palette tribute */}
        <div className="pt-8 border-t border-[#C9A67A]/25 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E6D5C1]/60 font-light space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} TINTOZA Handmade Art &amp; Décor. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Palette:</span>
            <span className="inline-block w-3 h-3 rounded-full bg-[#F8F1E6]" title="Warm Ivory #F8F1E6"></span>
            <span className="inline-block w-3 h-3 rounded-full bg-[#E6D5C1]" title="Sand Beige #E6D5C1"></span>
            <span className="inline-block w-3 h-3 rounded-full bg-[#C9A67A]" title="Warm Taupe #C9A67A"></span>
            <span className="inline-block w-3 h-3 rounded-full bg-[#4B2E1E]" title="Chocolate Brown #4B2E1E"></span>
            <span className="inline-block w-3 h-3 rounded-full bg-[#D4AF7A]" title="Champagne Gold #D4AF7A"></span>
          </div>
        </div>

      </div>
    </footer>
  );
}
