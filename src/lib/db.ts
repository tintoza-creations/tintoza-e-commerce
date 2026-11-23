import fs from 'fs';
import path from 'path';
import { Product, Order, CustomOrderInquiry, Review, User, StudioExpense, ClientRecord } from '@/types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '@/data/products';

interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  inquiries: CustomOrderInquiry[];
  reviews: Review[];
  expenses: StudioExpense[];
  clients: ClientRecord[];
  users: User[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

const INITIAL_EXPENSES: StudioExpense[] = [
  {
    id: 'exp-101',
    title: 'French Limestone Plaster & Archival Silica Sand',
    category: 'Raw Materials',
    amount: 4800,
    date: '2026-11-18',
    notes: 'Premium architectural plaster formula imported for 3D reliefs'
  },
  {
    id: 'exp-102',
    title: 'Solid Kiln-Dried Pine Stretcher Bars (Lot of 30)',
    category: 'Wood & Stretcher Bars',
    amount: 9500,
    date: '2026-11-15',
    notes: '1.5" and 2" gallery profile stretcher frames'
  },
  {
    id: 'exp-103',
    title: 'Heavyweight Belgian Linen Canvas Roll (10 Meters)',
    category: 'Raw Materials',
    amount: 8200,
    date: '2026-11-12',
    notes: 'Natural unbleached organic linen for canvas & thread art'
  },
  {
    id: 'exp-104',
    title: 'Champagne Gold Leaf Sheets & Archival Gilding Glue',
    category: 'Raw Materials',
    amount: 5400,
    date: '2026-11-10',
    notes: '24k shimmer foil for solar concentric artworks'
  },
  {
    id: 'exp-105',
    title: 'Custom Insured Wooden Crates & Cushioning Foam',
    category: 'Packaging & Wooden Crates',
    amount: 6500,
    date: '2026-11-05',
    notes: 'Courier safety crates for interstate transport across India'
  },
  {
    id: 'exp-106',
    title: 'Atelier Studio Space Rent & Natural Lighting Fixtures',
    category: 'Studio Rent & Utilities',
    amount: 22000,
    date: '2026-11-01',
    notes: 'Monthly studio space maintenance & gallery lighting'
  }
];

const INITIAL_CLIENTS: ClientRecord[] = [
  {
    id: 'cli-01',
    name: 'Priya Sundaram',
    phone: '9876543210',
    email: 'priya.sundaram@gmail.com',
    city: 'Bengaluru, Karnataka',
    totalOrders: 2,
    lifetimeSpend: 28498,
    lastOrderDate: '2026-11-20',
    status: 'VIP Collector'
  },
  {
    id: 'cli-02',
    name: 'Rohan Mehta',
    phone: '9820011442',
    email: 'rohan.mehta@studioarch.in',
    city: 'Mumbai, Maharashtra',
    totalOrders: 1,
    lifetimeSpend: 24999,
    lastOrderDate: '2026-11-14',
    status: 'Active'
  },
  {
    id: 'cli-03',
    name: 'Ananya Sharma',
    phone: '9811122334',
    email: 'ananya.sharma@delhiart.org',
    city: 'New Delhi',
    totalOrders: 1,
    lifetimeSpend: 10999,
    lastOrderDate: '2026-11-08',
    status: 'Active'
  },
  {
    id: 'cli-04',
    name: 'Vikramaditya Rao',
    phone: '9090909090',
    email: 'vikram.rao@hyderabad.in',
    city: 'Hyderabad, Telangana',
    totalOrders: 0,
    lifetimeSpend: 0,
    lastOrderDate: '2026-11-21',
    status: 'Inquiry'
  }
];

function getDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initialDb: DatabaseSchema = {
        products: INITIAL_PRODUCTS,
        orders: [
          {
            id: 'ord-1001',
            orderNumber: 'TZ-88291',
            userId: 'user-client-01',
            customerName: 'Priya Sundaram',
            customerEmail: 'priya.sundaram@gmail.com',
            customerPhone: '9876543210',
            shippingAddress: {
              fullName: 'Priya Sundaram',
              street: '42, Indiranagar 100ft Road',
              city: 'Bengaluru',
              state: 'Karnataka',
              postalCode: '560038',
              country: 'India'
            },
            items: [
              {
                productId: 'tintoza-tex-01',
                productName: 'Arch of Serenity 3D Painting',
                price: 14999,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop',
                size: '24" x 36"'
              }
            ],
            subtotal: 14999,
            discount: 1500,
            shipping: 0,
            total: 13499,
            status: 'Delivered',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'ord-1002',
            orderNumber: 'TZ-94012',
            userId: 'user-client-02',
            customerName: 'Rohan Mehta',
            customerEmail: 'rohan.mehta@studioarch.in',
            customerPhone: '9820011442',
            shippingAddress: {
              fullName: 'Rohan Mehta',
              street: 'Penthouse 14, Worli Sea Face',
              city: 'Mumbai',
              state: 'Maharashtra',
              postalCode: '400018',
              country: 'India'
            },
            items: [
              {
                productId: 'tintoza-tex-04',
                productName: 'Terra Horizon Diptych (Pair of 2)',
                price: 24999,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=600&auto=format&fit=crop',
                size: 'Two panels 20" x 36"'
              }
            ],
            subtotal: 24999,
            discount: 0,
            shipping: 0,
            total: 24999,
            status: 'Crafting',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          }
        ],
        inquiries: [
          {
            id: 'inq-2001',
            name: 'Vikramaditya Rao',
            email: 'vikram.rao@hyderabad.in',
            phone: '9090909090',
            artType: 'texture',
            dimensions: '48" x 60" Oversized Living Room Focal Point',
            palettePreferences: 'Warm Ivory & Deep Chocolate with Champagne Gold leaf accents',
            roomType: 'Penthouse Main Living Lounge',
            budgetRange: '₹20,000 - ₹35,000',
            notes: 'Looking for continuous flowing arches to match our curved travertine coffee table.',
            status: 'In Review',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          }
        ],
        reviews: INITIAL_REVIEWS,
        expenses: INITIAL_EXPENSES,
        clients: INITIAL_CLIENTS,
        users: []
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.expenses) parsed.expenses = INITIAL_EXPENSES;
    if (!parsed.clients) parsed.clients = INITIAL_CLIENTS;
    if (!parsed.users) parsed.users = [];
    return parsed;
  } catch (error) {
    console.error('Error reading database file:', error);
    return {
      products: INITIAL_PRODUCTS,
      orders: [],
      inquiries: [],
      reviews: INITIAL_REVIEWS,
      expenses: INITIAL_EXPENSES,
      clients: INITIAL_CLIENTS,
      users: []
    };
  }
}

