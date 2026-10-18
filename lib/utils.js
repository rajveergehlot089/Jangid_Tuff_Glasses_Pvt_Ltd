import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { COMPANY, PRODUCT_CATEGORIES, SERVICES } from './constants.js';

/**
 * Merge Tailwind CSS class names with clsx + tailwind-merge.
 * Handles conditional classes and deduplication of conflicting utilities.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a phone number string for use in a WhatsApp URL.
 * Strips all non-digit characters except the leading +.
 */
export function formatPhoneForWhatsApp(phone) {
  return phone.replace(/[^0-9]/g, '');
}

/**
 * Build an encoded WhatsApp URL from form field values.
 *
 * @param {Object} fields - Key/value pairs from the enquiry form
 * @param {string} [fields.Name] - Customer name
 * @param {string} [fields.Phone] - Customer phone
 * @param {string} [fields.Email] - Customer email
 * @param {string} [fields['Product or service']] - Selected product/service
 * @param {string} [fields['Project location']] - Project location
 * @param {string} [fields.Timeline] - Approximate timeline
 * @param {string} [fields['Project details']] - Detailed project description
 * @returns {string} Fully encoded WhatsApp URL ready for window.open()
 */
export function buildWhatsAppUrl(fields) {
  const lines = [
    `Hello ${COMPANY.name}, I would like to enquire about a glass project.`,
    '',
    ...Object.entries(fields)
      .filter(([, value]) => value && String(value).trim() !== '')
      .map(([key, value]) => `${key}: ${value}`),
  ];

  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${COMPANY.whatsapp}?text=${message}`;
}

/**
 * Generate LocalBusiness JSON-LD structured data for SEO.
 * Returns a serialisable object ready to be placed in a <script type="application/ld+json"> tag.
 *
 * @param {string} [siteUrl] - The canonical site URL
 * @returns {Object} JSON-LD structured data object
 */
export function generateStructuredData(
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jangid-tuff-glasses-pvt-ltd.vercel.app'
) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeGoodsStore'],
    '@id': `${siteUrl}/#organization`,
    name: COMPANY.name,
    alternateName: [COMPANY.nameShort, COMPANY.nameHindi],
    description: COMPANY.description,
    url: siteUrl,
    telephone: COMPANY.phoneRaw,
    logo: `${siteUrl}/logo.jpg`,
    image: [
      `${siteUrl}/logo.jpg`,
      PRODUCT_CATEGORIES[0]?.image,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      postalCode: COMPANY.address.zip,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.2389,
      longitude: 72.9781,
    },
    hasMap: COMPANY.mapsQuery,
    sameAs: [
      COMPANY.social.instagram,
      COMPANY.social.facebook,
      COMPANY.listings.ozone,
      COMPANY.listings.zaubacorp,
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Bank Transfer (NEFT/RTGS)',
    areaServed: [
      {
        '@type': 'City',
        name: 'Jodhpur',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Rajasthan',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Glass Products & Architectural Fabrication Services',
      itemListElement: [
        ...PRODUCT_CATEGORIES.map((product, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: product.name,
            description: product.description,
            url: `${siteUrl}/products/${product.slug}`,
          },
          position: index + 1,
        })),
        ...SERVICES.map((service, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
            url: `${siteUrl}/services`,
          },
          position: PRODUCT_CATEGORIES.length + index + 1,
        })),
      ],
    },
  };
}
