# SOCIALTIES — MASTER IMPLEMENTATION PROMPT FOR ANTIGRAVITY (CLAUDE CODE)

> **How to use this document:** Paste this entire prompt into Antigravity / Claude Code as the initial instruction. It contains everything required to design, architect, and build a production-ready influencer marketing agency website for Socialties — no follow-up clarification should be necessary. Build in the milestone order given in Section 16.

---

## 0. CONTEXT SUMMARY (Research Findings — Reuse & Improve, Don't Copy)

The current site (`socialties.in`) is a Wix-built single-purpose brochure site. Useful facts extracted and confirmed to be reused/rewritten:

- **Brand name:** Socialties (wordmark: "Social" in dark + "ties" in lime-green, with a two-dot accent above the "i"s — treat as the seed for the new logo/brand system).
- **Tagline used today:** "Want to grow online? We have it all!" — outdated tone; replace with a stronger, benefit-led headline (see Hero spec).
- **Positioning line (keep the idea, rewrite the copy):** a full-service digital marketing company helping brands go from "just online" to "unforgettable," pairing strategy with storytelling.
- **Six services offered today:** Influencer Marketing, Digital Advertising, Content Creation, Product Photography, Website Development, App Development — **keep all six**, rewrite descriptions, add icons/imagery/CTAs.
- **"What we do" methodology (Services/About page) — reuse as the Influencer Marketing process, rewritten and expanded into a numbered process section:**
  1. Influencer Discovery & Shortlisting
  2. Strategy & Campaign Planning
  3. Outreach & Negotiation
  4. Content Supervision
  5. Execution & Posting
  6. Performance Tracking
- **Campaign types handled:** product launches, brand awareness campaigns, event promotions, gifting campaigns, performance-driven influencer ads, long-term brand ambassador programs — use these as campaign category tags/filters on the Campaigns page.
- **"Why work with us" pillars (six value props on current homepage) — reuse concepts, rewrite as the "Why Socialties" section:** client-first approach, results that matter, seamless communication, transparent partnership, customised strategies, long-term relationships.
- **Trust logos:** Amazon, Paytm, Sugar, Myntra, Secret Temptation, OnePlus (extend with more placeholder slots for future brand logos).
- **Footer/legal entity info:** Firm name "Pushpa Exim," address in Azadpur, New Delhi — retain in footer/legal pages only (not marketing copy), plus Privacy Policy and Terms of Service as real pages, not stubs.
- **Existing weaknesses to fix (do NOT replicate):** dated dark flat-gray theme with no gradients/depth; generic stock photography with no captions or context; a plain unstyled Wix contact form; no dynamic content, no campaigns showcase, no team page, no creator/brand intake flow, no admin, poor mobile spacing, weak SEO (thin meta descriptions, no structured data), no visible social proof beyond logos (no testimonials, no numbers), inconsistent heading hierarchy, and a "More" nav item hiding key links.

Competitive research (Grynow, WhizCo, Chtrbox, Winkl, The Good Creator Co., Viral Nation, Obviously, Ubiquitous, Goat Agency, NeoReach, HireInfluence, Upfluence, plus Awwwards/Behance/Dribbble-tier agency sites) consistently converges on these patterns — **apply them:**
- Full-viewport hero with a bold, benefit-driven headline, a dual-audience CTA split ("Brands" vs "Creators"), and an animated proof-point strip (campaigns, reach, creators, brands).
- Infinite-marquee logo walls instead of static grids.
- Card-based, icon-led service grids with consistent hover elevation and micro-interactions rather than plain image tiles.
- A **filterable campaign/case-study showcase** with media (images/reels), metrics, and outcome statements — this is the single highest-converting element on top agency sites and is completely absent from the current Socialties site.
- Separate, clearly branded intake paths for **brands** (lead gen, budget-qualified) and **creators** (application, portfolio-qualified) — almost every top agency splits its site this way.
- Human-forward "Team" sections with photography + social links to build trust.
- Testimonial carousels mixing text, star ratings, and video.
- Scroll-triggered reveal animations, soft gradients/glassmorphism accents, and a sticky, blur-on-scroll navbar — used broadly across Awwwards-tier marketing sites in 2025/2026.
- Dark/light mode toggles are increasingly standard on premium agency sites.

Everything below turns these findings into a concrete, buildable specification.

---

## 1. PROJECT OVERVIEW

**Project name:** Socialties Web Platform
**Type:** Marketing website + lead-generation engine + headless CMS-style admin panel for an influencer marketing agency.
**Primary audiences:** (1) Brands seeking influencer/marketing services, (2) Creators/influencers seeking representation or campaign work, (3) Internal admin/ops team managing content and leads.
**Primary conversion goals:**
1. Brand lead form submissions ("I am a Brand").
2. Creator application submissions ("I am a Creator").
3. Direct contact via call / WhatsApp / email.
4. Campaign/portfolio credibility that supports (1) and (2).

**Non-functional priorities (in order):** correctness of lead-capture flows → performance (Core Web Vitals) → accessibility → SEO → animation polish. Never sacrifice the first three for the last.

---

## 2. TECH STACK & JUSTIFICATION

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Server Components reduce client JS; native SEO/metadata APIs; ISR for campaign pages that change often but don't need full SSR on every request. |
| UI library | **React 19** | Required by Next 15; concurrent features improve perceived performance for animated sections. |
| Language | **TypeScript (strict mode)** | End-to-end type safety from Prisma schema → API → UI. |
| Styling | **Tailwind CSS v4** | Utility-first velocity; pairs with design tokens (Section 5) for a consistent premium theme; trivially supports dark/light mode via CSS variables. |
| Component primitives | **shadcn/ui** | Accessible, unstyled Radix-based primitives that we re-skin with the Socialties design system — avoids reinventing dialogs, dropdowns, tabs, toasts. |
| Motion | **Framer Motion** (page/section transitions, hover/tap states) + **GSAP + ScrollTrigger** (complex scroll-driven sequences, counters, marquee) | Framer Motion is the right tool for React-idiomatic component animation; GSAP is the right tool for timeline-based scroll choreography. Use both, but scope GSAP to a few key moments (hero, stats, marquee) to avoid overengineering. |
| Smooth scroll | **Lenis** | Industry-standard for the "premium" inertia-scroll feel referenced by the brief. |
| ORM / DB | **Prisma + PostgreSQL** | Type-safe queries, migrations, and relations map directly onto the schema in Section 8. |
| Auth | **NextAuth (Auth.js) v5, credentials + optional Google provider for admin** | Native App Router support, session strategy compatible with role-based access control (RBAC). |
| Forms | **React Hook Form + Zod** | Shared Zod schemas validate on client and server (Server Actions), eliminating duplicate validation logic. |
| Data fetching / cache | **TanStack React Query** (client-side, for admin dashboard interactivity) + **Next.js Server Components + `fetch` caching** (public site) | Public marketing pages should be server-rendered/cached for SEO and speed; the admin dashboard benefits from React Query's optimistic updates and cache invalidation. |
| Media storage | **Cloudinary** | Handles image/video upload, transformation, compression, and CDN delivery — required for campaign galleries, reels, profile photos, media kits. |
| Mutations | **Next.js Server Actions** for all form submissions (brand leads, creator applications, contact messages) and admin CRUD, backed by API Route Handlers only where a stable REST/webhook surface is needed (e.g., Cloudinary signed-upload endpoint, NextAuth routes). |
| Deployment | **Vercel** (app) + **managed PostgreSQL** (Neon or Supabase Postgres) + **Cloudinary** (media) | See Section 15. |

