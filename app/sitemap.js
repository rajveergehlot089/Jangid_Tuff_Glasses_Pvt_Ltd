import { PRODUCT_CATEGORIES } from '@/lib/constants';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jangidtuffglassespvtltd.com';
  const currentDate = new Date().toISOString();

  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/services',
    '/gallery',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
  ];

  const productRoutes = PRODUCT_CATEGORIES.map((p) => `/products/${p.slug}`);

  const allRoutes = [...staticRoutes, ...productRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/products') || route === '/contact' ? 0.9 : 0.7,
  }));
}
