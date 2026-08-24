# Social Buzz — Agency Website (Next.js + PostgreSQL)

A 5-page marketing site (Home, Services, Blog, About Us, Contact Us) with a
PostgreSQL-backed admin panel for managing Blog Posts and Projects,
including thumbnail image/video uploads.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- PostgreSQL (via `pg`)
- Auth: bcrypt password hashing + signed JWT session cookie (`jose`),
  login rate limiting (`lib/loginRateLimit.ts`)
- Smooth scrolling on the public site via [Lenis](https://github.com/darkroomengineering/lenis)
  (`components/SmoothScroll.tsx`) — not applied to the admin panel
- Google Fonts via `next/font`: Bricolage Grotesque (display), Inter (body),
  JetBrains Mono (labels/data)

## 1. Set up the database

Create a Postgres database on your host (or locally), then run the schema
file against it:

```bash
psql "postgresql://USER:PASSWORD@HOST:5432/DBNAME" -f sql/schema.sql
```

Most hosting platforms (Render, Railway, Supabase, Neon, DigitalOcean, a
cPanel Postgres add-on, etc.) give you a "run SQL" tool in their dashboard,
or a connection string you can paste into `psql`. Either way, upload
`sql/schema.sql` and run it once.

This creates:
- `admin_users` — seeded with username `admin`, password `admin123`
  (bcrypt-hashed in the file — **change this password after your first
  login**, see below)
- `blog_posts` — title, slug, category, excerpt, content, thumbnail
  image/video, published flag
- `projects` — client name, project type, metric, description, thumbnail
  image/video, featured flag, sort order
- A few sample rows so the site isn't empty on first load

## 2. Configure environment variables

Copy `.env.local.example` to `.env.local` for local development:

```bash
cp .env.local.example .env.local
```

Fill in:
- `DATABASE_URL` — your Postgres connection string
- `ADMIN_JWT_SECRET` — a long random string (`openssl rand -base64 32`)

On your hosting platform, set these same two variables in its environment
variables / secrets settings for production.

## 3. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the site, and
http://localhost:3000/admin/login for the admin panel.

**Default login:** username `admin`, password `admin123`.

## 4. Build for production

```bash
npm run build
npm start
```

## Admin panel

| Page | What it does |
|---|---|
| `/admin/login` | Sign in |
| `/admin` | Dashboard — post/project counts, quick links |
| `/admin/blogs` | List, create, edit, delete blog posts |
| `/admin/projects` | List, create, edit, delete projects (shown in the Home page's "Featured Work" section) |

Each blog post and project has an upload field for a **thumbnail image or
video**. Uploaded files are saved to `public/uploads/` and served directly
by Next.js.

### ⚠️ Important: file uploads need persistent disk

`public/uploads/` writes to the server's local filesystem. This works
correctly on:
- A VPS / droplet (DigitalOcean, Linode, EC2, etc.) running `next start`
- Platforms with a persistent disk/volume (Railway, Render with a disk,
  traditional cPanel Node hosting)

It will **not** work on serverless/edge hosts with an ephemeral filesystem
(e.g. Vercel's default deployment) — uploaded files would disappear after
each deploy or cold start. If you deploy there, swap the upload logic in
`app/api/admin/upload/route.ts` to push files to S3, Cloudflare R2,
Supabase Storage, or Cloudinary instead, and store the returned URL exactly
as it does now.

### Changing the admin password

The seeded password is `admin123` — meant to get you started, not to keep.
To change it, generate a new bcrypt hash and update the row:

```bash
node -e "console.log(require('bcryptjs').hashSync('your-new-password', 10))"
```

```sql
UPDATE admin_users SET password_hash = '<paste the hash above>' WHERE username = 'admin';
```

## Structure

```
app/
  layout.tsx                 Root layout (fonts, global CSS only)
  (site)/                    Public marketing site (route group)
    layout.tsx                Nav, ticker, footer
    page.tsx                  Home — services, why-us, featured projects (from DB)
    services/page.tsx         All 5 services with #anchors
    blog/page.tsx              Blog listing (from DB)
    blog/[slug]/page.tsx       Single blog post (from DB)
    about/page.tsx             About Us
    contact/page.tsx           Contact Us
  admin/
    login/page.tsx             Admin login (public)
    (dashboard)/               Protected admin pages
      layout.tsx                 Server-side auth guard + sidebar shell
      page.tsx                    Dashboard
      blogs/                      List / new / edit blog posts
      projects/                   List / new / edit projects
  api/admin/
    login/route.ts, logout/route.ts
    upload/route.ts             Handles thumbnail image/video uploads
    blogs/route.ts, blogs/[id]/route.ts
    projects/route.ts, projects/[id]/route.ts
components/
  SmoothScroll.tsx             Lenis smooth-scroll provider (public site only)
  admin/                      AdminSidebar, MediaUploader, BlogPostForm,
                              ProjectForm, DeleteButton, LogoutButton
lib/
  db.ts                       Postgres connection pool
  auth.ts                     JWT session sign/verify
  requireAdmin.ts             Auth check for API routes
  loginRateLimit.ts           Brute-force login protection
  blogPosts.ts, projects.ts, adminUsers.ts   Data access layers
  services.ts                 Static service copy (Services page)
  slug.ts                     Slug generation
middleware.ts                 Protects /admin/* and /api/admin/* routes
sql/schema.sql                Database schema + seed data
```

## Things to customize before launch
- Add a real logo mark for Social Buzz (currently a text wordmark).
- Change the admin password from the default (see above).
- Wire `components/ContactForm.tsx` to a real backend (API route,
  Formspree, email service, or CRM webhook) — it currently only confirms
  client-side and doesn't store enquiries in the database.
- The contact page map is pinned near Dehradun by coordinates — check the
  pin against 17 Capitol Tower, Survey Chowk and adjust the bbox in
  `app/(site)/contact/page.tsx` if needed, or swap in a Google Maps embed
  if you have an API key.
- If deploying to a serverless host, move file uploads to cloud storage
  (see the upload warning above).
- Add a favicon and OG image in `app/` (e.g. `app/favicon.ico`,
  `app/opengraph-image.png`).
