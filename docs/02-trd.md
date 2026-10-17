# TRD — Technical Requirements Document

## 1. Required technology stack
- Next.js App Router, JavaScript only (`.js`, `.jsx`).
- React.
- Tailwind CSS.
- Framer Motion for page transitions, micro-interactions and in-view reveals.
- GSAP + ScrollTrigger for a small number of intentional cinematic sequences only.
- Lenis optional for smooth scrolling; only add if accessibility, native scrolling, anchor links and reduced-motion behavior remain correct.
- Lucide React icons.
- shadcn/ui and/or selected 21st.dev components as a starting point; customize to match brand and avoid a generic component collage.
- React Hook Form + Zod for forms and validation.
- PostgreSQL + Prisma as a proposed production data layer.
- Vercel-compatible deployment, or another documented Next.js host.
- Vitest/Jest + React Testing Library; Playwright for critical end-to-end journeys.

## 2. JavaScript-only hard constraint
Do not create `.ts` or `.tsx` files. Do not use TypeScript annotations, interfaces, enums, generics or `as` assertions. Use JavaScript, JSDoc where useful, and runtime validation with Zod. Configure ESLint and build scripts to keep the repository JavaScript-only.

## 3. Architecture
- App Router route groups may be used to keep public pages organized.
- Server Components by default; use Client Components only for state, event handlers, animations and browser APIs.
- Shared site shell: header, mobile nav, footer, breadcrumbs, CTA, contact actions.
- Content/data separated from presentation where practical.
- Product and project detail pages use dynamic route segments driven by validated data.
- Server-side form handler or route handler validates, rate-limits and stores enquiries.
- WhatsApp fallback remains available if backend delivery fails.
- Keep provider-specific services behind small modules so they can be changed without rewriting UI.

## 4. Suggested structure
```text
app/
  layout.js
  page.js
  not-found.js
  globals.css
  about/page.js
  products/page.js
  products/[slug]/page.js
  services/page.js
  services/[slug]/page.js
  projects/page.js
  projects/[slug]/page.js
  gallery/page.js
  contact/page.js
  faq/page.js
  privacy/page.js
  terms/page.js
  thank-you/page.js
  api/enquiries/route.js
components/
  layout/
  navigation/
  hero/
  products/
  projects/
  forms/
  motion/
  ui/
lib/
  content/
  validation/
  seo/
  analytics/
  db/
  whatsapp.js
  env.js
prisma/schema.prisma
public/
  images/
  icons/
  fonts/
tests/
  unit/
  e2e/
```

## 5. Motion system
- Framer Motion: hover, card entrance, route-level transitions, modal/lightbox, accordions.
- GSAP ScrollTrigger: no more than a few hero/portfolio storytelling moments, scrubbed sections or pinned visual sequences.
- Do not animate the same element using Framer Motion and GSAP simultaneously.
- Respect `prefers-reduced-motion`.
- Do not block reading or calls to action behind animation.
- Avoid forced horizontal scroll on mobile; use a native horizontal carousel with accessible controls when appropriate.
- Avoid scroll hijacking and excessive parallax.

## 6. Media and performance
- Use `next/image` for local/remote images and configure remote hosts explicitly.
- Hero image: optimized, responsive, high priority only if above the fold.
- Below-fold images lazy-loaded.
- Use AVIF/WebP where supported.
- Reserve image dimensions to reduce layout shift.
- Use self-hosted, licensed, owner-approved images where possible.
- No fake project photos; image records should have source, rights/permission status, alt text and `isActualCompanyWork` metadata.

## 7. SEO
- Page-specific title and description metadata.
- Canonical URL configured from deployment domain.
- Open Graph and social sharing metadata.
- `sitemap.js` and `robots.js` (or equivalent valid routes).
- JSON-LD `LocalBusiness` / `Organization` only with verified fields.
- Product schema only for actual product data; no invented prices/availability.
- Internal links, breadcrumbs and semantic heading hierarchy.
- Local SEO pages must be useful, not doorway pages.

## 8. Security and privacy
- Validate all form fields on server using Zod.
- Rate-limit public endpoints and add anti-spam controls.
- Validate MIME type and size for any uploads; store uploads outside the app server or in a managed object store.
- Store secrets in environment variables; provide `.env.example` with placeholders only.
- Never commit production secrets.
- Add CSRF/origin protection as appropriate for the chosen form flow.
- Privacy notice must describe actual analytics, storage and third-party providers.
- Avoid collecting unnecessary personal data.

## 9. Accessibility
- WCAG 2.2 AA target.
- Keyboard-accessible menus, filters, accordions and modal/lightbox.
- Visible focus states.
- Meaningful alt text.
- Labels and errors connected to form fields.
- Correct reduced-motion behavior.
- Sufficient contrast and touch targets.

## 10. Testing and quality gates
- `npm run lint`
- `npm run build`
- Unit tests for validation and WhatsApp formatting.
- Playwright tests for nav, filters, quote form and contact actions.
- Manual responsive review at 360px, 768px, 1024px and 1440px.
- Lighthouse review for performance, accessibility, best practices and SEO.
- No dead links, missing images, console errors or hydration warnings.

## 11. Deployment
- Deploy preview first.
- Configure domain and canonical base URL.
- Configure database, email provider, storage and analytics only when chosen and credentials are available.
- Verify privacy policy, contact details and form delivery in production.
