# UI/UX Design Brief — “Architectural Clarity”

## 1. Creative direction
Make the website feel like a premium architectural editorial and a glass-processing brand—not an off-the-shelf industrial template. Combine bright gallery-like layouts with occasional deep navy cinematic sections. Use strong typography, carefully art-directed real photography, asymmetric compositions, fine linework and deliberate negative space.

## 2. Design principles
- Product photography leads; copy supports it.
- Show real evidence, not invented claims.
- Each section has one primary purpose and one clear CTA.
- Use generous spacing and consistent grids.
- Alternate light editorial sections with dark immersive project sections.
- Prefer a few memorable interactions over animation everywhere.
- Mobile-first, accessible and fast.

## 3. Color system
- Midnight Navy: `#08233F`
- Signal Blue: `#0878D1`
- Ice Blue: `#EAF5FF`
- White: `#FFFFFF`
- Slate: `#64748B`
- Ink: `#132B45`
- Soft neutral background: `#F6F8FA`
Use blue for action and focus, not every decoration. Maintain WCAG contrast.

## 4. Typography
Use a modern display family such as Manrope or Plus Jakarta Sans for headings and Inter for body UI. Self-host if licensing and deployment permit. Use a responsive type scale and keep body copy comfortable to read.

## 5. Signature layout ideas
- Oversized hero headline over real architectural glass photography.
- A thin “glass edge” motif and light refraction gradient used sparingly.
- Horizontal product rail on mobile with visible partial next card.
- Project case-study cards with location, product category and a short brief—but only when actual project data is available.
- Split-screen story section: image on one side, concise proof/content on the other.
- A quote panel that feels like a project brief, not a generic contact form.
- Sticky project CTA on mobile, respecting safe areas and not covering content.
- Optional horizontal storytelling only on desktop, with normal vertical fallback on mobile.

## 6. Motion library rules
### Framer Motion
Use for:
- subtle page/section entrance;
- hover and tap feedback;
- card interactions;
- accordion and dialog transitions;
- mobile menu;
- lightbox.

### GSAP + ScrollTrigger
Use selectively for:
- one hero image/text choreography;
- a portfolio storytelling sequence;
- a carefully bounded pinned section if it genuinely improves comprehension.

### Lenis (optional)
Use only if the implementation has a strong reason. Native scroll must remain usable; support reduced motion and anchor navigation. Do not add it simply because it is fashionable.

### Rules
- Follow `prefers-reduced-motion`.
- Do not animate all elements in every viewport.
- Avoid large parallax on mobile.
- Avoid scroll hijacking.
- Keep animations short, purposeful and non-blocking.
- Do not let Framer Motion and GSAP control the same property on the same element.
- Ensure text and CTAs are immediately usable even before animation completes.

## 7. Component library and interaction inventory
- Responsive header / mobile menu.
- Hero with primary and secondary CTA.
- Product cards and product detail header.
- Horizontal product carousel with accessible previous/next controls.
- Project cards and project details.
- Category filter chips.
- Image gallery / accessible lightbox.
- CTA banner.
- Service cards.
- Process steps.
- FAQ accordion.
- Quote form with field-level errors.
- Phone / WhatsApp actions.
- Breadcrumbs.
- Footer with legal and social links.
- Skeleton/loading and empty states if data is remote.
Use shadcn/ui and selected 21st.dev components as accelerators, then customize. Do not paste components blindly.

## 8. Image art direction
Prioritize real photos supplied by the company:
1. Factory exterior/interior and processing equipment.
2. Toughened glass products/edges/handling.
3. Mirrors and LED mirror details.
4. Partitions and modern interiors.
5. Decorative glass samples.
6. Real completed installations.
7. Team or process images with permission.
8. Short vertical factory/project videos if available.

Create a consistent image crop system, but preserve meaningful subject matter. Record source and permission status. Do not represent generated/stock images as actual work. Do not scrape or reuse social media images without appropriate permission.

## 9. Responsive behavior
- Mobile: one-column content, swipeable horizontal rails with buttons, simple transitions, sticky bottom actions only if not obstructive.
- Tablet: two-column editorial sections and compact grids.
- Desktop: asymmetric editorial grids, large project images and selective cinematic motion.
- Test 360, 390, 768, 1024, 1280 and 1440 px widths.

## 10. Accessibility
- Keyboard operation for all controls.
- Focus visible and focus not trapped behind overlays.
- Proper heading order and landmark regions.
- Alt text describing relevant image content.
- Reduced-motion support.
- Do not rely on color alone to communicate active state.
- Form labels, errors, status announcements and clear consent.
