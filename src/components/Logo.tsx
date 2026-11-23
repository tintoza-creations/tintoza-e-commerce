'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'light';
  asLink?: boolean;
}

export default function Logo({
  className = '',
  size = 'md',
  asLink = true,
}: LogoProps) {
  // Height and scale mappings to ensure sharp, proportional rendering
  const heightClasses = {
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-12 md:h-13',
    lg: 'h-14 sm:h-16 md:h-18',
    xl: 'h-20 sm:h-24 md:h-28',
  }[size];

  const content = (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src="/images/logo/logo.png"
        alt="TINTOZA — Handmade Art & Décor"
        className={`${heightClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-102`}
      />
    </div>
  );

  if (!asLink) {
    return content;
  }

  return (
    <Link
      href="/"
      className="group inline-flex items-center transition-opacity hover:opacity-95"
      aria-label="TINTOZA — Handmade Art & Décor"
    >
      {content}
    </Link>
  );
}
