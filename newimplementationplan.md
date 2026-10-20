# MASTER EXECUTION PROMPT — JANGID TUFF GLASSES PRIVATE LIMITED
## Final Website Enhancement, Premium UI/UX, Full-Stack Audit, QA, SEO & Security Hardening

Act as a senior full-stack software architect, premium website designer, architectural-glass industry consultant, accessibility specialist, SEO engineer, QA automation engineer, and ethical application security tester.

You are working on my existing website project for **Jangid Tuff Glasses Private Limited**, located in Jodhpur, Rajasthan, India.

Your responsibility is to inspect, improve, complete, test, and polish the EXISTING project until it is production-ready. Treat this as the final comprehensive improvement pass, not a quick redesign or a new project.

**IMPORTANT: Do not merely provide recommendations, screenshots, a plan, or sample code. Work directly inside the existing project, implement the improvements, run the available tests, fix discovered problems, and verify the final result.**

---

# 1. PROJECT LOCATION AND EXECUTION RULES

The existing project is located at:

`E:\jangid`

Before making any modifications:

1. Inspect the complete project structure.
2. Read `package.json`, `README.md`, `lib/constants.js`, `lib/seo.js`, `lib/utils.js`, all route files, all reusable components, `globals.css`, image manifests, and relevant documentation.
3. Inspect existing Git status and preserve unrelated user changes.
4. Identify the current Next.js version, installed dependencies, Tailwind configuration, routing conventions, and existing functional behavior.
5. Run the existing application and capture its current build, lint, runtime, and browser-console status.
6. Create a sensible rollback point or Git checkpoint without overwriting existing work.
7. Maintain a task checklist and execute it systematically.

Do not delete or replace working functionality simply because a different implementation seems easier.

Do not stop after inspection. Continue through implementation, verification, bug fixing, and final reporting.

If an operation requires permission, approval, credentials, or access unavailable to you, clearly identify that limitation and continue with all other work.

## Strict technology requirements

- Next.js 16 App Router, respecting the actual installed compatible version.
- Pure JavaScript and JSX only: `.js` and `.jsx`.
- NO TypeScript, `.ts`, `.tsx`, TypeScript annotations, or TypeScript migration.
- Tailwind CSS v4, following the existing project configuration.
- Framer Motion for appropriate interactive elements and transitions.
- GSAP only for justified cinematic effects and scroll animations.
- `lucide-react` for icons.
- React Hook Form and Zod if compatible with the existing project and useful for forms.
- Reuse `clsx`, `tailwind-merge`, and the existing `cn()` helper.
- Reuse existing dependencies wherever possible.
- Do not introduce unnecessary packages or incompatible major-version upgrades.
- Do not create a second application or move the project into a different directory.

Preserve all valid existing environment variables and local configuration. Never expose secrets in source code, logs, screenshots, commits, or the final report.

---

# 2. BUSINESS IDENTITY — SINGLE SOURCE OF TRUTH

Use the following business information as the authoritative project context.

Company: Jangid Tuff Glasses Private Limited  
Brand: Jangid Tuff Glasses  
Hindi name: जांगिड़ टफ ग्लासेस प्राइवेट लिमिटेड  
Tagline: Glass that brings your vision to life.  
Primary contact: Karan Jangid  
Telephone: +91 81073 88855  
Click-to-call: `tel:+918107388855`  
WhatsApp: `https://wa.me/918107388855`  
Notification emails: `info@jangidtuffglasses.in`, `contact@jangidtuffglasses.in`

Address: 21 Narnadi, Boranada, Pal, Jodhpur, Rajasthan 342017, India.

Business hours: Monday–Saturday, 9:00 AM–7:00 PM IST. Display a note advising visitors to call and confirm availability.

Primary website: `https://jangidtuffglasses.in`

Fallback deployment URL: `https://jangid-tuff-glasses-pvt-ltd.vercel.app`

Instagram: `https://www.instagram.com/jangidglassco/`

Facebook: `https://www.facebook.com/people/Jangid-Tuff-Glasses/61591863797429/`

Ozone partner listing:
`https://stores.ozone.in/ozone-india-jangid-glass-shilp-gram-pal-road-jodhpur-ozdlr30034`

Company CIN supplied by the project owner: `U23109RJ2025PTC102882`.

Existing ZaubaCorp URL:
`https://www.zaubacorp.com/company/JANGID-TUFF-GLASSES-PRIVATE-LIMITED/U25209RJ2024PTC098277`

IMPORTANT DATA INTEGRITY REQUIREMENT:

