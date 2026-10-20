import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  Factory,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare,
  Award,
  Ruler,
  Truck,
  Wrench,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import CTABanner from '@/components/ui/CTABanner';
import { COMPANY } from '@/lib/constants';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta('about');

export default function AboutPage() {
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
        name: 'About Us',
        item: `${siteUrl}/about`,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ─── Hero Section (Exact Hero Image Preserved) ─── */}
      <PageHero
        eyebrow="OUR IDENTITY & HERITAGE"
        title="Engineering Architectural"
        titleAccent="Glass in Jodhpur"
        description="Jangid Tuff Glasses Private Limited is Jodhpur's premier manufacturer and fabricator of toughened safety glass, architectural partitions, luxury LED mirrors, and specialized glazing solutions."
        primaryAction={{ label: 'Explore Products', href: '/products' }}
        secondaryAction={{ label: 'Contact Our Factory', href: '/contact' }}
        backgroundImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85"
        showCategories={true}
        showWatchWork={true}
      />

      {/* ─── Section 1: Who We Are & Heritage ─── */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden" aria-label="Company Heritage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.25em]">
              Heritage & Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-3 leading-tight tracking-tight">
              A Legacy of Glass Craftsmanship Built for Modern Architecture
            </h2>
            <p className="text-slate-600 leading-relaxed mt-6 text-sm sm:text-base">
              <strong>{COMPANY.name}</strong> ({COMPANY.nameHindi}) represents decades of hands-on glass expertise in Western Rajasthan. Evolving from the trusted <strong>Jangid Glass Co.</strong> family enterprise into an incorporated private limited company (CIN: <strong>{COMPANY.cin}</strong>), we operate a dedicated glass processing and tempering plant located in the industrial corridor of <strong>Boranada / Pal, Jodhpur</strong>.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4 text-sm sm:text-base">
              Led by Director <strong>Karan Jangid</strong> alongside the Jangid leadership team, our mission is to eliminate regional reliance on distant glass factories. We provide Rajasthan’s architects, interior designers, commercial contractors, and discerning homeowners with immediate, factory-direct access to precision-cut, tempered, and architectural glass hardware solutions.
            </p>

            <div className="mt-8 border-l-4 border-[#0878d1] pl-5 py-4 bg-[#f8fafc] rounded-r-2xl border border-slate-200/60 shadow-xs">
              <p className="text-sm font-semibold text-[#08233f] italic leading-relaxed">
                &ldquo;We don’t just supply glass; we partner on engineering tolerances, hardware compatibility, and on-time site deliveries so your vision is executed without delays or breakage.&rdquo;
              </p>
              <span className="text-xs font-bold text-[#0878d1] mt-2 block not-italic">
                — Karan Jangid, Jangid Tuff Glasses Private Limited
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 aspect-[4/3] relative group bg-slate-100">
              <Image
                src="/images/real/factory-front-original.jpg"
                alt="Authentic photograph of Jangid Tuff Glasses Private Limited factory in Boranada Jodhpur"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041323]/80 via-[#041323]/15 to-transparent" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08233f]/90 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified Factory Premises</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#08233f] to-[#041323] text-white p-6 rounded-3xl shadow-2xl max-w-xs border border-white/15 hidden sm:block">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">
                Boranada Plant
              </span>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Operating directly from 21 Narnadi, Boranada Industrial Area, serving Jodhpur, Pali, Barmer, Nagaur & across Rajasthan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: In-House Manufacturing & Fabrication Capabilities ─── */}
      <section className="py-20 sm:py-28 bg-[#f8fafc] border-t border-b border-slate-200/80" aria-label="Manufacturing Capabilities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.25em]">
              Precision Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-2 tracking-tight">
              Advanced In-House Glass Processing Facilities
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              Every glass panel processed at our Boranada plant passes through high-precision machinery to ensure exact dimensions, immaculate edge quality, and maximum structural safety.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {[
              {
                title: 'Horizontal Tempering Plant',
                desc: 'Continuous horizontal oscillating furnace processing standard annealed glass at ~650°C followed by controlled high-pressure air quenching. Produces safety glass 4 to 5 times stronger than annealed glass.',
                image: '/images/optimized/processing-tempering-furnace-line.webp',
                badge: '5mm – 19mm Range',
              },
              {
                title: 'CNC Edge Finishing',
                desc: 'Automated multi-spindle edgers deliver flawless flat-polish with arrised corners, decorative beveling (10mm–35mm), pencil polish, and OG profiles for luxury table tops and exposed partitions.',
                image: '/images/optimized/processing-cnc-edge-polishing.webp',
                badge: 'Machine Polished',
              },
              {
                title: 'Cutouts & Hole Drilling',
                desc: 'Specialized diamond-core drills and CNC cutouts engineered for hydraulic floor springs, patch locks, spider brackets, shower hinge cutouts, and electrical socket pass-throughs.',
                image: '/images/optimized/processing-waterjet-hole-drilling.webp',
                badge: 'Zero Micro-Fractures',
              },
              {
                title: 'Specialty Glass Treatments',
                desc: 'Fluted / reeded architectural dividers, frosted acid-etched privacy panels, high-clarity silver mirrors, solar reflective tinted glass (grey, bronze), and lacquered back-painted glass.',
                image: '/images/optimized/processing-specialty-glass-finishes.webp',
                badge: 'Custom Finishes',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 hover:border-[#0878d1]/40 transition-all duration-300 ease-out group overflow-hidden"
              >
                {/* Visual Image Container */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-[#08233f]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    {item.badge}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-lg text-[#08233f] mb-2 tracking-tight group-hover:text-[#0878d1] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0878d1]">
                    <span>Factory Capability</span>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Official Ozone Architectural Hardware Dealer & Partner ─── */}
      <section className="py-20 sm:py-24 bg-white" aria-label="Architectural Hardware Partnership">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#08233f] via-[#041323] to-[#030c17] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-[0.22em] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                  <Award className="w-3.5 h-3.5 text-sky-300" />
                  Authorized Dealer & Solution Partner
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 tracking-tight leading-tight">
                  Seamless Integration with Ozone Architectural Hardware
                </h2>
                <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed">
                  Glass performance depends directly on the hardware that supports it. Through our authorized dealership with <strong>Ozone Overseas</strong> (operating from our dedicated studio at <strong>Pal Shilp Gram, Pal Road, Jodhpur</strong>), we provide complete, engineered glass-plus-hardware packages.
                </p>
                <p className="text-slate-300 mt-3 text-sm leading-relaxed">
                  No more misaligned cutouts or hardware delays. We fabricate the glass with precise factory cutouts tested against exact Ozone floor springs, patch fittings, shower hinges, and sliding channels before dispatch.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/services"
                    className="btn-gradient text-white px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span>Explore Hardware Systems</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="https://stores.ozone.in/ozone-india-jangid-glass-shilp-gram-pal-road-jodhpur-ozdlr30034"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white hover:text-[#08233f] text-white border border-white/20 text-xs font-bold transition-all duration-200 inline-flex items-center gap-1.5"
                  >
                    <span>View Ozone Store Listing</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: 'Hydraulic Floor Springs',
                    desc: 'Double-action EN 1154 certified floor springs with adjustable closing and latching speeds for heavy frameless glass doors.',
                  },
                  {
                    title: 'Frameless Shower Hinges',
                    desc: 'Solid SS 304 & 316 grade 90° and 180° glass-to-glass and glass-to-wall hinges with anti-corrosion finishes.',
                  },
                  {
                    title: 'Slim Partition Profiles',
                    desc: 'Sleek 25mm to 45mm architectural aluminium channels for acoustic office cubicles and minimal residential dividers.',
                  },
                  {
                    title: 'Spider & Railing Fittings',
                    desc: 'Point-fixed architectural spider arms, routels, and heavy-duty spigots for exterior glass facades and balustrades.',
                  },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex flex-col justify-between">
                    <h3 className="font-bold text-white text-sm tracking-tight">{item.title}</h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 4: What We Provide (Comprehensive Portfolio) ─── */}
      <section className="py-20 sm:py-28 bg-[#f8fafc] border-t border-slate-200/80" aria-label="Solutions Overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.25em]">Comprehensive Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-2 tracking-tight">
              Glass Solutions Tailored for Every Space
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              From safety-critical commercial exterior glazing to bespoke residential interior glass accents, we deliver tailored specifications engineered to your architectural drawings.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Toughened Architectural Glass',
                specs: '5mm, 6mm, 8mm, 10mm, 12mm, 15mm & 19mm',
                desc: 'High mechanical resistance glass compliant with safety standards. Ideal for storefronts, structural facades, canopies, and skylights.',
                link: '/products/toughened-glass',
              },
              {
                title: 'Smart LED Vanity & Dressing Mirrors',
                specs: 'Copper-free silver backing, touch dimmer, demister pad',
                desc: 'Backlit, front-lit, and dual-tone smart mirrors with automated defogging. Custom fabricated in pill, arch, round, and metal-framed geometric shapes.',
                link: '/products/mirrors-led-mirrors',
              },
              {
                title: 'Frameless & Slim Glass Partitions',
                specs: '10mm/12mm tempered or acoustic laminated glass',
                desc: 'Minimalist aluminium profile acoustic partitions for corporate offices, conference rooms, cabin enclosures, and luxury residential open-plan dividers.',
                link: '/products/slim-glass-partitions',
              },
              {
                title: 'Frameless Shower Enclosures',
                specs: '8mm/10mm toughened safety glass with hydrophobic coating',
                desc: 'Custom-configured walk-in showers, sliding cubicles, and swing doors fitted with SS 304 hardware, magnetic water seals, and stabilizing header bars.',
                link: '/products/shower-enclosures',
              },
              {
                title: 'Toughened Glass Balustrades & Railings',
                specs: '12mm toughened or 13.52mm PVB/Sentry laminated',
                desc: 'Continuous base shoe and duplex spigot railing systems for balconies, staircases, terrace parapets, and pool fences with unobstructed panoramic views.',
                link: '/products/railing-balustrade-glass',
              },
              {
                title: 'Decorative, Fluted & Tinted Glass',
                specs: 'Morphed reeded textures, grey/bronze tints, lacquered glass',
                desc: 'Contemporary ribbed glass for wardrobe shutters, decorative kitchen backsplashes, fluted privacy screens, and furniture accents.',
                link: '/products/decorative-glass',
              },
            ].map((prod, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 hover:border-[#0878d1]/40 transition-all duration-300 ease-out group"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#0878d1] uppercase tracking-wider block mb-1">
                    {prod.specs}
                  </span>
                  <h3 className="font-extrabold text-lg text-[#08233f] mb-3 group-hover:text-[#0878d1] transition-colors duration-200">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {prod.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={prod.link}
                    className="text-xs font-bold text-[#0878d1] hover:text-[#08233f] inline-flex items-center gap-1.5 transition-colors duration-200"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 5: Rigorous Quality Testing & Safety Standards ─── */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200/80" aria-label="Quality Standards">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.25em]">Quality & Safety First</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-2 tracking-tight">
                Tested to Withstand Impact, Thermal Shock & Wind Loads
              </h2>
              <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
                Toughened glass is safety glass. When safety is at stake in elevated balconies, staircases, and entrance doors, there is zero tolerance for sub-standard tempering.
              </p>

              <div className="space-y-4 mt-6">
                {[
                  {
                    title: 'Controlled Fragmentation Count Test',
                    desc: 'In the event of accidental breakage, our tempered glass breaks safely into small, dull-edged, granular fragments rather than jagged, hazardous shards.',
                  },
                  {
                    title: 'Thermal Endurance & Differential Tolerance',
                    desc: 'Engineered to withstand temperature differentials up to 250°C, making it impervious to direct desert sunlight, solar heat gain, and high-temperature thermal stress.',
                  },
                  {
                    title: 'Micron-Level Tolerance Inspection',
                    desc: 'Every panel is measured with digital callipers to guarantee squareness, diagonal accuracy within ±1mm, and pristine edge polishing before crating.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#f8fafc] border border-slate-200/80">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm font-bold text-[#08233f] block">{item.title}</strong>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f8fafc] p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-extrabold text-xl text-[#08233f] mb-4">
                Why Rajasthan Glaziers & Builders Choose Us
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0878d1] flex items-center justify-center font-bold text-sm shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#08233f]">Factory Direct Pricing</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">No middlemen or multi-tier dealer markups. You coordinate directly with the manufacturing facility.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#08233f]">Zero-Breakage Regional Delivery</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">Dedicated logistics with custom A-frame crating across Jodhpur, Pali, Barmer, Nagaur, Jaisalmer, and Western Rajasthan.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0878d1] flex items-center justify-center font-bold text-sm shrink-0">
                    <Ruler className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#08233f]">CAD Drawing & Site Coordination</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">Send your architectural CAD files, elevation drawings, or site dimensions directly via WhatsApp for rapid technical feasibility and BOQ preparation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 6: Verified Business Details & Facilities ─── */}
      <section className="py-16 sm:py-20 bg-[#f8fafc]" aria-label="Corporate Details">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.25em]">Verified Corporate Credentials</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08233f] mt-2 tracking-tight">
            Registered Enterprise & Facilities in Jodhpur
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            <strong>{COMPANY.name}</strong> is an officially registered private limited corporate entity under Corporate Identity Number (CIN) <strong>{COMPANY.cin}</strong> in Rajasthan, India.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-5 text-left">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
              <span className="text-[11px] font-bold text-[#0878d1] uppercase tracking-wider block mb-1">
                Manufacturing & Tempering Plant
              </span>
              <h3 className="font-bold text-base text-[#08233f] mb-1">Boranada Facility</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {COMPANY.address.full}
              </p>
              <span className="text-[11px] text-slate-500 block">
                Primary processing, automated tempering, CNC edging, and regional dispatch.
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Authorized Hardware & Design Studio
              </span>
              <h3 className="font-bold text-base text-[#08233f] mb-1">Jangid Glass Shilp Gram</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                A-8, Pal Shilp Gram, Gali No. 9, Pal Road, Jodhpur, Rajasthan
              </p>
              <span className="text-[11px] text-slate-500 block">
                Authorized Ozone Architectural Hardware showroom, mirror displays & consultations.
              </span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="btn-gradient rounded-full text-white px-8 py-3.5 font-bold text-sm shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5"
            >
              Get in Touch With Us
            </Link>
            <a
              href={COMPANY.mapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-300 text-[#08233f] px-7 py-3.5 font-bold text-sm hover:bg-white hover:-translate-y-0.5 hover:border-slate-400 transition-all duration-200 ease-out shadow-xs inline-flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#0878d1]" />
              <span>Find Us on Google Maps</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <CTABanner
        title="Planning an Architectural Glass Project in Jodhpur?"
        description="Share your elevation drawings, window schedules, or rough measurements. Our engineering desk will review the specifications and provide a clear, itemized factory estimate."
        primaryAction={{ label: 'Request Factory Quote', href: '/contact#quote' }}
        secondaryAction={{ label: `Call ${COMPANY.phone}`, href: `tel:${COMPANY.phoneRaw}` }}
      />
    </div>
  );
}
