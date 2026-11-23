import { Product, Review } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- TEXTURE ART ---
  {
    id: 'tintoza-tex-01',
    name: 'Arch of Serenity 3D Painting',
    category: 'texture',
    categoryLabel: 'Texture Art',
    price: 14999,
    originalPrice: 17999,
    dimensions: '24" x 36" (60 x 90 cm)',
    medium: 'Sculptural Plaster & Natural Sand on Heavy Canvas',
    depth: '1.5" Gallery Profile (3.8 cm)',
    featured: true,
    bestSeller: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 34,
    description: 'Our signature archival piece featured in the TINTOZA atelier gallery. Sculpted by hand with dual architectural arches and concentric grooved curves in warm ivory, sand beige, and deep chocolate brown.',
    details: [
      '100% handcrafted textured relief with archival plaster paste',
      'Neutral warm tones: Ivory (#F8F1E6), Sand Beige (#E6D5C1), and Chocolate Brown (#4B2E1E)',
      'Mounted on kiln-dried solid pine wood stretcher bars',
      'Signed by the artist with certificate of authenticity included',
      'Ready to hang with heavy-duty brass wall brackets'
    ],
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop'
    ],
    colorPalette: ['#F8F1E6', '#E6D5C1', '#C9A67A', '#4B2E1E'],
    badge: 'Signature Hero'
  },
  {
    id: 'tintoza-tex-02',
    name: 'Dune Whispers Plaster Relief',
    category: 'texture',
    categoryLabel: 'Texture Art',
    price: 11999,
    originalPrice: 13999,
    dimensions: '20" x 30" (50 x 75 cm)',
    medium: 'French Limestone Plaster on Cotton Canvas',
    depth: '1.5" Gallery Profile',
    featured: true,
    bestSeller: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 22,
    description: 'Gentle horizontal dune ridges evoke the serene calmness of wind-swept desert sands. The textural depth creates mesmerising shadow play that shifts softly throughout the daylight.',
    details: [
      'Tactile organic curves shaped with custom wooden palette knives',
      'Finished with matte protective archival sealant',
      'Champagne gold dust subtle shimmer accents along crests',
      'Custom framing options in natural oak or raw walnut'
    ],
    images: [
      'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=1200&auto=format&fit=crop'
    ],
    colorPalette: ['#F8F1E6', '#E6D5C1', '#D4AF7A'],
    badge: 'Best Seller'
  },
  {
    id: 'tintoza-tex-03',
    name: 'Sahara Concentric Sun Wall Art',
    category: 'texture',
    categoryLabel: 'Texture Art',
    price: 16499,
    originalPrice: 18999,
    dimensions: '30" x 30" (75 x 75 cm)',
    medium: 'Hand-Moulded Plaster & Gold Foil Leaf',
    depth: '2" Deep Floating Canvas',
    featured: true,
    bestSeller: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 18,
    description: 'A striking circular solar motif formed with radial grooved rays. Warm taupe and champagne gold leaf highlights catch the ambient room lighting with understated opulence.',
    details: [
      'Concentric tactile rings radiating from a central focal point',
      'Hand-applied 24k champagne gold foil accents',
      'Sturdy heavy-duty linen substrate with zero warp guarantee'
    ],
    images: [
      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop'
    ],
    colorPalette: ['#F8F1E6', '#C9A67A', '#D4AF7A', '#4B2E1E'],
    badge: 'Limited Edition'
  },
  {
    id: 'tintoza-tex-04',
    name: 'Terra Horizon Diptych (Pair of 2)',
    category: 'texture',
    categoryLabel: 'Texture Art',
    price: 24999,
    originalPrice: 28999,
    dimensions: 'Two panels of 20" x 36" each',
    medium: 'Mineral Earth Pigments & Plaster Relief',
    depth: '1.5" Gallery Profile',
    featured: false,
    bestSeller: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 29,
    description: 'A paired set designed to hang side by side above a living room console or bedroom headboard. Earthy layers transition gracefully from soft cream to deep mocha brown.',
    details: [
      'Cohesive diptych designed with flowing continuous horizon line',
      'Natural mineral pigments mixed in-house for warm tactile richness',
      'Includes hanging guide and brass hardware'
    ],
    images: [
      'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop'
    ],
    colorPalette: ['#F8F1E6', '#E6D5C1', '#C9A67A', '#4B2E1E']
  },

  // --- THREAD ART ---
  {
    id: 'tintoza-thr-01',
    name: 'Aura Geometric Thread Symphony',
    category: 'thread',
    categoryLabel: 'Thread Art',
    price: 10999,
    originalPrice: 12499,
    dimensions: '20" x 20" (50 x 50 cm)',
    medium: 'Organic Silk & Cotton Threads on Oak Backing',
    depth: '1.8" Shadowbox Frame',
    featured: true,
    bestSeller: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 19,
    description: 'Thousands of intricate string strands woven under precise tension create an optical illusion of curved 3D geometry floating in mid-air. Sealed in an open-grain natural oak shadowbox.',
    details: [
      'Over 850 handcrafted string intersections on antiqued brass pins',
      'Gradient thread palette from ecru and warm taupe to chocolate brown',
      'Anti-reflective museum glass front included'
    ],
    images: [
      'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1200&auto=format&fit=crop'
    ],
    colorPalette: ['#F8F1E6', '#C9A67A', '#4B2E1E', '#D4AF7A'],
    badge: 'Artisan Pick'
  },
  {
    id: 'tintoza-thr-02',
    name: 'Harmonic Spiral Thread Mandala',
    category: 'thread',
    categoryLabel: 'Thread Art',
    price: 12999,
    dimensions: '24" x 24" (60 x 60 cm)',
    medium: 'Metallic Gold Thread & Cotton on Sand Linen',
    depth: '1.5" Custom Frame',
    featured: false,
    bestSeller: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 14,
    description: 'A meditative mandala crafted with champagne gold threads that catch subtle illumination. Brings peace, rhythm, and warmth into cozy bedrooms or study walls.',
    details: [
      'Hypnotic spiral geometry calibrated with mathematical elegance',
      'Natural raw sand linen mounting base (#E6D5C1)',
      'Hand-numbered and signed back'
    ],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop'
    ],
    colorPalette: ['#E6D5C1', '#D4AF7A', '#4B2E1E']
  },
  {
    id: 'tintoza-thr-03',
    name: 'Bespoke Monogram Thread Portrait',
    category: 'thread',
    categoryLabel: 'Thread Art',
    price: 15499,
    dimensions: '18" x 24" (45 x 60 cm)',
    medium: 'Personalised String Art on Birch Veneer',
    depth: '1.2" Solid Walnut Edge',
    featured: true,
    bestSeller: false,
    inStock: true,
    rating: 5.0,
    reviewsCount: 27,
    description: 'Custom personalized thread artwork designed with your initials, family monogram, or silhouette. Handcrafted with warm taupe and chocolate threads.',
    details: [
      'Completely custom made to order with your chosen letters or motif',
      'Digital preview provided within 48 hours before artisan crafting begins',
      'Ideal heirloom gift for weddings, housewarmings, and anniversaries'
    ],
    images: [
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop'
    ],
    colorPalette: ['#F8F1E6', '#C9A67A', '#4B2E1E'],
    badge: 'Customizable'
  },

  // --- CANVAS ART ---
  {
    id: 'tintoza-can-01',
    name: 'Earthy Solitude Minimalist Canvas',
    category: 'canvas',
    categoryLabel: 'Canvas Art',
    price: 11499,
    originalPrice: 13499,
    dimensions: '28" x 40" (70 x 100 cm)',
    medium: 'Acrylic & Mixed Media on Belgian Linen',
    depth: '1.5" Gallery Stretcher',
    featured: true,
    bestSeller: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 31,
    description: 'Broad, sweeping brushstrokes of warm taupe, raw umber, and soft ivory whisper an aura of effortless calm. Perfectly complements Japandi, Nordic, and Wabi-Sabi interiors.',
    details: [
      'Created with premium lightfast Golden Acrylic pigments',
      'Textured linen base leaves subtle organic weave exposed',
      'Includes certificate of origin and care instructions'
    ],
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop'
    ],
    colorPalette: ['#F8F1E6', '#C9A67A', '#4B2E1E'],
    badge: 'Trending'
  },
  {
    id: 'tintoza-can-02',
    name: 'Warm Radiance Abstract Canvas',
    category: 'canvas',
    categoryLabel: 'Canvas Art',
    price: 14499,
    originalPrice: 16999,
    dimensions: '36" x 48" (90 x 120 cm)',
    medium: 'Layered Acrylic with Champagne Gold Glaze',
    depth: '1.75" Floating Natural Wood Frame',
    featured: true,
    bestSeller: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 16,
    description: 'A grand statement artwork that infuses living rooms with golden hour warmth. Subtle micro-layers of champagne gold glaze create an ethereal luminescence under ambient room lighting.',
    details: [
      'Large statement focal piece for expansive dining or foyer spaces',
      'Finished with UV-resistant satin varnish',
      'Delivered fully assembled in custom wooden crate'
    ],
    images: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop'
    ],
    colorPalette: ['#F8F1E6', '#E6D5C1', '#D4AF7A', '#4B2E1E'],
    badge: 'Collector Choice'
  },
  {
    id: 'tintoza-can-03',
    name: 'Botanical Echoes Modern Acrylic',
    category: 'canvas',
    categoryLabel: 'Canvas Art',
    price: 9499,
    dimensions: '18" x 24" (45 x 60 cm)',
    medium: 'Fluid Acrylic & Gold Ink on Textured Canvas',
    depth: '1.2" Solid Frame',
    featured: false,
    bestSeller: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 12,
    description: 'Abstracted botanical foliage silhouetted against warm sand beige backdrops. Fine champagne gold ink lines weave through soft organic leaf shapes.',
    details: [
      'Hand-penned metallic leaf vein contours',
      'Neutral tones harmonize effortlessly with wooden and stone furniture',
      'Signed and dated on reverse'
    ],
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1200&auto=format&fit=crop'
    ],
    colorPalette: ['#E6D5C1', '#C9A67A', '#4B2E1E']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Priya Sundaram',
    city: 'Bengaluru, Karnataka',
    rating: 5,
    title: 'Transformed our entire living room aesthetic!',
    comment: 'The Arch of Serenity 3D painting is beyond breathtaking in person. The tactile texture and warm neutral tones catch the afternoon sun in the most magical way. You can feel the artisan care in every groove.',
    date: '2 weeks ago',
    artworkPurchased: 'Arch of Serenity 3D Painting',
    verifiedBuyer: true
  },
  {
    id: 'rev-02',
    author: 'Rohan Mehta',
    city: 'Mumbai, Maharashtra',
    rating: 5,
    title: 'True luxury craftsmanship',
    comment: 'As an interior architect, I am exceedingly discerning about wall art. TINTOZA delivers gallery-grade craftsmanship with sublime color harmony. The packaging in wooden crates was immaculate.',
    date: '1 month ago',
    artworkPurchased: 'Terra Horizon Diptych',
    verifiedBuyer: true
  },
  {
    id: 'rev-03',
    author: 'Ananya Sharma',
    city: 'New Delhi',
    rating: 5,
    title: 'The thread art is a masterpiece',
    comment: 'The Aura Geometric thread piece is a true conversation starter whenever guests visit. The precision and delicacy are astounding. "Art that makes a space feel home" is truly the perfect tagline.',
    date: '3 weeks ago',
    artworkPurchased: 'Aura Geometric Thread Symphony',
    verifiedBuyer: true
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
    likes: 1240,
    caption: 'Quiet morning light over the Arch of Serenity. Handcrafted in our warm ivory palette. #TintozaArt #TextureArt',
    productName: 'Arch of Serenity'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
    likes: 980,
    caption: 'Curating spaces that breathe calmness and timeless warmth. #HandmadeHome #InteriorArt',
    productName: 'Botanical Echoes'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop',
    likes: 1420,
    caption: 'Close up details of our hand-carved sand ridges. Every crest tells a story. #TintozaCraft',
    productName: 'Dune Whispers'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop',
    likes: 870,
    caption: 'Geometric balance woven strand by strand. Thread art for modern living. #TintozaArt',
    productName: 'Aura Geometric Thread'
  }
];
