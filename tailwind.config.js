/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory: '#F8F1E6',        // Primary background
          sand: '#E6D5C1',         // Secondary background
          taupe: '#C9A67A',        // Accent
          chocolate: '#4B2E1E',    // Primary text & buttons
          gold: '#D4AF7A',         // Premium highlights
          cream: '#FAF6F0',        // Light tint
          linen: '#F1E7DA',        // Subtle card background
          darkBrown: '#361F13',    // Dark button hover
          goldLight: '#E8CA9B',    // Light gold highlight
          goldBorder: '#DEC49E',   // Fine borders
          mutedTaupe: '#8C6F54',   // Muted text
        },
        tintoza: {
          ivory: '#F8F1E6',
          beige: '#E6D5C1',
          sand: '#E6D5C1',
          taupe: '#C9A67A',
          brown: '#4B2E1E',
          gold: '#D4AF7A',
          cream: '#FAF6F0',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-outfit)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        script: ['var(--font-script)', 'Italianno', 'Playfair Display', 'cursive'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(75, 46, 30, 0.08), 0 4px 6px -2px rgba(75, 46, 30, 0.04)',
        'luxury-hover': '0 20px 40px -15px rgba(75, 46, 30, 0.15), 0 8px 12px -4px rgba(75, 46, 30, 0.08)',
        'gold-glow': '0 0 25px rgba(212, 175, 122, 0.35)',
      },
      borderRadius: {
        'brand': '1.25rem',
        'brand-lg': '2rem',
      },
    },
  },
  plugins: [],
};
