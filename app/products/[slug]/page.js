import { ViewTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, MessageSquare, Phone, ShieldCheck, ChevronRight } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
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

  const relatedProducts = PRODUCT_CATEGORIES.filter((p) => p.slug !== slug).slice(0, 3);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://jangidtuffglassespvtltd.com';
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
    <DarkCanvas images={['/images/optimized/structural-glazing-double-height-villa.webp', '/images/optimized/commercial-atrium-canopy-entrance.webp', '/images/optimized/partitions-corporate-conference-room.webp', '/images/optimized/architectural-villa-coastal-estate.webp']}>
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
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
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
            {/* Same name as the product card photo: the browser morphs one into the other */}
            <ViewTransition name={`product-photo-${product.slug}`}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </ViewTransition>
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

            {/* Technical Highlights / Summary */}
            {product.technicalSummary && (
              <div className="mt-6 p-5 rounded-2xl bg-[#eaf5ff]/70 border border-blue-100 text-xs text-[#08233f] leading-relaxed">
                <span className="font-bold uppercase tracking-wider text-[#0878d1] block mb-1">
                  Engineering & Material Summary
                </span>
                {product.technicalSummary}
              </div>
            )}

            {/* Thickness Spectrum */}
            {product.thicknessOptions && product.thicknessOptions.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#08233f] mb-3">
                  Available Thickness Options
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.thicknessOptions.map((th, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full bg-slate-100 text-[#08233f] font-bold text-xs border border-slate-200/80 shadow-2xs"
                    >
                      {th}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-2 italic">
                  Note: Availability depends on structural calculations, spans, and fabrication schedule. Contact our Jodhpur team to verify current stock.
                </p>
              </div>
            )}

            {/* Available Finishes */}
            {product.availableFinishes && product.availableFinishes.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#08233f] mb-3">
                  Glass Finishes & Treatments
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.availableFinishes.map((fn, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white text-slate-700 font-medium text-xs border border-slate-200"
                    >
                      {fn}
                    </span>
                  ))}
                </div>
              </div>
            )}

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

            {/* Compatible Hardware */}
            {product.compatibleHardware && product.compatibleHardware.length > 0 && (
              <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#08233f] mb-3">
                  Recommended Hardware & Fittings
                </h2>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {product.compatibleHardware.map((hw, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#0878d1] font-bold">✓</span>
                      <span>{hw}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fabrication Constraint / Safety Warning */}
            {product.fabricationConstraints && (
              <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed">
                <span className="font-bold block mb-1">Fabrication Planning Notice:</span>
                {product.fabricationConstraints}
              </div>
            )}

            {/* Structural Guidance */}
            {product.structuralGuidance && (
              <div className="mt-3 text-[11px] text-slate-500 leading-normal">
                <strong>Structural Note:</strong> {product.structuralGuidance}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <Link
                href={`/contact?product=${encodeURIComponent(product.slug)}#quote`}
                className="btn-gradient rounded-full text-white px-8 py-4 font-bold text-sm shadow-lg inline-flex items-center gap-2 group transition-all duration-200 ease-out hover:-translate-y-0.5"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200 ease-out" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  `Hello Jangid Tuff Glasses, I would like to enquire about ${product.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient-emerald rounded-full text-white px-7 py-4 font-bold text-sm inline-flex items-center gap-2.5 shadow-lg group transition-all duration-200 ease-out hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 ease-out" />
                <span>Instant WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Variables, Measurement Guide & Local Jodhpur Supply Section */}
      <section className="py-16 bg-[#f8fafc] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">
              Transparent Quotations & Sizing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08233f] mt-2">
              Understanding Your {product.name} Quotation
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              We believe in honest, upfront specifications. Architectural glass pricing is determined by engineering parameters rather than arbitrary figures. Here is what influences your quotation and what we need for an exact estimate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Pricing Factors */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#eaf5ff] text-[#0878d1] flex items-center justify-center font-bold text-sm mb-4">
                  1
                </div>
                <h3 className="font-bold text-base text-[#08233f] mb-2">Key Pricing Variables</h3>
                <ul className="text-xs text-slate-600 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0878d1] shrink-0 mt-1" />
                    <span><strong>Glass Thickness & Type:</strong> Monolithic (e.g. 8mm/10mm/12mm) vs laminated or ultra-clear low-iron glass.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0878d1] shrink-0 mt-1" />
                    <span><strong>Edge Processing:</strong> Standard seamed edge vs machine flat-polish, pencil round, or beveling.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0878d1] shrink-0 mt-1" />
                    <span><strong>CNC Machining:</strong> Number and complexity of hinge cutouts, patch notches, holes, and waterjet shapes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0878d1] shrink-0 mt-1" />
                    <span><strong>Hardware Grade:</strong> SS 304 vs 316 grade fittings, floor springs, or custom partition aluminum channels.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                Quotes are clear and itemized so you know exactly what is included.
              </div>
            </div>

            {/* Card 2: Measurement Checklist */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm mb-4">
                  2
                </div>
                <h3 className="font-bold text-base text-[#08233f] mb-2">Site Measurement Checklist</h3>
                <ul className="text-xs text-slate-600 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                    <span><strong>Opening Dimensions:</strong> Measure width & height at 3 points (top, middle, bottom) in millimeters (mm).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                    <span><strong>Plumbness & Level:</strong> Note whether walls or floor tiles are out of plumb (affects glass squareness).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                    <span><strong>Clearance Gaps:</strong> Allow for hinge swing clearances, silicone joints (typically 3–5mm), and bottom sweeps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                    <span><strong>Site Access:</strong> Confirm staircase or lift clearance for large panels over 2.4 meters.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                You can share rough tape measurements or CAD drawings on WhatsApp.
              </div>
            </div>

            {/* Card 3: Scope & Jodhpur Supply */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-sm mb-4">
                  3
                </div>
                <h3 className="font-bold text-base text-[#08233f] mb-2">Scope & Jodhpur Supply</h3>
                <ul className="text-xs text-slate-600 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1" />
                    <span><strong>What Is Included:</strong> Precision fabrication to confirmed drawing, polished edges, protective packaging.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1" />
                    <span><strong>Local Dispatch:</strong> Direct crated transport across Jodhpur, Boranada, Pal Road, and Western Rajasthan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1" />
                    <span><strong>Installation Guidance:</strong> Detailed cutout templates provided; installer coordination available upon request.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1" />
                    <span><strong>Payment Transparency:</strong> Advance deposit for custom tempering with clear commercial GST invoicing.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                Direct factory support: call Karan Jangid (+91 81073 88855) for advice.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specific Jodhpur Regional Supply & Contractor Hub for Toughened Glass */}
      {product.slug === 'toughened-glass' && (
        <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">
                  Jodhpur Regional Supply Hub
                </span>
                <h2 className="text-3xl font-extrabold text-[#08233f] mt-2">
                  Toughened Glass Supply for Jodhpur Builders, Architects & Contractors
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
                  Located strategically at <strong>21 Narnadi, Boranada, Pal, Jodhpur</strong>, Jangid Tuff Glasses Private Limited serves as the dedicated regional fabrication and tempering resource for Western Rajasthan. 
                </p>
                <div className="mt-6 space-y-3 text-xs sm:text-sm text-slate-600">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <strong className="text-[#08233f] block text-sm mb-1">Architectural & Commercial Glazing:</strong>
                    Direct supply for frameless glass shopfronts, spider glazing facades, high-span curtain walls, and showroom double doors.
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <strong className="text-[#08233f] block text-sm mb-1">Residential & Interior Fit-outs:</strong>
                    Toughened glass for frameless bathroom shower cubicles, acoustic room partitions, staircase safety balustrades, and dining table surfaces.
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <strong className="text-[#08233f] block text-sm mb-1">Contractor & Bulk Order Coordination:</strong>
                    Scheduled crated vehicle dispatches directly to project sites across Jodhpur, Pali, Barmer, Nagaur, and surrounding districts.
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#08233f] to-[#041323] text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-white/10">
                <span className="text-xs uppercase font-extrabold tracking-widest text-sky-400 block mb-2">
                  Technical Checklist
                </span>
                <h3 className="text-2xl font-bold">How to Specify Toughened Glass</h3>
                <ul className="mt-6 space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-sky-400 font-bold">1.</span>
                    <span><strong>Determine Thickness:</strong> 8mm–10mm for shower doors/partitions; 12mm–15mm for frameless entrance doors; 12mm+ or laminated for exterior railings.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-sky-400 font-bold">2.</span>
                    <span><strong>Finalize Notches & Cutouts:</strong> Confirm floor spring cutout models (Ozone/Dorma compatible) before tempering furnace cycle.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-sky-400 font-bold">3.</span>
                    <span><strong>Select Edge Treatment:</strong> High-gloss machine flat-polish with arris for exposed glass borders.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-sky-400 font-bold">4.</span>
                    <span><strong>Share Elevation Drawings:</strong> Send CAD drawing (.dwg/.pdf) or verified site measurements for itemized review.</span>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4">
                  <Link
                    href="/contact?product=toughened-glass#quote"
                    className="btn-gradient text-white text-xs font-bold px-6 py-3 rounded-full shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 inline-flex items-center gap-2"
                  >
                    <span>Request Toughened Glass Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={`tel:${COMPANY.phoneRaw}`}
                    className="rounded-full bg-white/10 hover:bg-white hover:text-[#08233f] text-white px-5 py-3 text-xs font-bold transition-all duration-200 ease-out inline-flex items-center gap-1.5"
                  >
                    <span>Call Karan Jangid: {COMPANY.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#0878d1]/40 transition-all duration-300 ease-out flex flex-col"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-[#08233f] group-hover:text-[#0878d1] transition-colors duration-200 ease-out">
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
        glass
        title={`Ready to Order ${product.name}?`}
        description="Share your project drawings, site measurements, or rough requirements on WhatsApp for an immediate technical assessment and quotation."
        primaryAction={{
          label: 'Get a Fast Estimate',
          href: `/contact?product=${encodeURIComponent(product.slug)}#quote`,
        }}
      />
    </div>
    </DarkCanvas>
  );
}