The supplied CIN and the company identifier embedded in the ZaubaCorp URL appear inconsistent. Do not silently present inconsistent registration information as verified. Check authoritative MCA records when accessible, document the discrepancy, and do not invent registration dates, certifications, accreditations, warranties, or legal claims.

Keep the project's company facts centralized in `lib/constants.js`. All components, metadata, structured data, contact buttons, forms, and footer links must derive their business details from the central constants wherever appropriate.

Do not duplicate phone numbers, addresses, product catalogs, service descriptions, opening hours, or social links throughout the codebase.

---

# 3. PRESERVE THE EXISTING WEBSITE AND ALL HERO IMAGES

The current project contains these routes:

- `/`
- `/about`
- `/products`
- `/products/[slug]`
- `/services`
- `/gallery`
- `/contact`
- `/faq`
- `/privacy`
- `/terms`
- `/thank-you`

Also inspect and preserve the existing dynamic sitemap, robots configuration, root layout, 404 page, navigation, footer, and WhatsApp floating button.

## Non-negotiable image rule

**DO NOT CHANGE, REPLACE, REGENERATE, RE-CROP, OR MODIFY THE EXISTING HERO IMAGES ON ANY PAGE.**

This includes the homepage hero and every inner-page hero, including their current image sources, crop positions, and existing visual composition.

Inspect and record the current hero image sources before editing.

You may improve text contrast, responsive positioning, overlays, typography, buttons, and layout around the hero images, but preserve the original images themselves and their existing intended crops.

Replace only the OTHER outdated, generic, duplicated, low-quality, unrelated, dummy, or unsuitable photographs.

Do not change a hero image indirectly by modifying a shared image mapping or a shared component default.

After implementation, verify that every original hero image source remains unchanged.

---

# 4. PREMIUM DESIGN DIRECTION

Transform the existing website into a premium architectural-glass, luxury-interiors, and glass-hardware brand experience.

The result should feel like a sophisticated architectural studio combined with an established glass fabrication and interior solutions company.

Use these reference qualities as inspiration, without copying another website:

- High-end architectural photography.
- Luxury residential and commercial interiors.
- Large editorial headings.
- Spacious layouts and deliberate visual hierarchy.
- Precise grids and refined alignment.
- Glass reflections, translucent surfaces, and restrained blur.
- Subtle metallic hardware details.
- Premium material close-ups.
- Strong photographic storytelling.
- Smooth, purposeful transitions.
- Refined interactive product presentation.

## Existing brand palette

Preserve and refine the established identity:

- Deep navy: `#08233f`
- Brand blue: `#0284c7`
- Accent blue: `#0ea5e9`
- Ice blue: `#f0f9ff`
- White: `#ffffff`
- Light slate: `#f8fafc`
- Slate text and borders.

Use deep navy, white, subtle cool-gray surfaces, and restrained blue accents consistently.

Do not turn every section into a gradient or glassmorphism panel. Luxury comes from proportion, typography, quality imagery, whitespace, and consistency.

## Typography

Retain Inter unless inspection reveals a concrete reason to improve the existing font implementation.

Establish a consistent type scale for headings, body copy, metadata, labels, and buttons.

Use responsive typography with appropriate line lengths and clear hierarchy.

## Interaction quality

Implement refined interactions where they improve usability:

- Subtle image zoom on hover.
- Clear hover and focus states.
- Smooth mobile navigation.
- Responsive dropdowns and accordions.
- Product filter transitions.
- Gallery lightbox with keyboard support.
- Meaningful button feedback.
- Scroll reveals that do not delay reading.
- Respect for `prefers-reduced-motion`.

Avoid excessive animation, forced scrolling, cursor gimmicks, constant background movement, oversized transitions, and effects that reduce performance.

The website must remain fast, readable, professional, and usable without animations.

---

# 5. REMOVE ALL DUMMY CONTENT AND USE RELEVANT REAL CONTENT

Audit every page, product card, service card, FAQ, gallery item, footer link, testimonial, review, statistic, badge, and CTA.

Remove:

- Lorem ipsum.
- Placeholder paragraphs.
- Generic unrelated stock photos.
- Fake testimonials.
- Fake customer reviews and ratings.
- Invented client names.
- Invented project counts.
- Unsupported claims such as “No. 1 in Rajasthan.”
- Unverified manufacturing certifications.
- Fake warranties and guarantees.
- Fake awards, partnerships, or completed projects.
- Buttons that do nothing.
- Empty links.
- Broken links.
- Duplicate content.
- Dead-end navigation.
- Fake addresses and phone numbers.
- Outdated or irrelevant images.
- Unsupported claims about technical performance.