function saveDatabase(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to database:', error);
  }
}

// Data Access API
export const db = {
  // Products
  getProducts: (category?: string, search?: string) => {
    let list = getDatabase().products;
    if (category && category !== 'all') {
      list = list.filter(p => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return list;
  },
  getProductById: (id: string) => {
    return getDatabase().products.find(p => p.id === id) || null;
  },
  addProduct: (productData: Omit<Product, 'id'> & { id?: string }) => {
    const database = getDatabase();
    const newProduct: Product = {
      ...productData,
      id: productData.id || `tintoza-custom-${Date.now()}`,
      rating: productData.rating || 5.0,
      reviewsCount: productData.reviewsCount || 0,
      inStock: productData.inStock !== false
    };
    database.products.unshift(newProduct);
    saveDatabase(database);
    return newProduct;
  },
  updateProduct: (id: string, updates: Partial<Product>) => {
    const database = getDatabase();
    const index = database.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    database.products[index] = { ...database.products[index], ...updates };
    saveDatabase(database);
    return database.products[index];
  },
  deleteProduct: (id: string) => {
    const database = getDatabase();
    database.products = database.products.filter(p => p.id !== id);
    saveDatabase(database);
    return true;
  },

  // Orders
  getOrders: (userId?: string) => {
    const list = getDatabase().orders;
    if (userId) {
      return list.filter(o => o.userId === userId);
    }
    return list;
  },
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const database = getDatabase();
    const orderNumber = `TZ-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString()
    };
    database.orders.unshift(newOrder);

    // Also record / update client record
    const clientPhone = orderData.customerPhone || '';
    const existingClient = database.clients.find(c => c.phone === clientPhone || c.email === orderData.customerEmail);
    if (existingClient) {
      existingClient.totalOrders += 1;
      existingClient.lifetimeSpend += orderData.total;
      existingClient.lastOrderDate = new Date().toISOString().split('T')[0];
    } else {
      database.clients.unshift({
        id: `cli-${Date.now()}`,
        name: orderData.customerName,
        phone: clientPhone,
        email: orderData.customerEmail,
        city: `${orderData.shippingAddress.city}, ${orderData.shippingAddress.state}`,
        totalOrders: 1,
        lifetimeSpend: orderData.total,
        lastOrderDate: new Date().toISOString().split('T')[0],
        status: orderData.total > 20000 ? 'VIP Collector' : 'Active'
      });
    }

    saveDatabase(database);
    return newOrder;
  },
  updateOrderStatus: (orderId: string, status: Order['status']) => {
    const database = getDatabase();
    const order = database.orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;
    order.status = status;
    saveDatabase(database);
    return order;
  },

  // Clients
  getClients: () => {
    return getDatabase().clients;
  },

  // Custom Orders / Inquiries
  getInquiries: () => {
    return getDatabase().inquiries;
  },
  createInquiry: (inquiryData: Omit<CustomOrderInquiry, 'id' | 'createdAt' | 'status'>) => {
    const database = getDatabase();
    const newInquiry: CustomOrderInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    database.inquiries.unshift(newInquiry);
    saveDatabase(database);
    return newInquiry;
  },
  updateInquiryStatus: (id: string, status: CustomOrderInquiry['status']) => {
    const database = getDatabase();
    const inquiry = database.inquiries.find(i => i.id === id);
    if (!inquiry) return null;
    inquiry.status = status;
    saveDatabase(database);
    return inquiry;
  },

  // Expenses
  getExpenses: () => {
    return getDatabase().expenses;
  },
  addExpense: (expenseData: Omit<StudioExpense, 'id'>) => {
    const database = getDatabase();
    const newExpense: StudioExpense = {
      ...expenseData,
      id: `exp-${Date.now()}`
    };
    database.expenses.unshift(newExpense);
    saveDatabase(database);
    return newExpense;
  },
  deleteExpense: (id: string) => {
    const database = getDatabase();
    database.expenses = database.expenses.filter(e => e.id !== id);
    saveDatabase(database);
    return true;
  },

  // Revenue & Financial Metrics
  getFinancialSummary: () => {
    const database = getDatabase();
    const totalRevenue = database.orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
    const totalExpenses = database.expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
    const netProfit = totalRevenue - totalExpenses;
    const totalOrdersCount = database.orders.length;
    const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      totalOrdersCount,
      averageOrderValue,
      orders: database.orders,
      expenses: database.expenses
    };
  },

  // Reviews
  getReviews: (productId?: string) => {
    const list = getDatabase().reviews;
    if (productId) {
      return list.filter(r => r.productId === productId);
    }
    return list;
  },
  addReview: (reviewData: Omit<Review, 'id' | 'date'>) => {
    const database = getDatabase();
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };
    database.reviews.unshift(newReview);
    saveDatabase(database);
    return newReview;
  },

  // Users & Auth
  findUserByEmail: (email: string) => {
    return getDatabase().users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },
  findUserByPhone: (phone: string) => {
    return getDatabase().users.find(u => u.phone === phone) || null;
  },
  createUser: (userData: Partial<User> & { name: string; email?: string; phone?: string }) => {
    const database = getDatabase();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || (userData.phone === '8300602443' ? 'owner' : 'customer'),
      addresses: userData.addresses || []
    };
    database.users.push(newUser);
    saveDatabase(database);
    return newUser;
  }
};
