import PageHero from '@/components/ui/PageHero';
import GalleryView from '@/components/ui/GalleryView';
import CTABanner from '@/components/ui/CTABanner';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta('gallery');

export default function GalleryPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jangid-tuff-glasses-pvt-ltd.vercel.app';

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
        backgroundImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85"
        showCategories={true}
        showWatchWork={false}
      />

      {/* Gallery Section */}
      <GalleryView />

      {/* CTA Banner */}
      <CTABanner
        title="Inspired by a Design You See Here?"
        description="Share the screenshot or describe the glass look you want. We will check feasibility, suggest suitable glass variants, and provide an estimate."
        primaryAction={{ label: 'Enquire About a Look', href: '/contact#quote' }}
      />
    </div>
  );
}