Replace these with accurate, useful, business-specific content.

When verified project photography or company-specific information is unavailable, use an appropriately relevant architectural or product photograph and clearly distinguish illustrative imagery from actual company work.

Do not fabricate company history, factory capacity, employee counts, client portfolios, customer reviews, installation coverage, or product availability.

Every CTA must have a meaningful destination or action.

---

# 6. PREMIUM PHOTOGRAPHY AND IMAGE ASSET AUDIT

Audit the entire `public/images/` directory, all image imports, the asset manifest, and any remote image sources.

For every non-hero image:

1. Identify what the image actually depicts.
2. Identify the product, service, or section where it is used.
3. Replace irrelevant or duplicated images.
4. Select imagery that accurately matches the associated heading and content.
5. Prefer high-quality architectural photography, realistic glass installations, genuine material textures, and premium interior design photography.
6. Maintain consistent color treatment and appropriate crops.
7. Use descriptive filenames and meaningful alternative text.
8. Verify every local image exists and loads successfully.
9. Update the asset manifest with source, provenance, licensing information where known, and replacement status.
10. Remove unused assets only after confirming they are not referenced anywhere else.

## Required image subjects

Prioritize premium, relevant imagery for:

- Frameless toughened-glass doors.
- Architectural glass facades.
- Modern office partitions.
- Luxury shower enclosures.
- LED vanity mirrors.
- Decorative fluted and reeded glass.
- Glass stair railings and balconies.
- Custom glass table tops.
- Modern kitchens with glass backsplashes.
- Luxury bedrooms and wardrobes with mirrors.
- Contemporary bathrooms.
- Glass and metal architectural hardware.
- Aluminum profiles and partition systems.
- Stainless-steel hinges, handles, patch fittings, clamps, and connectors.
- Interior designers reviewing material samples.
- Architects working with glass drawings.
- Professional fabricators and installers.
- Precision glass cutting, edge polishing, and tempering.
- Contemporary living rooms and premium commercial interiors.

Do not use the same hero-like photograph for multiple unrelated products.

## Finding and sourcing photographs

Use official company social profiles as a priority for identifying authentic company work.

Official profiles:

- `https://www.instagram.com/jangidglassco/`
- `https://www.facebook.com/people/Jangid-Tuff-Glasses/61591863797429/`

Inspect accessible public posts, photographs, and project imagery where the platform permits it.

Use actual company photographs only when the image can genuinely be retrieved and its usage is permitted. Prefer images supplied by the owner or otherwise clearly authorized.

Do not bypass login walls, scrape private content, evade access controls, or download material in violation of platform restrictions.

If an image cannot be accessed, do not pretend to have imported it.

Use high-quality photographs from reputable, appropriately licensed sources when genuine company images are unavailable. Prefer official manufacturer image libraries for relevant glass hardware and profiles, subject to usage permissions.

For every external image, record its source URL and licensing status where available. Do not label an image as company-owned or as an actual Jangid Tuff Glasses project unless verified.

Do not hotlink unreliable sources if a legally reusable, optimized local asset is available.

Optimize images for quality and performance. Use Next.js Image where appropriate, appropriate responsive sizing, modern image formats where supported, lazy loading for below-the-fold content, and suitable priority settings for genuinely critical above-the-fold assets.

Preserve the existing hero assets and their source paths throughout this work.

If the available environment cannot download or legally verify a particular image, continue using a verified alternative and document the limitation.

---

# 7. EXPAND THE BUSINESS PRESENTATION BEYOND GLASS PRODUCTS

Jangid Tuff Glasses should be presented as a glass fabrication, architectural hardware, profile, and interior glass solutions business.

However, do not imply that every service or item is currently stocked, manufactured, installed, or available unless verified.

Create clear, well-organized website content for these areas where supported by the existing business offering.

## A. Architectural glass

- Toughened glass.
- Float and clear glass.
- Custom architectural glass.
- Glass facades and suitable structural glazing applications.
- Glass partitions.
- Balustrades and railing systems.
- Glass canopies and other custom architectural elements.

## B. Bathroom and interior solutions

- Frameless and semi-frameless shower enclosures.
- Sliding shower systems.
- LED and decorative mirrors.
- Glass partitions and room dividers.
- Glass table tops.
- Kitchen backsplashes.
- Wardrobe and cabinet glass.
- Decorative fluted, frosted, tinted, and lacquered glass.

## C. Architectural hardware and profiles

Organize suitable hardware categories such as:

