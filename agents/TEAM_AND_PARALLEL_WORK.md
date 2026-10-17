# Antigravity Agent Team — Parallel Work Protocol

## Orchestration model
Use one **Lead / Orchestrator agent** to own the repository, requirements, integration and final QA. Delegate independent tasks to specialized agents. If Antigravity's current version supports subagents/worktrees, use isolated worktrees or branches. If not, run sequentially or assign non-overlapping files. Do not let multiple agents edit the same files concurrently.

## Agent 0 — Lead Architect / Orchestrator
**Owns:** root config, integration, architecture decisions, acceptance checklist, final QA.  
**Tasks:** read all docs, inspect repo, establish conventions, assign boundaries, review diffs, resolve conflicts, run build/lint/tests.  
**Must not:** accept unsupported business claims or TypeScript.

## Agent 1 — Research and Business Content
**Owns:** `lib/content/*`, content fact register, copy draft docs.  
**Tasks:** review supplied business links; separate verified facts from assumptions; draft brand copy and FAQs; propose page titles and local SEO copy.  
**Must not:** scrape restricted content, merge similar-named companies, fabricate testimonials, claims or specs.

## Agent 2 — UI/UX and Design System
**Owns:** `components/ui/*`, `app/globals.css`, design tokens and reusable UI components.  
**Tasks:** establish design language, responsive primitives, cards, CTA, filters, carousel, accessible menu, typography and states.  
**Must not:** alter database schema or page content files owned by other agents.

## Agent 3 — Home and Marketing Pages
**Owns:** `app/page.js`, `app/about/*`, `app/services/*`, `app/faq/*`.  
**Tasks:** build distinctive editorial layouts, content sections, CTA hierarchy, SEO metadata and responsive states.  
**Dependencies:** shared design tokens and shell API agreed with Agent 0/2.

## Agent 4 — Product Catalogue and Gallery
**Owns:** `app/products/*`, `app/projects/*`, `app/gallery/*`, related data files.  
**Tasks:** product detail templates, filters, accessible image lightbox, project card and related content.  
**Must:** distinguish real company projects from inspiration images.

## Agent 5 — Lead Generation / Backend
**Owns:** `app/contact/*`, `app/api/enquiries/*`, `lib/validation/*`, `lib/db/*`, Prisma schema and `.env.example`.  
**Tasks:** form validation, backend persistence, spam protections, WhatsApp fallback and truthful success/error states.  
**Must not:** expose secrets or store unnecessary personal data.

## Agent 6 — Motion and Performance
**Owns:** `components/motion/*`, performance report and motion utilities.  
**Tasks:** integrate Framer Motion and selective GSAP; enforce reduced motion; audit client boundaries, images, scroll behavior and bundle size.  
**Must not:** add multiple libraries for the same purpose or animate the same property via two systems.

## Agent 7 — SEO, Accessibility and QA
**Owns:** `lib/seo/*`, sitemap/robots, tests and QA reports. Coordinate any edits outside these areas through Agent 0.  
**Tasks:** metadata, structured data from verified facts, keyboard/accessibility checks, Playwright flows, broken links, responsive and performance QA.

## Parallel dependencies
1. Agent 0 sets conventions and route/component contracts.
2. Agents 1 and 2 can start in parallel.
3. Agents 3 and 4 begin after shell/tokens contracts are agreed.
4. Agent 5 can develop schema/validation independently, then integrate to the form.
5. Agent 6 works after motion boundaries are agreed.
6. Agent 7 tests the integrated build; it may prepare tests earlier but final acceptance follows integration.

## File ownership and integration
- One owner per file.
- Shared contracts documented before work starts.
- Use separate branches/worktrees when available.
- Each agent reports: changed files, decisions, assumptions, tests run, blockers.
- No agent may overwrite another agent's work without coordination.
- Lead agent reviews every merge and runs final build.
- Keep changes small and commit/checkpoint by milestone.

## Required handoff format
- Summary
- Files created/modified
- Dependencies or packages added
- Commands/tests run and result
- Unverified assumptions
- Follow-up needed

## Parallelism safety
Parallel agents should not independently run package installation or modify `package.json` at the same time. Agent 0 owns dependency installation and lockfile changes. No agent should claim a task is complete without checking the resulting files.
