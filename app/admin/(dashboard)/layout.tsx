import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  // Server-side auth guard: re-checked here (not just in middleware) so no
  // admin page can render without a valid session, even if a request ever
  // reaches this layout by a path the middleware matcher doesn't cover.
  const token = cookies().get(ADMIN_COOKIE)?.value;
  const session = token ? await verifyAdminSessionToken(token) : null;

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-paperdim">
      <AdminSidebar />
      <main className="flex-1 px-6 md:px-10 py-10 max-w-6xl">{children}</main>
    </div>
  );
}