- Door handles and pull handles.
- Glass door hinges.
- Patch fittings.
- Floor springs and compatible door-control hardware.
- Shower hinges and clamps.
- Glass connectors and spigots.
- Railing fittings.
- Stainless-steel accessories.
- Aluminum profiles and partition framing systems.
- Sliding systems and suitable related accessories.

Use Ozone, Dorma, Godrej, or other brand names only when the actual product relationship and availability can be supported.

An existing Ozone partner listing does not automatically establish authorization to use every brand logo or claim to be an official dealer for every product. Verify the exact relationship before displaying dealer badges or brand partnership claims.

Do not invent hardware SKUs, manufacturer specifications, prices, stock status, or certifications.

## D. Interior design and project support

Create polished content around:

- Glass selection consultations.
- Material and finish selection.
- Glass and hardware coordination.
- Interior designer and architect collaboration.
- Residential renovation projects.
- Commercial office interiors.
- Retail and showroom interiors.
- Bathroom and wardrobe upgrades.
- Project measurement and fabrication coordination.
- Installation guidance and suitable professional referrals.

Only claim direct interior design execution or installation services if supported by the existing business and confirmed project information.

The site should communicate these capabilities through real, relevant visual storytelling instead of generic marketing paragraphs.

---

# 8. CENTRALIZED PRODUCT CATALOG

Preserve the nine existing core product slugs and improve their descriptions, imagery, specification presentation, internal links, and quote actions.

1. `toughened-glass`
2. `float-clear-glass`
3. `mirrors-led-mirrors`
4. `slim-glass-partitions`
5. `shower-enclosures`
6. `railing-balustrade-glass`
7. `decorative-glass`
8. `glass-table-tops`
9. `custom-architectural-glass`

The product catalog must contain accurate information about:

- Product type.
- Typical applications.
- Available finishes where applicable.
- Common thickness options where relevant.
- Customization possibilities.
- Relevant hardware.
- Appropriate maintenance guidance where supported.
- Important safety considerations.
- Related products.
- Quote request actions.

Use the supplied project specifications as initial reference data, but distinguish typical options from confirmed inventory and final project specifications.

For example, do not imply that every thickness or special coating is always available.

For toughened glass, explain that it cannot generally be cut, drilled, or edge-machined after the tempering process. Such processing must be planned before tempering and confirmed for the particular application.

Do not promise structural suitability based solely on thickness. Appropriate glass specification depends on dimensions, loads, support conditions, applicable standards, and project-specific engineering.

Create a visually premium dynamic product detail template that works for all nine slugs.

Implement:

- Relevant product photography.
- Technical highlights.
- Application cards.
- Finish and thickness information where applicable.
- Related products.
- Clear quote CTA.
- Breadcrumb navigation.
- Correct page metadata.
- Appropriate structured data where eligible.
- Good mobile behavior.

Implement `generateStaticParams()` for known product slugs if appropriate to the installed Next.js architecture.

Ensure unknown product slugs produce a proper 404 response using Next.js conventions.

---

# 9. IMPROVE EVERY PAGE

## Homepage `/`

Retain the existing hero image exactly.

Improve the surrounding layout, typography, contrast, and CTA placement without replacing the hero image.

Audit and improve:

- Premium introductory section.
- Business capability overview.
- Product category navigation.
- Featured products.
- Architectural glass applications.
- Interior and bathroom solutions.
- Hardware and profiles.
- Fabrication capabilities.
- Realistic workflow presentation.
- Gallery preview.
- Trust-building information based only on verified facts.
- FAQ preview.
- Final quote CTA.

Make the homepage feel like a coherent luxury architectural brand rather than a generic template.

Do not add fabricated numerical statistics to fill empty space.

## About `/about`

Improve company introduction, mission, vision, values, manufacturing and consultation capabilities, service area, and contact information.

Keep the narrative factual. Do not invent a founding story or staff credentials.

Use relevant non-hero imagery showing architecture, materials, fabrication, or verified company activity.

## Products `/products`

Implement functional category filtering, clear category labels, meaningful descriptions, consistent image ratios, and responsive product cards.

Ensure filters actually change visible products and that empty states are handled correctly.

Add intuitive links between product categories and relevant hardware or interior applications.

## Product detail `/products/[slug]`

Implement a complete, reusable dynamic product detail page for every known slug.

Ensure specifications, imagery, related products, CTA destinations, and metadata are appropriate to the selected product.

## Services `/services`

Present the six established services:

1. Glass product consultation.
2. Custom sizing and precision cutting.
3. Mirror and LED crafting.
4. Architectural glass systems.
5. Site coordination and logistics.
6. Installation guidance and hardware pairing.

