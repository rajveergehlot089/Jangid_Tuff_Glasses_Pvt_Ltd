import { COMPANY } from './constants';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://jangid-tuff-glasses-pvt-ltd.vercel.app';

// ─── Default Metadata ──────────────────────────────────────────────────────────

const defaults = {
  siteName: COMPANY.name,
  titleSuffix: '',
  defaultDescription: COMPANY.description,
  locale: 'en_IN',
  type: 'website',
  themeColor: COMPANY.themeColor,
  twitterCard: 'summary_large_image',
};

// ─── Per-Page Metadata Configs ─────────────────────────────────────────────────

const PAGE_META = {
  home: {
    title: 'Toughened Glass & Architectural Glazing Manufacturer in Jodhpur',
    description:
      'Jangid Tuff Glasses Private Limited: Leading manufacturer of toughened glass, slim partitions, LED vanity mirrors, shower cubicles, and architectural glass hardware in Jodhpur, Rajasthan.',
    path: '/',
  },
  about: {
    title: 'About Jangid Tuff Glasses | Glass Fabrication Unit in Jodhpur',
    description:
      'Learn about Jangid Tuff Glasses Private Limited in Boranada, Jodhpur. Precision CNC processing, glass cutting tolerances, and trusted architectural partnerships across Rajasthan.',
    path: '/about',
  },
  products: {
    title: 'Toughened Glass, Mirrors, Partitions & Railings Catalogue',
    description:
      'Explore our full range: 5mm–19mm toughened glass, acoustic office partitions, high-definition LED mirrors, shower screens, balustrades, and custom architectural glass in Jodhpur.',
    path: '/products',
  },
  services: {
    title: 'Glass Sizing, Consultation & Architectural Fitting Services',
    description:
      'Factory glass consultation, precision cut-to-size tolerances, Ozone-compatible hardware coordination, and crated site dispatch across Jodhpur and Western Rajasthan.',
    path: '/services',
  },
  gallery: {
    title: 'Architectural Glass Designs & Installation Showcase',
    description:
      'Visual gallery of architectural facades, executive glass partition walls, luxury LED mirrors, balustrades, and frameless shower enclosures in Rajasthan.',
    path: '/gallery',
  },
  contact: {
    title: 'Request a Glass Quotation | Jodhpur Factory & WhatsApp',
    description:
      'Contact Jangid Tuff Glasses Private Limited in Boranada, Jodhpur (+91 81073 88855). Share site drawings or measurements for an instant, itemized quotation on WhatsApp.',
    path: '/contact',
  },
  faq: {
    title: 'Toughened Glass FAQs | Thickness, Pricing & Delivery Jodhpur',
    description:
      'Expert answers on toughened safety glass properties, minimum order sizes, measurement guides, cutting constraints, pricing variables, and local delivery in Rajasthan.',
    path: '/faq',
  },
  privacy: {
    title: 'Privacy Policy | Data Protection Standards',
    description:
      'Privacy policy for Jangid Tuff Glasses Private Limited. Explains our strict no-PII analytics and secure WhatsApp inquiry handling practices.',
    path: '/privacy',
  },
  terms: {
    title: 'Commercial Terms & Fabrication Guidelines',
    description:
      'Commercial terms, glass fabrication tolerances, delivery conditions, and order guidelines for Jangid Tuff Glasses Private Limited, Jodhpur.',
    path: '/terms',
  },
};

// ─── Metadata Generator ────────────────────────────────────────────────────────

/**
 * Generate Next.js metadata object for a specific page.
 *
 * @param {'home'|'about'|'products'|'services'|'gallery'|'contact'|'faq'|'privacy'|'terms'} page
 * @param {Object} [overrides] - Optional overrides for title, description, or image
 * @returns {Object} Next.js Metadata object
 *
 * @example
 * // In a page.js file:
 * import { generateMetadata as genMeta } from '@/lib/seo';
 * export const metadata = genMeta('home');
 */
export function generateMetadata(page, overrides = {}) {
  const config = PAGE_META[page] || PAGE_META.home;

  const title = overrides.title || `${config.title}${defaults.titleSuffix}`;
  const description = overrides.description || config.description;
  const url = `${SITE_URL}${config.path}`;
  const image =
    overrides.image ||
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85';

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: defaults.siteName,
      locale: defaults.locale,
      type: defaults.type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${config.title} — ${COMPANY.nameShort}`,
        },
      ],
    },
    twitter: {
      card: defaults.twitterCard,
      title,
      description,
      images: [image],
    },
    other: {
      'theme-color': defaults.themeColor,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Get just the page-specific meta config (useful for dynamic pages).
 */
export function getPageMeta(page) {
  return PAGE_META[page] || PAGE_META.home;
}

/**
 * Get the full site URL.
 */
export function getSiteUrl() {
  return SITE_URL;
}
