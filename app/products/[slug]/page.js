import { ViewTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calculator, Check, ChevronRight, MessageSquare, Phone, TriangleAlert } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from '@/components/ui/ProductCard';
import QuoteBuilder from '@/components/ui/QuoteBuilder';
import CTABanner from '@/components/ui/CTABanner';
import { PRODUCT_CATEGORIES, COMPANY } from '@/lib/constants';
import DarkCanvas from '@/components/layout/DarkCanvas';

export async function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((product) => ({
    slug: product.slug,
  }));
}

// Search snippets show ~155 characters: cut at a word boundary so the sentence never ends mid-word.
function clampDescription(text, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s]+$/, '')}…`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = PRODUCT_CATEGORIES.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: false },
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://jangidtuffglassespvtltd.com';
  const url = `${siteUrl}/products/${slug}`;

  return {
    title: `${product.name} in Jodhpur | Made to Size`,
    description: clampDescription(`${product.name} made to size at our Jodhpur factory. ${product.description}`),
    keywords: [
      `${product.name} Jodhpur`,
      `${product.name} manufacturer Rajasthan`,
      'Boranada glass factory',
      'architectural glass Jodhpur',
      'toughened glass quotation',
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} in Jodhpur | Jangid Tuff Glasses Private Limited`,
      description: clampDescription(product.description),
      url,
      images: [
        {
          url: product.image,
          width: 900,
          height: 600,
          alt: `${product.name} - Jangid Tuff Glasses Jodhpur`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} in Jodhpur | Jangid Tuff Glasses`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = PRODUCT_CATEGORIES.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCT_CATEGORIES.filter((p) => p.slug !== slug && p.categoryGroup === product.categoryGroup)
    .concat(PRODUCT_CATEGORIES.filter((p) => p.slug !== slug && p.categoryGroup !== product.categoryGroup))
    .slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jangidtuffglassespvtltd.com';
  const url = `${siteUrl}/products/${slug}`;
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    `Hello Jangid Tuff Glasses, I would like a quotation for ${product.name}.`
  )}`;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: url },
    ],
  };

  // A made-to-order glass product is described as a service offered locally (no prices are published).
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: product.name,
    serviceType: `${product.name} fabrication`,
    description: product.description,
    url,
    image: `${siteUrl}${product.image}`,
    provider: { '@id': `${siteUrl}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Jodhpur' },
      { '@type': 'AdministrativeArea', name: 'Rajasthan' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${product.name} options`,
      itemListElement: (product.thicknessOptions || []).map((t) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${product.name} – ${t}` },
      })),
    },
  };

  return (
    <DarkCanvas
      images={[
        product.image,
        '/images/optimized/structural-glazing-double-height-villa.webp',
        '/images/optimized/processing-tempering-furnace-line.webp',
        '/images/optimized/architectural-villa-coastal-estate.webp',
        '/images/optimized/commercial-atrium-canopy-entrance.webp',
      ]}
    >
      <div className="flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

        {/* ─── Hero ─── */}
        <section className="relative py-10 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/55 mb-8">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <Link href="/products" className="hover:text-white">Products</Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-white" aria-current="page">{product.name}</span>
            </nav>

            <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
              <Reveal from="left">
                <p className="kicker kicker--light">{product.tag}</p>
                <h1 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.02em] text-white">
                  {product.name}
                  <span className="block italic text-white/70 text-3xl sm:text-4xl lg:text-5xl mt-1">made to size in Jodhpur</span>
                </h1>
                <p className="mt-6 text-sm sm:text-base text-white/75 leading-relaxed max-w-xl">{product.description}</p>

                {product.thicknessOptions?.length > 0 && (
                  <div className="mt-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 mb-2.5">Available thickness</p>
                    <ul className="flex flex-wrap gap-2" role="list">
                      {product.thicknessOptions.map((t) => (
                        <li key={t} className="rounded-full border border-[var(--gold-soft)] bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold text-[var(--gold-bright)]">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a href="#estimate" className="btn-royal group" data-magnetic>
                    <Calculator className="w-4 h-4" aria-hidden="true" />
                    <span>Estimate your rate</span>
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-light" data-magnetic>
                    <MessageSquare className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                  <a href={`tel:${COMPANY.phoneRaw}`} className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-white/80 hover:text-white">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>{COMPANY.phone}</span>
                  </a>
                </div>
              </Reveal>

              <Reveal from="right" className="relative">
                <span className="absolute inset-0 translate-x-4 translate-y-4 rounded-[var(--radius-card)] border border-[var(--gold-soft)]" aria-hidden="true" />
                <div className="media-zoom relative aspect-[4/3] !rounded-[var(--radius-card)] bg-white/5 shadow-2xl">
                  {/* Same name as the product card photo: the browser morphs one into the other */}
                  <ViewTransition name={`product-photo-${product.slug}`}>
                    <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  </ViewTransition>
                </div>
                <div className="glass-dark absolute -bottom-6 left-4 sm:left-auto sm:-left-6 rounded-2xl px-5 py-4 max-w-[16rem]">
                  <p className="font-display text-xl text-white">Cut to your size</p>
                  <p className="mt-1 text-xs text-white/65 leading-relaxed">Processed at our Boranada, Jodhpur factory to your measurements.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── Engineering detail ─── */}
        <section className="relative py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading dark eyebrow="Engineering detail" title={`How we make ${product.name.toLowerCase()}`} />
            <div className="grid lg:grid-cols-2 gap-6">
              <Reveal from="left" className="glass-dark rounded-[var(--radius-card)] p-7 sm:p-9">
                <h3 className="font-display text-2xl text-white">Technical summary</h3>
                <p className="mt-4 text-sm text-white/75 leading-relaxed">{product.technicalSummary}</p>
                {product.structuralGuidance && (
                  <>
                    <h3 className="font-display text-xl text-white mt-8">Structural guidance</h3>
                    <p className="mt-3 text-sm text-white/70 leading-relaxed">{product.structuralGuidance}</p>
                  </>
                )}
              </Reveal>
              {product.fabricationConstraints && (
                <Reveal from="right" className="rounded-[var(--radius-card)] border border-amber-300/35 bg-amber-200/[0.06] p-7 sm:p-9">
                  <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200">
                    <TriangleAlert className="w-4 h-4" aria-hidden="true" /> Before you order
                  </p>
                  <p className="mt-4 text-sm text-amber-50/90 leading-relaxed">{product.fabricationConstraints.replace(/^CRITICAL:\s*/i, '')}</p>
                  <p className="mt-6 text-xs text-white/55 leading-relaxed">
                    Not sure about sizes or cutouts? Share a photo or drawing on WhatsApp and our team will check it before fabrication.
                  </p>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* ─── Features & applications ─── */}
        <section className="relative py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16">
            <div>
              <SectionHeading dark eyebrow="Why choose it" title="Key features" />
              <ul className="space-y-3" role="list">
                {product.features.map((f, i) => (
                  <Reveal as="li" key={f} from="left" delay={i * 0.06} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <span className="grid place-items-center w-7 h-7 shrink-0 rounded-full bg-[var(--gold-soft)] text-[var(--gold-bright)]">
                      <Check className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm text-white/85 leading-relaxed pt-0.5">{f}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading dark eyebrow="Where it's used" title="Applications" />
              <ul className="grid sm:grid-cols-2 gap-3" role="list">
                {product.applications.map((a, i) => (
                  <Reveal as="li" key={a} from={i % 2 ? 'right' : 'left'} delay={i * 0.06} className="glass-dark rounded-2xl p-5">
                    <span className="font-display text-2xl text-[var(--gold-bright)] leading-none">{String(i + 1).padStart(2, '0')}</span>
                    <p className="mt-3 text-sm text-white/85 leading-relaxed">{a}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Finishes & hardware ─── */}
        <section className="relative py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
            {[
              ['Finishes available', product.availableFinishes],
              ['Compatible hardware', product.compatibleHardware],
            ]
              .filter(([, list]) => list?.length)
              .map(([title, list], k) => (
                <Reveal key={title} from={k ? 'right' : 'left'} className="glass-dark rounded-[var(--radius-card)] p-7 sm:p-9">
                  <h3 className="font-display text-2xl text-white">{title}</h3>
                  <ul className="mt-5 divide-y divide-white/10 border-y border-white/10" role="list">
                    {list.map((item) => (
                      <li key={item} className="flex items-center gap-3 py-3 text-sm text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
          </div>
        </section>

        {/* ─── Estimate, pre-filled with this product ─── */}
        <section id="estimate" className="relative overflow-x-clip py-20 sm:py-24 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              dark
              eyebrow="Instant estimate"
              title={`Get your ${product.name.toLowerCase()} rate`}
              description="Add your sizes. We calculate the area and your list reaches our team on WhatsApp, ready to quote."
            />
            <QuoteBuilder initialProduct={product.name} />
          </div>
        </section>

        {/* ─── Related ─── */}
        <section className="relative py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading dark eyebrow="Also explore" title="Related glass solutions" action={{ href: '/products', label: 'View all products' }} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          glass
          title={`Ready to order ${product.name.toLowerCase()}?`}
          description="Share your measurements or a site photo. We will confirm the right thickness, finish and hardware, and send a clear quotation."
        />
      </div>
    </DarkCanvas>
  );
}
