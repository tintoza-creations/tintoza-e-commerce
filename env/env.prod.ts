/**
 * Application environment configuration
 * Automatically reads from system / Vercel process.env with fallback credentials.
 */
export const ENV = {
  SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    'https://qiaookyraraaorbnblct.supabase.co',
  SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpYW9va3lyYXJhYW9yYm5ibGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0NDY4NTgsImV4cCI6MjExMTAyMjg1OH0.Yul91GYpL_WsBcssgiIYdcGmoUkgU6nIQA0x9Tg8F4E',
  SUPABASE_PUBLISHABLE_KEY:
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    'sb_publishable_oAhbOez5a2kgyQKge-IjTQ_DNeGlXTD',
  SUPABASE_SERVICE_ROLE_KEY:
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpYW9va3lyYXJhYW9yYm5ibGN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5NTQ0Njg1OCwiZXhwIjoyMTExMDIyODU4fQ.M5pdXZ9dcYPaDliRyfrQmnHLNovEGIIfVZWR7ESahN8',
  SUPABASE_JWT_SECRET:
    process.env.SUPABASE_JWT_SECRET ||
    '8eYMV4/Lj+GFAAjj+kPRGs+mjLrFm/T/1cFK1YgCl7ot4O1h7ReP24dZLWRVKWro21/+udwEKhvqdL1X503WdA==',
  SUPABASE_SECRET_KEY:
    process.env.SUPABASE_SECRET_KEY ||
    'sb_secret_tkAqjBcYZQ40i1vAvVrrLw_3dSMHX-W',
  POSTGRES_DATABASE:
    process.env.POSTGRES_DATABASE || 'postgres',
  POSTGRES_HOST:
    process.env.POSTGRES_HOST || 'db.qiaookyraraaorbnblct.supabase.co',
  POSTGRES_PASSWORD:
    process.env.POSTGRES_PASSWORD || 'NxWIRs0Q541jKDbb',
  POSTGRES_USER:
    process.env.POSTGRES_USER || 'postgres',
  POSTGRES_URL:
    process.env.POSTGRES_URL ||
    'postgres://postgres.qiaookyraraaorbnblct:NxWIRs0Q541jKDbb@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x',
  POSTGRES_PRISMA_URL:
    process.env.POSTGRES_PRISMA_URL ||
    'postgres://postgres.qiaookyraraaorbnblct:NxWIRs0Q541jKDbb@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true',
  POSTGRES_URL_NON_POOLING:
    process.env.POSTGRES_URL_NON_POOLING ||
    'postgres://postgres.qiaookyraraaorbnblct:NxWIRs0Q541jKDbb@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require',
} as const;

export default ENV;
