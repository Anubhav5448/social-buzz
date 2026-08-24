import { Pool } from "pg";

// Reuse a single pool across hot-reloads in dev, and across warm
// serverless invocations where the runtime supports it.
declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your .env.local (dev) or your host's environment variables (production)."
    );
  }
  return new Pool({
    connectionString,
    // Most managed Postgres hosts (Render, Railway, Supabase, Neon, RDS)
    // require SSL and use certs that aren't in Node's default trust store.
    ssl: connectionString.includes("sslmode=disable")
      ? false
      : { rejectUnauthorized: false },
  });
}

function getPool(): Pool {
  if (!global.__pgPool) {
    global.__pgPool = createPool();
  }
  return global.__pgPool;
}

// Exported as a Proxy so the real Pool (and its DATABASE_URL check) is only
// created the first time a query actually runs — not at module import
// time. This lets `next build` collect route data without a database
// connection configured, which matters on hosts that build before secrets
// are injected.
export const pool: Pool = new Proxy({} as Pool, {
  get(_target, prop, receiver) {
    const real = getPool();
    const value = Reflect.get(real, prop, real);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