---

## 3. BRAND & VISUAL IDENTITY

### 3.1 Logo
Reuse the existing wordmark concept — "Social" + "ties" — but re-vectorize it as a clean SVG with two weight options (full-color for light backgrounds, all-white/all-lime for dark and overlay contexts). Add a small monogram mark ("S" inside a rounded square with a dot accent, echoing the two dots over the "i"s) for use as a favicon and social avatar.

### 3.2 Color Palette (derived from the existing lime-on-charcoal identity, modernized)

```css
:root {
  /* Brand core */
  --brand-lime: #C6F135;        /* primary accent, from existing logo */
  --brand-lime-dark: #9FCC1E;   /* hover/active state of lime */
  --brand-ink: #0E0F12;         /* near-black, replaces flat dark gray */
  --brand-ink-soft: #17181D;    /* elevated surface on dark theme */
  --brand-cream: #F7F6F2;       /* warm off-white, light theme base */
  --brand-violet: #7C5CFF;      /* secondary accent for gradients/CTAs */
  --brand-coral: #FF6F59;       /* tertiary accent, used sparingly (badges, alerts) */

  /* Semantic (light theme) */
  --bg: var(--brand-cream);
  --bg-elevated: #FFFFFF;
  --fg: #14151A;
  --fg-muted: #5B5D68;
  --border: #E7E5DE;
  --accent: var(--brand-lime);
  --accent-foreground: #0E0F12;

  /* Gradient tokens */
  --gradient-hero: linear-gradient(135deg, #0E0F12 0%, #1C1435 45%, #2A2050 100%);
  --gradient-accent: linear-gradient(120deg, var(--brand-lime) 0%, #8FE85A 100%);
  --gradient-glass: linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02));
}

[data-theme='dark'] {
  --bg: var(--brand-ink);
  --bg-elevated: var(--brand-ink-soft);
  --fg: #F5F5F2;
  --fg-muted: #A6A8B3;
  --border: #26272E;
  --accent: var(--brand-lime);
  --accent-foreground: #0E0F12;
}
```

Use `--brand-lime` as the singular "pop" accent (CTAs, links, active states, chart highlights) against a mostly neutral ink/cream base — this mirrors what wins on Awwwards-tier agency sites (one confident accent, not a rainbow) and is a direct improvement over the current site's flat, accent-less gray.

### 3.3 Typography
- **Display/headings:** `Clash Display` or `General Sans` (self-hosted via `next/font/local`, both free/premium-feeling geometric sans) — large, tight tracking, bold weights for hero and section titles.
- **Body/UI:** `Inter` (via `next/font/google`) — proven readability at small sizes, huge weight range.
- **Scale:** use a fluid type scale with `clamp()` (e.g., hero `clamp(2.75rem, 6vw, 6rem)`), never fixed px jumps across breakpoints.

### 3.4 Design Language
Glassmorphism cards (`backdrop-filter: blur(20px)` + translucent borders) for floating stat pills and nav; soft radial gradients behind hero and section transitions; 20–28px corner radii on cards; consistent 1px hairline borders using `--border`; shadows kept soft and colored (tinted by lime/violet at low opacity) rather than pure black.

---

## 4. INFORMATION ARCHITECTURE & SITEMAP

```
/                       Home
/campaigns              Campaign showcase (filterable, dynamic)
/campaigns/[slug]       Individual campaign case study
/team                   Team grid (dynamic)
/creators               "I am a Creator" — info + application form
/brands                 "I am a Brand" — info + lead form
/testimonials           Full testimonials wall (optional standalone; also embedded on Home)
/contact                Contact page (map, cards, form)
/privacy-policy         Legal
/terms-of-service       Legal
/faq                    FAQ (can also be a Home section AND standalone page for SEO)

/admin/login                        Admin auth
/admin                              Dashboard (stats overview)
/admin/campaigns                    CRUD list
/admin/campaigns/new
/admin/campaigns/[id]/edit
/admin/team                         CRUD list
/admin/team/new
/admin/team/[id]/edit
/admin/creator-applications         Inbox: view/approve/reject/search/filter
/admin/brand-leads                  Inbox: view/assign/export
/admin/messages                     Contact form inbox
/admin/testimonials                 CRUD
/admin/media-library                Upload/browse/delete/replace
/admin/settings                     Logo, SEO defaults, homepage banners, social links, theme
/admin/users                        Admin/staff user + role management
```

