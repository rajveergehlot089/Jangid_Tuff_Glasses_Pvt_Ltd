import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import ProductCatalogueSection from '@/components/ui/ProductCatalogueSection';
import CTABanner from '@/components/ui/CTABanner';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { generateMetadata as genMeta, getSiteUrl } from '@/lib/seo';
import DarkCanvas from '@/components/layout/DarkCanvas';

export const metadata = genMeta('products');

export default function ProductsPage() {
  const siteUrl = getSiteUrl();

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Engineered Glass Catalogue | Jangid Tuff Glasses Private Limited',
    description:
      'High-grade architectural, safety, and decorative glass solutions crafted for homes, retail showrooms, commercial facades, and offices across Jodhpur and Rajasthan.',
    url: `${siteUrl}/products`,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Glass Product Categories',
      numberOfItems: PRODUCT_CATEGORIES.length,
      itemListElement: PRODUCT_CATEGORIES.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: `${siteUrl}/products/${product.slug}`,
      })),
    },
  };

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
        name: 'Products',
        item: `${siteUrl}/products`,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      {/* Structured Data: CollectionPage & BreadcrumbList (No invalid Product markup) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Page Hero */}
      <PageHero
        eyebrow="ENGINEERED GLASS CATALOGUE"
        title="Comprehensive Products"
        titleAccent="& Solutions"
        description="High-grade architectural, safety, and decorative glass solutions crafted for homes, retail showrooms, commercial facades, and offices across Jodhpur and Rajasthan."
        primaryAction={{ label: 'Request a Quote', href: '/contact#quote' }}
        secondaryAction={{ label: 'View Services', href: '/services' }}
        backgroundImage="/images/optimized/custom-architectural-glass-pavilion.webp"
        showCategories={true}
        showWatchWork={true}
      />

      <DarkCanvas images={['/images/optimized/structural-glazing-double-height-villa.webp', '/images/optimized/partitions-corporate-conference-room.webp', '/images/optimized/shower-enclosure-frameless-corner.webp']}>

      {/* Catalogue with Interactive Filters */}
      <ProductCatalogueSection />

      {/* Custom Requirement Prompt */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Have a Custom Need?</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08233f] mt-2">
            Need a Glass Product for a Specific Application?
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed max-w-xl mx-auto">
            Send us your site dimensions, desired glass thickness, edge finish requirements, or architectural elevations. We will evaluate feasibility and provide direct technical recommendations.
          </p>
          <div className="mt-8">
            <Link
              href="/contact?product=Custom+Glass#quote"
              className="btn-gradient rounded-full text-white px-8 py-3.5 font-bold text-sm transition-all duration-200 ease-out hover:-translate-y-0.5 inline-block shadow-md"
            >
              Ask for Technical Guidance →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner glass />
      </DarkCanvas>
    </div>
  );
}
