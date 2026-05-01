# AVION Display — Product Requirements Document
**Website Rebuild: Next.js + Framer Motion + Telegram Blog Automation**
Version 1.0 | Target: aviondisplay.com

---

## 0. HOW TO USE THIS PRD WITH CLAUDE CODE

### Setup Steps (Before Pasting PRD)

1. **Install prerequisites:**
   ```bash
   node --version   # Must be v18+. If not: https://nodejs.org
   npm --version
   ```

2. **Install Claude Code:**
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

3. **Create project:**
   ```bash
   npx create-next-app@latest avion-display --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   cd avion-display
   ```

4. **Install dependencies:**
   ```bash
   npm install framer-motion @vercel/analytics next-mdx-remote gray-matter sharp
   npm install -D @types/node
   ```

5. **Copy your existing assets folder** into `public/`:
   ```
   public/
     assets/
       image/   ← semua file dari assets/image/ existing
   ```
   No video files needed — background is now fully CSS/canvas animated.

6. **Open Claude Code in project folder:**
   ```bash
   claude
   ```

7. **Paste seluruh isi PRD ini** sebagai pesan pertama ke Claude Code, prefix dengan:
   > "Ini adalah PRD untuk project yang harus kamu build. Baca semua bagian sebelum mulai. Mulai dari Section 1 dan kerjakan secara berurutan. Jangan skip section apapun."

---

## 1. PROJECT OVERVIEW

### Brand Identity
- **Company:** AVION Display
- **Domain:** aviondisplay.com
- **Business:** B2B AV solutions — Interactive Flat Panels, Digital Signage, LED Walls, Broadcast Devices
- **Market:** Indonesian enterprise market
- **Tone:** Premium tech brand, Apple-inspired, professional yet approachable
- **Language strategy:** English for headings/labels (premium signal), natural Indonesian for body copy

### Tech Stack (EXACT — tidak boleh diganti)
- **Framework:** Next.js 14 App Router
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Blog:** MDX files (file-based, no CMS)
- **Contact form:** Netlify Forms (keep compatibility) → migrate to Vercel serverless if needed
- **Deployment:** Vercel
- **Blog automation:** Telegram Bot (Python) → GitHub API → Vercel auto-deploy
- **Analytics:** @vercel/analytics

### Design System
```
Colors:
  --bg:           #0a0a0f        (deep dark background)
  --surface:      rgba(255,255,255,0.035)  (glass cards)
  --surface-md:   rgba(255,255,255,0.06)
  --border:       rgba(255,255,255,0.07)
  --border-hi:    rgba(124,109,255,0.35)
  --accent:       #7c6dff        (primary purple)
  --accent-2:     #a78bfa        (lighter purple)
  --accent-grad:  linear-gradient(135deg, #6b5cff, #8b7bff)
  --text:         #ffffff
  --text-sub:     #777777
  --text-muted:   #555555
  --green:        #25d366        (WhatsApp)
  --red:          #ef4444        (live/broadcast)
  --gold:         #fbbf24        (PRO badge)

Fonts:
  Display/H1:    system font stack (-apple-system, BlinkMacSystemFont, "Segoe UI")
  Body:          DM Sans (Google Fonts)
  Mono/labels:   DM Mono (Google Fonts)
  Stats/hero:    Syne (Google Fonts)

Glassmorphism recipe:
  background: rgba(255,255,255,0.035)
  border: 1px solid rgba(255,255,255,0.07)
  backdrop-filter: blur(16px)
  border-radius: 20px–24px

Motion defaults (Framer Motion):
  entry: { opacity:0, y:40 } → { opacity:1, y:0 }
  transition: { duration:0.7, ease:[0.16,1,0.3,1] }  (spring-like ease)
  stagger children: 0.1s delay between items
  hover cards: y:-6px, border-color to --border-hi
  page transition: opacity fade 0.3s
```

---

## 2. FILE & FOLDER STRUCTURE

```
avion-display/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: fonts, navbar, footer, analytics
│   │   ├── page.tsx                # Homepage
│   │   ├── produk/
│   │   │   └── page.tsx            # Products page
│   │   ├── solusi/
│   │   │   └── page.tsx            # Solutions page
│   │   ├── teknologi/
│   │   │   └── page.tsx            # Technology/Specs page
│   │   ├── kontak/
│   │   │   └── page.tsx            # Contact page
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog index
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Blog post detail
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts        # Contact form handler
│   │   ├── sitemap.ts              # Dynamic sitemap
│   │   ├── robots.ts               # robots.txt
│   │   └── globals.css             # Base styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── Badge.tsx           # Animated badge pill
│   │   │   ├── GlassCard.tsx       # Reusable glassmorphism card
│   │   │   ├── GradientText.tsx    # Gradient text wrapper
│   │   │   ├── AnimatedSection.tsx # Scroll-triggered section wrapper
│   │   │   ├── SceneBackground.tsx # Global animated background (replaces video)
│   │   │   └── WhatsAppButton.tsx  # Floating WA button
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TickerBanner.tsx    # Scrolling spec ticker
│   │   │   ├── FeaturedProduct.tsx
│   │   │   ├── UseCases.tsx
│   │   │   └── TrustSection.tsx
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   └── BlogContent.tsx
│   │   └── sections/
│   │       └── CTABanner.tsx
│   ├── lib/
│   │   ├── blog.ts                 # MDX utilities: getAllPosts, getPostBySlug
│   │   └── metadata.ts             # SEO metadata helpers
│   └── content/
│       └── blog/                   # .mdx blog post files
│           └── _template.mdx
├── public/
│   └── assets/
│       └── image/                  # All existing product images
├── telegram-bot/                   # Separate folder, NOT part of Next.js build
│   ├── bot.py
│   └── requirements.txt
└── next.config.ts
```

