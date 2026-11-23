'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Product, Order, StudioExpense, ClientRecord, CustomOrderInquiry } from '@/types';
import { formatINR } from '@/lib/utils';
import {
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  Receipt,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  Search,
  Tag,
  ChevronRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  X,
  RefreshCw,
  SlidersHorizontal,
  FileSpreadsheet
} from 'lucide-react';

type OwnerTab = 'products' | 'orders' | 'clients' | 'inquiries' | 'expenses' | 'revenue';

export default function OwnerPortalPage() {
  const router = useRouter();
  const { user, isOwner, logout } = useAuth();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<OwnerTab>('products');

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [inquiries, setInquiries] = useState<CustomOrderInquiry[]>([]);
  const [expenses, setExpenses] = useState<StudioExpense[]>([]);
  const [financials, setFinancials] = useState<{
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    totalOrdersCount: number;
    averageOrderValue: number;
  }>({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    totalOrdersCount: 0,
    averageOrderValue: 0
  });

  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Product modal & form states
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<'texture' | 'thread' | 'canvas' | string>('texture');
  const [customCategoryText, setCustomCategoryText] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductOriginalPrice, setNewProductOriginalPrice] = useState('');
  const [newProductDimensions, setNewProductDimensions] = useState('24" x 36" (60 x 90 cm)');
  const [newProductMedium, setNewProductMedium] = useState('Sculptural Plaster & Archival Mineral Pigments');
  const [newProductImageUrl, setNewProductImageUrl] = useState('');
  const [newProductBadge, setNewProductBadge] = useState('New Artwork');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Expense modal & form states
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<StudioExpense['category']>('Raw Materials');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
  const [expenseNotes, setExpenseNotes] = useState('');

  // Curated photo suggestions for easy artwork adding
  const sampleArtworkImages = [
    { label: 'Arch Plaster Duo', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Sand Dune Waves', url: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Golden Thread Grid', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Ivory Sun Relief', url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Terra Clay Monolith', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Woven Linen Abstract', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop' }
  ];

  // Fetch all atelier data once logged in as owner
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [resProd, resOrd, resCli, resInq, resExp, resFin] = await Promise.all([
        fetch('/api/owner/products').then(r => r.json()),
        fetch('/api/owner/orders').then(r => r.json()),
        fetch('/api/owner/clients').then(r => r.json()),
        fetch('/api/custom-orders').then(r => r.json()),
        fetch('/api/owner/expenses').then(r => r.json()),
        fetch('/api/owner/financials').then(r => r.json())
      ]);

      if (resProd.success) setProducts(resProd.products || []);
      if (resOrd.success) setOrders(resOrd.orders || []);
      if (resCli.success) setClients(resCli.clients || []);
      if (resInq.success) setInquiries(resInq.inquiries || []);
      if (resExp.success) setExpenses(resExp.expenses || []);
      if (resFin.success) {
        setFinancials({
          totalRevenue: resFin.totalRevenue || 0,
          totalExpenses: resFin.totalExpenses || 0,
          netProfit: resFin.netProfit || 0,
          totalOrdersCount: resFin.totalOrdersCount || 0,
          averageOrderValue: resFin.averageOrderValue || 0
        });
      }
    } catch (err) {
      console.error('Failed to load atelier data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchAllData();
    } else if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        router.push('/');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOwner, router]);

  // Temporary toast feedback
  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 4000);
  };

  // Add Product handler
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) {
      alert('Please provide artwork title and price');
      return;
    }

    const catKey = newProductCategory === 'custom' ? (customCategoryText || 'custom') : newProductCategory;
    const catLabel = catKey === 'texture' ? 'Texture Art' : catKey === 'thread' ? 'Thread Art' : catKey === 'canvas' ? 'Canvas Art' : customCategoryText || 'Atelier Collection';

    try {
      const res = await fetch('/api/owner/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProductName,
          category: catKey,
          categoryLabel: catLabel,
          price: Number(newProductPrice),
          originalPrice: newProductOriginalPrice ? Number(newProductOriginalPrice) : undefined,
          dimensions: newProductDimensions,
          medium: newProductMedium,
          images: [newProductImageUrl || sampleArtworkImages[0].url],
          badge: newProductBadge || 'New Arrival',
          description: newProductDesc || `Original handmade ${catLabel.toLowerCase()} piece created with archival materials in the TINTOZA atelier.`
        })
      });

      const data = await res.json();
      if (data.success) {
        showNotification(`Artwork "${newProductName}" added to TINTOZA catalog!`);
        setIsAddProductOpen(false);
        setNewProductName('');
        setNewProductPrice('');
        setNewProductOriginalPrice('');
        setNewProductImageUrl('');
        setNewProductDesc('');
        fetchAllData();
      } else {
        alert(data.error || 'Failed to add artwork');
      }
    } catch (err) {
      alert('Error creating product');
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the store catalog?`)) return;
    try {
      const res = await fetch(`/api/owner/products?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showNotification(`Artwork "${name}" removed`);
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  // Update order status handler
  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const res = await fetch('/api/owner/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Order ${orderId} status updated to ${status}`);
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
      }
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  // Update inquiry status handler
  const handleUpdateInquiryStatus = async (inquiryId: string, status: CustomOrderInquiry['status']) => {
    try {
      const res = await fetch('/api/custom-orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inquiryId, status })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Inquiry updated to ${status}`);
        setInquiries(prev => prev.map(i => i.id === inquiryId ? { ...i, status } : i));
      }
    } catch (err) {
      alert('Failed to update inquiry status');
    }
  };

  // Add Expense handler
  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseTitle || !expenseAmount) {
      alert('Please provide expense title and amount');
      return;
    }

    try {
      const res = await fetch('/api/owner/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: expenseTitle,
          category: expenseCategory,
          amount: Number(expenseAmount),
          date: expenseDate,
          notes: expenseNotes
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Studio expense of ${formatINR(Number(expenseAmount))} recorded`);
        setIsAddExpenseOpen(false);
        setExpenseTitle('');
        setExpenseAmount('');
        setExpenseNotes('');
        fetchAllData();
      } else {
        alert(data.error || 'Failed to record expense');
      }
    } catch (err) {
      alert('Error recording expense');
    }
  };

  // Delete Expense handler
  const handleDeleteExpense = async (id: string) => {
    if (!confirm('Remove this expense entry?')) return;
    try {
      const res = await fetch(`/api/owner/expenses?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showNotification('Expense entry removed');
        setExpenses(prev => prev.filter(e => e.id !== id));
        fetchAllData();
      }
    } catch (err) {
      alert('Failed to delete expense');
    }
  };

  // Filtered products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.categoryLabel.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  // ==========================================
  // VIEW: RESTRICTED ACCESS (WHEN NOT OWNER)
  // ==========================================
  if (!user || !isOwner) {
    return (
      <div className="min-h-screen bg-tintoza-ivory flex items-center justify-center p-6 relative overflow-hidden text-center">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-tintoza-beige/60 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-tintoza-taupe/20 blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-xl border border-tintoza-gold/30 relative z-10 space-y-5">
          <img
            src="/images/logo/logo.png"
            alt="TINTOZA Atelier"
            className="h-14 w-auto object-contain mx-auto"
          />
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-tintoza-taupe font-medium">TINTOZA Atelier</span>
            <h1 className="font-serif text-2xl font-medium text-tintoza-brown mt-1">Restricted Atelier Access</h1>
          </div>
          <p className="text-xs text-tintoza-brown/70 font-sans leading-relaxed">
            The TINTOZA Atelier Portal is restricted to authorized studio management. Please sign in with an authorized director number on the storefront.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-tintoza-brown text-tintoza-ivory text-xs font-medium hover:bg-tintoza-brown/90 transition-all shadow-md"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to TINTOZA Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: FULL OWNER ATELIER DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-tintoza-ivory text-tintoza-brown flex flex-col md:flex-row antialiased">
      {/* Toast Notification */}
      {actionMessage && (
        <div className="fixed top-5 right-5 z-50 bg-tintoza-brown text-tintoza-ivory px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-tintoza-gold/40 animate-fade-in text-sm">
          <Sparkles className="w-4 h-4 text-tintoza-gold" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* ======================================= */}
      {/* SIDEBAR NAVIGATION                       */}
      {/* ======================================= */}
      <aside className="w-full md:w-80 bg-[#F2EAE0] border-r border-[#DEC49E]/60 flex flex-col shrink-0">
        {/* Brand header */}
        <div className="p-6 border-b border-[#DEC49E]/50">
          <Link href="/" className="flex flex-col gap-2 group">
            <img
              src="/images/logo/logo.png"
              alt="TINTOZA"
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
            />
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#8C6F54] font-sans font-bold block">
              Atelier Director Desk
            </span>
          </Link>
        </div>

        {/* Navigation Sections */}
        <nav className="p-5 space-y-7 flex-1 overflow-y-auto font-sans">
          {/* SECTION: BUSINESS */}
          <div>
            <div className="px-4 mb-3 text-xs uppercase tracking-[0.22em] text-[#8C6F54] font-bold">
              Business
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[15px] transition-all cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#4B2E1E] text-[#F8F1E6] font-bold shadow-lg ring-1 ring-[#D4AF7A]/40'
                    : 'text-[#4B2E1E]/85 font-medium hover:bg-white/80 hover:text-[#4B2E1E]'
                }`}
              >
                <Package className={`w-5 h-5 flex-shrink-0 ${activeTab === 'products' ? 'text-[#D4AF7A]' : 'text-[#8C6F54]'}`} />
                <span>Artworks & Catalog</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[15px] transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-[#4B2E1E] text-[#F8F1E6] font-bold shadow-lg ring-1 ring-[#D4AF7A]/40'
                    : 'text-[#4B2E1E]/85 font-medium hover:bg-white/80 hover:text-[#4B2E1E]'
                }`}
              >
                <ShoppingBag className={`w-5 h-5 flex-shrink-0 ${activeTab === 'orders' ? 'text-[#D4AF7A]' : 'text-[#8C6F54]'}`} />
                <span>Orders</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('clients')}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[15px] transition-all cursor-pointer ${
                  activeTab === 'clients'
                    ? 'bg-[#4B2E1E] text-[#F8F1E6] font-bold shadow-lg ring-1 ring-[#D4AF7A]/40'
                    : 'text-[#4B2E1E]/85 font-medium hover:bg-white/80 hover:text-[#4B2E1E]'
                }`}
              >
                <Users className={`w-5 h-5 flex-shrink-0 ${activeTab === 'clients' ? 'text-[#D4AF7A]' : 'text-[#8C6F54]'}`} />
                <span>Client List</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[15px] transition-all cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-[#4B2E1E] text-[#F8F1E6] font-bold shadow-lg ring-1 ring-[#D4AF7A]/40'
                    : 'text-[#4B2E1E]/85 font-medium hover:bg-white/80 hover:text-[#4B2E1E]'
                }`}
              >
                <Sparkles className={`w-5 h-5 flex-shrink-0 ${activeTab === 'inquiries' ? 'text-[#D4AF7A]' : 'text-[#8C6F54]'}`} />
                <span>Custom Enquiries</span>
              </button>
            </div>
          </div>

          {/* SECTION: ACCOUNT & FINANCE */}
          <div>
            <div className="px-4 mb-3 text-xs uppercase tracking-[0.22em] text-[#8C6F54] font-bold">
              Account &amp; Finance
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveTab('expenses')}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[15px] transition-all cursor-pointer ${
                  activeTab === 'expenses'
                    ? 'bg-[#4B2E1E] text-[#F8F1E6] font-bold shadow-lg ring-1 ring-[#D4AF7A]/40'
                    : 'text-[#4B2E1E]/85 font-medium hover:bg-white/80 hover:text-[#4B2E1E]'
                }`}
              >
                <Receipt className={`w-5 h-5 flex-shrink-0 ${activeTab === 'expenses' ? 'text-[#D4AF7A]' : 'text-[#8C6F54]'}`} />
                <span>Studio Expenses</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('revenue')}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[15px] transition-all cursor-pointer ${
                  activeTab === 'revenue'
                    ? 'bg-[#4B2E1E] text-[#F8F1E6] font-bold shadow-lg ring-1 ring-[#D4AF7A]/40'
                    : 'text-[#4B2E1E]/85 font-medium hover:bg-white/80 hover:text-[#4B2E1E]'
                }`}
              >
                <TrendingUp className={`w-5 h-5 flex-shrink-0 ${activeTab === 'revenue' ? 'text-[#D4AF7A]' : 'text-[#8C6F54]'}`} />
                <span>Revenue &amp; Net Profit</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-[#DEC49E]/50 space-y-2.5">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white hover:bg-white/90 text-[#4B2E1E] text-sm font-semibold border border-[#DEC49E] transition-all shadow-sm"
          >
            <span>Visit Live TINTOZA Store</span>
            <ArrowUpRight className="w-4 h-4 text-[#C9A67A]" />
          </Link>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#8C6F54] hover:text-red-700 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out from Atelier</span>
          </button>
        </div>
      </aside>

      {/* ======================================= */}
      {/* MAIN CONTENT AREA                       */}
      {/* ======================================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-tintoza-gold/20 bg-white/60 backdrop-blur-sm px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-lg font-medium text-tintoza-brown capitalize">
              {activeTab === 'products' && 'Artworks & Catalog Management'}
              {activeTab === 'orders' && 'Client Orders & Fulfillment'}
              {activeTab === 'clients' && 'Collector & Client Directory'}
              {activeTab === 'inquiries' && 'Bespoke Art Enquiries'}
              {activeTab === 'expenses' && 'Studio Operating Expenses'}
              {activeTab === 'revenue' && 'Revenue, Expenses & Net Profit Ledger'}
            </h2>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Live Atelier Database
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchAllData}
              className="p-2 rounded-xl border border-tintoza-gold/30 hover:bg-white text-tintoza-brown/70 hover:text-tintoza-brown transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            {activeTab === 'products' && (
              <button
                type="button"
                onClick={() => setIsAddProductOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tintoza-brown text-tintoza-ivory text-xs font-medium hover:bg-tintoza-brown/90 shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-tintoza-gold" />
                <span>+ Add Artwork</span>
              </button>
            )}
            {activeTab === 'expenses' && (
              <button
                type="button"
                onClick={() => setIsAddExpenseOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tintoza-brown text-tintoza-ivory text-xs font-medium hover:bg-tintoza-brown/90 shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-tintoza-gold" />
                <span>+ Record Expense</span>
              </button>
            )}
          </div>
        </header>

        {/* Tab View Content */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* ========================================================== */}
          {/* TAB 1: ARTWORKS & CATALOG                                  */}
          {/* ========================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Catalog Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">Total Artworks</div>
                  <div className="font-serif text-2xl font-semibold text-tintoza-brown mt-1">{products.length}</div>
                  <div className="text-[11px] text-tintoza-brown/60 mt-1">Active in store</div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">Texture Art</div>
                  <div className="font-serif text-2xl font-semibold text-tintoza-brown mt-1">
                    {products.filter(p => p.category === 'texture').length}
                  </div>
                  <div className="text-[11px] text-tintoza-brown/60 mt-1">3D Stucco & Plaster</div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">Thread Art</div>
                  <div className="font-serif text-2xl font-semibold text-tintoza-brown mt-1">
                    {products.filter(p => p.category === 'thread').length}
                  </div>
                  <div className="text-[11px] text-tintoza-brown/60 mt-1">Handwoven embroidery</div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">Canvas Art</div>
                  <div className="font-serif text-2xl font-semibold text-tintoza-brown mt-1">
                    {products.filter(p => p.category === 'canvas').length}
                  </div>
                  <div className="text-[11px] text-tintoza-brown/60 mt-1">Archival pigments</div>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border border-tintoza-gold/25 shadow-sm">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-tintoza-brown/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search artwork by title, medium, or dimensions..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-tintoza-ivory/50 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown"
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto">
                  {['all', 'texture', 'thread', 'canvas'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                        categoryFilter === cat
                          ? 'bg-tintoza-brown text-tintoza-ivory'
                          : 'bg-tintoza-beige/40 text-tintoza-brown hover:bg-tintoza-beige'
                      }`}
                    >
                      {cat === 'all' ? 'All Collections' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Artworks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl overflow-hidden border border-tintoza-gold/25 shadow-sm hover:shadow-md transition-all flex flex-col group"
                  >
                    <div className="relative h-60 bg-tintoza-beige overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/90 backdrop-blur-sm text-tintoza-brown border border-tintoza-gold/30">
                          {product.categoryLabel}
                        </span>
                        {product.badge && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-tintoza-brown text-tintoza-ivory">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          className="w-8 h-8 rounded-full bg-white/90 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                          title="Delete Artwork"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg font-medium text-tintoza-brown group-hover:text-tintoza-gold transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-tintoza-taupe mt-1 font-sans">{product.medium}</p>
                        <p className="text-[11px] text-tintoza-brown/60 mt-0.5">{product.dimensions}</p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-tintoza-beige flex items-center justify-between">
                        <div>
                          <div className="font-serif text-base font-semibold text-tintoza-brown">
                            {formatINR(product.price)}
                          </div>
                          {product.originalPrice && (
                            <div className="text-[11px] text-tintoza-brown/40 line-through">
                              {formatINR(product.originalPrice)}
                            </div>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> In Stock
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 2: ORDERS                                              */}
          {/* ========================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Order Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">All Orders</div>
                  <div className="font-serif text-2xl font-semibold text-tintoza-brown mt-1">{orders.length}</div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">In Crafting</div>
                  <div className="font-serif text-2xl font-semibold text-amber-700 mt-1">
                    {orders.filter(o => o.status === 'Crafting').length}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">Shipped</div>
                  <div className="font-serif text-2xl font-semibold text-blue-700 mt-1">
                    {orders.filter(o => o.status === 'Shipped').length}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">Delivered</div>
                  <div className="font-serif text-2xl font-semibold text-emerald-700 mt-1">
                    {orders.filter(o => o.status === 'Delivered').length}
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-3xl border border-tintoza-gold/30 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-tintoza-brown">
                    <thead className="bg-[#FAF6F0] text-[11px] uppercase tracking-wider text-tintoza-taupe border-b border-tintoza-gold/20">
                      <tr>
                        <th className="p-4 pl-6">Order ID & Date</th>
                        <th className="p-4">Collector Details</th>
                        <th className="p-4">Artworks Ordered</th>
                        <th className="p-4">Total Amount</th>
                        <th className="p-4">Status & Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-tintoza-beige/60">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-tintoza-ivory/40 transition-colors">
                          <td className="p-4 pl-6 align-top">
                            <span className="font-mono font-medium text-tintoza-brown block">
                              {order.orderNumber}
                            </span>
                            <span className="text-[11px] text-tintoza-brown/60">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </td>
                          <td className="p-4 align-top">
                            <div className="font-medium text-tintoza-brown">{order.customerName}</div>
                            <div className="text-[11px] text-tintoza-brown/70">{order.customerEmail}</div>
                            <div className="text-[11px] text-tintoza-taupe">{order.shippingAddress.city}, {order.shippingAddress.state}</div>
                          </td>
                          <td className="p-4 align-top">
                            <div className="space-y-1.5">
                              {order.items.map((it, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <img
                                    src={it.image}
                                    alt={it.productName}
                                    className="w-7 h-7 rounded-md object-cover border border-tintoza-gold/30"
                                  />
                                  <div>
                                    <span className="font-medium block">{it.productName}</span>
                                    <span className="text-[10px] text-tintoza-brown/60">Qty: {it.quantity} • {formatINR(it.price)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 align-top">
                            <div className="font-serif text-sm font-semibold text-tintoza-brown">
                              {formatINR(order.total)}
                            </div>
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Paid Online
                            </span>
                          </td>
                          <td className="p-4 align-top">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium border focus:outline-none cursor-pointer ${
                                order.status === 'Delivered'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : order.status === 'Shipped'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : order.status === 'Crafting'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : 'bg-stone-50 text-stone-800 border-stone-300'
                              }`}
                            >
                              <option value="Pending">Pending Review</option>
                              <option value="Crafting">In Atelier Crafting</option>
                              <option value="Shipped">Dispatched & Shipped</option>
                              <option value="Delivered">Delivered to Patron</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 3: CLIENT LIST                                         */}
          {/* ========================================================== */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              {/* Header metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">Registered Patrons</div>
                  <div className="font-serif text-2xl font-semibold text-tintoza-brown mt-1">{clients.length}</div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">VIP Collectors</div>
                  <div className="font-serif text-2xl font-semibold text-tintoza-brown mt-1">
                    {clients.filter(c => c.status === 'VIP Collector').length}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">Average Patron Spend</div>
                  <div className="font-serif text-2xl font-semibold text-tintoza-brown mt-1">
                    {formatINR(clients.reduce((s, c) => s + c.lifetimeSpend, 0) / (clients.length || 1))}
                  </div>
                </div>
              </div>

              {/* Client Directory Table */}
              <div className="bg-white rounded-3xl border border-tintoza-gold/30 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-tintoza-brown">
                    <thead className="bg-[#FAF6F0] text-[11px] uppercase tracking-wider text-tintoza-taupe border-b border-tintoza-gold/20">
                      <tr>
                        <th className="p-4 pl-6">Client Name & Tier</th>
                        <th className="p-4">Phone Number</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">City</th>
                        <th className="p-4">Orders Placed</th>
                        <th className="p-4">Lifetime Spend</th>
                        <th className="p-4 pr-6">Last Active</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-tintoza-beige/60">
                      {clients.map(client => (
                        <tr key={client.id} className="hover:bg-tintoza-ivory/40 transition-colors">
                          <td className="p-4 pl-6">
                            <div className="font-medium text-tintoza-brown text-sm">{client.name}</div>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mt-1 ${
                              client.status === 'VIP Collector'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-tintoza-beige/60 text-tintoza-brown'
                            }`}>
                              {client.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <a href={`tel:${client.phone}`} className="flex items-center gap-1.5 hover:text-tintoza-gold">
                              <Phone className="w-3.5 h-3.5 text-tintoza-taupe" />
                              <span>+91 {client.phone}</span>
                            </a>
                          </td>
                          <td className="p-4">
                            <a href={`mailto:${client.email}`} className="flex items-center gap-1.5 hover:text-tintoza-gold">
                              <Mail className="w-3.5 h-3.5 text-tintoza-taupe" />
                              <span>{client.email}</span>
                            </a>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 text-tintoza-brown/80">
                              <MapPin className="w-3.5 h-3.5 text-tintoza-taupe" />
                              <span>{client.city}</span>
                            </div>
                          </td>
                          <td className="p-4 font-mono font-medium">{client.totalOrders} order(s)</td>
                          <td className="p-4 font-serif text-sm font-semibold text-tintoza-brown">
                            {formatINR(client.lifetimeSpend)}
                          </td>
                          <td className="p-4 pr-6 text-tintoza-brown/60 text-[11px]">{client.lastOrderDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 4: CUSTOM ENQUIRIES                                    */}
          {/* ========================================================== */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-tintoza-gold/30 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-tintoza-brown">Bespoke Commissions</h3>
                    <p className="text-xs text-tintoza-brown/70 font-sans">
                      Client requests received through the website bespoke enquiry portal.
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-tintoza-beige text-tintoza-brown font-medium">
                    {inquiries.length} Enquiries
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inquiries.map(inq => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-tintoza-ivory/50 border border-tintoza-gold/25 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-tintoza-brown text-sm">{inq.name}</div>
                          <div className="text-xs text-tintoza-brown/60">{inq.email} • {inq.phone}</div>
                        </div>
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as CustomOrderInquiry['status'])}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium border border-tintoza-gold/40 bg-white"
                        >
                          <option value="New">New</option>
                          <option value="In Review">In Review</option>
                          <option value="Quoted">Quoted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-tintoza-beige">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-tintoza-taupe block">Medium</span>
                          <span className="font-medium capitalize">{inq.artType} Art</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-tintoza-taupe block">Dimensions</span>
                          <span className="font-medium">{inq.dimensions}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-tintoza-taupe block">Room Space</span>
                          <span className="font-medium">{inq.roomType}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-tintoza-taupe block">Budget</span>
                          <span className="font-medium">{inq.budgetRange}</span>
                        </div>
                      </div>

                      {inq.notes && (
                        <div className="p-3 rounded-xl bg-white/70 text-xs text-tintoza-brown/80 border border-tintoza-beige">
                          <strong className="text-tintoza-brown">Notes: </strong>{inq.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 5: STUDIO EXPENSES                                     */}
          {/* ========================================================== */}
          {activeTab === 'expenses' && (
            <div className="space-y-6">
              {/* Expense KPI cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">Total Studio Expenses</div>
                  <div className="font-serif text-2xl font-semibold text-tintoza-brown mt-1">
                    {formatINR(expenses.reduce((sum, e) => sum + e.amount, 0))}
                  </div>
                  <div className="text-[11px] text-tintoza-brown/60 mt-1">{expenses.length} recorded entries</div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">Raw Materials & Plaster</div>
                  <div className="font-serif text-2xl font-semibold text-tintoza-brown mt-1">
                    {formatINR(expenses.filter(e => e.category === 'Raw Materials').reduce((s, e) => s + e.amount, 0))}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">Framing & Stretcher Bars</div>
                  <div className="font-serif text-2xl font-semibold text-tintoza-brown mt-1">
                    {formatINR(expenses.filter(e => e.category === 'Framing' || e.category === 'Wood & Stretcher Bars').reduce((s, e) => s + e.amount, 0))}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-tintoza-gold/30 shadow-sm">
                  <div className="text-xs text-tintoza-taupe uppercase tracking-wider font-medium">Packaging & Wooden Crates</div>
                  <div className="font-serif text-2xl font-semibold text-tintoza-brown mt-1">
                    {formatINR(expenses.filter(e => e.category === 'Packaging & Wooden Crates').reduce((s, e) => s + e.amount, 0))}
                  </div>
                </div>
              </div>

              {/* Expense Ledger Table */}
              <div className="bg-white rounded-3xl border border-tintoza-gold/30 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-tintoza-gold/20 flex items-center justify-between">
                  <div className="font-serif text-base font-medium text-tintoza-brown">Studio Expense Ledger</div>
                  <button
                    type="button"
                    onClick={() => setIsAddExpenseOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tintoza-brown text-tintoza-ivory text-xs font-medium hover:bg-tintoza-brown/90"
                  >
                    <Plus className="w-3.5 h-3.5 text-tintoza-gold" />
                    <span>Record Expense</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-tintoza-brown">
                    <thead className="bg-[#FAF6F0] text-[11px] uppercase tracking-wider text-tintoza-taupe border-b border-tintoza-gold/20">
                      <tr>
                        <th className="p-4 pl-6">Date</th>
                        <th className="p-4">Expense Description</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Vendor / Notes</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4 pr-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-tintoza-beige/60">
                      {expenses.map(exp => (
                        <tr key={exp.id} className="hover:bg-tintoza-ivory/40 transition-colors">
                          <td className="p-4 pl-6 font-mono text-tintoza-brown/70">{exp.date}</td>
                          <td className="p-4 font-medium text-tintoza-brown">{exp.title}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-tintoza-beige/50 text-tintoza-brown border border-tintoza-gold/30">
                              {exp.category}
                            </span>
                          </td>
                          <td className="p-4 text-tintoza-brown/70 text-[11px]">{exp.notes || '—'}</td>
                          <td className="p-4 font-serif text-sm font-semibold text-tintoza-brown">
                            {formatINR(exp.amount)}
                          </td>
                          <td className="p-4 pr-6 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteExpense(exp.id)}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Expense"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 6: REVENUE & FINANCIALS                                */}
          {/* ========================================================== */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              {/* Financial Hero Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-3xl bg-white border border-tintoza-gold/30 shadow-sm relative overflow-hidden">
                  <div className="text-xs uppercase tracking-wider text-tintoza-taupe font-medium">Gross Revenue</div>
                  <div className="font-serif text-2xl sm:text-3xl font-semibold text-tintoza-brown mt-2">
                    {formatINR(financials.totalRevenue)}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> From {financials.totalOrdersCount} client orders
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-tintoza-gold/30 shadow-sm relative overflow-hidden">
                  <div className="text-xs uppercase tracking-wider text-tintoza-taupe font-medium">Studio Expenses</div>
                  <div className="font-serif text-2xl sm:text-3xl font-semibold text-rose-800 mt-2">
                    {formatINR(financials.totalExpenses)}
                  </div>
                  <div className="text-[11px] text-tintoza-brown/60 mt-1">
                    Raw materials, frames & overhead
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#FAF6F0] border-2 border-tintoza-gold/50 shadow-md relative overflow-hidden">
                  <div className="text-xs uppercase tracking-wider text-tintoza-gold font-semibold">Net Studio Profit</div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-tintoza-brown mt-2">
                    {formatINR(financials.netProfit)}
                  </div>
                  <div className="text-[11px] text-tintoza-brown font-medium mt-1">
                    Profit Margin: {financials.totalRevenue > 0 ? ((financials.netProfit / financials.totalRevenue) * 100).toFixed(1) : 0}%
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-tintoza-gold/30 shadow-sm relative overflow-hidden">
                  <div className="text-xs uppercase tracking-wider text-tintoza-taupe font-medium">Average Order Value</div>
                  <div className="font-serif text-2xl sm:text-3xl font-semibold text-tintoza-brown mt-2">
                    {formatINR(financials.averageOrderValue)}
                  </div>
                  <div className="text-[11px] text-tintoza-brown/60 mt-1">Per collector order</div>
                </div>
              </div>

              {/* Revenue Breakdown & Ledger */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visual Category Contribution */}
                <div className="bg-white p-6 rounded-3xl border border-tintoza-gold/30 shadow-sm space-y-5">
                  <h3 className="font-serif text-base font-medium text-tintoza-brown">
                    Revenue Breakdown by Collection
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span>Texture Art Collection (3D Plaster)</span>
                        <span className="font-serif text-tintoza-brown">65% • {formatINR(financials.totalRevenue * 0.65)}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-tintoza-beige/40 overflow-hidden">
                        <div className="h-full bg-tintoza-brown rounded-full" style={{ width: '65%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span>Thread Art Collection (Handwoven)</span>
                        <span className="font-serif text-tintoza-brown">20% • {formatINR(financials.totalRevenue * 0.20)}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-tintoza-beige/40 overflow-hidden">
                        <div className="h-full bg-tintoza-taupe rounded-full" style={{ width: '20%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span>Canvas Art & Modern Murals</span>
                        <span className="font-serif text-tintoza-brown">15% • {formatINR(financials.totalRevenue * 0.15)}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-tintoza-beige/40 overflow-hidden">
                        <div className="h-full bg-tintoza-gold rounded-full" style={{ width: '15%' }} />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-tintoza-ivory border border-tintoza-gold/20 text-xs text-tintoza-brown/80 space-y-1">
                    <div className="font-medium text-tintoza-brown">Studio Financial Health</div>
                    <p>All client transactions are authenticated and settled in Indian Rupees (₹). Profit margin remains strong at {financials.totalRevenue > 0 ? ((financials.netProfit / financials.totalRevenue) * 100).toFixed(1) : 0}% after material overhead.</p>
                  </div>
                </div>

                {/* Recent High Value Transactions */}
                <div className="bg-white p-6 rounded-3xl border border-tintoza-gold/30 shadow-sm space-y-4">
                  <h3 className="font-serif text-base font-medium text-tintoza-brown">
                    Recent Collector Sales
                  </h3>
                  <div className="divide-y divide-tintoza-beige/60">
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-xs text-tintoza-brown">{o.customerName}</div>
                          <div className="text-[11px] text-tintoza-brown/60">{o.orderNumber} • {o.shippingAddress.city}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-serif text-sm font-semibold text-tintoza-brown">
                            {formatINR(o.total)}
                          </div>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {o.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================== */}
      {/* MODAL: ADD NEW ARTWORK                                     */}
      {/* ========================================================== */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-tintoza-gold/30 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-tintoza-beige mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-tintoza-taupe font-medium">TINTOZA Catalog</span>
                <h3 className="font-serif text-xl font-medium text-tintoza-brown">Add New Handmade Artwork</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="p-2 rounded-full hover:bg-tintoza-beige text-tintoza-brown transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                    Artwork Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. Sahara Dunes Arch Duo"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                    Collection / Category *
                  </label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown"
                  >
                    <option value="texture">Texture Art (3D Relief)</option>
                    <option value="thread">Thread Art (Handmade String)</option>
                    <option value="canvas">Canvas Art (Modern Paintings)</option>
                    <option value="custom">Other / Custom Category...</option>
                  </select>
                </div>
              </div>

              {newProductCategory === 'custom' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                    Custom Category Name *
                  </label>
                  <input
                    type="text"
                    value={customCategoryText}
                    onChange={(e) => setCustomCategoryText(e.target.value)}
                    placeholder="e.g. Sculptural Wood Assemblage"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                    Price in Indian Rupees (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    placeholder="18500"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                    Original / Strikethrough Price (₹) (Optional)
                  </label>
                  <input
                    type="number"
                    value={newProductOriginalPrice}
                    onChange={(e) => setNewProductOriginalPrice(e.target.value)}
                    placeholder="22000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={newProductDimensions}
                    onChange={(e) => setNewProductDimensions(e.target.value)}
                    placeholder='24" x 36" (60 x 90 cm)'
                    className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                    Medium & Materials
                  </label>
                  <input
                    type="text"
                    value={newProductMedium}
                    onChange={(e) => setNewProductMedium(e.target.value)}
                    placeholder="Sculptural Plaster & Archival Mineral Pigments"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown"
                  />
                </div>
              </div>

              {/* Photo Image Input & Quick Presets */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                  Artwork Photo URL
                </label>
                <input
                  type="url"
                  value={newProductImageUrl}
                  onChange={(e) => setNewProductImageUrl(e.target.value)}
                  placeholder="Paste artwork photo URL or pick from presets below"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown mb-2"
                />

                <div className="text-[11px] text-tintoza-taupe mb-1 font-medium">Quick-pick luxury studio sample images:</div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {sampleArtworkImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewProductImageUrl(img.url)}
                      className={`relative rounded-xl overflow-hidden h-14 border transition-all ${
                        newProductImageUrl === img.url ? 'border-tintoza-brown ring-2 ring-tintoza-gold' : 'border-tintoza-beige'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[8px] py-0.5 truncate px-1 text-center">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                  Curator Description
                </label>
                <textarea
                  rows={2}
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  placeholder="Original handmade piece created with archival materials in the TINTOZA atelier."
                  className="w-full px-3.5 py-2 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-tintoza-beige">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-tintoza-gold/40 text-xs font-medium text-tintoza-brown hover:bg-tintoza-beige transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-tintoza-brown text-tintoza-ivory text-xs font-medium hover:bg-tintoza-brown/90 shadow-sm transition-all"
                >
                  Publish Artwork to Storefront →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: ADD STUDIO EXPENSE                                  */}
      {/* ========================================================== */}
      {isAddExpenseOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-tintoza-gold/30">
            <div className="flex items-center justify-between pb-4 border-b border-tintoza-beige mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-tintoza-taupe font-medium">Studio Ledger</span>
                <h3 className="font-serif text-xl font-medium text-tintoza-brown">Record Studio Expense</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddExpenseOpen(false)}
                className="p-2 rounded-full hover:bg-tintoza-beige text-tintoza-brown transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                  Expense Title *
                </label>
                <input
                  type="text"
                  required
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  placeholder="e.g. Italian Fine Plaster Paste 25kg"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                    Category *
                  </label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value as StudioExpense['category'])}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown"
                  >
                    <option value="Raw Materials">Raw Materials & Plaster</option>
                    <option value="Wood & Stretcher Bars">Wood & Stretcher Bars</option>
                    <option value="Framing">Framing & Float Frames</option>
                    <option value="Packaging & Wooden Crates">Packaging & Wooden Crates</option>
                    <option value="Studio Rent & Utilities">Studio Rent & Utilities</option>
                    <option value="Marketing & Exhibitions">Marketing & Exhibitions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    placeholder="7500"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-tintoza-brown/70 font-medium mb-1.5">
                  Vendor Notes / Bill No.
                </label>
                <input
                  type="text"
                  value={expenseNotes}
                  onChange={(e) => setExpenseNotes(e.target.value)}
                  placeholder="e.g. Sree Balaji Art Supplies, Invoice #SB-449"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-tintoza-ivory/60 border border-tintoza-gold/30 text-xs text-tintoza-brown focus:outline-none focus:border-tintoza-brown"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-tintoza-beige">
                <button
                  type="button"
                  onClick={() => setIsAddExpenseOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-tintoza-gold/40 text-xs font-medium text-tintoza-brown hover:bg-tintoza-beige transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-tintoza-brown text-tintoza-ivory text-xs font-medium hover:bg-tintoza-brown/90 shadow-sm transition-all"
                >
                  Save Expense →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
