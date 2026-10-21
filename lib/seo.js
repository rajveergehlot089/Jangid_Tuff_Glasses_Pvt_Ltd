import { COMPANY } from './constants';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://jangidtuffglassespvtltd.com';

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
    title: 'Toughened Glass Manufacturer in Jodhpur, Rajasthan',
    description:
      'Factory-direct toughened glass, glass partitions, railings, shower enclosures and LED mirrors from Boranada, Jodhpur. Cut to size. Get a quote on WhatsApp.',
    path: '/',
  },
  about: {
    title: 'About Us | Toughened Glass Factory in Jodhpur',
    description:
      'Jangid Tuff Glasses Private Limited processes toughened safety glass at its Boranada, Jodhpur plant, serving homes, architects and builders across Rajasthan.',
    path: '/about',
  },
  products: {
    title: 'Toughened Glass, Mirrors & Partitions in Jodhpur',
    description:
      '5mm to 19mm toughened glass, office glass partitions, LED mirrors, shower enclosures, glass railings and decorative glass, made to size in Jodhpur.',
    path: '/products',
  },
  services: {
    title: 'Glass Cutting, Fitting & Installation in Jodhpur',
    description:
      'Glass consultation, precise cut-to-size processing, hardware coordination and crated site delivery across Jodhpur and Western Rajasthan.',
    path: '/services',
  },
  gallery: {
    title: 'Glass Work Gallery | Railings, Partitions & Facades',
    description:
      'See toughened glass railings, office partitions, shower enclosures, LED mirrors and facades. Ideas for your home or project in Jodhpur.',
    path: '/gallery',
  },
  contact: {
    title: 'Contact & Get a Glass Quote | Jodhpur Factory',
    description:
      'Call +91 81073 88855 or send your measurements on WhatsApp for a clear, itemised glass quotation from our Boranada, Jodhpur factory.',
    path: '/contact',
  },
  faq: {
    title: 'Toughened Glass FAQs | Thickness, Price & Delivery',
    description:
      'Answers on toughened glass thickness, pricing factors, how to measure, cutting limits and delivery across Jodhpur and Rajasthan.',
    path: '/faq',
  },
  privacy: {
    title: 'Privacy Policy',
    description:
      'How Jangid Tuff Glasses Private Limited handles enquiry details, WhatsApp messages and website analytics. We never sell your contact information.',
    path: '/privacy',
  },
  terms: {
    title: 'Terms & Fabrication Guidelines',
    description:
      'Order terms, glass fabrication tolerances, delivery conditions and quotation guidelines for Jangid Tuff Glasses Private Limited, Jodhpur.',
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
    '/og-image.jpg';

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