---

## 3. SEO CONFIGURATION

### next.config.ts
```typescript
const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
      ],
    }]
  },
}
```

### Root Layout Metadata (src/app/layout.tsx)
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://aviondisplay.com'),
  title: {
    default: 'AVION Display — Interactive Flat Panel & AV Solutions Indonesia',
    template: '%s | AVION Display',
  },
  description: 'AVION Display menghadirkan Interactive Flat Panel 4K, Digital Signage, LED Wall, dan solusi AV enterprise terbaik di Indonesia. Konsultasi gratis untuk kebutuhan display Anda.',
  keywords: ['interactive flat panel', 'smartboard indonesia', 'layar interaktif', 'digital signage', 'LED wall', 'AV solution', 'AVION display', 'interactive display'],
  authors: [{ name: 'AVION Display' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://aviondisplay.com',
    siteName: 'AVION Display',
    images: [{ url: '/assets/image/AVION HOME.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  verification: { google: 'PLACEHOLDER_GOOGLE_VERIFICATION' },
}
```

### Sitemap (src/app/sitemap.ts)
Generate dynamically including all blog posts:
```typescript
import { getAllPosts } from '@/lib/blog'
export default async function sitemap() {
  const posts = await getAllPosts()
  const blogUrls = posts.map(post => ({
    url: `https://aviondisplay.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))
  return [
    { url: 'https://aviondisplay.com', priority: 1.0 },
    { url: 'https://aviondisplay.com/produk', priority: 0.9 },
    { url: 'https://aviondisplay.com/solusi', priority: 0.9 },
    { url: 'https://aviondisplay.com/teknologi', priority: 0.8 },
    { url: 'https://aviondisplay.com/blog', priority: 0.8 },
    { url: 'https://aviondisplay.com/kontak', priority: 0.7 },
    ...blogUrls,
  ]
}
```

### JSON-LD Structured Data
Add to root layout:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AVION Display",
  "url": "https://aviondisplay.com",
  "logo": "https://aviondisplay.com/assets/image/NEW-AVION.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+62-815-6390-5555",
    "contactType": "sales",
    "availableLanguage": ["Indonesian", "English"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tangerang",
    "addressCountry": "ID"
  }
}
```

---

## 4. SHARED COMPONENTS

### Navbar (src/components/layout/Navbar.tsx)
- Fixed top, glassmorphism bg on scroll (`backdrop-filter: blur(20px)`, subtle bottom border)
- Logo: `/assets/image/NEW-AVION.png` → links to `/`
- Nav links: Produk, Solusi, Teknologi, Blog, Kontak
- CTA button: "Konsultasi" → WhatsApp link, purple gradient
- Mobile (≤768px): hamburger → full-screen drawer, animated X, links stagger in with Framer Motion
- Active link: white color + subtle underline
- WhatsApp URL: `https://api.whatsapp.com/send/?phone=6281563905555&text=Halo,+saya+mau+bertanya+tentang+AVION+Display!`

### Footer (src/components/layout/Footer.tsx)
- Dark, minimal
- Logo + tagline left
- Links: 3 columns (Produk, Solusi, Perusahaan)
- Bottom: © 2026 AVION Display | WhatsApp | Tokopedia link
- Tokopedia URL: `https://www.tokopedia.com/central-audio-visual/etalase/interactive-display`

### Floating WhatsApp Button
- Fixed bottom-right on all pages
- WhatsApp green circle with icon
- Subtle pulse animation
- Tooltip "Chat dengan kami" on hover

### AnimatedSection (scroll-triggered wrapper)
```typescript
// Wraps any content with Framer Motion viewport-triggered animation
// Usage: <AnimatedSection delay={0.2}><YourContent /></AnimatedSection>
const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
}
```

### Badge component
```typescript
// <Badge>Get in Touch</Badge>
// Purple pill with blinking dot prefix, DM Mono font, uppercase
```

### SceneBackground (src/components/ui/SceneBackground.tsx)
This replaces the old background video entirely. It is mounted **once** in `layout.tsx` as a fixed full-viewport layer behind all page content. It is purely visual — no interaction, no z-index conflicts.

**Placement in layout.tsx:**
```tsx
<body>
  <SceneBackground />   {/* fixed, z-index: -1, covers 100vw × 100vh */}
  <Navbar />
  {children}
  <Footer />
  <WhatsAppButton />
</body>
```

**Visual layers (bottom to top):**

**Layer 1 — Base gradient (CSS, static):**
```css
background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(107,92,255,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139,123,255,0.10) 0%, transparent 55%),
            #0a0a0f;
```

**Layer 2 — Tech grid (CSS, static):**
```css
/* Subtle dot grid pattern */
background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
background-size: 40px 40px;
/* Full viewport, fixed position, pointer-events: none */
```

**Layer 3 — Noise/grain texture (CSS, static):**
```css
/* SVG turbulence filter or CSS noise overlay */
opacity: 0.025;
/* Adds analogue film grain — prevents the background from looking too flat/digital */
```

**Layer 4 — Animated orbs (Framer Motion):**
Three large blurred circles that drift slowly in infinite loops:

```typescript
// Orb 1 — primary accent, top-left area
{
  size: "600px",
  color: "rgba(107,92,255,0.12)",
  blur: "120px",
  initial: { x: "-10%", y: "-10%" },
  animate: { x: ["−10%", "5%", "−10%"], y: ["−10%", "15%", "−10%"] },
  transition: { duration: 20, repeat: Infinity, ease: "easeInOut" }
}

// Orb 2 — secondary accent, bottom-right area
{
  size: "500px",
  color: "rgba(139,123,255,0.08)",
  blur: "100px",
  initial: { x: "60%", y: "50%" },
  animate: { x: ["60%", "75%", "60%"], y: ["50%", "65%", "50%"] },
  transition: { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }
}

// Orb 3 — cool blue tint, center-bottom
{
  size: "400px",
  color: "rgba(59,130,246,0.06)",
  blur: "80px",
  initial: { x: "30%", y: "70%" },
  animate: { x: ["30%", "45%", "30%"], y: ["70%", "55%", "70%"] },
  transition: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 10 }
}
```

**Layer 5 — Particle dots (canvas, optional — implement only if performance allows):**
- 60–80 tiny white dots (`radius: 1px`, `opacity: 0.15–0.35`)
- Each drifts slowly with random velocity (`vx: ±0.2`, `vy: ±0.15`)
- Wraps around edges (toroidal)
- Drawn on `<canvas>` via `requestAnimationFrame`
- If causing performance issues on mobile → disable via `window.innerWidth < 768` check

**Performance rules:**
- All orbs use `will-change: transform` and `transform: translate3d` for GPU compositing
- Grid and noise layers are pure CSS — zero JS cost
- Canvas particle count capped at 60 on desktop, 0 on mobile
- `pointer-events: none` on entire SceneBackground
- No re-renders triggered by scroll — background is fully independent of page state

---

## 5. PAGE SPECIFICATIONS

---

### PAGE 1: HOMEPAGE (`/`)
**Meta title:** "AVION Display — Interactive Flat Panel & Smart Display Solutions Indonesia"
**Meta description:** "AVION Interactive Flat Panel menghadirkan kejernihan 4K, kolaborasi AI, dan Dual OS untuk ruang meeting dan kelas modern. Solusi AV terpercaya di Indonesia."

#### Section 1.1 — Hero
- Full viewport height
- Background: `<SceneBackground />` component (see spec below), renders behind all content via `position: fixed`, `z-index: -1`, covers entire viewport across ALL pages
- Badge: "Interactive Flat Panel · Enterprise Grade" (blinking dot)
- H1: "The Display That Thinks With You" (large, system font, white)
- Subtext: "AVION Interactive Flat Panel menghadirkan kejernihan 4K, alat kolaborasi bertenaga AI, dan performa Dual OS yang mulus — dirancang untuk tim yang tidak mau terlambat."
- Two CTA buttons: "Explore Products" → /produk | "Talk to Us" → WhatsApp
- Stats row (4 items, glass cards): 50+ Units Ready | 4K UHD Display | 40pt Multi-touch | 48MP Front Camera
- Hero image: `/assets/image/AVION HOME.png` (right side, float/parallax on scroll with Framer Motion useScroll)
- "Scroll" indicator with animated arrow
- Entry animation: badge → h1 → subtext → CTAs → stats, staggered 0.15s each

#### Section 1.2 — Spec Ticker
- Infinite horizontal scroll ticker (Framer Motion animate x)
- Content: "4K UHD Display · 40-Point Multi-touch · Android 14 + Windows Dual OS · Intel i7 OPS · 360° Omnidirectional Audio · 48MP Front Camera · Infinite Whiteboard · 4K Wireless Casting"
- Monospace font, subtle purple glow on dots
- Duplicated array for seamless loop

#### Section 1.3 — Featured Product (AX Series)
- Two-column: image left, content right
- Image: `/assets/image/AVION AX SERIES.png` with purple glow behind it
- Category label: "Flagship Product"
- H2: "AVION AX Series"
- Description: "Smart display paling canggih yang pernah kami hadirkan. Dibangun dengan panel 4K anti-glare, fleksibilitas Dual OS, dan AI meeting tools — AX Series menyesuaikan diri dengan setiap ruangan, setiap tim, setiap alur kerja."
- Feature list (4 items with checkmark icons):
  - 4K UHD display with anti-glare tempered glass
  - Android 14 + Windows Dual OS system
  - 40-point infrared multi-touch, ±1mm accuracy
  - AI meeting tools with real-time transcription
- CTA buttons: "Full Specifications" → /teknologi | "Order via Tokopedia" (with Tokopedia icon)
- Feature grid below (3 cols): 4K UHD Display | Infinite Whiteboard | AI Meeting Tools | Dual OS Architecture | 360° Audio Pickup | 48MP Front Camera

#### Section 1.4 — Use Cases
- H2: "One Platform, Infinite Possibilities"
- Subheading: "Dari ruang rapat hingga ruang kelas — AVION hadir untuk setiap lingkungan dan kebutuhan."
- 3 cards (glassmorphism), each with:
  - Image (existing assets)
  - Category label
  - Title
  - Description
- Cards:
  1. Image: `/assets/image/Corporate Meeting AVION.jpg` | "Corporate Meeting" | "Where Decisions Get Made" | "Tingkatkan setiap sesi rapat dengan presentasi interaktif, kolaborasi real-time, dan integrasi sistem yang mulus."
  2. Image: `/assets/image/Education AVION.png` | "Education" | "Learning That Sticks" | "Ciptakan pengalaman belajar yang mendalam dengan interaksi langsung, visual yang hidup, dan alat pengajaran modern yang membuat siswa terus fokus."
  3. Image: `/assets/image/Training Room AVION.jpg` | "Training Room" | "Train Smarter, Not Harder" | "Dukung sesi pelatihan hybrid dengan sistem display yang fleksibel, konten interaktif, dan audio jernih untuk setiap peserta."
- Hover: card lifts with `y:-8px`, border highlight

#### Section 1.5 — Trust / Why AVION
- H2: "Built on Trust, Backed by Technology"
- 3 items with numbered prefix (01, 02, 03) and glass card:
  1. "Enterprise-Grade Hardware" — "Setiap unit dibangun dengan komponen kelas komersial yang dirancang untuk penggunaan 16+ jam per hari — bukan panel konsumer yang dialihfungsikan."
  2. "Dedicated Local Support" — "Tim kami berbasis di Indonesia, siap membantu instalasi, pelatihan, dan dukungan purna jual — cepat, dan dalam bahasa Anda."
  3. "Seamless Compatibility" — "Kompatibel dengan Microsoft Teams, Zoom, Google Meet, dan lainnya — tanpa hardware tambahan, tanpa konfigurasi rumit."
- Animate each card in with stagger

#### Section 1.6 — CTA Banner
- Full-width purple tinted glass section
- H2: "Ready to Upgrade Your Display System?"
- Subtext: "Hubungi tim kami dan dapatkan konsultasi gratis yang disesuaikan dengan ruangan dan anggaran Anda."
- Button: "Konsultasi Sekarang" → WhatsApp

---

### PAGE 2: PRODUK (`/produk`)
**Meta title:** "Produk AVION Display — Interactive Flat Panel, Digital Signage, LED Wall Indonesia"
**Meta description:** "Temukan lengkap produk AVION: Interactive Flat Panel AX Series, Digital Signage, Broadcast Devices, dan LED Wall. Solusi display enterprise untuk setiap kebutuhan."

#### Section 2.1 — Hero
- Badge: "Complete Product Lineup"
- H1: "Every Screen. Every Space. Every Need."
- Subtext: "Dari ruang meeting interaktif hingga instalasi LED berskala besar — AVION menghadirkan solusi display yang tepat untuk setiap lingkungan."
- Nav pills (anchor links): AX Series | AX Pro Series | Digital Signage | Broadcast | LED Wall

#### Section 2.2 — AX Series
- id="ax-series"
- Layout: image left, info right
- Image: `/assets/image/AVION AX SERIES.png` with size chips overlay: 65" | 75" | 86" | 98"
- Category: "Interactive Flat Panel"
- H2: "AVION AX Series"
- Tagline: "Solusi layar interaktif untuk meeting dan presentasi modern."
- Description: (full text from product.html)
- Highlights row (4 items): 4K UHD Display | 40pt Multi-touch | Dual OS System | 48MP Camera (Opt.)
- Tags: Android 14 | Intel i7 OPS | 360° Audio | Infinite Whiteboard | AI Meeting Tools
- Actions: "Full Specifications" → /teknologi | "Get a Quote" → WhatsApp AX Series

#### Section 2.3 — AX Pro Series
- id="ax-pro"
- Layout: image right, info left (reversed)
- Image: `/assets/image/AVION AX SERIES.png` + gold "PRO" badge overlay (top-right)
- Category: "Interactive Flat Panel · Premium"
- H2: "AVION AX Pro Series"
- Tagline: "Dirancang untuk penggunaan intensif dan kebutuhan skala besar."
- Description: (full text from product.html)
- Highlights row: Pro Grade Panel | 4K UHD Display | High Brightness | 16hr Daily Use
- Tags: Enhanced Processing | Commercial Grade | AI Integration | Premium Build
- Actions: "Konsultasi Sekarang" + "Get a Quote" → WhatsApp AX Pro

#### Section 2.4 — Digital Signage
- id="signage"
- Layout: CSS animated mockup left (same as existing signage-mockup with shimmer bars), info right
- Badge chip: "Cloud CMS Included" (blue)
- Category: "Digital Communication"
- H2: "Digital Signage & CMS System"
- Description: (full text from product.html)
- Highlights: Cloud CMS | 4K Content | Multi Screen | 24/7 Uptime
- Tags: Cloud-based CMS | Remote Management | Content Scheduling | Multi-location | Real-time Updates
- Actions: WhatsApp + Quote

#### Section 2.5 — Broadcast
- id="broadcast"
- Layout: info left, CSS animated broadcast mockup right (same bc-device with LED blink + wave bars)
- Badge chip: "LIVE" (red with live dot)
- Category: "Live Production"
- H2: "Broadcast & Streaming Devices"
- Description: (full text from product.html)
- Highlights: 4K Stream | Low Latency | Multi Platform | Pro Grade Encoder
- Tags: 4K Encoding | HDMI / SDI Input | Low Latency | YouTube / Zoom | Plug & Play

#### Section 2.6 — LED Wall
- id="led-wall"
- Layout: CSS animated LED grid mockup left (colored panel grid with pulse animation), info right
- Badge chip: "Indoor / Outdoor" (purple)
- Category: "Large Format Display"
- H2: "LED Wall Indoor / Outdoor"
- Description: (full text from product.html)
- Highlights: HD+ Resolution | 5000+ Nits | IP65 Weatherproof | ∞ Scalable
- Tags: Modular Panels | Indoor & Outdoor | IP65 Rated | Custom Size | High Brightness

#### Section 2.7 — CTA
- H2: "Not Sure Which Product Fits Your Space?"
- Subtext: "Tim kami siap membantu Anda menemukan solusi yang tepat — dari satu ruang meeting hingga implementasi satu gedung penuh."
- Button: "Free Consultation" → WhatsApp

---

### PAGE 3: SOLUSI (`/solusi`)
**Meta title:** "Solusi AVION Display — Smart Classroom, Meeting Room, Digital Signage, LED Wall Indonesia"
**Meta description:** "AVION menawarkan solusi lengkap: Smart Classroom, Meeting Room System, Digital Signage CMS, LED Display, dan Integrated AV Control untuk enterprise Indonesia."

#### Section 3.1 — Hero
- Badge: "Complete Solutions"
- H1: "Not Just Products. Complete Ecosystems."
- Subtext: "Setiap solusi AVION adalah kombinasi hardware, software, dan dukungan yang dirancang dengan cermat — untuk mengubah cara ruang Anda berkomunikasi, berkolaborasi, dan bekerja."
- "Scroll to explore" indicator

#### Sections 3.2–3.6 — 5 Solutions (one per section, full scroll)
Each solution section:
- Full section with alternating layout (left/right)
- Number badge (01–05) with category label
- H2 title
- Description paragraph
- "Built for" list (4 items)
- 3 feature highlights with icons
- "Includes" hardware list (glass pill chips)
- CTA button → WhatsApp

**Solution 1 — Smart Classroom**
- Number: 01 | Category: Education
- H2: "Smart Classroom Solution"
- Subheading: "Jadikan setiap pelajaran sebagai pengalaman yang tak terlupakan."
- Description + Built for + Features: (all from solution.html — full copy)
- Includes: AVION AX Series (65"–86") | Omni Mic Series | Smart Pen | Mobile Stand

**Solution 2 — Smart Meeting Room**
- Number: 02 | Category: Corporate
- H2: "Smart Meeting Room System"
- Subheading: "Setiap meeting lebih tajam. Setiap keputusan lebih cepat."
- (all from solution.html)
- Includes: AVION AX / AX Pro Series | Omni Mic Series | Casting Dongle | 48MP Camera Module
- Extra: Zoom/Teams/Meet logo row

**Solution 3 — Digital Signage & CMS**
- Number: 03 | Category: Digital Communication
- H2: "Digital Signage & CMS System"
- Subheading: "Brand Anda selalu aktif. Pesan Anda selalu tepat sasaran."
- (all from solution.html)
- Includes: Commercial Display | Cloud CMS Platform | Media Player | Content Scheduling System

**Solution 4 — LED Display**
- Number: 04 | Category: Large Format
- H2: "LED Display Solution"
- Subheading: "Perluas kehadiran Anda. Kuasai setiap ruangan — dan setiap sudut jalan."
- (all from solution.html)
- Includes: LED Wall Panels | LED Controller | Cloud CMS Platform | Professional Installation

**Solution 5 — Integrated AV Control**
- Number: 05 | Category: Enterprise AV
- H2: "Integrated AV Control System"
- Subheading: "Satu ruangan. Satu tombol. Kendali penuh."
- (all from solution.html)
- Includes: AVION AX / AX Pro | Broadcast & Streaming | AV Matrix Switcher | Central Control System
- Visual: animated AV control panel mockup (CSS) with button labels: AV CONTROL | MATRIX | STREAM

#### Section 3.7 — Custom CTA
- H2: "Need Something Tailored to Your Space?"
- Subtext: "Setiap lingkungan itu unik. Tim solusi kami akan merancang sistem yang tepat dari awal — khusus untuk Anda."
- Button: "Talk to Our Solutions Team" → WhatsApp

---

### PAGE 4: TEKNOLOGI (`/teknologi`)
**Meta title:** "Spesifikasi AVION AX Series — Interactive Flat Panel 4K Dual OS Indonesia"
**Meta description:** "Spesifikasi lengkap AVION AX Series: 4K UHD, 40-point touch, Android 14 + Intel i7 OPS, 360° audio. Tersedia ukuran 65\", 75\", 86\", 98\"."

#### Section 4.1 — Hero
- Badge: "Full Specifications · AX Series"
- H1: "Built for the Next Generation of Collaboration"
- Subtext: "Setiap detail AVION AX Series dirancang untuk kejernihan, kecepatan, dan interaksi yang mulus — dari panel 4K hingga sistem audio bertenaga AI."
- Size selector chips (interactive, JS state): AX 65 | AX 75 | AX 86 | AX 98 (with sub-labels)
  - Clicking a chip updates displayed specs (all same spec values, different size label shown)
- Hero image: `/assets/image/AVION AX SERIES.png` right side with purple glow

#### Section 4.2 — Technical Specifications
- H2: "Technical Specifications"
- Subtext: "Rincian lengkap hardware dari platform AVION AX Series."
- 2x2 grid of spec cards (glassmorphism):
  **Card 1 — Display:**
  Resolution: 4K UHD (3840×2160) | Panel: Tempered Glass | Surface: Anti-glare, Anti-fingerprint | Viewing Angle: 178° (H/V) | Color Depth: 10-bit | Touch Points: 40-point Multi-touch | Touch Accuracy: ±1mm | Response Time: ≤6ms

  **Card 2 — Compute System:**
  Android Version: Android 14 | Android RAM: 8 GB | Android Storage: 128 GB | OPS Processor: Intel i7 | OPS RAM: 8 GB | OPS Storage: 512 GB SSD

  **Card 3 — Audio & Camera:**
  Microphone: 8-array Beamforming | Audio Pickup: 360° Omnidirectional | Front Camera: 48MP (Optional)

  **Card 4 — Connectivity:**
  Wireless: Wi-Fi + Bluetooth | Casting: 4K, Bi-directional | Screen Split: Quad View | Ports: HDMI, USB, Type-C, OPS | Power Input: 100–240V | Standby Power: ≤0.5W

#### Section 4.3 — Feature Highlights
- H2: "Feature Highlights"
- Bento grid (3 cols):
  1. Crystal-Clear Display (wide card): "4K UHD · 3840 × 2160" + description + tags (10-bit Color, Anti-glare, etc.)
  2. Precision Touch Engine: "40pt Infrared Multi-touch" + description
  3. Dual OS Architecture (wide card): stat "2 OS" + description + tags (Android 14, Intel i7, etc.)
  4. 360° AI Audio: 8-Array Mic stat + description
  5. 4K Wireless Casting: description + Quad View mention
  6. Professional Video Quality (48MP): description

#### Section 4.4 — Smart Accessories
- H2: "Smart Accessories"
- 4-column grid (responsive 2-col mobile):
  1. Smart Pen — Pena dual-warna dengan flip-and-write. Features: Dual-color support | Flip-and-write | Ergonomic design | Pressure sensitivity
  2. Casting Dongle — USB/Type-C wireless casting. Features: 4K wireless | USB and Type-C | Plug-and-play | Multi-device
  3. Omni Mic Series — 360° omnidirectional. Features: 8-array beamforming | 360° coverage | Noise cancellation | Echo reduction
  4. Mobile Stands — Height adjustable. Features: Height adjustable | Stable base with wheels | Easy mobility | Cable management

#### Section 4.5 — CTA
- Same CTA banner component
- "Ready to Experience the AX Series?"
- Buttons: "Konsultasi Sekarang" (WhatsApp) + "Order via Tokopedia"

---

### PAGE 5: KONTAK (`/kontak`)
**Meta title:** "Kontak AVION Display — Konsultasi Gratis Display & AV Solution"
**Meta description:** "Hubungi tim AVION Display untuk konsultasi gratis, demo produk, atau penawaran khusus. WhatsApp, email, atau isi form di sini."

#### Section 5.1 — Hero
- Badge: "Get in Touch" (blinking dot)
- H1: "Let's Find the Right Solution for You"
- Subtext: "Whether you have a question about our products, need a custom quote, or want to see a live demo — our team is ready to help."

#### Section 5.2 — Main Content
Two-column layout (380px info | flex form):

**Left — Contact Info (sticky):**
- WhatsApp CTA button (green, full width): "Chat via WhatsApp"
- Divider
- Contact Details:
  - Phone/WhatsApp: +62 815-6390-5555
  - Email: acta.arc@gmail.com
  - Office: Tangerang, Indonesia
  - Hours: Mon–Fri, 09.00–17.00 WIB
- Divider
- "Order Online": Tokopedia button with icon `/assets/image/tokopedia-icon.png`

**Right — Contact Form:**
- Title: "Send Us a Message"
- Subtitle: "Fill in the form and we'll get back to you within 1 business day."
- Fields:
  - Nama (required) | Nama Perusahaan (required) — 2 col row
  - Email (required) | No. Telepon/WhatsApp (required) — 2 col row
  - Produk yang Diminati (select dropdown):
    - Interactive Flat Panel — AX Series (65"–98")
    - Interactive Flat Panel — AX Pro Series (65"–98")
    - Digital Signage & CMS System
    - Broadcast & Streaming Devices
    - LED Wall Indoor / Outdoor
    - Smart Classroom Solution
    - Smart Meeting Room System
    - Integrated AV Control System
    - Other / Not sure yet
  - Pesan / Pertanyaan (textarea, 5 rows)
- Submit button: purple gradient "Send Message" with arrow icon
- Form note: "Or reach us directly on WhatsApp for a faster response."
- Success state: green checkmark animation + "Message Sent!" + "Thanks for reaching out..."
- Form handler: Next.js API route at `/api/contact` using nodemailer OR simple webhook to WhatsApp (server action)
- Alternatively: keep `data-netlify="true"` attribute for Netlify Forms compatibility, with `action="/success"` redirect

---

### PAGE 6: BLOG INDEX (`/blog`)
**Meta title:** "Blog AVION Display — Insight Dunia Interactive Display & AV Technology"
**Meta description:** "Baca artikel terbaru seputar interactive flat panel, digital signage, teknologi AV, dan tips kolaborasi modern dari tim AVION Display."

#### Layout
- Hero section:
  - Badge: "Insights & Resources"
  - H1: "The AVION Blog"
  - Subtext: "Tips, insight, dan update terbaru seputar teknologi display interaktif dan solusi AV modern."

- **Featured post** (largest card, full width): shows most recent post
  - Cover image (from MDX frontmatter)
  - Category badge
  - Title (large)
  - Excerpt
  - Date + read time
  - "Baca Selengkapnya →" link

- **Post grid** (remaining posts, 3-column):
  - Cover image (aspect-ratio 16:9)
  - Category badge (pill)
  - Title
  - Excerpt (2 lines, truncated)
  - Date (formatted Indonesian: "15 Januari 2026")
  - Read time estimate
  - Glassmorphism card, hover lift

- Empty state: "Belum ada artikel. Segera hadir!" with illustration

#### MDX Post Schema (frontmatter)
```yaml
---
title: "Judul Artikel Blog"
slug: "judul-artikel-blog"
date: "2026-01-15"
excerpt: "Ringkasan singkat artikel, maksimal 160 karakter untuk SEO."
coverImage: "/blog-images/nama-gambar.jpg"
category: "Interactive Display"
tags: ["smartboard", "pendidikan", "teknologi"]
author: "AVION Display"
readTime: 5
---
```

---

### PAGE 7: BLOG POST (`/blog/[slug]`)
**Meta:** Dynamic from frontmatter (title, description from excerpt, OG image from coverImage)

#### Layout
- **Article header:**
  - Category badge
  - H1 (title)
  - Date + read time + author
  - Cover image (full width, rounded-xl)

- **Article body** (MDX rendered):
  - Max-width 720px centered
  - Typography: comfortable line-height 1.8, font-size 17px
  - H2: large, with left purple border accent
  - H3: medium
  - `code`: monospace, glass bg
  - `blockquote`: left border accent, italic, glass bg
  - Images: full-width, rounded, with optional caption
  - Links: purple color

- **Sidebar** (sticky, desktop only):
  - Table of contents (auto-generated from H2/H3)
  - Share buttons (WhatsApp, copy link)
  - CTA card: "Tertarik dengan produk kami?" → WhatsApp

- **Footer of article:**
  - Tags row
  - "Konsultasi produk kami" CTA
  - Related posts (3 cards, same category)

---

## 6. BLOG SYSTEM — FILE-BASED MDX

### src/lib/blog.ts
```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  coverImage: string
  category: string
  tags: string[]
  author: string
  readTime: number
  content: string
}

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
    const { data, content } = matter(raw)
    return { ...data, content, slug: data.slug || file.replace('.mdx', '') } as Post
  })
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts()
  return posts.find(p => p.slug === slug) || null
}
```

### Blog images location
Store cover images in `public/blog-images/` — referenced as `/blog-images/filename.jpg`

---

## 7. TELEGRAM BOT — BLOG AUTOMATION

### Message Format (what user sends to bot)
```
JUDUL: Cara Memilih Ukuran Interactive Flat Panel yang Tepat untuk Ruang Meeting
KATEGORI: Interactive Display
EXCERPT: Tips memilih ukuran layar interaktif berdasarkan ukuran ruangan, jumlah peserta, dan jarak pandang optimal.
ISI:
## Pendahuluan

Isi artikel lengkap di sini...

## Section 2

Konten section 2...
```
Then send cover image as a separate photo message immediately after.

### Bot Flow
1. User sends text message with above format
2. Bot parses: JUDUL, KATEGORI, EXCERPT, ISI
3. Bot waits up to 60s for photo attachment
4. Bot generates slug from JUDUL (lowercase, hyphen-separated, Indonesian-safe)
5. Bot downloads the photo, saves as JPEG
6. Bot creates `.mdx` file with frontmatter
7. Bot pushes 2 files to GitHub via API:
   - `src/content/blog/{slug}.mdx`
   - `public/blog-images/{slug}.jpg`
8. Vercel detects push → auto-deploys (usually within 60s)
9. Bot replies: "✅ Post published! https://aviondisplay.com/blog/{slug}"

### telegram-bot/bot.py
```python
# Full implementation — Claude Code must generate this file
# Dependencies: python-telegram-bot==20.x, requests, python-slugify, Pillow
# Environment variables needed:
#   TELEGRAM_BOT_TOKEN=
#   GITHUB_TOKEN=              # Personal Access Token with repo write access
#   GITHUB_REPO=               # e.g. "username/avion-display"
#   GITHUB_BRANCH=             # e.g. "main"
#   AUTHORIZED_CHAT_ID=        # Your Telegram user ID (security: only you can post)

# Key functions:
# - parse_message(text) → { title, category, excerpt, content }
# - generate_slug(title) → url-safe slug
# - create_mdx_content(data, slug, image_path) → frontmatter + content string
# - push_to_github(files: list[{path, content_b64}]) → commit via GitHub Contents API
# - handle_message(update, context) → main handler
# - handle_photo(update, context) → photo handler, triggers push after receiving image
```

### telegram-bot/requirements.txt
```
python-telegram-bot==20.7
requests==2.31.0
python-slugify==8.0.1
Pillow==10.2.0
python-dotenv==1.0.0
```

### Deployment for bot
- Host on Railway.app (free tier) or Render.com (free tier)
- Set environment variables in Railway/Render dashboard
- Bot runs 24/7 waiting for messages

---

## 8. ANIMATIONS SPECIFICATION

### Page Transitions
```typescript
// Wrap page content in:
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
```

### Scroll-triggered Sections
- Use Framer Motion `whileInView` with `viewport={{ once: true, margin: "-100px" }}`
- Default: `{ opacity:0, y:40 }` → `{ opacity:1, y:0 }` over 0.7s

### Hero Parallax (Homepage)
```typescript
const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 500], [0, 80])
// Apply to hero image
```

### Ticker (Spec Banner)
```typescript
<motion.div
  animate={{ x: ["0%", "-50%"] }}
  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
>
  {/* doubled array of items */}
</motion.div>
```

### Card Hover
```typescript
whileHover={{ y: -6, borderColor: "rgba(124,109,255,0.35)" }}
transition={{ type: "spring", stiffness: 300, damping: 20 }}
```

### Stagger Children
```typescript
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } }
}
```

### Floating WhatsApp Pulse
```typescript
animate={{ scale: [1, 1.15, 1] }}
transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
```

---

## 9. RESPONSIVE BREAKPOINTS

```css
/* Tailwind equivalents */
sm:  640px   /* mobile landscape */
md:  768px   /* tablet */
lg:  1024px  /* desktop */
xl:  1280px  /* wide */

/* Key layout changes */
Mobile (< 768px):
- All multi-column grids → single column
- Navbar → hamburger drawer
- Hero: stacked (text over image)
- Stats: 2x2 grid
- Solution sections: stacked
- Blog grid: single column
- Contact form: single column fields

Tablet (768–1024px):
- Product grid: 2 columns
- Features bento: 2 columns
- Blog grid: 2 columns
- Contact: stacked (info top, form bottom)
```

---

## 10. PERFORMANCE REQUIREMENTS

- All images: use `next/image` with `priority` on above-fold images
- SceneBackground: orb animations use `will-change: transform` + GPU compositing; canvas particles disabled on mobile
- Fonts: `display: swap`
- Code splitting: automatic via Next.js App Router
- Target: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Add `loading="lazy"` for below-fold images

---

## 11. ENVIRONMENT VARIABLES

Create `.env.local` in project root:
```bash
NEXT_PUBLIC_SITE_URL=https://aviondisplay.com
NEXT_PUBLIC_WA_NUMBER=6281563905555
NEXT_PUBLIC_WA_MESSAGE=Halo,+saya+mau+bertanya+tentang+AVION+Display!

# Contact form (if using email route)
CONTACT_EMAIL=acta.arc@gmail.com
# SMTP settings if using nodemailer
```

Create `.env` in `telegram-bot/` folder:
```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
GITHUB_TOKEN=your_github_pat_here
GITHUB_REPO=your_username/avion-display
GITHUB_BRANCH=main
AUTHORIZED_CHAT_ID=your_telegram_user_id
```

---

## 12. DEPLOYMENT CHECKLIST

### Vercel Setup
1. Push repo to GitHub
2. Go to vercel.com → Import repository
3. Framework: Next.js (auto-detected)
4. Add environment variables from Section 11
5. Deploy → get URL → add custom domain `aviondisplay.com`
6. In Hostinger: update A record to Vercel IP, add CNAME `www` → `cname.vercel-dns.com`

### Post-deploy
- [ ] Submit sitemap to Google Search Console: `https://aviondisplay.com/sitemap.xml`
- [ ] Add Google Analytics or Vercel Analytics
- [ ] Test contact form submission
- [ ] Test mobile responsiveness on real device
- [ ] Test WhatsApp links on mobile
- [ ] Verify all images load correctly
- [ ] Set up Telegram bot environment variables on Railway/Render
- [ ] Test end-to-end blog post via Telegram

---

## 13. BUILD ORDER FOR CLAUDE CODE

Execute in this exact order:

1. **Setup & Config** — `next.config.ts`, `globals.css`, font imports, design tokens
2. **SceneBackground** — `SceneBackground.tsx` fully built and tested in isolation before any page work
3. **Shared Components** — Navbar, Footer, AnimatedSection, Badge, GlassCard, WhatsApp float button
4. **Root Layout** — `layout.tsx` with SceneBackground, metadata, JSON-LD, Analytics
5. **Homepage** — All 6 sections
6. **Produk page** — All 7 sections
7. **Solusi page** — All 7 sections
8. **Teknologi page** — All 5 sections
9. **Kontak page** — Hero + form + contact info + API route
10. **Blog lib** — `src/lib/blog.ts` + `_template.mdx`
11. **Blog index page** — `/blog`
12. **Blog post page** — `/blog/[slug]`
13. **SEO files** — `sitemap.ts`, `robots.ts`
14. **Telegram bot** — `telegram-bot/bot.py` + `requirements.txt`
15. **Sample blog post** — Create 1 sample `.mdx` to verify rendering
