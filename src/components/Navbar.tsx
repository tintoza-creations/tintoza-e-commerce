'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User as UserIcon, ShoppingBag, Menu, X, Heart, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, setIsAuthModalOpen, setAuthModalTab } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collectionsDropdown, setCollectionsDropdown] = useState(false);

  // Scroll listener for sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { 
      name: 'Collections', 
      href: '/shop',
      hasDropdown: true,
      subItems: [
        { name: 'Texture Art (3D Wall Art)', href: '/texture-art' },
        { name: 'Thread Art (Handmade String Designs)', href: '/thread-art' },
        { name: 'Canvas Art (Modern Paintings)', href: '/canvas-art' },
        { name: 'Custom Orders & Commissions', href: '/custom-orders' },
      ]
    },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleOpenAccount = () => {
    if (user) {
      setAuthModalTab('profile');
    } else {
      setAuthModalTab('login');
    }
    setIsAuthModalOpen(true);
  };

  return (
    <>
      {/* Luxury Announcement Bar */}
      <div className="bg-[#4B2E1E] text-[#F8F1E6] text-xs py-2 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-4">
        <span className="hidden sm:inline text-[#D4AF7A]">✦</span>
        <span>Art that makes a space feel home</span>
        <span className="hidden md:inline">• Complimentary insured delivery across India on orders over ₹4,999</span>
        <span className="text-[#D4AF7A]">✦</span>
      </div>

      {/* Main Luxury Navigation Bar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#F8F1E6]/95 backdrop-blur-md shadow-sm border-b border-[#DEC49E]/50 py-3' 
            : 'bg-[#F8F1E6] border-b border-[#E6D5C1] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-[#4B2E1E] hover:text-[#C9A67A] focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Left: TINTOZA Logo (exact supplied brand design) */}
            <div className="flex-shrink-0 flex items-center">
              <Logo size="md" />
            </div>

            {/* Center: Desktop Navigation Links (matching layout from image) */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                if (link.hasDropdown) {
                  return (
                    <div 
                      key={link.name} 
                      className="relative group"
                      onMouseEnter={() => setCollectionsDropdown(true)}
                      onMouseLeave={() => setCollectionsDropdown(false)}
                    >
                      <button 
                        className={`inline-flex items-center gap-1 text-[15px] tracking-wide font-medium transition-colors duration-200 py-1 ${
                          active ? 'text-[#4B2E1E] font-semibold' : 'text-[#4B2E1E]/85 hover:text-[#4B2E1E]'
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#C9A67A] transition-transform duration-200 group-hover:rotate-180" />
                      </button>

                      {/* Active indicator bar */}
                      {active && (
                        <span className="block h-[2px] w-6 bg-[#4B2E1E] mx-auto rounded-full mt-0.5" />
                      )}

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 transition-all duration-200 ${
                          collectionsDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                        }`}
                      >
                        <div className="bg-[#FAF6F0] rounded-xl shadow-luxury border border-[#DEC49E]/70 py-2 overflow-hidden">
                          {link.subItems?.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block px-4 py-2.5 text-xs tracking-wider uppercase text-[#4B2E1E] hover:bg-[#E6D5C1]/50 hover:text-[#4B2E1E] transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={link.name} className="relative py-1">
                    <Link
                      href={link.href}
                      className={`text-[15px] tracking-wide transition-colors duration-200 ${
                        active 
                          ? 'text-[#4B2E1E] font-semibold' 
                          : 'text-[#4B2E1E]/85 hover:text-[#4B2E1E]'
                      }`}
                    >
                      {link.name}
                    </Link>
                    {/* Active Underline Pill (as seen under "Home" in the mockup!) */}
                    {active && (
                      <span className="block h-[2px] w-5 bg-[#4B2E1E] mx-auto rounded-full mt-0.5" />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right: Search, Account / Login, Wishlist, Cart Drawer */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Icon */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 text-[#4B2E1E] hover:text-[#C9A67A] transition-colors relative"
                aria-label="Search Artworks"
              >
                <Search className="w-5 h-5 stroke-[1.6]" />
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/shop?filter=wishlist"
                className="p-1.5 text-[#4B2E1E] hover:text-[#C9A67A] transition-colors relative hidden sm:inline-block"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.6]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C9A67A] text-[#F8F1E6] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account / Login / Owner Studio Trigger */}
              {user?.role === 'owner' ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/owner"
                    className="px-3.5 py-1.5 rounded-full bg-[#4B2E1E] text-[#D4AF7A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#382216] shadow-sm border border-[#D4AF7A]/40"
                  >
                    <span>✦</span>
                    <span className="hidden sm:inline">Owner Studio</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleOpenAccount}
                    className="p-1.5 text-[#4B2E1E] hover:text-[#C9A67A] transition-colors relative"
                    aria-label="Account Settings"
                  >
                    <UserIcon className="w-5 h-5 stroke-[1.6]" />
                  </button>
                </div>
              ) : user ? (
                <button
                  type="button"
                  onClick={handleOpenAccount}
                  className="px-3 py-1.5 rounded-full border border-[#DEC49E] text-[#4B2E1E] hover:bg-[#E6D5C1] transition-colors relative flex items-center gap-1.5"
                  aria-label="User Account"
                >
                  <UserIcon className="w-4 h-4 stroke-[1.8] text-[#C9A67A]" />
                  <span className="text-xs font-semibold tracking-wider text-[#4B2E1E]">
                    Account
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleOpenAccount}
                  className="px-3.5 py-1.5 rounded-full border border-[#C9A67A] text-[#4B2E1E] hover:bg-[#E6D5C1] transition-colors relative flex items-center gap-1.5 shadow-sm"
                  aria-label="Sign In"
                >
                  <UserIcon className="w-4 h-4 stroke-[1.8] text-[#C9A67A]" />
                  <span className="text-xs font-bold tracking-wider text-[#4B2E1E]">
                    Sign In
                  </span>
                </button>
              )}

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="p-1.5 text-[#4B2E1E] hover:text-[#C9A67A] transition-colors relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#4B2E1E] text-[#F8F1E6] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Search Drawer Bar */}
        {searchOpen && (
          <div className="border-t border-[#DEC49E]/60 bg-[#FAF6F0] py-3 px-4 shadow-inner">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-[#C9A67A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 3D texture paintings, thread designs, modern canvas art..."
                className="w-full bg-transparent border-none text-sm text-[#4B2E1E] placeholder-[#8C6F54] focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <Link
                  href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setSearchOpen(false)}
                  className="px-3 py-1 bg-[#4B2E1E] text-[#F8F1E6] text-xs rounded-full hover:bg-[#382216] transition-colors"
                >
                  View
                </Link>
              )}
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs text-[#8C6F54] hover:text-[#4B2E1E]"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#DEC49E]/70 bg-[#F8F1E6] px-5 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base tracking-wide py-2 ${
                    isActive(link.href) ? 'text-[#4B2E1E] font-bold' : 'text-[#4B2E1E]/80'
                  }`}
                >
                  {link.name}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-4 border-l-2 border-[#C9A67A]/40 space-y-2 mt-1">
                    {link.subItems?.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs uppercase tracking-wider text-[#8C6F54] hover:text-[#4B2E1E] py-1"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-[#DEC49E]/40 flex flex-col gap-3">
              {user?.role === 'owner' && (
                <Link
                  href="/owner"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#4B2E1E] text-[#D4AF7A] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
                >
                  <span>✦</span>
                  <span>Open Owner Studio Portal</span>
                </Link>
              )}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenAccount();
                  }}
                  className="text-sm font-medium text-[#4B2E1E] flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-[#C9A67A]" />
                  <span>{user ? (user.role === 'owner' ? 'Owner Studio' : 'My Account') : 'Sign In'}</span>
                </button>
                <Link
                  href="/shop?filter=wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-[#4B2E1E] flex items-center gap-1.5"
                >
                  <Heart className="w-4 h-4 text-[#C9A67A]" />
                  <span>Wishlist ({wishlistCount})</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
