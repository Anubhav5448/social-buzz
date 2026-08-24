import { pool } from "@/lib/db";

export type AdminUser = {
  id: number;
  username: string;
  password_hash: string;
};

export async function getAdminUserByUsername(username: string): Promise<AdminUser | null> {
  const { rows } = await pool.query(
    `SELECT id, username, password_hash FROM admin_users WHERE username = $1 LIMIT 1`,
    [username]
  );
  return rows[0] ?? null;
}