Create a refined four-step workflow:

1. Initial requirements.
2. Specification review.
3. Precision fabrication.
4. Inspection and dispatch.

Use relevant photography and visual process explanations. Do not imply an installation service where only guidance or referrals are offered.

## Gallery `/gallery`

Build a premium, filterable visual gallery with sensible categories such as:

- Architectural glass.
- Shower enclosures.
- Mirrors.
- Partitions.
- Railings.
- Decorative glass.
- Interior applications.
- Hardware and profiles.

Use verified company photographs where available and licensed illustrative images elsewhere.

Label illustrative inspiration appropriately.

Implement an accessible full-screen lightbox with:

- Escape to close.
- Left and right arrow navigation.
- Visible close button.
- Appropriate focus handling.
- Keyboard navigation.
- Image alternative text.
- Mobile swipe support if practical.
- Background scroll locking.
- Correct focus restoration when closed.

Ensure the gallery remains functional when images fail to load.

## Contact `/contact`

Improve the quote builder and direct-contact section.

Include:

- Full name.
- Phone number.
- Optional email.
- Product or category.
- Project location.
- Approximate dimensions.
- Quantity.
- Timeline.
- Project details.
- Required consent checkbox.

Support URL preselection through `/contact?product=shower-enclosures` and all other valid product slugs.

Validate and sanitize form values appropriately.

Do not collect more personal information than needed.

Provide a clear privacy notice and ensure consent is meaningful.

On submission, build a readable, correctly URL-encoded WhatsApp message and open:

`https://wa.me/918107388855`

Use the existing `buildWhatsAppUrl()` helper or improve it without duplicating its functionality.

Use a clear fallback if the browser blocks the popup. Preserve the user's completed form data if WhatsApp cannot open.

Do not tell the user the enquiry was sent successfully: the website only prepares the WhatsApp message until the user sends it.

Provide functional direct-call, WhatsApp, map, and email links.

Validate map embeds and use a privacy-conscious approach where practical.

## FAQ `/faq`

Keep the ten verified FAQ topics, improving wording and usability where appropriate.

Build accessible accordions with correct keyboard behavior and clear expanded states.

Ensure the answers are consistent with the actual business capabilities and the rest of the site.

## Privacy `/privacy`

Provide accurate information about what the current website actually collects and processes.

Inspect analytics scripts, form handling, cookies, embedded maps, external resources, and any real backend integration before making claims.

Clearly explain that the current WhatsApp quote flow opens an externally handled conversation and does not itself confirm that an enquiry was delivered.

Do not claim GDPR compliance, legal approval, or certifications without evidence.

## Terms `/terms`

Ensure all published terms accurately reflect confirmed business policies.

Avoid inventing warranty durations, guaranteed delivery dates, fixed fabrication tolerances, refund policies, or payment terms.

If policies are not confirmed, use clear language explaining that project-specific terms will be confirmed in the quotation or order confirmation.

## Thank-you `/thank-you`

Make the page useful and consistent with the actual submission workflow.

Do not show a success state that implies a WhatsApp message was delivered when the customer has only opened the chat.

Provide a clear route back to products, contact details, and next steps.

## Not-found, sitemap, robots, and layout

Ensure:

- A polished 404 page.
- Correct internal links.
- No invalid dynamic routes.
- A valid dynamic sitemap containing canonical production URLs.
- A valid robots response.
- Consistent metadata and canonical handling.
- Accessible header, navigation, footer, and floating WhatsApp button.
- No duplicated global elements.
- Correct server/client component boundaries.

---

# 10. NAVIGATION AND LINK AUDIT

Inspect every internal and external link in the entire application.

Build a link inventory and verify:

- Internal route targets exist.
- Product slugs resolve correctly.
- Footer links work.
- Breadcrumbs work.
- Header and mobile navigation work.
- Product cards navigate to the correct product.
- Quote buttons pass the appropriate product slug.
- Social links open the correct accounts.
- Phone links use the correct `tel:` URI.
- WhatsApp links use the correct international number.
- Email links use verified addresses.
- Map links point to the correct Jodhpur address.
- Ozone listing points to the provided listing.
- No placeholder `href="#"` links remain unless there is a justified, accessible interaction.
- No accidental navigation to development hosts or localhost exists in production-facing links.
- External links use safe target and rel attributes when appropriate.

Do not treat every external website as trustworthy just because a link is supplied.

For any third-party destination, verify the domain and actual destination when network access is available.

---

# 11. WHATSAPP AND LEAD CAPTURE TESTS

