import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';

export const metadata: Metadata = {
  title: 'TINTOZA — Handmade Art & Décor | "Art that makes a space feel home."',
  description: 'Discover luxury handmade 3D texture paintings, intricate thread art, and modern canvas artwork by TINTOZA. Artisan home décor crafted with warm ivory, sand beige, and rich chocolate tones.',
  keywords: ['TINTOZA', 'Handmade Art', '3D Texture Art', 'Thread Art', 'Canvas Art', 'Home Décor', 'Luxury Wall Art', 'Warm Minimalist Décor'],
  openGraph: {
    title: 'TINTOZA — Handmade Art & Décor',
    description: 'Art that makes a space feel home. Luxury textured 3D wall art and bespoke handcrafted creations.',
    type: 'website',
  },
  icons: {
    icon: '/images/logo/logo.png',
    apple: '/images/logo/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#F8F1E6] text-[#4B2E1E] antialiased selection:bg-[#E6D5C1] selection:text-[#4B2E1E]">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              {/* Sticky Luxury Announcement & Navigation */}
              <Navbar />

              {/* Main Page Content */}
              <main className="flex-grow">
                {children}
              </main>

              {/* Luxury Footer */}
              <Footer />

              {/* Global Interactive Modals & Drawers */}
              <CartDrawer />
              <AuthModal />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
