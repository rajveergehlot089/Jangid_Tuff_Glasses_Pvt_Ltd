# App Flow — Sitemap and User Journeys

## 1. Global sitemap
```text
Home
├── About
├── Products
│   ├── Toughened Glass
│   ├── Mirrors / LED Mirrors
│   ├── Slim Glass Partitions
│   ├── Decorative Glass
│   ├── Railing Glass
│   ├── Shower Enclosures
│   └── Custom Glass
├── Services
├── Projects / Portfolio
│   └── Project Detail
├── Gallery
├── FAQ
├── Contact / Request a Quote
├── Privacy Policy
├── Terms
└── Thank You / Submission Status
```

## 2. Primary conversion path
1. Visitor lands from Google, social media, referral or direct traffic.
2. Hero quickly explains glass solutions and location.
3. Visitor chooses Explore Products, View Projects or Request a Quote.
4. Product/project page answers basic questions with real images and verified details.
5. Visitor clicks product-specific enquiry or completes a quote form.
6. Server validates and stores the enquiry; confirmation appears only after actual success.
7. WhatsApp/call fallback is offered clearly.
8. Business follows up offline.

## 3. Audience-specific flows
### Homeowner
Home → Mirrors / partitions / shower glass → gallery inspiration → contact → WhatsApp or quote form.

### Architect / interior designer
Home → Products → project gallery → custom requirement form → attach drawing if upload feature is secure → follow-up.

### Contractor / builder
Home → product category → bulk/project enquiry → quantity/dimensions/timeline → phone or quote form.

### Commercial buyer
Home → services / projects → discuss project → structured enquiry → follow-up.

## 4. Header behavior
- Desktop: logo, primary navigation, phone icon/number, Quote CTA.
- Mobile: accessible menu button, visible phone/WhatsApp CTA and a clear Quote CTA.
- Header may become compact on scroll, but must not obscure headings or anchor targets.
- Use `aria-expanded`, focus management and escape-key handling for overlays.

## 5. Forms
Fields: name, phone, email optional, customer type, product/service, location, dimensions, quantity, timeline, notes, optional file upload. Validate before submission. On backend success, show a confirmation page or inline success state. On error, preserve entered values and show actionable feedback. WhatsApp fallback constructs a readable encoded message; never state that a message has been sent automatically.

## 6. Filter and gallery behavior
- Category filters update visible items without full page reload.
- Active filter is visually and programmatically identifiable.
- All controls are keyboard operable.
- Optional lightbox supports close button, Escape, previous/next and focus management.
- Provide a grid fallback if JS is unavailable.

## 7. State diagram — enquiry
```text
Idle
  └── Submit → Validating
                 ├── Invalid → Show field errors → Idle
                 └── Valid → Sending
                              ├── Success → Confirmation
                              └── Failure → Retry + WhatsApp fallback
```

## 8. Analytics events (after consent/privacy review)
- `cta_click` with CTA name and page.
- `product_view` with product slug.
- `project_view` with project slug.
- `phone_click`.
- `whatsapp_click`.
- `quote_form_start`.
- `quote_form_validation_error`.
- `quote_form_success` only after confirmed backend success.
Do not send names, phone numbers, email addresses or free-text notes to analytics.
