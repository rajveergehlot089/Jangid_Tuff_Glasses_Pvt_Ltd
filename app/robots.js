export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jangidtuffglassespvtltd.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
