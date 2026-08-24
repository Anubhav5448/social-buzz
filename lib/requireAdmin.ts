import { NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/auth";

/** Returns true if the request carries a valid admin session cookie. */
export async function isAdminRequest(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const payload = await verifyAdminSessionToken(token);
  return !!payload;
}
