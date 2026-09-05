# Kacha Creatives — Full-Stack Website & CMS

A production-ready website and content management system for **Kacha Creatives**, a digital marketing firm based in Addis Ababa, Ethiopia.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Neon PostgreSQL (primary) |
| ORM | Prisma |
| File Storage | Supabase Storage |
| Authentication | NextAuth / Auth.js v5 (admin only) |
| Validation | Zod |
| Icons | Lucide React |
| Animations | Framer Motion |

---

## Key Principles

- **Public website = NO login required**
- **Visitors can** browse, view portfolio, submit contact forms, upload documents, and leave feedback — all without an account
- **Only ONE login exists**: `/admin/login` for admins only
- **No client registration, no customer accounts, no public auth**

---

## Project Structure

```
app/
├── page.tsx                    # Public homepage
├── layout.tsx                  # Root layout + fonts
├── globals.css                 # Global styles
├── sitemap.ts                  # SEO sitemap
├── robots.ts                   # Robots.txt
├── api/auth/[...nextauth]/     # NextAuth route handler
└── admin/
    ├── login/                  # Admin login page
    ├── page.tsx                # Admin dashboard
    ├── portfolio/              # Portfolio management
    ├── team/                   # Team management
    ├── services/               # Services management
    ├── testimonials/           # Testimonials management
    ├── comments/               # Comment moderation
    ├── messages/               # Contact messages
    ├── media/                  # Media library
    └── settings/               # Site settings + password

components/
├── navbar/                     # Sticky navbar
├── hero/                       # Hero section
├── about/                      # About section
├── services/                   # Services cards
├── process/                    # Creative process timeline
├── sectors/                    # Industries we serve
├── portfolio/                  # Portfolio grid + lightbox
├── team/                       # Team section
├── why/                        # Why Choose Us
├── testimonials/               # Testimonials carousel
├── comments/                   # Client feedback form
├── contact/                    # Contact form + document upload
├── cta/                        # Final CTA
├── footer/                     # Footer
├── admin/                      # All admin UI components
└── ui/                         # Shared UI (button, badge)

lib/
├── prisma.ts                   # Prisma client singleton
├── auth.ts                     # NextAuth configuration
├── supabase.ts                 # Supabase client + bucket names
├── utils.ts                    # Utility functions
├── rate-limit.ts               # In-memory rate limiter
├── actions/
│   ├── contact.ts              # Public form server actions
│   └── admin.ts                # Admin server actions
└── validations/
    ├── contact.ts              # Contact + comment Zod schemas
    └── admin.ts                # Admin form Zod schemas

prisma/
├── schema.prisma               # Database schema
└── seed.ts                     # Database seed script
```

---

## Installation

```bash
# 1. Clone and install
git clone <your-repo>
cd kacha-creattives
npm install

# 2. Copy environment file
cp .env.local .env.local
# Then fill in the values (see below)

# 3. Generate Prisma client
npm run db:generate

# 4. Push schema to database
npm run db:push

# 5. Seed initial data
npm run db:seed

# 6. Start development server
npm run dev
```

---

## Environment Variables

Fill in `.env.local`:

```env
# Neon PostgreSQL connection string
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# NextAuth secret — generate with: openssl rand -base64 32
AUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Site URL
NEXT_PUBLIC_SITE_URL="https://kachacreatives.com"

# Optional email notifications
EMAIL_SERVER="smtp://user:pass@smtp.example.com:587"
EMAIL_FROM="noreply@kachacreatives.com"
```

---

## Neon PostgreSQL Setup

