# Skills, Libraries and Tools to Integrate

Important: skill packs, MCP servers and community integrations change over time. Antigravity must **check availability, current documentation, trustworthiness and compatibility** before installing anything. Do not assume a named skill is preinstalled. Do not install a skill or MCP just because a prompt mentions it.

## 1. Core framework and styling
- Next.js App Router — required.
- React — required.
- JavaScript only; no TypeScript.
- Tailwind CSS — required.
- `next/image` and Next metadata APIs.
- ESLint and Prettier or equivalent consistent formatting.

## 2. UI components and design accelerators
- **shadcn/ui** — reusable accessible primitives, selectively customized.
- **21st.dev** — discover polished UI component patterns and component prompts; inspect source and license before using.
- **Magic UI** — optional visual components; choose only what supports the art direction.
- **Aceternity UI** — optional inspiration/components; avoid stacking too many effects.
- **UI/UX Pro Max** — if a trusted, current skill/integration is available in the user's Antigravity environment, use it for design-system research and UI quality checks; verify provenance and compatibility first.
- **Lucide React** — consistent icons.

## 3. Animation and interaction
- **Framer Motion** — primary React motion library for UI states, entrances, hover/tap, menus and dialogs.
- **GSAP + ScrollTrigger** — selective cinematic scroll sequences and complex timelines.
- **Lenis** — optional smooth scrolling only if it does not compromise native scroll, accessibility or reduced-motion support.
- **Embla Carousel** or **Swiper** — choose one if a robust carousel is needed; do not add both without a concrete requirement.
- **React Three Fiber / Three.js** — optional only if a lightweight, meaningful 3D glass interaction is approved; not required for MVP and may harm performance.
- CSS transitions — preferred for simple hover/focus effects.

## 4. Forms, schema and database
- React Hook Form — form state.
- Zod — runtime validation in JavaScript.
- PostgreSQL + Prisma — proposed persistent enquiry/content backend.
- An email provider such as Resend or equivalent — only after credentials and sender domain are configured.
- Managed object storage for uploads — only if secure uploads are required.
- Rate limiting / anti-spam — select based on hosting environment.

## 5. Quality and delivery
- Playwright — end-to-end tests.
- Vitest or Jest + React Testing Library — unit/component tests.
- Lighthouse / PageSpeed Insights — performance and SEO review.
- axe-core or equivalent accessibility checks.
- Browser devtools — console, responsive, network and layout checks.
- Git branches/worktrees — parallel agent isolation and review.

## 6. MCP / connected tools
Consider only when available and necessary:
- Browser automation / browser testing MCP for visual QA.
- Documentation search MCP for current Next.js, Framer Motion, GSAP and component library docs.
- Design/Figma MCP only if the user has a Figma file or connected account.
- GitHub MCP only if the user requests repository operations and has connected it.
- Image-generation tool for concept assets; use original owner-provided photos for real business work.

Before connecting an MCP: check publisher, permissions, data sent, scope and necessity. Never paste secrets into prompts or untrusted skills.

## 7. Suggested install commands (run only after inspecting the generated project)
```bash
npm install framer-motion gsap lucide-react react-hook-form zod @hookform/resolvers
npm install @prisma/client
npm install -D prisma
npm install -D playwright @playwright/test
```
Optional, only if chosen:
```bash
npm install lenis
npm install embla-carousel-react
```
Use the current recommended setup instructions for Next.js and shadcn/ui rather than blindly running stale commands.

## 8. Animation ownership rule
- Framer Motion owns component/UI state animation.
- GSAP owns only specifically designated scroll storytelling sections.
- Never have both animate the same property on the same element.
- Provide reduced-motion alternatives and test touch/mobile.
