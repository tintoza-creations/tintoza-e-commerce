# TINTOZA — Handmade Art & Décor

> *"Art that makes a space feel home."*

TINTOZA is a luxury, bespoke e-commerce web application for handmade 3D texture paintings, intricate geometric thread art, and modern minimalist canvas artwork.

---

## 🎨 Brand Identity & Exact Colour Palette

- **Primary Background**: Warm Ivory `#F8F1E6`
- **Secondary Background**: Sand Beige `#E6D5C1`
- **Accent**: Warm Taupe `#C9A67A`
- **Primary Text & Buttons**: Chocolate Brown `#4B2E1E`
- **Premium Highlights**: Champagne Gold `#D4AF7A`

---

## 🏛️ Website Pages & Architecture

1. **Home (`/`)**:
   - Pixel-faithful hero banner matching your supplied reference design.
   - Tagline: *"Art that makes a space feel home."* with elegant calligraphic script.
   - Dual arched 3D textured paintings staged on a natural wood console with ceramic vessels and dried florals.
   - Feature Highlights Bar: *Handcrafted with Love*, *Premium Quality*, *Perfect for Every Space*, *Art with Heart*.
   - Collections grid (*— Our Collections — Discover unique handmade pieces*).
   - Best-selling artworks with live quick view and instant add-to-cart.
   - Why Choose TINTOZA atelier section.
   - Collector reviews & testimonials.
   - Instagram gallery (`#TintozaArt`).
   - Luxury atelier footer.

2. **Shop (`/shop`)**:
   - Complete gallery of handmade original pieces.
   - Category filters (*All*, *Texture Art*, *Thread Art*, *Canvas Art*).
   - Wishlist toggle filter.
   - Live search by artwork title or medium.
   - Sorting by Price (Low/High), Highest Rated, and Curated.
   - Interactive Quick View modal with high-res zoom, dimensions, and specifications.

3. **Texture Art (`/texture-art`)**:
   - Dedicated showcase of 3D sculpted plaster reliefs, concentric arches, and organic wave paintings.

4. **Thread Art (`/thread-art`)**:
   - Geometric tension string art, silk mandalas, and personalised monogram silhouettes on solid oak.

5. **Canvas Art (`/canvas-art`)**:
   - Modern acrylics on heavyweight Belgian linen with champagne gold leaf glazes.

6. **Custom Orders (`/custom-orders`)**:
   - Interactive bespoke commission studio.
   - Live cost estimator based on dimensions and art medium.
   - Personalised artwork enquiry form submitting to the database.
   - One-click direct WhatsApp consultation button.

7. **About Us (`/about`)**:
   - The TINTOZA brand story, atelier origins, tactile sculpting philosophy, and color psychology.

8. **Contact (`/contact`)**:
   - WhatsApp direct chat link, Instagram `@tintoza.art`, email concierge, studio contact form, and collector FAQs.

---

## 🛒 E-Commerce & Full-Stack Database Features

- **In-Web Customer Authentication (`AuthModal.tsx` & `/api/auth`)**:
  - Direct login and account registration modal accessible from anywhere on the website without losing page context.
  - Pre-seeded with a 1-click demo collector profile (*Eleanor Vance*) for instant evaluation.
  - Customer dashboard with past order history, status tracking, and saved delivery address.
- **Slide-Over Cart Drawer (`CartDrawer.tsx`)**:
  - Free insured shipping progress meter (qualify with orders over $250).
  - Quantity increment/decrement, remove items.
  - Discount promo code field (`TINTOZA10` for 10% welcome discount, `ARTISAN15` for 15% discount).
  - Full-featured checkout flow with shipping address and order receipt generation.
- **Persistent Database (`src/lib/db.ts` / `data/db.json`)**:
  - File-backed database initialized with seeds for products, reviews, orders, and inquiries.
- **REST API Endpoints**:
  - `GET /api/products` & `GET /api/products/[id]`
  - `GET /api/orders` & `POST /api/orders`
  - `GET /api/custom-orders` & `POST /api/custom-orders`
  - `GET /api/reviews` & `POST /api/reviews`
  - `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me`

---

## 🚀 Running the Project

To install dependencies and start the development server:

```bash
# 1. Install packages
npm install

# 2. Run the Next.js development server
npm run dev
```

Then open `http://localhost:3000` in your browser.
