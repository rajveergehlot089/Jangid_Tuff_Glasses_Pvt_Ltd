import PageHero from '@/components/ui/PageHero';
import GalleryView from '@/components/ui/GalleryView';
import CTABanner from '@/components/ui/CTABanner';
import { generateMetadata as genMeta } from '@/lib/seo';
import DarkCanvas from '@/components/layout/DarkCanvas';

export const metadata = genMeta('gallery');

export default function GalleryPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jangidtuffglassespvtltd.com';

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Gallery',
        item: `${siteUrl}/gallery`,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Page Hero */}
      <PageHero
        eyebrow="VISUAL INSPIRATION & DESIGNS"
        title="Modern Architectural"
        titleAccent="Glass Gallery"
        description="A curated visual showcase exploring structural facades, bespoke interior mirrors, fluted partitions, and luxury shower cubicles."
        primaryAction={{ label: 'Explore Products', href: '/products' }}
        secondaryAction={{ label: 'Request a Quote', href: '/contact#quote' }}
        backgroundImage="/images/optimized/villa-poolside-glass-facade.webp"
        showCategories={true}
        showWatchWork={false}
      />

      <DarkCanvas images={['/images/optimized/structural-glazing-double-height-villa.webp']}>

      {/* Gallery Section */}
      <GalleryView />

      {/* CTA Banner */}
      <CTABanner
        glass
        title="Inspired by a Design You See Here?"
        description="Share the screenshot or describe the glass look you want. We will check feasibility, suggest suitable glass variants, and provide an estimate."
        primaryAction={{ label: 'Enquire About a Look', href: '/contact#quote' }}
      />
      </DarkCanvas>
    </div>
  );
}