1. Go to [neon.tech](https://neon.tech) and create a free project
2. Copy the **connection string** → paste into `DATABASE_URL`
3. Run `npm run db:push` to create all tables
4. Run `npm run db:seed` to populate initial data

---

## Supabase Storage Setup

1. Go to [supabase.com](https://supabase.com) and create a project
2. Navigate to **Storage** → create these buckets:

| Bucket Name | Access |
|---|---|
| `kacha-portfolio` | **Public** |
| `kacha-team` | **Public** |
| `kacha-general` | **Public** |
| `kacha-contact-documents` | **Private** |

3. Copy your **Project URL**, **Anon Key**, and **Service Role Key** into `.env.local`

> **Security**: The `kacha-contact-documents` bucket MUST be private. Contact documents are only accessible to admins via signed URLs.

---

## Auth.js Setup

1. Generate a secret: `openssl rand -base64 32`
2. Set `AUTH_SECRET` in `.env.local`
3. Set `NEXTAUTH_URL` to your domain

The seed script creates the default admin:
- **Email**: `admin@kachacreatives.com`
- **Password**: `KachaAdmin2024!`

**Change this password immediately** after first login via `/admin/settings`.

---

## Creating the First Admin

The seed script creates the default admin account. To create a different one manually:

```ts
// In a one-off script or Prisma Studio
import bcrypt from "bcryptjs";
const hash = await bcrypt.hash("YourSecurePassword", 12);
await prisma.user.create({
  data: {
    name: "Admin",
    email: "your@email.com",
    passwordHash: hash,
    role: "ADMIN",
  },
});
```

Or use Prisma Studio: `npm run db:studio`

---

## Database Commands

```bash
npm run db:generate    # Regenerate Prisma client after schema changes
npm run db:push        # Push schema to database (no migration history)
npm run db:migrate     # Create a proper migration (production-safe)
npm run db:seed        # Seed initial data
npm run db:studio      # Open Prisma Studio (visual DB editor)
```

---

## Portfolio Upload Workflow

1. Log in at `/admin/login`
2. Go to **Portfolio** → **New Project**
3. Fill in title, category, description → **Create Project**
4. You are redirected to the edit page — upload images/videos here
5. Click **Publish** → the project immediately appears on the public website
6. No rebuild required — the site uses ISR with 60-second revalidation

**Supported media:**
- Images: JPG, JPEG, PNG, WEBP
- Videos: MP4, WEBM, MOV

---

## Team Management

1. Go to **Admin → Team**
2. Click **Add Member** → fill name and role
3. Save the member first, then upload a photo
4. Toggle visibility to show/hide on public site
5. Adjust order numbers to control display sequence

---

## Services Management

1. Go to **Admin → Services**
2. Edit existing services or add new ones
3. Enter service items one per line
4. Toggle visibility to show/hide on public site

---

## Testimonials Management

1. Go to **Admin → Testimonials**
2. Add, edit, publish, or hide testimonials
3. Published testimonials appear in the carousel

---

## Comment Moderation

1. Go to **Admin → Comments**
2. Review pending comments
3. **Approve** → comment appears publicly
4. **Reject** or **Delete** → comment is removed
5. Only approved comments are visible to public visitors

---

## Contact Message Management

1. Go to **Admin → Messages**
2. Click any message to open full details
3. See: Name, Email, Phone, Subject, Description, Attached Document
4. Download attached documents via signed URL (valid 1 hour)
5. Mark as Read / Replied / Archived / Delete

---

## Private Document Handling

- Contact documents are uploaded to the **private** `kacha-contact-documents` Supabase bucket
- Documents are **never publicly accessible**
- Admins access documents via **signed URLs** generated server-side (1-hour expiry)
- The Supabase service role key is **never exposed to the browser**

---

## Automatic Website Updates

When admin publishes/unpublishes portfolio items, team members, or services:
- `revalidatePath("/")` is called immediately
- The public site updates without any rebuild
- ISR revalidation interval: 60 seconds

---

## Production Deployment (Vercel)

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy Kacha Creatives"
git push origin main

# 2. Import project on Vercel
# vercel.com → New Project → Import from GitHub

# 3. Add all environment variables in Vercel dashboard

# 4. Deploy
```

Set `NEXTAUTH_URL` to your production domain, e.g. `https://kachacreatives.com`

---

## Security Checklist

- [x] Admin-only authentication (no public login)
- [x] Server-side authorization on all admin routes
- [x] Middleware protects all `/admin/*` routes
- [x] Passwords hashed with bcrypt (cost 12)
- [x] Zod validation on all forms (client + server)
- [x] Honeypot spam protection on public forms
- [x] Rate limiting on contact and comment forms
- [x] File type + MIME type + size validation
- [x] Safe filenames with unique generated names
- [x] Supabase service role key never exposed to browser
- [x] Private contact document bucket
- [x] Signed URLs for document access (1h expiry)
- [x] No fake statistics, awards, or social accounts

---

## Contacts

**Kacha Creatives**
- Phone: +2519 2076 6374 / +2519 1645 1065
- Email: biniyamwondem2006@gmail.com
- Location: Addis Ababa, Ethiopia
- Founded: 2023

---

*Built with Next.js · Neon · Supabase · Prisma · NextAuth*
