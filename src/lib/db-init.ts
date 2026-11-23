import { Pool } from 'pg';
import { ENV } from '../../env/env.prod';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '@/data/products';

let initPromise: Promise<{
  success: boolean;
  tables: string[];
  created: string[];
  alreadyExisted: string[];
  message: string;
}> | null = null;

const REQUIRED_TABLES = [
  'todos',
  'products',
  'orders',
  'custom_orders',
  'reviews',
  'expenses',
  'clients',
  'users'
];

function getCleanConnectionString(url: string): string {
  // Strip special supa parameters or conflicting sslmode if pg parses them strictly
  return url.replace(/[\?&]supa=[^&]+/, '').replace(/[\?&]sslmode=[^&]+/, '');
}

/**
 * Validates whether all required tables exist in the database.
 * If any table does not exist, it creates the table, sets up RLS policies,
 * and seeds initial demo/catalog data.
 */
export async function ensureDatabaseTables() {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const connectionString = getCleanConnectionString(ENV.POSTGRES_URL);

    const pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false
      },
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000
    });

    try {
      // 1. Fetch currently existing tables in public schema
      const existingRes = await pool.query<{ table_name: string }>(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
      );
      const existingTables = new Set(existingRes.rows.map((r) => r.table_name.toLowerCase()));

      const created: string[] = [];
      const alreadyExisted: string[] = [];

      for (const table of REQUIRED_TABLES) {
        if (existingTables.has(table)) {
          alreadyExisted.push(table);
        }
      }

      // 2. Execute table creation script
      await pool.query(`
        -- 1. Todos Table
        CREATE TABLE IF NOT EXISTS public.todos (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          is_complete BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 2. Products Table
        CREATE TABLE IF NOT EXISTS public.products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          category_label TEXT,
          price NUMERIC NOT NULL,
          original_price NUMERIC,
          dimensions TEXT,
          medium TEXT,
          depth TEXT,
          featured BOOLEAN DEFAULT FALSE,
          best_seller BOOLEAN DEFAULT FALSE,
          in_stock BOOLEAN DEFAULT TRUE,
          rating NUMERIC DEFAULT 5.0,
          reviews_count INTEGER DEFAULT 0,
          description TEXT,
          details JSONB DEFAULT '[]'::jsonb,
          images JSONB DEFAULT '[]'::jsonb,
          color_palette JSONB DEFAULT '[]'::jsonb,
          badge TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 3. Orders Table
        CREATE TABLE IF NOT EXISTS public.orders (
          id TEXT PRIMARY KEY,
          order_number TEXT NOT NULL,
          user_id TEXT,
          customer_name TEXT,
          customer_email TEXT,
          customer_phone TEXT,
          shipping_address JSONB,
          items JSONB DEFAULT '[]'::jsonb,
          subtotal NUMERIC DEFAULT 0,
          discount NUMERIC DEFAULT 0,
          shipping NUMERIC DEFAULT 0,
          total NUMERIC DEFAULT 0,
          status TEXT DEFAULT 'Crafting',
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 4. Custom Orders Table
        CREATE TABLE IF NOT EXISTS public.custom_orders (
          id TEXT PRIMARY KEY,
          name TEXT,
          email TEXT,
          phone TEXT,
          art_type TEXT,
          dimensions TEXT,
          palette_preferences TEXT,
          room_type TEXT,
          budget_range TEXT,
          notes TEXT,
          reference_url TEXT,
          status TEXT DEFAULT 'New',
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 5. Reviews Table
        CREATE TABLE IF NOT EXISTS public.reviews (
          id TEXT PRIMARY KEY,
          product_id TEXT,
          author TEXT,
          city TEXT,
          rating NUMERIC DEFAULT 5,
          title TEXT,
          comment TEXT,
          date TEXT,
          artwork_purchased TEXT,
          verified_buyer BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 6. Studio Expenses Table
        CREATE TABLE IF NOT EXISTS public.expenses (
          id TEXT PRIMARY KEY,
          title TEXT,
          category TEXT,
          amount NUMERIC DEFAULT 0,
          date TEXT,
          notes TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 7. Clients Table
        CREATE TABLE IF NOT EXISTS public.clients (
          id TEXT PRIMARY KEY,
          name TEXT,
          phone TEXT,
          email TEXT,
          city TEXT,
          total_orders INTEGER DEFAULT 0,
          lifetime_spend NUMERIC DEFAULT 0,
          last_order_date TEXT,
          status TEXT DEFAULT 'Active',
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 8. Users Table
        CREATE TABLE IF NOT EXISTS public.users (
          id TEXT PRIMARY KEY,
          name TEXT,
          email TEXT,
          phone TEXT,
          role TEXT DEFAULT 'customer',
          avatar TEXT,
          addresses JSONB DEFAULT '[]'::jsonb,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- Grant API privileges for Supabase
        GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
        GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
        GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
        GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

        -- Row Level Security policies (enable public read & insert/update for store operation)
        ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Allow all on todos" ON public.todos;
        CREATE POLICY "Allow all on todos" ON public.todos FOR ALL USING (true) WITH CHECK (true);

        ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Allow all on products" ON public.products;
        CREATE POLICY "Allow all on products" ON public.products FOR ALL USING (true) WITH CHECK (true);

        ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Allow all on orders" ON public.orders;
        CREATE POLICY "Allow all on orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

        ALTER TABLE public.custom_orders ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Allow all on custom_orders" ON public.custom_orders;
        CREATE POLICY "Allow all on custom_orders" ON public.custom_orders FOR ALL USING (true) WITH CHECK (true);

        ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Allow all on reviews" ON public.reviews;
        CREATE POLICY "Allow all on reviews" ON public.reviews FOR ALL USING (true) WITH CHECK (true);

        ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Allow all on expenses" ON public.expenses;
        CREATE POLICY "Allow all on expenses" ON public.expenses FOR ALL USING (true) WITH CHECK (true);

        ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Allow all on clients" ON public.clients;
        CREATE POLICY "Allow all on clients" ON public.clients FOR ALL USING (true) WITH CHECK (true);

        ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Allow all on users" ON public.users;
        CREATE POLICY "Allow all on users" ON public.users FOR ALL USING (true) WITH CHECK (true);
      `);

      // 3. Seed initial products if products table is currently empty
      const prodCheck = await pool.query('SELECT count(*) FROM public.products;');
      if (parseInt(prodCheck.rows[0].count, 10) === 0) {
        for (const p of INITIAL_PRODUCTS) {
          await pool.query(
            `INSERT INTO public.products (
              id, name, category, category_label, price, original_price, dimensions, medium, depth,
              featured, best_seller, in_stock, rating, reviews_count, description, details, images, color_palette, badge
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            ON CONFLICT (id) DO NOTHING;`,
            [
              p.id,
              p.name,
              p.category,
              p.categoryLabel,
              p.price,
              p.originalPrice || null,
              p.dimensions,
              p.medium,
              p.depth,
              p.featured || false,
              p.bestSeller || false,
              p.inStock !== false,
              p.rating || 5.0,
              p.reviewsCount || 0,
              p.description,
              JSON.stringify(p.details || []),
              JSON.stringify(p.images || []),
              JSON.stringify(p.colorPalette || []),
              p.badge || null
            ]
          );
        }
      }

      // 4. Seed sample todos if empty
      const todoCheck = await pool.query('SELECT count(*) FROM public.todos;');
      if (parseInt(todoCheck.rows[0].count, 10) === 0) {
        await pool.query(
          `INSERT INTO public.todos (title, is_complete) VALUES ($1, $2);`,
          ['Tintoza Atelier connected to Supabase & Vercel successfully', true]
        );
      }

      // 5. Final check of all tables
      const finalRes = await pool.query<{ table_name: string }>(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"
      );
      const allTables = finalRes.rows.map((r) => r.table_name);

      for (const t of REQUIRED_TABLES) {
        if (!existingTables.has(t) && allTables.includes(t)) {
          created.push(t);
        }
      }

      await pool.end();

      return {
        success: true,
        tables: allTables,
        created,
        alreadyExisted,
        message: `Validated ${allTables.length} tables in Supabase (created: ${created.length}, existing: ${alreadyExisted.length}).`
      };
    } catch (error: any) {
      console.error('Database initialization / table validation error:', error);
      try {
        await pool.end();
      } catch {}
      // Reset promise so subsequent requests can retry
      initPromise = null;
      return {
        success: false,
        tables: [],
        created: [],
        alreadyExisted: [],
        message: `Database error: ${error?.message || String(error)}`
      };
    }
  })();

  return initPromise;
}
