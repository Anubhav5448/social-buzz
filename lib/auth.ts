import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "tsb_admin_session";
const SESSION_DURATION = 60 * 60 * 8; // 8 hours

function getSecretKey() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_JWT_SECRET is not set. Add it to your .env.local (dev) or your host's environment variables (production)."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminSessionToken(username: string) {
  return await new SignJWT({ role: "admin", username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecretKey());
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

export const ADMIN_COOKIE_MAX_AGE = SESSION_DURATION;
