-- =========================================================
-- Social Buzz — PostgreSQL schema
-- Upload / run this file on your hosting platform's Postgres
-- database (e.g. via psql, or your host's "run SQL" tool).
-- =========================================================

-- ---------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------
-- Admin users
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(64) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed the default admin account.
-- username: admin
-- password: admin123   (bcrypt hash below — change this password after first login)
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', '$2a$10$02WIgIzjRufNmHnXtEV7GO3Pb0AodK3NURtSuX4VAYWo2c4Q/pRYm')
ON CONFLICT (username) DO NOTHING;

-- ---------------------------------------------------------
-- Blog posts
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id             SERIAL PRIMARY KEY,
  title          VARCHAR(255) NOT NULL,
  slug           VARCHAR(255) UNIQUE NOT NULL,
  category       VARCHAR(100) NOT NULL DEFAULT 'Digital Marketing',
  excerpt        TEXT NOT NULL DEFAULT '',
  content        TEXT NOT NULL DEFAULT '',
  media_url      TEXT,                 -- thumbnail image or video URL
  media_type     VARCHAR(10) CHECK (media_type IN ('image', 'video')) DEFAULT 'image',
  published      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);

-- ---------------------------------------------------------
-- Projects (featured work)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id             SERIAL PRIMARY KEY,
  client_name    VARCHAR(255) NOT NULL,
  project_type   VARCHAR(150) NOT NULL DEFAULT '',
  metric         VARCHAR(150) NOT NULL DEFAULT '',
  description    TEXT NOT NULL DEFAULT '',
  media_url      TEXT,                 -- thumbnail image or video URL
  media_type     VARCHAR(10) CHECK (media_type IN ('image', 'video')) DEFAULT 'image',
  featured       BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects (featured, sort_order);

-- ---------------------------------------------------------
-- Admin login rate limiting
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_login_attempts (
  id           SERIAL PRIMARY KEY,
  ip           VARCHAR(64) NOT NULL,
  username     VARCHAR(64) NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_ip_time
  ON admin_login_attempts (ip, attempted_at);
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_username_time
  ON admin_login_attempts (username, attempted_at);

-- ---------------------------------------------------------
-- Keep updated_at current on row changes
-- ---------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER trg_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_projects_updated_at ON projects;
CREATE TRIGGER trg_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------
-- Seed data (matches the demo content already on the site —
-- safe to delete/edit from the admin panel afterwards)
-- ---------------------------------------------------------
INSERT INTO blog_posts (title, slug, category, excerpt, content, media_type, published, created_at)
VALUES
  ('The 12-point SEO checklist we run before every launch', 'seo-checklist-2026', 'SEO',
   'The technical and content checks we run on every new site before it goes live, and why skipping them costs rankings later.',
   'Full article content goes here — edit this from the admin panel.', 'image', TRUE, '2026-08-02'),
  ('How we structure Meta ad creative tests for small budgets', 'meta-ads-creative-testing', 'Performance Marketing',
   'A simple test framework that finds a winning ad angle in under two weeks, even on modest daily spend.',
   'Full article content goes here — edit this from the admin panel.', 'image', TRUE, '2026-07-21'),
  ('Case study: rebuilding a brand identity in three weeks', 'brand-identity-case-study', 'Graphic Design',
   'From mood board to final logo files — the process we used to take a legacy brand into 2026.',
   'Full article content goes here — edit this from the admin panel.', 'image', TRUE, '2026-07-05')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO projects (client_name, project_type, metric, description, media_type, featured, sort_order)
VALUES
  ('Kavya Foods', 'Brand + E-commerce', '+64% online orders', 'Full brand refresh and e-commerce rebuild.', 'image', TRUE, 1),
  ('Norther Apparel', 'Performance Marketing', '3.8x ROAS', 'Google & Meta ad campaigns optimised for ROAS.', 'image', TRUE, 2),
  ('Vantage Fitness', 'Launch Event + Social', '1,200 sign-ups in 3 days', 'Product launch event with paired social campaign.', 'image', TRUE, 3)
ON CONFLICT DO NOTHING;