Primary nav (per brief): **Home · Campaigns · Team · Contact Us**, plus a persistent dual CTA ("For Brands" / "For Creators") in the navbar, always visible, not buried under "More" (fixing the current site's biggest IA flaw).

---

## 5. NAVIGATION SPEC

- Sticky, fixed to top. Transparent + white/light text over the hero; on scroll past hero height, transitions to a blurred glass background (`backdrop-filter: blur(16px)`, `background: rgba(14,15,18,0.72)`) with a subtle bottom border — animate this transition with Framer Motion (`useScroll` + `useTransform`), not a hard class swap.
- Animated underline on nav links: a lime bar that scales in from center on hover/active (`scaleX` transform, `transform-origin: center`).
- Right-aligned: theme toggle (sun/moon icon, animated swap), "For Brands" (outline button), "For Creators" (solid lime button) — these route to `/brands` and `/creators`.
- Mobile: hamburger → full-screen overlay menu with staggered link entrance animation (Framer Motion `staggerChildren`), large tap targets (min 48px height), WhatsApp/Call quick-action buttons pinned at the bottom of the overlay.

---

## 6. PAGE-BY-PAGE UI/UX SPECIFICATION

### 6.1 Home Page

1. **Loading screen (first visit only, session-scoped):** brief animated logo reveal (SVG line-draw or mask animation), max 1.2s, skip on repeat navigations. Must not block Lighthouse's Largest Contentful Paint measurement meaningfully — keep it under a low-cost CSS/SVG animation, no heavy Lottie files.
2. **Hero (full viewport):**
   - Background: animated gradient mesh (`--gradient-hero`) with slow-moving blurred color blobs (CSS `@keyframes` transform, GPU-accelerated `transform`/`opacity` only) plus a subtle interactive mouse-parallax layer (small translate offset following cursor, capped magnitude, disabled on touch devices and under `prefers-reduced-motion`).
   - Eyebrow label: "India's Influencer Marketing Partner" (or similar, rewritten from the old tagline).
   - Headline (large, animated word-by-word or line-by-line reveal on load): e.g. **"Where Brands Meet Real Influence."**
   - Subheading: one or two sentences synthesizing the old positioning line — strategy + storytelling, creators over follower counts, results-driven.
   - Three CTAs: **"I'm a Brand"** (solid lime, → `/brands`), **"I'm a Creator"** (outline, → `/creators`), **"Play Showreel"** (ghost/icon button that opens a modal video player — Cloudinary-hosted).
   - Animated stat counters (GSAP `ScrollTrigger` + number tween, or a lightweight custom counter hook): Campaigns Completed, Brands Served, Creators Managed, Reach Generated (formatted with K/M/Cr suffixes) — values sourced from `HomepageSettings` table, editable by admin, not hardcoded.
   - Scroll-down indicator (bouncing chevron or mouse icon) at the bottom.
3. **Trust marquee:** "Trusted by" label, then an infinite horizontal auto-scrolling logo strip (duplicate the array and use CSS `translateX` keyframe loop for a seamless infinite marquee; pause on hover). Populate from the current logos (Amazon, Paytm, Sugar, Myntra, Secret Temptation, OnePlus) plus admin-editable additional entries, sourced from the `MediaLibrary`/a simple `TrustedBrands` config in `HomepageSettings`.
4. **Services grid:** 6 cards (2×3 desktop, 1-col mobile) for Influencer Marketing, Digital Advertising, Content Creation, Product Photography, Website Development, App Development. Each card: icon (lucide-react) + representative image + 2-line description + "Learn more" text-link CTA. Hover: card lifts (`translateY(-6px)`), image scales slightly (`scale(1.05)`), border glows with a lime gradient ring. Data sourced from the `Service` table (admin-editable), not hardcoded, so copy/imagery can change without a deploy.
5. **"Why Socialties" section:** 7 value props (large network, fast execution, verified creators, transparent pricing, end-to-end management, performance analytics, dedicated support) as a staggered-reveal grid of icon+title+short description cards over a soft gradient background panel.
6. **Featured Campaigns preview:** 3–4 campaign cards pulled from the `Campaign` table (`featured = true`), each showing cover image/video thumbnail, brand name, platform badges, one headline metric (e.g., "12M+ Reach"), and a "View all campaigns" CTA linking to `/campaigns`.
7. **Team preview strip:** 4–6 team member avatars in a horizontal row with name/title on hover, "Meet the team" CTA → `/team`.
8. **Creator/Brand split CTA banner:** two large side-by-side (stacked on mobile) panels — "For Brands: Launch a campaign that performs" / "For Creators: Turn your influence into income" — each with its own CTA into `/brands` or `/creators`.
9. **Testimonials carousel:** auto-advancing, swipeable, mixing star-rating text cards and video-testimonial cards (Cloudinary video thumbnails that expand into a modal player). Sourced from `Testimonial` table with a `type` enum (`TEXT`, `VIDEO`) and `audience` enum (`BRAND`, `CREATOR`).
10. **FAQ accordion:** animated expand/collapse (Framer Motion `AnimatePresence` height auto via measured ref, or Radix Accordion from shadcn), 6–8 common questions covering both brand and creator concerns.
11. **Final CTA band:** full-width gradient panel — "Ready to grow? Let's talk." — with Call, WhatsApp, and Email buttons plus a "Get in touch" primary CTA to `/contact`.
12. **Footer** (see 6.8).

### 6.2 Campaigns Page (`/campaigns`)
- Header with title + short intro copy.
- Filter bar: by platform (Instagram, YouTube, etc.), by campaign type (product launch, brand awareness, event, gifting, performance ads, ambassador program — from the existing site's list), by status (Live/Completed), and a search box. Filtering is client-side over a server-fetched dataset for instant feel, or via URL search params + server re-fetch for SEO-friendly filtered views — implement with URL search params so filtered states are shareable/indexable.
- Responsive masonry/grid of campaign cards: cover media, brand name/logo, budget tier badge (not exact figure, unless admin opts to show it), platform icons, reach metric, "View case study" CTA.
- Empty state and loading skeletons required.

### 6.3 Campaign Detail Page (`/campaigns/[slug]`)
- Hero banner (campaign cover image/video).
- Metadata row: Brand, Platform(s), Duration, Budget tier, Reach, Campaign Status badge.
- "The Brief" / "The Strategy" / "The Results" narrative sections (rich text from admin, stored as sanitized HTML or Markdown rendered via a safe renderer).
- Media gallery: responsive grid of images + embedded reels/videos (Cloudinary player), lightbox on click.
- Results metrics as animated stat cards (reach, engagement, conversions — whatever fields the admin filled in).
- Embedded testimonial(s) tied to that campaign, if any.
- Related campaigns strip at the bottom.
- Full dynamic `generateMetadata` for SEO (title, description, OG image = campaign cover).

### 6.4 Team Page (`/team`)
- Section intro ("Meet the people behind Socialties").
- Responsive grid (4-col desktop → 2-col tablet → 1-col mobile) of team member cards: photo, name, designation.
- Hover: image slight zoom + overlay with LinkedIn/Instagram/email icons.
- Click → modal (Radix Dialog) with full bio/description, larger photo, and the same social links, plus keyboard (Esc) and backdrop-click dismissal, focus-trapped for accessibility.
- Data fully from `TeamMember` table.

### 6.5 "I Am a Creator" Page (`/creators`)
- Hero mini-section: benefit-led headline for creators ("Turn your content into a career").
- Benefits list (why join Socialties as a creator): access to premium brand campaigns, timely payments, portfolio growth, dedicated creator support, etc.
- **Application form** (React Hook Form + Zod, submitted via Server Action → `CreatorApplication` table):
  - Full Name*, Instagram Link*, YouTube Link, Followers* (numeric, formatted), Category* (select: Fashion, Beauty, Tech, Food, Travel, Fitness, Comedy, Lifestyle, Finance, Parenting, Other), Phone Number* (with country code, validated), Email*, City*, Languages (multi-select tags), Content Type (multi-select: Reels, Static Posts, Stories, YouTube Long-form, YouTube Shorts, Blogs), Engagement Rate (%, numeric), Average Views (numeric), Message (textarea).
  - File uploads: Media Kit (PDF/image, via signed Cloudinary upload widget), Profile Picture (image).
  - Client + server Zod validation; disable submit + show spinner while pending; success state = animated confirmation (not just a toast) plus optional instant admin notification (see 6.9).
  - On submit, record status defaults to `PENDING` for the admin review pipeline.

### 6.6 "I Am a Brand" Page (`/brands`)
- Hero mini-section: benefit-led headline for brands ("Campaigns that convert, not just impressions").
- Benefits/process recap (reuse the six-step methodology from the current Services/About content, rewritten).
- **Lead generation form** (Server Action → `BrandLead` table):
  - Company Name*, Website, Contact Person*, Phone Number*, Email*, Campaign Budget* (select ranges, e.g., <₹1L, ₹1–5L, ₹5–20L, ₹20L+, Custom), Campaign Objective* (multi-select: Brand Awareness, Product Launch, Sales/Conversions, App Installs, Event Promotion, Ambassador Program), Target Audience (text/tags), Platforms* (multi-select: Instagram, YouTube, Facebook, LinkedIn, X, Other), Campaign Description* (textarea), Timeline (date range or select), File Upload (brief/deck, optional, via Cloudinary).
  - Same validation/UX standards as the creator form.
  - Status defaults to `NEW` for the admin pipeline (progressing to `CONTACTED`, `QUALIFIED`, `WON`, `LOST`).

### 6.7 Contact Page (`/contact`)
- Interactive map (Google Maps embed or a lightweight React map component) pinned to the Delhi office address.
- Contact cards for each contact person (Sanskar Gaba, Saakaar Bhatia, Dhruva Bhandari) with click-to-call `tel:` links and WhatsApp deep links (`https://wa.me/91XXXXXXXXXX`), plus general Instagram/LinkedIn icons linking to the company profiles.
- Persistent floating WhatsApp button (bottom-right, all pages) linking to a default number, with a subtle pulse animation.
- General contact form (Name, Email, Phone, Subject, Message) → Server Action → `ContactMessage` table.
- Office hours / response-time expectation copy for trust.

### 6.8 Footer (site-wide)
Three-to-four column layout (expanding the current site's structure, improved):
- **Column 1 — Brand:** logo, one-line mission statement, social icons (Instagram, LinkedIn).
- **Column 2 — Quick Links:** Home, Campaigns, Team, Contact.
- **Column 3 — Services:** the six services, each linking to its anchor/section.
- **Column 4 — Contact:** office address, the three contact persons with click-to-call, general email (`connect@socialties.in`).
- Bottom bar: © current-year Socialties (and legal entity line if required), Privacy Policy, Terms of Service links.

### 6.9 Admin Notifications
On new `CreatorApplication`, `BrandLead`, or `ContactMessage` creation, trigger a transactional email (via Resend or an SMTP provider configured through env vars) to a configurable admin notification address, and surface an unread-count badge in the admin dashboard sidebar (real-time-ish via polling with React Query `refetchInterval`, no need for websockets at this scale).

---

## 7. ADMIN PANEL SPECIFICATION

### 7.1 Authentication & Authorization
- NextAuth (Auth.js) credentials provider backed by the `User` table (`passwordHash` via bcrypt/argon2).
- Session strategy: JWT with a short-lived access session + refresh handled by NextAuth defaults; store `role` and `permissions` claims in the session/token.
- Middleware (`middleware.ts`) protects all `/admin/**` routes, redirecting unauthenticated requests to `/admin/login`.
- **Role-based access control:** roles `SUPER_ADMIN`, `ADMIN`, `EDITOR`, `VIEWER` (see schema `Role`/`Permission` tables). `SUPER_ADMIN` manages users/roles; `ADMIN` manages all content; `EDITOR` manages campaigns/team/testimonials but not settings/users; `VIEWER` is read-only (useful for a founder who wants visibility without edit rights).
- Every mutating admin action writes an `AuditLog` row (`actorId`, `action`, `entityType`, `entityId`, `diff` JSON, `createdAt`).

### 7.2 Dashboard (`/admin`)
- KPI cards: total campaigns, total creators (applications), total brand leads, total messages, split by status/time range (last 7/30/90 days) — computed via Prisma aggregate queries, cached briefly.
- Recent activity feed (from `AuditLog`, last 20 entries).
- Quick links to pending items (new applications, new leads, unread messages).

### 7.3 Campaign Management
- Table view: sortable/filterable list (by status, brand, date), search by name.
- Create/Edit form: all fields from the `Campaign` model (brand, budget, platform(s), duration/date range, reach, results/metrics as key-value pairs, description/brief rich text, status enum `DRAFT | LIVE | COMPLETED | ARCHIVED`, `featured` toggle).
- Media manager embedded in the form: drag-and-drop multi-image upload, video/reel upload, reordering (drag handles), delete individual media items — all backed by signed Cloudinary uploads and the `CampaignImage`/`CampaignVideo` tables.
- Soft delete (sets `deletedAt`, excluded from public queries but recoverable by `SUPER_ADMIN`).

### 7.4 Team Management
- Same CRUD pattern: list, create/edit form (name, designation, photo upload, LinkedIn, Instagram, email, bio), delete (soft delete), drag-to-reorder display order (`sortOrder` field).

### 7.5 Creator Applications Inbox
- Table: name, category, followers, city, submitted date, status badge.
- Detail drawer/modal: full submitted data, media kit download link, profile picture preview.
- Actions: Approve / Reject (updates `status` enum `PENDING | APPROVED | REJECTED`, optionally triggers a status-update email), search (by name/city/category), filter (by category/status/follower range).

### 7.6 Brand Leads Inbox
- Table: company, contact person, budget range, objective, submitted date, status badge.
- Detail drawer: full submission, uploaded brief download.
- Actions: update status (`NEW | CONTACTED | QUALIFIED | WON | LOST`), assign to a staff `User` (dropdown of admins), export filtered list to CSV.

### 7.7 Contact Messages
- Simple inbox: list, view, mark read/unread, delete.

### 7.8 Testimonials Management
- CRUD for text/video testimonials, tie to optional `Campaign` relation, set `audience` (BRAND/CREATOR), rating (1–5), display order, publish toggle.

### 7.9 Media Library
- Grid view of all Cloudinary assets uploaded through the platform (tracked in the `MediaLibrary` table with `cloudinaryPublicId`, `url`, `type`, `sizeBytes`, `uploadedById`).
- Upload new assets directly; delete (also deletes from Cloudinary via API call); replace-in-place for an asset that's referenced elsewhere (updates the URL reference without breaking existing links); on-upload compression handled by Cloudinary's automatic format/quality (`f_auto,q_auto`).

### 7.10 Settings
- Logo upload (light/dark variants).
- SEO defaults: site title template, default meta description, default OG image, per-page overrides referencing the `SEOSetting` table.
- Homepage banners/stat numbers (the animated counters), trusted-brand logos list.
- Social links (Instagram, LinkedIn, others).
- Theme: default light/dark preference, accent color override (stored but constrained to sane brand-safe options, not an open color picker that could break contrast).
- All settings changes are immediately reflected on the public site via revalidation (`revalidateTag`/`revalidatePath` after mutation).

---

## 8. DATABASE SCHEMA (PRISMA)

Design principles applied throughout: UUID primary keys, `createdAt`/`updatedAt` timestamps on every model, soft deletes via nullable `deletedAt` where records can be "removed" but should remain auditable, enums for all fixed-choice fields, explicit indexes on frequently filtered/sorted columns, and normalized relations (no duplicated data).

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─────────────────────────────────────────────
// AUTH & RBAC
// ─────────────────────────────────────────────

enum RoleName {
  SUPER_ADMIN
  ADMIN
  EDITOR
  VIEWER
}

model Role {
  id          String       @id @default(uuid())
  name        RoleName     @unique
  permissions Permission[]
  users       User[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model Permission {
  id        String   @id @default(uuid())
  key       String   @unique // e.g. "campaigns.write", "leads.export"
  roles     Role[]
  createdAt DateTime @default(now())
}

model User {
  id            String    @id @default(uuid())
  name          String
  email         String    @unique
  passwordHash  String
  roleId        String
  role          Role      @relation(fields: [roleId], references: [id])
  sessions      Session[]
  auditLogs     AuditLog[]
  brandLeads    BrandLead[] @relation("AssignedLeads")
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  deletedAt     DateTime?

  @@index([email])
}

model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  expires      DateTime
  createdAt    DateTime @default(now())

  @@index([userId])
}

model AuditLog {
  id         String   @id @default(uuid())
  actorId    String
  actor      User     @relation(fields: [actorId], references: [id])
  action     String   // e.g. "CAMPAIGN_CREATE"
  entityType String   // e.g. "Campaign"
  entityId   String
  diff       Json?
  createdAt  DateTime @default(now())

  @@index([entityType, entityId])
  @@index([createdAt])
}

// ─────────────────────────────────────────────
// CAMPAIGNS
// ─────────────────────────────────────────────

enum CampaignStatus {
  DRAFT
  LIVE
  COMPLETED
  ARCHIVED
}

enum CampaignType {
  PRODUCT_LAUNCH
  BRAND_AWARENESS
  EVENT_PROMOTION
  GIFTING
  PERFORMANCE_ADS
  AMBASSADOR_PROGRAM
}

model Campaign {
  id           String          @id @default(uuid())
  slug         String          @unique
  brandName    String
  brandLogoUrl String?
  budgetTier   String?         // display-friendly, e.g. "₹5L - ₹10L"
  platforms    String[]        // ["INSTAGRAM","YOUTUBE",...]
  type         CampaignType
  status       CampaignStatus  @default(DRAFT)
  startDate    DateTime?
  endDate      DateTime?
  reachTotal   BigInt?
  metrics      Json?           // flexible key-value results, e.g. {"engagementRate": "6.2%"}
  brief        String?         // rich text / markdown
  strategy     String?
  resultsNote  String?
  coverImageUrl String?
  featured     Boolean         @default(false)
  sortOrder    Int             @default(0)
  images       CampaignImage[]
  videos       CampaignVideo[]
  testimonials Testimonial[]
  createdAt    DateTime        @default(now())
  updatedAt    DateTime        @updatedAt
  deletedAt    DateTime?

  @@index([status])
  @@index([type])
  @@index([featured])
}

model CampaignImage {
  id                 String   @id @default(uuid())
  campaignId         String
  campaign           Campaign @relation(fields: [campaignId], references: [id])
  url                String
  cloudinaryPublicId String
  altText            String?
  sortOrder          Int      @default(0)
  createdAt          DateTime @default(now())

  @@index([campaignId])
}

model CampaignVideo {
  id                 String   @id @default(uuid())
  campaignId         String
  campaign           Campaign @relation(fields: [campaignId], references: [id])
  url                String
  cloudinaryPublicId String
  thumbnailUrl       String?
  sortOrder          Int      @default(0)
  createdAt          DateTime @default(now())

  @@index([campaignId])
}

// ─────────────────────────────────────────────
// TEAM
// ─────────────────────────────────────────────

model TeamMember {
  id          String   @id @default(uuid())
  name        String
  designation String
  photoUrl    String?
  linkedin    String?
  instagram   String?
  email       String?
  bio         String?
  sortOrder   Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  deletedAt   DateTime?
}

// ─────────────────────────────────────────────
// CREATOR APPLICATIONS
// ─────────────────────────────────────────────

enum ApplicationStatus {
  PENDING
  APPROVED
  REJECTED
}

model CreatorApplication {
  id              String             @id @default(uuid())
  fullName        String
  instagramUrl    String?
  youtubeUrl      String?
  followers       Int?
  category        String
  phone           String
  email           String
  city            String
  languages       String[]
  contentTypes    String[]
  engagementRate  Float?
  averageViews    Int?
  message         String?
  mediaKitUrl     String?
  profilePhotoUrl String?
  status          ApplicationStatus  @default(PENDING)
  reviewedById    String?
  createdAt       DateTime           @default(now())
  updatedAt       DateTime           @updatedAt
  deletedAt       DateTime?

  @@index([status])
  @@index([category])
  @@index([createdAt])
}

// ─────────────────────────────────────────────
// BRAND LEADS
// ─────────────────────────────────────────────

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  WON
  LOST
}

model BrandLead {
  id                 String     @id @default(uuid())
  companyName        String
  website            String?
  contactPerson      String
  phone              String
  email              String
  campaignBudget     String
  campaignObjectives String[]
  targetAudience     String?
  platforms          String[]
  description        String
  timeline           String?
  fileUrl            String?
  status             LeadStatus @default(NEW)
  assignedToId       String?
  assignedTo         User?      @relation("AssignedLeads", fields: [assignedToId], references: [id])
  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @updatedAt
  deletedAt          DateTime?

  @@index([status])
  @@index([assignedToId])
  @@index([createdAt])
}

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────

enum TestimonialType {
  TEXT
  VIDEO
}

enum TestimonialAudience {
  BRAND
  CREATOR
}

model Testimonial {
  id          String              @id @default(uuid())
  authorName  String
  authorRole  String?
  companyName String?
  content     String?
  videoUrl    String?
  rating      Int?
  type        TestimonialType     @default(TEXT)
  audience    TestimonialAudience
  campaignId  String?
  campaign    Campaign?           @relation(fields: [campaignId], references: [id])
  isPublished Boolean             @default(true)
  sortOrder   Int                 @default(0)
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt
  deletedAt   DateTime?

  @@index([audience])
  @@index([isPublished])
}

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────

model Service {
  id          String   @id @default(uuid())
  slug        String   @unique
  title       String
  description String
  icon        String   // lucide icon name
  imageUrl    String?
  sortOrder   Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// ─────────────────────────────────────────────
// GALLERY / MEDIA LIBRARY
// ─────────────────────────────────────────────

enum MediaType {
  IMAGE
  VIDEO
  DOCUMENT
}

model MediaLibrary {
  id                 String    @id @default(uuid())
  url                String
  cloudinaryPublicId String    @unique
  type               MediaType
  sizeBytes          Int?
  uploadedById       String?
  createdAt          DateTime  @default(now())
  deletedAt          DateTime?

  @@index([type])
}

model Gallery {
  id        String   @id @default(uuid())
  title     String?
  imageUrl  String
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
}

// ─────────────────────────────────────────────
// SITE CONFIG
// ─────────────────────────────────────────────

model HomepageSettings {
  id                  String   @id @default(uuid())
  heroHeadline        String
  heroSubheading      String
  showreelUrl         String?
  statCampaigns       Int      @default(0)
  statBrands          Int      @default(0)
  statCreators        Int      @default(0)
  statReach           BigInt   @default(0)
  trustedBrandLogos   Json     // [{ name, logoUrl }]
  updatedAt           DateTime @updatedAt
}

model SEOSetting {
  id              String  @id @default(uuid())
  pagePath        String  @unique // "/" , "/campaigns", etc.
  title           String
  description     String
  ogImageUrl      String?
  keywords        String[]
  updatedAt       DateTime @updatedAt
}

model ContactMessage {
  id        String   @id @default(uuid())
  name      String
  email     String
  phone     String?
  subject   String?
  message   String
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
  deletedAt DateTime?

  @@index([isRead])
  @@index([createdAt])
}
```

> Note: `Brands` and `Creators` as literal top-level "master record" tables were consolidated into `BrandLead`/`CreatorApplication` since, at this stage, every brand/creator enters through a submission funnel — this avoids a duplicate, redundant table structure while preserving every field named in the brief. If a future phase needs a persistent CRM-style `Brand`/`Creator` master record independent of a single lead/application, promote these into their own models with a 1-to-many relation to submissions.

---

## 9. API / SERVER ACTION SURFACE

Prefer **Server Actions** colocated with their forms for all mutations; use **Route Handlers** only for: NextAuth (`/api/auth/[...nextauth]`), signed Cloudinary upload URL generation (`/api/uploads/sign`), and CSV export (`/api/admin/brand-leads/export`).

| Action | Type | Access |
|---|---|---|
| `submitCreatorApplication(formData)` | Server Action | Public |
| `submitBrandLead(formData)` | Server Action | Public |
| `submitContactMessage(formData)` | Server Action | Public |
| `getCampaigns(filters)` | Server Component data fetch | Public |
| `getCampaignBySlug(slug)` | Server Component data fetch | Public |
| `createCampaign / updateCampaign / deleteCampaign` | Server Action | Admin (EDITOR+) |
| `reorderCampaignMedia` | Server Action | Admin (EDITOR+) |
| `createTeamMember / updateTeamMember / deleteTeamMember` | Server Action | Admin (EDITOR+) |
| `updateApplicationStatus` | Server Action | Admin (EDITOR+) |
| `updateLeadStatus / assignLead` | Server Action | Admin (EDITOR+) |
| `exportLeads` | Route Handler (GET, streams CSV) | Admin (ADMIN+) |
| `updateHomepageSettings / updateSEOSettings` | Server Action | Admin (ADMIN+) |
| `manageUsers` (create/deactivate/change role) | Server Action | Admin (SUPER_ADMIN) |
| `/api/uploads/sign` | Route Handler (POST) | Admin (authenticated) |

All Server Actions: validate input with the matching Zod schema, check session/role via a shared `requireRole()` helper before any admin mutation, wrap DB writes in `try/catch` returning a typed `{ success, error }` result (never throw raw errors to the client), and write an `AuditLog` entry for every admin mutation.

---

## 10. AUTHENTICATION FLOW

1. Admin visits `/admin/login` → submits email/password.
2. NextAuth `CredentialsProvider.authorize()` looks up `User` by email, verifies password hash (argon2/bcrypt), checks `isActive` and `deletedAt IS NULL`.
3. On success, JWT session created containing `userId`, `role`, `permissions[]`.
4. `middleware.ts` intercepts all `/admin/**` requests: no session → redirect to `/admin/login?callbackUrl=...`; session present but role lacks the route's required permission → redirect to `/admin/unauthorized`.
5. Server Actions re-verify the session server-side (never trust client-side role checks alone) via `auth()` helper before performing any privileged operation.
6. Logout clears the session cookie and redirects to `/admin/login`.
7. Optional: rate-limit login attempts (see Security, Section 13) and lock the account after repeated failures.

---

## 11. COMPONENT HIERARCHY (KEY TREES)

```
app/
 layout.tsx                     (ThemeProvider, LenisProvider, Navbar, Footer, Toaster)
 page.tsx                       (Home)
 campaigns/
   page.tsx                     (CampaignFilters, CampaignGrid)
   [slug]/page.tsx               (CampaignHero, CampaignMeta, CampaignGallery, ResultsStats, RelatedCampaigns)
 team/page.tsx                   (TeamGrid, TeamMemberModal)
 creators/page.tsx               (CreatorHero, CreatorBenefits, CreatorApplicationForm)
 brands/page.tsx                 (BrandHero, BrandProcess, BrandLeadForm)
 contact/page.tsx                (ContactMap, ContactCards, ContactForm, WhatsAppFloatingButton)
 faq/page.tsx
 privacy-policy/page.tsx
 terms-of-service/page.tsx
 admin/
   layout.tsx                    (AdminSidebar, AdminHeader, RoleGate)
   login/page.tsx
   page.tsx                      (KPI cards, ActivityFeed)
   campaigns/... (DataTable, CampaignForm, MediaUploader)
   team/...       (DataTable, TeamMemberForm, PhotoUploader)
   creator-applications/... (DataTable, ApplicationDrawer)
   brand-leads/...           (DataTable, LeadDrawer, ExportButton)
   messages/...              (DataTable, MessageDrawer)
   testimonials/...          (DataTable, TestimonialForm)
   media-library/page.tsx    (MediaGrid, UploadDropzone)
   settings/page.tsx         (SettingsTabs: General, SEO, Homepage, Social, Theme)
   users/page.tsx            (DataTable, UserForm, RoleSelect)

components/
 layout/ (Navbar, Footer, WhatsAppFloatingButton, ThemeToggle)
 home/ (Hero, StatsCounter, TrustMarquee, ServiceCard, WhySocialtiesGrid, FeaturedCampaigns, TeamPreview, DualCTABanner, TestimonialsCarousel, FAQAccordion, FinalCTABand)
 campaigns/ (CampaignCard, CampaignFilters, CampaignGallery, ResultsStats)
 team/ (TeamCard, TeamMemberModal)
 forms/ (CreatorApplicationForm, BrandLeadForm, ContactForm, FileUploadField, MultiSelectField)
 admin/ (DataTable, StatCard, ActivityFeed, RoleGate, MediaUploader, RichTextEditor)
 ui/ (shadcn primitives: button, input, select, dialog, tabs, accordion, toast, badge, card, dropdown-menu, avatar, tooltip)
```

Reusable component strategy: every card-like unit (`CampaignCard`, `TeamCard`, `ServiceCard`) shares a base `<SurfaceCard>` primitive for consistent radius/shadow/hover; every form field wraps shadcn `Input`/`Select`/`Textarea` with a shared `<FormField label error>` wrapper bound to React Hook Form's `Controller`; every admin list uses one generic `<DataTable columns data />` (TanStack Table) rather than bespoke tables per entity.

---

## 12. STATE MANAGEMENT STRATEGY

- **Server state (public site):** fetched in Server Components directly via Prisma; cached with Next.js `fetch`/`unstable_cache`/route segment config (`revalidate`) — campaigns/team/testimonials revalidate on-demand via `revalidateTag()` triggered from admin mutations, not on a blind timer, so admin edits appear instantly without over-fetching.
- **Server state (admin dashboard):** TanStack React Query wrapping calls to Server Actions, enabling optimistic updates (e.g., status changes reflect instantly) with rollback on error.
- **Local/UI state:** React `useState`/`useReducer` for form steps, modal open state, filter UI state — no global client store (Redux/Zustand) is needed at this scope; introduce Zustand only if the admin dashboard grows complex shared state (e.g., a persistent selected-rows-across-tabs feature).
- **Theme state:** a small `ThemeProvider` (context + `localStorage` persistence + `prefers-color-scheme` fallback) toggling the `data-theme` attribute on `<html>`.
- **Form state:** React Hook Form per form, schema-driven by Zod, submission handled by calling the Server Action directly from the client via `useTransition` for pending UI.

---

## 13. FILE UPLOAD STRATEGY

1. Client requests a signed upload signature from `/api/uploads/sign` (server generates a Cloudinary signature scoped to a folder like `socialties/campaigns/{campaignId}` with an expiry).
2. Client uploads directly to Cloudinary using that signature (keeps large files off the Next.js server/function, avoiding serverless payload/timeout limits).
3. On successful Cloudinary response, client sends the returned `public_id`/`secure_url` to a Server Action which persists the reference in the relevant table (`CampaignImage`, `CampaignVideo`, `MediaLibrary`, `CreatorApplication.mediaKitUrl`, etc.).
4. Enforce file-type and size limits both client-side (immediate feedback) and via the Cloudinary signed-preset constraints server-side (never trust client-side checks alone).
5. Deletion: Server Action calls the Cloudinary Admin API to destroy the asset, then removes/nulls the DB reference, in that order, inside a transaction-safe sequence (log failures if Cloudinary delete fails, but don't leave orphaned DB rows).
6. Automatic optimization: always request Cloudinary URLs with `f_auto,q_auto` and responsive `w_auto`/`dpr_auto` transformations; generate video thumbnails via Cloudinary's video-to-image transformation rather than storing a separate thumbnail upload where possible.

---

## 14. SEO STRATEGY

- Use the App Router `generateMetadata` on every route, pulling overridable defaults from the `SEOSetting` table (fallback to sane hardcoded defaults if no row exists).
- Structured data (JSON-LD) via a shared `<JsonLd>` component: `Organization` schema site-wide (name, logo, sameAs → Instagram/LinkedIn), `BreadcrumbList` on nested pages, `Article`/`CreativeWork`-style schema on campaign case studies, `FAQPage` schema on the FAQ section/page.
- Auto-generated `sitemap.ts` (App Router convention) including all static routes plus dynamic `campaigns/[slug]` entries pulled from the DB, and `robots.ts` disallowing `/admin`.
- OpenGraph + Twitter Card metadata per page, with campaign pages using their cover image as the OG image.
- Semantic HTML throughout (`<main>`, `<nav>`, `<section>`, one `<h1>` per page, logical heading order) — the current site's inconsistent hierarchy must be fixed.
- Descriptive, keyword-relevant `alt` text on every image (never left blank as on the current site), populated from an admin-editable `altText` field on media models.
- Canonical URLs set explicitly to avoid `www`/non-`www` duplication (the current site's canonical points to `www.socialties.in` — pick one canonical host and 301-redirect the other in `next.config.js`/hosting config).

---

## 15. PERFORMANCE OPTIMIZATION CHECKLIST

- [ ] Default to **Server Components**; mark a component `"use client"` only when it needs interactivity/state/effects.
- [ ] Use `next/image` everywhere with explicit `sizes`, `priority` only on the LCP hero image, and Cloudinary as the loader for remote images so transformations happen at the CDN edge.
- [ ] Code-split heavy client bundles (GSAP-driven sections, video modal, admin rich-text editor) via `next/dynamic` with `ssr: false` where appropriate.
- [ ] Font loading via `next/font` (local + Google) to avoid layout shift and eliminate render-blocking font requests.
- [ ] Respect `prefers-reduced-motion` — disable/simplify parallax, marquee speed, and large scroll-triggered animations for users who request it.
- [ ] Lenis smooth scroll initialized once at the root, destroyed/paused appropriately on route change to avoid memory leaks.
- [ ] Cache public data fetches with tag-based revalidation (`revalidateTag`) instead of no-store/always-dynamic rendering.
- [ ] Lazy-load below-the-fold sections' heavy assets (e.g., testimonial video thumbnails) via intersection observers.
- [ ] Bundle-analyze (`@next/bundle-analyzer`) before launch; trim any accidental full-library imports (e.g., import specific `lucide-react` icons, not the whole set; import GSAP plugins individually).
- [ ] Target Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO (100 is the stretch goal noted in the brief; treat 95+ as the committed bar and 100 as best-effort, since some animation-heavy sections trade a few performance points for the "premium feel" explicitly requested).

---

## 16. SECURITY CHECKLIST

- [ ] Passwords hashed with argon2id (or bcrypt, cost factor ≥ 12); never store plaintext.
- [ ] All Server Actions re-check authentication/role server-side — never rely on the UI hiding a button as the only protection.
- [ ] Zod validation on every input, server-side, even though the client also validates.
- [ ] Rate limiting on public form submissions and the admin login route (e.g., Upstash Redis or an in-memory token bucket behind Vercel Edge Middleware) to prevent spam/brute-force.
- [ ] CSRF protection via NextAuth's built-in mechanisms for auth routes; Server Actions are POST-only and same-origin by default under Next.js, but confirm `Origin`/`Host` header checks are enabled.
- [ ] Sanitize any rich-text/HTML fields (campaign brief, testimonials) before render (e.g., `sanitize-html` or a strict Markdown renderer with no raw HTML passthrough) to prevent stored XSS.
- [ ] File uploads restricted by MIME type and size at the signed-upload layer; never allow executable file types.
- [ ] All secrets (`DATABASE_URL`, `NEXTAUTH_SECRET`, Cloudinary keys, email provider keys) in environment variables, never committed; `.env.example` checked in with placeholder keys only.
- [ ] Security headers via `next.config.js`/middleware: `Content-Security-Policy`, `X-Frame-Options: DENY` (or `frame-ancestors 'none'`), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
- [ ] Least-privilege DB credentials in production; enable SSL on the Postgres connection string.
- [ ] Audit log every admin mutation (already in schema) for traceability.

---

## 17. ACCESSIBILITY CHECKLIST

- [ ] All interactive elements reachable and operable via keyboard; visible focus states styled to match the brand (lime focus ring), never `outline: none` without a replacement.
- [ ] Color contrast of at least 4.5:1 for body text against backgrounds in both themes (verify the lime accent is only used for large text/UI elements, not small body copy, since lime-on-white can fail contrast at small sizes).
- [ ] Modals/drawers (team member modal, campaign detail drawers) trap focus and restore focus to the trigger element on close.
- [ ] All form fields have associated `<label>`s (not placeholder-only labels) and error messages linked via `aria-describedby`.
- [ ] Marquee, parallax, and auto-advancing carousels pause on hover/focus and respect `prefers-reduced-motion`.
- [ ] Semantic landmarks (`nav`, `main`, `footer`) and skip-to-content link at the top of the page.

---

## 18. TESTING STRATEGY

- **Unit tests (Vitest):** Zod schemas, utility/formatting functions (number/currency/reach formatting), permission-check helpers.
- **Component tests (React Testing Library):** form components (validation errors render correctly, submit disabled while pending), `DataTable` sorting/filtering, `Accordion`/`Modal` accessibility behavior.
- **Integration tests (Vitest + Prisma test database or `@prisma/client` mocked via `prisma-mock`):** Server Actions — creating a campaign persists correctly, role checks reject unauthorized users, soft-deleted records excluded from public queries.
- **End-to-end tests (Playwright):** critical conversion paths — submitting the Brand lead form end-to-end, submitting the Creator application end-to-end, admin login → create campaign → verify it appears on `/campaigns`, admin approves a creator application and status updates.
- **Visual/manual QA:** cross-browser (Chrome, Safari, Firefox, Edge) and cross-device (mobile, tablet, laptop, ultra-wide) pass before each milestone sign-off, per Section 20's responsiveness requirement.
- **CI:** run lint, typecheck, unit/integration tests, and a Playwright smoke suite on every PR (GitHub Actions), block merge on failure.

---

## 19. ERROR HANDLING GUIDELINES

- Server Actions return a discriminated union `{ success: true, data } | { success: false, error: string, fieldErrors?: Record<string,string[]> }` — never throw uncaught errors across the server/client boundary.
- Use Next.js `error.tsx` boundaries per route segment for unexpected render errors, with a branded fallback ("Something went wrong" + retry button), and a root `global-error.tsx`.
- Use `not-found.tsx` for invalid campaign slugs / missing admin entities.
- Log server-side errors (Server Actions, Route Handlers) to a monitoring service (e.g., Sentry) with enough context (route, userId if available) but never log sensitive form data (raw phone/email is fine to log for lead-debugging purposes, but never log passwords or upload signatures).
- User-facing form errors are field-specific and inline (never a single opaque "Error occurred" banner) — surfaced via the shared `<FormField error>` wrapper.
- Network/upload failures show a retry affordance rather than silently failing.

---

## 20. CODING CONVENTIONS

- TypeScript `strict: true`; no `any` without an explicit inline justification comment.
- ESLint (Next.js core-web-vitals config + `eslint-plugin-jsx-a11y`) + Prettier, enforced via a pre-commit hook (`husky` + `lint-staged`).
- File naming: `kebab-case` for files/folders, `PascalCase` for component names, `camelCase` for functions/variables, Zod schemas named `xSchema`, inferred types named `X` (e.g., `brandLeadSchema` → `type BrandLead`).
- Co-locate: a feature's Server Action, Zod schema, and form component live in the same folder (e.g., `app/brands/_actions/submit-brand-lead.ts`, `app/brands/_schemas/brand-lead.schema.ts`).
- Prisma naming: PascalCase models, camelCase fields, matching the schema in Section 8 exactly.
- Commit convention: Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`) to keep history readable and enable changelog generation.
- Every exported component/function that isn't trivially self-explanatory gets a one-line JSDoc comment; avoid comments that restate the obvious code.

---

## 21. DEPLOYMENT PLAN

1. **Repository:** GitHub repo, `main` = production, feature branches → PRs with CI checks (Section 18) required to merge.
2. **Database:** provision a managed Postgres instance (Neon or Supabase Postgres) with a production and a preview/staging branch/database; set `DATABASE_URL` accordingly per environment.
3. **Media:** create a Cloudinary account/folder structure (`socialties/campaigns`, `socialties/team`, `socialties/creators`, `socialties/brands`, `socialties/media-library`); store `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` as env vars.
4. **Hosting:** deploy to Vercel; connect the GitHub repo; every PR gets a Preview Deployment (using the staging DB) for stakeholder review before merge; `main` auto-deploys to production.
5. **Environment variables (Vercel dashboard, per environment):** `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `CLOUDINARY_*`, email provider key (`RESEND_API_KEY` or SMTP creds), `ADMIN_NOTIFICATION_EMAIL`.
6. **Migrations:** `prisma migrate deploy` run as part of the Vercel build step (or a dedicated pre-deploy CI job) — never `prisma db push` in production.
7. **Domain:** point `socialties.in` (and `www`) DNS to Vercel; enforce a single canonical host via redirect; enable automatic HTTPS.
8. **Seed data:** a `prisma/seed.ts` script populates initial `Role`/`Permission` rows, a first `SUPER_ADMIN` user, the six `Service` records (from Section 0), and placeholder `HomepageSettings` — run once against production before go-live.
9. **Monitoring:** Vercel Analytics + Sentry (errors) + optionally Vercel Speed Insights for Core Web Vitals tracking post-launch.
10. **Backups:** enable automated daily backups on the managed Postgres provider; verify a restore procedure before go-live.

---

## 22. DEVELOPMENT ROADMAP & MILESTONES

**Milestone 0 — Foundation (Days 1–2)**
Repo scaffold (Next.js 15 + TS + Tailwind + shadcn), design tokens/theme setup, Prisma schema + initial migration + seed script, NextAuth wired with a working admin login against the `User` table, base layout (Navbar shell, Footer shell, ThemeProvider, Lenis provider).

**Milestone 1 — Public Marketing Shell (Days 3–6)**
Home page fully built per Section 6.1 (static/placeholder data acceptable initially, wired to real `HomepageSettings`/`Service` tables by end of milestone), Navbar scroll behavior, Footer, responsive pass on all breakpoints, base SEO metadata plumbing.

**Milestone 2 — Campaigns & Team (Days 7–10)**
`Campaign`/`CampaignImage`/`CampaignVideo` models live; `/campaigns` list with filters; `/campaigns/[slug]` detail page; `/team` grid + modal; Cloudinary signed-upload flow implemented and reused going forward.

**Milestone 3 — Lead Capture (Days 11–13)**
`/brands` and `/creators` pages with full forms, Zod schemas, Server Actions, DB persistence, success states, admin notification emails wired.

**Milestone 4 — Contact, Testimonials, FAQ (Days 14–15)**
`/contact` page complete (map, cards, form, WhatsApp/call CTAs), testimonials carousel + `Testimonial` CRUD data, FAQ accordion, Privacy Policy/Terms pages.

**Milestone 5 — Admin Panel Core (Days 16–20)**
Dashboard KPIs, Campaign CRUD + media manager, Team CRUD, Creator Applications inbox, Brand Leads inbox (+ CSV export), Contact Messages inbox, role-based route protection fully enforced, audit logging live.

**Milestone 6 — Admin Panel Settings & Media Library (Days 21–23)**
Media Library page, Settings (logo, SEO, homepage banners, social links, theme), Users/Roles management for `SUPER_ADMIN`.

**Milestone 7 — Motion & Premium Polish (Days 24–26)**
GSAP ScrollTrigger sequences (hero blobs, counters, marquee), Framer Motion page/section transitions, loading screen, mouse-parallax, dark/light mode full pass, `prefers-reduced-motion` fallbacks verified.

**Milestone 8 — SEO, Performance, Accessibility Hardening (Days 27–28)**
Sitemap/robots, JSON-LD across all page types, image alt-text audit, Lighthouse pass on all key routes, bundle analysis and trimming, accessibility audit (axe + manual keyboard pass).

**Milestone 9 — Testing & QA (Days 29–30)**
Full Vitest/RTL/Playwright suite green in CI, cross-browser/cross-device manual QA, security checklist sign-off (Section 16).

**Milestone 10 — Launch (Day 31+)**
Production environment variables set, migrations deployed, seed run, DNS cutover, monitoring/analytics confirmed live, post-launch smoke test of every conversion path (Brand form, Creator form, Contact form, admin login, campaign CRUD).

---

## 23. FINAL INSTRUCTIONS TO ANTIGRAVITY

Build this project end-to-end following the milestones above, in order, without skipping the database/schema/auth foundation to jump to visuals. At each milestone, produce working, runnable code — not partial stubs — and confirm the relevant pages/flows function against the real Prisma schema before moving on. Use the exact color tokens, typography choices, schema, and component/folder structure specified above unless a named limitation of the chosen library forces a deviation — in that case, pick the closest equivalent and note the substitution in a comment. Prioritize the lead-capture flows (Brand/Creator forms), the Campaigns showcase, and the Admin panel as the highest-value, must-be-flawless surfaces, since these directly drive the business goal of converting both brands and creators. Do not ask clarifying questions before starting — where any ambiguity remains, make the decision that best serves conversion, performance, and a premium, trustworthy brand feel, and proceed.
