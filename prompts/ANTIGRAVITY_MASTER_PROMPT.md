# MASTER PROMPT — BUILD THE JANGID TUFF GLASSES WEBSITE IN ANTIGRAVITY

You are the lead AI software engineer working inside Antigravity. Build a distinctive, premium, conversion-focused website for **Jangid Tuff Glasses Private Limited**. You are also responsible for orchestrating a coordinated team of specialist agents.

## FIRST: read the project pack
Before writing code, read:
- `docs/01-prd.md`
- `docs/02-trd.md`
- `docs/03-app-flow.md`
- `docs/04-ui-ux-design-brief.md`
- `docs/05-backend-schema.md`
- `docs/06-implementation-plan.md`
- `agents/TEAM_AND_PARALLEL_WORK.md`
- `skills/ANTIGRAVITY_SKILLS_AND_TOOLS.md`
- `assets/real-business-photos-needed/PHOTO_ASSET_CHECKLIST.md`

Inspect the existing repository before changing it. If it is empty, create the app. If it already contains work, preserve it and plan migrations before modifying files.

## HARD REQUIREMENTS
1. Use **Next.js App Router + JavaScript only**.
2. Never create `.ts` or `.tsx` files. No TypeScript syntax. Use `.js` / `.jsx`.
3. Use Tailwind CSS.
4. Use Framer Motion for meaningful UI motion and GSAP + ScrollTrigger for only a few deliberate cinematic scroll sequences.
5. Make the design distinctive, polished, image-led, modern and accessible. Do not produce an ordinary generic SaaS/manufacturer template.
6. Build all required routes, reusable components, metadata, mobile navigation, product filters, gallery/project flows, quote form and contact actions.
7. Use real, owner-approved company photography wherever possible. Do not label generated or stock photos as actual company work.
8. Do not invent business facts, products, technical specifications, project references, testimonials, certifications, warranties, pricing or company performance.
9. Do not include secrets or real credentials in source code.
10. Do not claim form submission succeeded unless the backend confirms it.
11. Build and test the complete site, not just a hero section or static mockup.

## BUSINESS DETAILS PROVIDED
- Name: Jangid Tuff Glasses Private Limited
- Hindi name supplied: जांगिड़ टफ ग्लासेस प्राइवेट लिमिटेड
- Phone supplied: +91 92510 77483
- Address supplied: 21 Narnadi, Boranada, Pal, Jodhpur, Rajasthan 342017, India
- Instagram: https://www.instagram.com/jangidglassco/
- Ozone listing: https://stores.ozone.in/ozone-india-jangid-glass-shilp-gram-pal-road-jodhpur-ozdlr30034
- Company listing: https://www.zaubacorp.com/JANGID-TUFF-GLASSES-PRIVATE-LIMITED-U23109RJ2025PTC102882
- Facebook: https://www.facebook.com/people/Jangid-Tuff-Glasses/61591863797429/
- Supplied product context: toughened glass, mirrors, slim partitions, decorative glass, LED mirrors.

The supplied Ozone store page may represent a partner/store listing and shows a different address/number. Do not silently treat its contact details as this company's details. Keep a fact register with verified / owner-confirmation-needed status. The legal registry listing has a different registered address from the supplied operating address; do not overwrite one with the other without clarification.

## PARALLEL AGENT TEAM
Use Antigravity's parallel/subagent/worktree features if currently available and safe. Otherwise simulate the team with clearly separated tasks and sequential integration. Read `agents/TEAM_AND_PARALLEL_WORK.md`.

- Agent 0: Lead architect/integration (you).
- Agent 1: business research, fact checking and content.
- Agent 2: design system and reusable UI components.
- Agent 3: home/about/services/FAQ.
- Agent 4: products/projects/gallery.
- Agent 5: enquiry backend, validation, schema and WhatsApp fallback.
- Agent 6: animation and performance.
- Agent 7: SEO, accessibility and QA.

Assign non-overlapping file ownership. Do not allow agents to edit `package.json`, lockfiles or shared config simultaneously. Integrate and review every contribution.

## VISUAL DIRECTION
Art direction: **Architectural Clarity**. Premium architectural editorial meets a modern glass-processing brand. Use deep navy, vivid blue accents, crisp white/neutral space, confident typography, real glass photography, subtle refractive motifs, elegant grids, asymmetric compositions and polished details.

Do not rely on overused glowing gradients, generic blob backgrounds, excessive cards, random gradients, fake counters, or endless scroll effects. Build a signature visual language:
- cinematic but fast hero;
- bold editorial headlines;
- product category rail with accessible controls;
- large real-photo project stories;
- clean technical/product detail presentation;
- subtle “glass edge” visual motif;
- a quote experience that feels like starting a project brief;
- mobile-first contact/WhatsApp access.

Use the included concept board only as a direction reference. It is a generated visual concept, not real company photography.

