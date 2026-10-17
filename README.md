# Jangid Tuff Glasses Private Limited — Official Website

Modern, responsive, conversion-focused website for **Jangid Tuff Glasses Private Limited** (जांगिड़ टफ ग्लासेस प्राइवेट लिमिटेड), based in Jodhpur, Rajasthan, India. Built with **Next.js App Router (JavaScript only)**, Tailwind CSS, Framer Motion, and Lucide React.

---

## 1. Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript only (`.js` / `.jsx`) — **Strictly NO TypeScript**
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (page reveals, transitions, modals, drawers, accordions) + GSAP
- **Icons:** Lucide React
- **Forms & Validation:** React Hook Form + Zod
- **SEO:** Metadata API, OpenGraph, JSON-LD LocalBusiness structured data, dynamic sitemap & robots

---

## 2. Project Structure

```
/
├── app/
│   ├── layout.js              # Root layout: fonts, JSON-LD, Header, Footer, WhatsAppFloat
│   ├── page.js                # Home: Hero, categories, about split, services, gallery preview, CTA
│   ├── globals.css            # Tailwind CSS + brand design tokens
│   ├── not-found.js           # Custom 404 page
│   ├── sitemap.js             # Dynamic XML sitemap generator
│   ├── robots.js              # Robots.txt generator
│   ├── about/page.js          # About Us: narrative, heritage, mission/vision/values, CIN details
│   ├── products/page.js       # Products: 9 categories with interactive category filter bar
│   ├── services/page.js       # Services: 6 service cards + 4-step workflow + hardware integration
│   ├── gallery/page.js        # Gallery: inspiration grid + category filters + modal lightbox
│   ├── contact/page.js        # Contact: business details + Google Maps embed + WhatsApp quote builder
│   ├── faq/page.js            # FAQ: accessible collapsible accordions + contact fallbacks
│   ├── privacy/page.js        # Privacy policy & data handling notice
│   ├── terms/page.js          # Terms & conditions, fabrication tolerances, delivery rules
│   └── thank-you/page.js      # Post-submission confirmation page
├── components/
│   ├── layout/
│   │   ├── Header.jsx         # Sticky header with top info bar, desktop nav, mobile animated drawer
│   │   ├── Footer.jsx         # 4-column footer with brand lockup, links, categories, verified info
│   │   └── WhatsAppFloat.jsx  # Floating bottom-right WhatsApp quick action pill
│   └── ui/
│       ├── PageHero.jsx       # Inner page hero with gradient background & eyebrow
│       ├── SectionHeading.jsx # Reusable section title & description
│       ├── ProductCard.jsx    # Animated product card with zoom & enquiry CTA
│       ├── ServiceCard.jsx    # Numbered service card supporting details
│       ├── ProcessStep.jsx    # 4-stage workflow step card
│       ├── FilterBar.jsx      # Reusable pill/chip category filter bar
│       ├── CTABanner.jsx      # Dark navy conversion callout banner
│       ├── Accordion.jsx      # Animated accessible accordion with Framer Motion
│       ├── Lightbox.jsx       # Fullscreen accessible modal lightbox (Esc/keyboard controls)
│       └── Toast.jsx          # Notification toast for form actions
├── lib/
│   ├── constants.js           # Central business fact register, navigation, products, services, FAQs
│   ├── utils.js               # Utility functions: cn(), buildWhatsAppUrl(), generateStructuredData()
│   └── seo.js                 # Dynamic Next.js metadata generator for all routes
├── public/
│   └── images/
│       └── asset-manifest.json# Image asset manifest with provenance & permission tracking
├── docs/                      # Original planning documents (PRD, TRD, UI/UX, etc.)
└── .env.example               # Environment variables template
```

---

## 3. Verified Business Details (Fact Register)

| Fact | Status | Value |
|------|--------|-------|
| Company Name | ✅ Verified | Jangid Tuff Glasses Private Limited |
| Hindi Name | ✅ Verified | जांगिड़ टफ ग्लासेस प्राइवेट लिमिटेड |
| Address | ✅ Verified | 21 Narnadi, Boranada, Pal, Jodhpur, Rajasthan 342017, India |
| Phone / WhatsApp | ✅ Verified | +91 92510 77483 |
| CIN Number | ✅ Verified | U23109RJ2025PTC102882 (ZaubaCorp / MCA listing) |
| Instagram | ✅ Verified | [@jangidglassco](https://www.instagram.com/jangidglassco/) |
| Facebook | ✅ Verified | [Jangid Tuff Glasses](https://www.facebook.com/people/Jangid-Tuff-Glasses/61591863797429/) |
| Operating Hours | ⚠️ Unconfirmed | Listed as "Please call to confirm" pending owner verification |
| Factory Photos | ⚠️ Illustrative | Stock photos used with disclaimers; replace with real photos before final launch |

---

## 4. How to Run Locally

### Prerequisites
- Node.js 18+ (tested with v24.21.0)
- npm 9+

### Commands
```bash
# 1. Install dependencies (already installed)
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build

# 4. Start the production server
npm run start

# 5. Run ESLint
npm run lint
```

The site will be available at `http://localhost:3000`.

---

## 5. Live Working Features

1. **Responsive Header & Mobile Drawer:** Animated slide-out menu with touch targets and keyboard accessibility.
2. **Product Filtering:** Instant category switching across Architectural, Interior & Bath, Mirrors, and Custom Fabricated without page reload.
3. **Modal Lightbox:** Fullscreen image viewer with keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`) and backdrop click dismiss.
4. **Interactive FAQ Accordions:** Smooth animated expanding/collapsing with chevron rotation.
5. **WhatsApp Enquiry Generator:** Validates input fields and formats them into a clean, pre-filled WhatsApp message sent to `+91 92510 77483`.
6. **URL Parameter Autofill:** Navigating from any product card to `/contact?product=...` pre-selects the product in the quote form.
7. **LocalBusiness JSON-LD Schema:** Embedded in root layout for enhanced Google Local search appearance.
8. **Dynamic Sitemap & Robots:** Automatically generated at `/sitemap.xml` and `/robots.txt`.
9. **Accessibility & Reduced Motion:** Full compliance with `prefers-reduced-motion`, visible focus rings, and semantic ARIA roles.
10. **Image Provenance Safety:** All illustrative imagery is registered in `public/images/asset-manifest.json` and labeled with appropriate disclaimers.

---

## 6. Pre-Launch Owner Verification Checklist

Before publishing to a custom domain:
- [ ] Confirm exact workshop/showroom operating hours for weekdays and weekends.
- [ ] Replace illustrative architectural stock photos with actual photos of the Jodhpur factory, machinery, and completed client installations.
- [ ] Review product thickness availability (4mm, 5mm, 6mm, 8mm, 10mm, 12mm, 15mm, 19mm).
- [ ] Have company legal counsel review `app/privacy/page.js` and `app/terms/page.js`.
- [ ] Decide whether to display GSTIN on the footer.

---

## 7. Deployment Instructions (Vercel / Cloudflare / Netlify)

1. Push this project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Launch Jangid Tuff Glasses Next.js website"
   git remote add origin https://github.com/<your-username>/jangid-tuff-glasses.git
   git push -u origin main
   ```
2. Import the repository into **Vercel** or **Cloudflare Pages**.
3. Framework Preset: **Next.js**
4. Build Command: `npm run build`
5. Output Directory: `.next` (automatic)
6. Add environment variable: `NEXT_PUBLIC_SITE_URL=https://jangidtuffglasses.in`
7. Connect custom domain `jangidtuffglasses.in` and configure DNS records.
