# Backend Schema — Proposed Production Model

This is a proposal, not a claim that a database or CRM already exists. For the MVP, the site can run on curated local content with a secure enquiry endpoint. Add persistence only after database hosting and privacy practices are decided.

## 1. Suggested entities

### Product
- `id` UUID
- `slug` unique
- `name`
- `shortDescription`
- `description`
- `category`
- `applications` string array
- `specifications` JSON (verified fields only)
- `coverImageId`
- `isPublished`
- `sortOrder`
- `createdAt`, `updatedAt`

### Service
- `id` UUID
- `slug` unique
- `name`
- `summary`
- `description`
- `isPublished`
- timestamps

### Project
- `id` UUID
- `slug` unique
- `title`
- `locationLabel` (public-safe)
- `category`
- `brief`
- `solution`
- `completionDate` nullable
- `isPublished`
- timestamps
Only publish projects approved for public display.

### MediaAsset
- `id` UUID
- `url`
- `altText`
- `caption` nullable
- `sourceType` enum: OWNER_UPLOAD, LICENSED_STOCK, GENERATED_CONCEPT
- `sourceUrl` nullable
- `permissionStatus` enum: PENDING, APPROVED, REJECTED
- `isActualCompanyWork` boolean
- `width`, `height`
- timestamps
Do not publish `permissionStatus != APPROVED`. Do not label generated or stock media as company work.

### Enquiry
- `id` UUID
- `name`
- `phone`
- `email` nullable
- `customerType` nullable
- `productInterest` nullable
- `projectLocation` nullable
- `dimensions` nullable
- `quantity` nullable
- `timeline` nullable
- `message`
- `sourcePage` nullable
- `consentAt` nullable
- `status` enum: NEW, CONTACTED, QUALIFIED, QUOTED, WON, LOST, SPAM
- `createdAt`, `updatedAt`
Avoid collecting more personal data than needed. Restrict access to authorized staff.

### FAQ
- `id` UUID
- `question`
- `answer`
- `category`
- `sortOrder`
- `isPublished`

### AdminUser (only if an admin interface is built)
- `id` UUID
- `email` unique
- `passwordHash` or identity-provider subject (never plaintext password)
- `role`
- timestamps
Prefer managed authentication; do not build weak custom auth unnecessarily.

## 2. Relationships
- Products ↔ MediaAsset through a join table.
- Projects ↔ MediaAsset through a join table.
- Services ↔ MediaAsset through a join table.
- Enquiry may reference Product and/or Service optionally.
- Keep published content independent from enquiry personal data.

## 3. API outline
- `POST /api/enquiries`: validate, rate-limit, anti-spam, persist, optionally notify staff, return truthful status.
- `GET /api/products`: public published product data.
- `GET /api/products/[slug]`: public published product detail.
- `GET /api/projects`: public approved projects.
- `GET /api/faqs`: public published FAQs.
Admin write endpoints require authentication and authorization; do not implement public write access.

## 4. Security
- Zod validation on server.
- Rate limit submissions and use honeypot/CAPTCHA if needed.
- Validate and limit uploaded file types/sizes.
- Store files in private or appropriately controlled object storage.
- Never expose database credentials or API keys to client components.
- Use HTTPS and restrictive access controls.
- Define retention/deletion policy and privacy notice before collecting leads.
- Sanitize any rich text before rendering.
- Avoid sending PII to analytics.

## 5. Deployment decision
Preferred starter: PostgreSQL + Prisma. Alternative managed database is acceptable if documented. Use `.env.example` only with dummy placeholders; never include secrets in ZIP or Git.