Test the complete lead flow.

Test cases must include:

1. Every valid product query parameter.
2. Missing product query parameter.
3. Invalid product slug.
4. Empty required fields.
5. Invalid phone number.
6. Optional empty email.
7. Invalid email.
8. Long project notes.
9. Special characters and Hindi text.
10. Ampersands, plus signs, and line breaks.
11. Consent unchecked.
12. Consent checked.
13. Repeated submissions.
14. Browser popup blocking.
15. WhatsApp unavailable or external navigation failure.
16. Mobile and desktop behavior.
17. Preservation of form state after an unsuccessful launch.

Confirm that generated messages contain the intended field values and are correctly URL-encoded.

Do not expose private enquiry details in analytics or console logs.

Do not claim a backend notification email is operational unless a real, configured integration exists.

If the project currently has no working enquiry backend, preserve the WhatsApp-first approach and accurately document the absence of server-side delivery confirmation.

---

# 12. PERFORMANCE OPTIMIZATION

Measure performance before and after changes wherever tools permit.

Audit:

- Excessive JavaScript.
- Unnecessary client components.
- Heavy animation libraries.
- Unoptimized photographs.
- Duplicate image downloads.
- Layout shifts.
- Slow font loading.
- Unnecessary network requests.
- Blocking scripts.
- Large DOM trees.
- Hydration warnings.
- React rendering problems.
- Excessive blur and shadow effects.
- Expensive scroll listeners.
- Memory leaks in event listeners.
- Unnecessary dependencies.

Use dynamic imports where justified.

Use Next.js Image and appropriate image sizing.

Lazy-load below-the-fold content where appropriate.

Keep critical above-the-fold content responsive and fast.

Avoid making every page a client component.

Use Server Components for static content and data where appropriate, and Client Components only for actual interactivity.

Preserve SEO and ensure the site does not depend on JavaScript for basic access to essential content.

Aim for strong Core Web Vitals and, where Lighthouse testing is available, target scores of 90 or higher for performance, accessibility, best practices, and SEO. Treat these as goals, not fabricated results.

Document actual measured scores and remaining constraints.

---

# 13. SEO AND STRUCTURED DATA

Audit and improve:

- Page titles.
- Meta descriptions.
- Canonical URLs.
- Open Graph metadata.
- Social sharing images.
- Twitter card metadata.
- Heading hierarchy.
- Image alt text.
- Internal linking.
- Product metadata.
- Sitemap coverage.
- Robots rules.
- Duplicate metadata.
- Indexability.
- Redirect behavior.
- Broken canonical URLs.

Focus on relevant local search intent, including:

- Toughened glass in Jodhpur.
- Glass fabrication in Jodhpur.
- Glass partitions in Jodhpur.
- Shower enclosures in Jodhpur.
- LED mirrors in Jodhpur.
- Architectural glass and hardware in Jodhpur.
- Custom glass cutting and fabrication.
- Glass railing and interior glass solutions.

Use natural language rather than keyword stuffing.

Inspect existing `lib/seo.js` and `generateStructuredData()` before modifying them.

Use appropriate Schema.org structured data based on real business facts. Ensure JSON-LD is valid and matches visible page content.

Do not invent review ratings, prices, product availability, aggregate ratings, awards, or opening hours.

Do not add product prices when actual prices are unknown.

Validate structured data using available tools when possible and report whether validation was actually performed.

If external internet access is available, verify current public-facing facts using authoritative sources. Prefer the official company site, company-controlled social profiles, the official MCA portal, and actual manufacturer documentation.

Distinguish verified information from owner-supplied facts and unverified external listings.

---

# 14. ACCESSIBILITY REQUIREMENTS

Audit and improve accessibility across the complete website.

Implement:

- Semantic HTML.
- Logical heading hierarchy.
- Accessible labels for all inputs.
- Useful alternative text.
- Sufficient text contrast.
- Visible keyboard focus.
- Keyboard-accessible navigation.
- Correct ARIA usage.
- Appropriate button and link semantics.
- Modal focus management.
- Escape handling.
- Accessible accordions.
- Reduced-motion support.
- Touch-friendly controls.
- Clear validation messages.
- Accessible toast announcements.
- Proper focus restoration.
- Accessible gallery navigation.
- Meaningful error and empty states.

Avoid unnecessary ARIA attributes when native HTML semantics already provide the correct behavior.

Test keyboard-only navigation and common mobile viewport sizes.

Use automated accessibility tools where available and manually inspect high-impact interaction patterns.

---

# 15. ETHICAL SECURITY AUDIT