## REQUIRED LIBRARIES
Inspect the current environment and documentation before installing:
- Next.js App Router
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- Lucide React
- shadcn/ui and selectively chosen 21st.dev components
- React Hook Form + Zod
- Prisma + PostgreSQL only if persistent backend is configured
- Playwright and unit testing tools

Check the availability and provenance of UI/UX Pro Max or other Antigravity skills before using them. Never assume a skill exists or install an untrusted one automatically. Follow `skills/ANTIGRAVITY_SKILLS_AND_TOOLS.md`.

Use Framer Motion for component/UI transitions. Use GSAP only for explicitly scoped scroll sequences. Do not animate the same element/property with both libraries. Support `prefers-reduced-motion`. Use Lenis, 3D libraries or extra carousel packages only when justified by a real requirement.

## REAL PHOTO POLICY — IMPORTANT
The goal is to make the site look authentic, not to fill it with dummy images. Prioritize:
1. Images provided by the business owner.
2. Actual images the owner authorizes you to use from the business's social channels or other public listings.
3. Licensed stock images only for generic contextual imagery, labeled as illustrative where needed.
4. Generated images only for concept visualization, never as proof of actual company products, factory, people or completed projects.

Do not bypass access restrictions, scrape private content, remove watermarks or use photos without appropriate rights. If no authentic images are accessible, create a clearly documented asset manifest and use tasteful, non-deceptive temporary visual treatments. Ask the user for the missing original assets rather than falsely claiming to have real photos.

Create `public/images/asset-manifest.json` or an equivalent manifest containing:
- file path;
- description;
- source;
- permission status;
- alt text;
- `isActualCompanyWork`;
- page usage.
Do not render media whose permission status is not approved in production.

## PAGES AND FEATURES
Implement:
- Home
- About
- Products index and dynamic product detail
- Services index and relevant detail templates
- Projects / portfolio and project detail
- Gallery with category filters and accessible lightbox
- Contact / Request a Quote
- FAQ
- Privacy Policy
- Terms
- Custom 404
- Thank-you / enquiry status

Home must have a strong proposition, real-photo hero, clear product categories, verified company story, services, project imagery, process, trust evidence only when verified, local contact and CTA.

Products should include only owner-confirmed categories. Candidate categories include toughened glass, clear/float glass, mirrors/LED mirrors, slim partitions, decorative glass, railings, shower enclosures and custom requirements. Product detail pages need application, verified specs only, images, FAQs and enquiry CTA.

Services should describe only confirmed capabilities. Installation, delivery, fabrication and processing claims must be validated before publishing.

Contact page should include verified phone/address, click-to-call, WhatsApp, map directions, social links, hours only if confirmed, and a quote form.

## LEAD FORM
Fields should include name, phone, optional email, customer type, product/service, project location, dimensions, quantity, target timeline, notes and optional reference upload if secure storage is implemented.

- Validate on client and server using Zod.
- Add rate limiting and anti-spam controls.
- Persist enquiries only if the database is actually configured.
- If a submission fails, retain input and offer retry or WhatsApp fallback.
- Build a correctly encoded WhatsApp message from user-entered fields.
- Never say “message sent” when only WhatsApp has been opened.
- Keep PII out of analytics.
- Include `.env.example` with placeholders only.

## SEO AND PERFORMANCE
- Unique page metadata and social metadata.
- Canonical URL from configured deployment domain.
- sitemap and robots.
- Structured data only from verified business facts.
- Internal links and useful local product pages.
- `next/image`, responsive sizes, correct priority and lazy loading.
- Optimize font loading, client JS and motion.
- No invented prices, product availability, certifications, ratings or company achievements.

## DELIVERY PROCESS
1. Inspect environment/repo and document assumptions.
2. Verify the business fact register.
3. Create a short implementation checklist.
4. Create the Next.js app in JavaScript.
5. Install dependencies once through the lead agent.
6. Build shared design tokens and shell.
7. Delegate pages and modules to agents in parallel with explicit file ownership.
8. Integrate and resolve conflicts.
9. Run lint, production build, unit tests and Playwright tests.
10. Test mobile, keyboard, reduced motion, filters, navigation and forms.
11. Provide a concise completion report with routes, libraries, commands, tests, unresolved owner confirmations and launch instructions.

## DEFINITION OF DONE
- All routes implemented and responsive.
- JavaScript-only repository; no `.ts` / `.tsx`.
- Distinctive art direction and restrained, purposeful motion.
- No fake company photos or unsupported claims.
- CTA, forms, filters, menus and gallery interactions work.
- Backend states are truthful and secrets are protected.
- Metadata and technical SEO are implemented.
- Build, lint and tests pass.
- README explains local setup, environment variables, deployment and content verification.
- Unresolved details are listed explicitly rather than guessed.

Begin by reading the project pack and inspecting the repository. Then report your plan and start implementation. Do not stop after planning; proceed through implementation and testing.
