import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminUserByUsername } from "@/lib/adminUsers";
import { createAdminSessionToken, ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE } from "@/lib/auth";
import {
  checkLoginRateLimit,
  recordFailedLoginAttempt,
  clearLoginAttempts,
  getClientIp,
} from "@/lib/loginRateLimit";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    const ip = getClientIp(req);

    const rateLimit = await checkLoginRateLimit(ip, username);
    if (rateLimit.blocked) {
      return NextResponse.json(
        { error: "Too many failed login attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const user = await getAdminUserByUsername(username);
    const valid = user ? await bcrypt.compare(password, user.password_hash) : false;

    if (!user || !valid) {
      await recordFailedLoginAttempt(ip, username);
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    await clearLoginAttempts(ip, username);

    const token = await createAdminSessionToken(user.username);

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_COOKIE_MAX_AGE,
    });
    return response;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}