Act as an authorized security tester for this local website only.

Scope is limited to the project code, its local development server, and explicitly authorized integrations. Do not attack unrelated systems, scan third-party infrastructure, perform denial-of-service tests, attempt credential theft, bypass access controls, or access private social media content.

Inspect:

- Exposed API keys or secrets.
- Unsafe use of `dangerouslySetInnerHTML`.
- Cross-site scripting risks.
- URL handling and open redirects.
- Form input validation.
- Injection risks.
- Unsafe file uploads if any exist.
- Untrusted image URLs.
- Insecure external links.
- Dependency vulnerabilities.
- Accidental exposure of environment variables.
- Debug endpoints.
- Stack traces and sensitive errors.
- Inappropriate browser storage of personal data.
- Incorrect server/client boundaries.
- Security headers.
- Content Security Policy feasibility.
- Dependency and package integrity.

Run safe, relevant local checks using the installed tooling.

Do not print secret values into the terminal report or include them in generated documentation.

Do not run destructive dependency commands or broad automatic upgrades without reviewing the impact.

Do not disable protections merely to make the build pass.

If the website has no backend authentication or database, do not invent security claims about systems that do not exist.

Implement security improvements that are appropriate to the actual architecture. Avoid a restrictive CSP that breaks legitimate Next.js assets, development tooling, or required external resources.

Document discovered issues by severity, impact, fix, and verification status.

---

# 16. AUTOMATED TESTING AND BROWSER QA

Use the existing testing framework if present. If no suitable tests exist, add a minimal, maintainable testing setup compatible with the installed project.

Prefer Playwright for real browser-based end-to-end tests if it can be installed and configured safely.

Use existing unit-test tooling where appropriate. Avoid installing several overlapping frameworks.

Create and run tests for:

## Route testing

- Homepage loads.
- Every static page loads.
- Every known product slug loads.
- Invalid product slugs return a genuine 404.
- Sitemap responds correctly.
- Robots responds correctly.
- Navigation links resolve correctly.

## UI testing

- Desktop navigation.
- Mobile menu open and close.
- Responsive layouts.
- Product filters.
- Product card interactions.
- FAQ accordions.
- Gallery filters.
- Gallery lightbox.
- Keyboard navigation.
- Form validation.
- Toast feedback.
- WhatsApp URL generation.
- Product preselection.
- Footer links.
- Floating WhatsApp button.
- Error and empty states.

## Technical testing

- Production build.
- Lint checks.
- Browser console errors.
- Failed requests.
- Hydration warnings.
- Broken local image paths.
- Missing React keys.
- Missing metadata.
- Accessibility checks.
- Responsive overflow.
- Broken internal links.

Run the production build and inspect any failure carefully.

Do not change correct business logic simply to silence a test.

Use deterministic mock data for tests where appropriate.

Never submit real customer enquiries or send real WhatsApp messages during automated testing.

Use mocked external navigation and clearly marked test data.

Create maintainable test scripts and document how to execute them.

If a test cannot run because a dependency, browser, permission, or external service is unavailable, report the exact limitation rather than claiming the test passed.

---

# 17. RECOMMENDED PROJECT QUALITY IMPROVEMENTS

Inspect whether the following improvements are necessary:

- Shared product and category definitions.
- Centralized company facts.
- Consistent CTA components.
- Consistent buttons, badges, cards, and section headings.
- Reusable form field components.
- Shared validation schemas.
- Reusable metadata generation.
- A robust image manifest.
- A consistent loading and error strategy.
- Accessible reusable accordions and modals.
- Clear separation of server and client logic.
- Consistent naming conventions.
- Useful code comments for non-obvious logic.
- Clean console output.
- A maintainable README.
- A clear environment-variable example.
- A documented testing workflow.
- A concise security and QA report.

Do not over-engineer the project.

Do not add a database, authentication, an admin dashboard, payment processing, or a new backend unless an actual requirement exists and the change is explicitly justified.

The WhatsApp-first enquiry system must remain functional.

---

# 18. IMPLEMENTATION ORDER

Execute the work in the following sequence.

### Phase 1 — Audit

Inspect the project, dependencies, existing routes, image sources, company constants, UI, forms, SEO, and Git state.

Identify the actual issues before editing.

### Phase 2 — Asset and content cleanup

Preserve every hero image.

Replace unsuitable non-hero photography, remove dummy content, correct broken asset mappings, and update the image manifest.

### Phase 3 — Design system and UI refinement

Improve global styles, typography, responsive grids, product cards, navigation, buttons, forms, spacing, transitions, and visual consistency.

