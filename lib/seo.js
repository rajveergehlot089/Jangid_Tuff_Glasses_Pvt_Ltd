import { COMPANY } from './constants';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://jangidtuffglasses.in';

// ─── Default Metadata ──────────────────────────────────────────────────────────

const defaults = {
  siteName: COMPANY.name,
  titleSuffix: ` | ${COMPANY.nameShort}`,
  defaultDescription: COMPANY.description,
  locale: 'en_IN',
  type: 'website',
  themeColor: COMPANY.themeColor,
  twitterCard: 'summary_large_image',
};

// ─── Per-Page Metadata Configs ─────────────────────────────────────────────────

const PAGE_META = {
  home: {
    title: `Premium Glass Solutions in Jodhpur`,
    description:
      'Jangid Tuff Glasses Private Limited — toughened glass, mirrors, partitions, shower enclosures, and custom glass solutions for residential, commercial and architectural spaces in Jodhpur, Rajasthan.',
    path: '/',
  },
  about: {
    title: 'About Us',
    description:
      'Learn about Jangid Tuff Glasses Private Limited, a glass business based in Jodhpur, Rajasthan. Quality-minded, customer-led glass solutions for every project.',
    path: '/about',
  },
  products: {
    title: 'Our Products',
    description:
      'Explore toughened glass, float glass, mirrors, LED mirrors, glass partitions, shower enclosures, railing glass, decorative glass, table tops, and custom architectural glass.',
    path: '/products',
  },
  services: {
    title: 'Our Services',
    description:
      'Glass consultation, custom sizing, mirror & LED crafting, architectural glass systems, site coordination, and installation guidance in Jodhpur, Rajasthan.',
    path: '/services',
  },
  gallery: {
    title: 'Gallery',
    description:
      'Visual inspiration for glass architecture, mirrors, partitions, and interior glass solutions. Explore ideas for your next project.',
    path: '/gallery',
  },
  contact: {
    title: 'Contact Us',
    description:
      'Contact Jangid Tuff Glasses Private Limited in Jodhpur by phone, WhatsApp, or project enquiry form. Get a quote for your glass project.',
    path: '/contact',
  },
  faq: {
    title: 'Frequently Asked Questions',
    description:
      'Common questions about toughened glass, custom sizing, delivery, installation, LED mirrors, and working with Jangid Tuff Glasses Private Limited.',
    path: '/faq',
  },
  privacy: {
    title: 'Privacy Policy',
    description:
      'Privacy policy for Jangid Tuff Glasses Private Limited. Learn how we handle your information when you use our website or contact us.',
    path: '/privacy',
  },
  terms: {
    title: 'Terms & Conditions',
    description:
      'Terms and conditions for using the Jangid Tuff Glasses Private Limited website and services.',
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
    overrides.image || `${SITE_URL}/og-image.jpg`;

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
