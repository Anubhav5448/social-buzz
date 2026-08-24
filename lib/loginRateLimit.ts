import { NextRequest } from "next/server";
import { pool } from "@/lib/db";

// Login brute-force protection: after MAX_ATTEMPTS failed logins from the
// same IP (or against the same username) inside WINDOW_MINUTES, further
// attempts are blocked for LOCKOUT_MINUTES.
const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;
const LOCKOUT_MINUTES = 15;

export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can be a comma-separated list; the client is first.
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

type RateLimitResult = { blocked: boolean; retryAfterSeconds: number };

/** Checks whether this IP or username has too many recent failed attempts. */
export async function checkLoginRateLimit(ip: string, username: string): Promise<RateLimitResult> {
  const { rows } = await pool.query(
    `SELECT
       COUNT(*) FILTER (WHERE ip = $1) AS ip_count,
       COUNT(*) FILTER (WHERE username = $2) AS username_count
     FROM admin_login_attempts
     WHERE attempted_at > NOW() - (INTERVAL '1 minute' * $3)
       AND (ip = $1 OR username = $2)`,
    [ip, username, WINDOW_MINUTES]
  );

  const ipCount = Number(rows[0]?.ip_count ?? 0);
  const usernameCount = Number(rows[0]?.username_count ?? 0);

  if (ipCount >= MAX_ATTEMPTS || usernameCount >= MAX_ATTEMPTS) {
    return { blocked: true, retryAfterSeconds: LOCKOUT_MINUTES * 60 };
  }
  return { blocked: false, retryAfterSeconds: 0 };
}

/** Records a failed login attempt and prunes old rows. */
export async function recordFailedLoginAttempt(ip: string, username: string): Promise<void> {
  await pool.query(`INSERT INTO admin_login_attempts (ip, username) VALUES ($1, $2)`, [ip, username]);
  await pool.query(
    `DELETE FROM admin_login_attempts WHERE attempted_at < NOW() - (INTERVAL '1 minute' * $1)`,
    [WINDOW_MINUTES]
  );
}

/** Clears attempt history after a successful login. */
export async function clearLoginAttempts(ip: string, username: string): Promise<void> {
  await pool.query(`DELETE FROM admin_login_attempts WHERE ip = $1 OR username = $2`, [ip, username]);
}