### Phase 4 — Business and product presentation

Improve product detail pages, services, hardware and profile content, interior design presentation, gallery, and related-product navigation.

### Phase 5 — Functionality

Fix all real interactive defects, quote flow problems, invalid links, broken filtering, accordions, lightbox interactions, and responsive navigation.

### Phase 6 — SEO, accessibility, and security

Fix metadata, structured data, accessibility issues, security weaknesses, image optimization, and relevant HTTP configuration.

### Phase 7 — Automated testing

Run lint, production build, browser tests, route tests, asset checks, link checks, and available accessibility checks.

Fix the issues discovered and rerun the relevant tests.

### Phase 8 — Final verification

Compare the original hero image sources with the final sources.

Inspect every page on desktop and mobile.

Verify all critical CTAs, product routes, and WhatsApp message generation.

Confirm the project starts and builds successfully.

### Phase 9 — Documentation and final report

Update README and relevant documentation.

Provide a concise but complete report of implemented changes, tests, results, unresolved limitations, and exact commands to run the finished website.

---

# 19. ACCEPTANCE CRITERIA

Do not declare the work complete until you have checked all applicable criteria.

- [ ] All original hero images remain unchanged.
- [ ] No TypeScript has been introduced.
- [ ] The existing project structure is preserved where practical.
- [ ] All intended routes work.
- [ ] All nine product detail routes work.
- [ ] Invalid product slugs return a proper 404.
- [ ] No dummy text or fake reviews remain.
- [ ] Non-hero photographs match their content.
- [ ] Image sources and usage permissions are documented where known.
- [ ] Hardware, profiles, and interior applications are represented accurately.
- [ ] Business facts remain centralized.
- [ ] Header, footer, and mobile navigation work.
- [ ] Product filters work.
- [ ] Gallery filters and lightbox work.
- [ ] Keyboard navigation works for interactive components.
- [ ] Contact form validation works.
- [ ] Product query parameters preselect the intended category.
- [ ] WhatsApp messages are correctly encoded.
- [ ] Popup failure has a reasonable fallback.
- [ ] Phone, email, map, social, and internal links work.
- [ ] SEO metadata and structured data are appropriate.
- [ ] Sitemap and robots configuration work.
- [ ] No critical accessibility defects remain unaddressed.
- [ ] No critical security issues remain unaddressed.
- [ ] Production build succeeds.
- [ ] Lint and applicable automated tests pass.
- [ ] Browser console has no unexplained critical errors.
- [ ] Images and layouts work on mobile, tablet, and desktop.
- [ ] Documentation and test instructions are updated.

If a criterion cannot be fully satisfied, explain why and document the remaining work. Never mark an untested item as passed.

---

# 20. FINAL REPORT FORMAT

When implementation and verification are complete, produce a report containing:

1. **Executive summary:** Overall condition and major improvements.
2. **Files changed:** Important files created, modified, or removed.
3. **Visual improvements:** Specific design and imagery changes.
4. **Functionality fixes:** Routes, filters, forms, navigation, lightbox, and interactions.
5. **Content audit:** Dummy content removed and business information corrected.
6. **SEO results:** Metadata, structured data, sitemap, and validation.
7. **Security findings:** Severity, remediation, and remaining concerns.
8. **Testing table:** Test name, result, and relevant evidence.
9. **Build and lint results:** Actual output, not assumed success.
10. **Hero image verification:** Confirm unchanged sources.
11. **Outstanding limitations:** Missing photographs, unverified facts, unavailable services, or blocked tests.
12. **Run commands:** Exact commands to start and verify the project.
13. **Deployment checklist:** Environment variables, domain, build, and production smoke tests.

Separate completed, verified work from recommendations or blocked work.

Do not claim that the website is fully production-ready if critical defects, failed builds, unresolved security issues, or unverified external dependencies remain.

---

# FINAL EXECUTION INSTRUCTION

Start by inspecting the existing `E:\jangid` project and understanding its real implementation.

Then execute the phases in order, making careful, production-quality modifications directly in the project.

Preserve the original hero images, preserve the business identity, preserve working features, use pure JavaScript and JSX, and do not invent facts.

**Do not stop after producing a plan. Implement the improvements, test the website, fix the failures, verify the final build, and provide the evidence-based completion report.**

If the work exceeds one session, maintain a checklist and a concise progress document in the project so the next session can continue without losing context.

The final deliverable is a refined, premium, responsive, accessible, secure, well-tested architectural-glass and interior-solutions website for Jangid Tuff Glasses Private Limited.