# Implementation Plan and Definition of Done

## Phase 0 — Discovery and verification
- Read all project documents and supplied business links.
- Create a business facts register with source, confidence and verification status.
- Identify conflicting addresses/phone numbers/business names; do not silently merge records.
- Ask for original company photos, logo, exact product range, services, hours and approved project references.
**Exit:** content assumptions are documented and unverified claims are excluded.

## Phase 1 — Repository foundation
- Create Next.js App Router project in JavaScript.
- Configure Tailwind, ESLint, formatting and scripts.
- Install selected animation/icon/form libraries.
- Set global tokens, typography, shared layout and responsive header/footer.
- Add error, loading and not-found states.
**Exit:** clean build, no TS files, shared shell works on mobile.

## Phase 2 — Design system and core components
- Build buttons, cards, section headings, badges, CTAs, form controls, breadcrumbs, filters and carousel.
- Add accessible motion utilities and reduced-motion behavior.
- Establish image metadata/rights workflow.
**Exit:** reusable components documented; no duplicate conflicting animation systems.

## Phase 3 — Marketing pages
- Build Home, About, Products, Product Detail, Services, Projects, Gallery, Contact and FAQ.
- Use verified data and real approved photography.
- Add responsive product rails, project gallery, filters and lightbox.
**Exit:** all pages complete with consistent navigation and valid CTAs.

## Phase 4 — Lead generation
- Implement validated quote form.
- Add backend endpoint and persistence only after environment/database are configured.
- Add email notification if provider is chosen.
- Implement WhatsApp fallback with truthful states.
- Add spam/rate controls.
**Exit:** tests confirm both success and failure paths; no fake success.

## Phase 5 — SEO and performance
- Metadata, canonical domain, sitemap, robots, structured data and social sharing.
- Optimize images and fonts; review client JavaScript.
- Add internal links and useful FAQs.
**Exit:** no invented structured-data claims; performance and accessibility reviewed.

## Phase 6 — QA
- Unit tests for validation, URL/message encoding and data helpers.
- Playwright tests for navigation, filters, forms, phone and WhatsApp actions.
- Visual review at 360, 390, 768, 1024, 1280 and 1440 widths.
- Keyboard-only, reduced-motion and screen-reader spot checks.
- Fix console, hydration, broken-link and missing-image errors.
**Exit:** build, lint, tests pass; critical flows work.

## Phase 7 — Launch
- Configure domain, HTTPS, production env, database and backups.
- Verify contact details, legal pages, image rights, consent and enquiry delivery.
- Add Search Console and approved analytics.
- Create a maintenance guide.
**Exit:** owner signs off content and test enquiries are received.

## Suggested agent milestones
- Day 1: discovery, brand facts, architecture and wireframe.
- Days 2–3: shared system and page skeletons.
- Days 3–5: page implementation and approved media.
- Days 5–6: forms, SEO, QA and polish.
These are planning estimates, not guaranteed delivery times.

## Release checklist
- [ ] No `.ts` / `.tsx` files or TypeScript syntax.
- [ ] Every page has unique title/description.
- [ ] No invented testimonials, ratings, project claims, product specifications or certifications.
- [ ] All photo permissions and captions checked.
- [ ] All CTAs tested.
- [ ] Enquiry delivery tested end-to-end.
- [ ] Mobile menu and filters keyboard accessible.
- [ ] Reduced motion supported.
- [ ] Sitemap, robots and canonical host configured.
- [ ] Privacy notice matches actual implementation.
- [ ] Production build and tests pass.
