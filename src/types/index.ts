export type ProductCategory = 'texture' | 'thread' | 'canvas' | string;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  dimensions: string; // e.g. "24\" x 36\""
  medium: string;     // e.g. "Plaster & Acrylic on Canvas"
  depth: string;      // e.g. "1.5\" Gallery Profile"
  featured?: boolean;
  bestSeller?: boolean;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  details: string[];
  images: string[];
  colorPalette: string[];
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  frameColor?: string;
}

export type UserRole = 'owner' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  addresses?: ShippingAddress[];
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: ShippingAddress;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
    size?: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Pending' | 'Crafting' | 'Shipped' | 'Delivered';
  createdAt: string;
}

export interface CustomOrderInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  artType: 'texture' | 'thread' | 'canvas' | 'mixed';
  dimensions: string;
  palettePreferences: string;
  roomType: string;
  budgetRange: string;
  notes: string;
  referenceUrl?: string;
  status: 'New' | 'In Review' | 'Quoted' | 'In Progress' | 'Completed';
  createdAt: string;
}

export interface Review {
  id: string;
  productId?: string;
  author: string;
  city: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  artworkPurchased?: string;
  verifiedBuyer: boolean;
}

export interface StudioExpense {
  id: string;
  title: string;
  category: 'Raw Materials' | 'Wood & Stretcher Bars' | 'Framing' | 'Packaging & Wooden Crates' | 'Studio Rent & Utilities' | 'Marketing & Exhibitions';
  amount: number;
  date: string;
  notes?: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  totalOrders: number;
  lifetimeSpend: number;
  lastOrderDate: string;
  status: 'Active' | 'VIP Collector' | 'Inquiry';
}
