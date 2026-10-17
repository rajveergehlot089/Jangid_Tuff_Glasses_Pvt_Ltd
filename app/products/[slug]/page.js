import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, MessageSquare, Phone, ShieldCheck, ChevronRight } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import CTABanner from '@/components/ui/CTABanner';
import { PRODUCT_CATEGORIES, COMPANY } from '@/lib/constants';

export async function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = PRODUCT_CATEGORIES.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Jangid Tuff Glasses',
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://jangid-tuff-glasses-pvt-ltd.vercel.app';
  const url = `${siteUrl}/products/${slug}`;

  return {
    title: `${product.name} | Architectural & Interior Glass Jodhpur`,
    description: product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} | Jangid Tuff Glasses Private Limited`,
      description: product.description,
      url,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = PRODUCT_CATEGORIES.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCT_CATEGORIES.filter((p) => p.slug !== slug).slice(0, 3);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://jangid-tuff-glasses-pvt-ltd.vercel.app';
  const url = `${siteUrl}/products/${slug}`;

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
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: url,
      },
    ],
  };

  const itemPageLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: `${product.name} | Jangid Tuff Glasses Private Limited`,
    description: product.description,
    url,
    image: product.image,
  };

  return (
    <div className="flex flex-col">
      {/* Structured Data: ItemPage & Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemPageLd) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-[#f6f8fa] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#0878d1] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/products" className="hover:text-[#0878d1] transition">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#08233f] font-semibold">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero / Overview */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Product Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] bg-slate-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {product.tag && (
              <span className="absolute top-5 left-5 bg-[#08233f]/90 backdrop-blur text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                {product.tag}
              </span>
            )}
          </div>

          {/* Details & Specs */}
          <div>
            <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">
              Product Overview
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#08233f] mt-2 tracking-tight">
              {product.name}
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-5">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#08233f] mb-3">
                  Key Specifications & Advantages
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-[#f6f8fa] border border-slate-200/80 text-xs font-semibold text-[#132b45]"
                    >
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#08233f] mb-3">
                  Common Architectural Applications
                </h2>
                <ul className="space-y-2 text-sm text-slate-600">
                  {product.applications.map((app, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0878d1] shrink-0" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}#quote`}
                className="btn-gradient rounded-full text-white px-8 py-4 font-bold text-sm shadow-lg inline-flex items-center gap-2 group"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition duration-500" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  `Hello Jangid Tuff Glasses, I would like to enquire about ${product.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient-emerald rounded-full text-white px-7 py-4 font-bold text-sm inline-flex items-center gap-2.5 shadow-lg group"
              >
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition duration-500" />
                <span>Instant WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-[#f6f8fa] border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-[#08233f] mb-8">
              Other Glass Solutions
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-[#08233f] group-hover:text-[#0878d1] transition">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#0878d1] mt-4 inline-flex items-center gap-1 group-hover:underline">
                      View specifications →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <CTABanner
        title={`Ready to Order ${product.name}?`}
        description="Share your project drawings, site measurements, or rough requirements on WhatsApp for an immediate technical assessment and quotation."
        primaryAction={{
          label: 'Get a Fast Estimate',
          href: `/contact?product=${encodeURIComponent(product.name)}#quote`,
        }}
      />
    </div>
  );
}
