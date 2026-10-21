'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import ServiceCard from '@/components/ui/ServiceCard';
import CTABanner from '@/components/ui/CTABanner';
import CinematicScrollHero from '@/components/ui/CinematicScrollHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import BlueSweep from '@/components/ui/BlueSweep';
import TiltCard from '@/components/ui/TiltCard';
import HomeBackdrop from '@/components/ui/HomeBackdrop';
import FinishPreview from '@/components/ui/FinishPreview';
import QuoteBuilder from '@/components/ui/QuoteBuilder';
import { COMPANY, PRODUCT_CATEGORIES, SERVICES } from '@/lib/constants';

const INSPIRATION = [
  { title: 'Processing & Tempering', src: '/images/optimized/processing-cnc-edge-polishing.webp', tag: 'CNC Edge Processing' },
  { title: 'Office Partitions', src: '/images/optimized/partitions-corporate-conference-room.webp', tag: 'Commercial Glazing' },
  { title: 'Balcony & Stair Railings', src: '/images/optimized/railing-floating-staircase-glass.webp', tag: 'Architectural Railings' },
  { title: 'Shower Cubicles', src: '/images/optimized/shower-enclosure-frameless-corner.webp', tag: 'Shower Enclosures' },
];

const HARDWARE = [
  {
    title: 'Door Controls & Patch Fittings',
    desc: 'Top/bottom patch fittings, hydraulic floor springs, and bottom euro-locks for commercial and residential frameless entrances.',
    image: '/images/optimized/hardware-door-controls-patch-fittings.webp',
    tag: 'Heavy-Duty Hardware',
  },
  {
    title: 'Frameless Shower Hardware',
    desc: '304/316 grade stainless steel hinges, magnetic water-stops, stabilizing header bars, and sliding roller tracks.',
    image: '/images/optimized/hardware-shower-sliding-enclosure.webp',
    tag: 'SS 304 / 316 Grade',
  },
  {
    title: 'Slim Partition Profiles',
    desc: 'Minimalist 25mm–45mm aluminum channels, acoustic gaskets, and concealed door frames for modern workspaces.',
    image: '/images/optimized/hardware-slim-partition-profiles.webp',
    tag: 'Acoustic Channels',
  },
  {
    title: 'Balustrade & Railing Mounts',
    desc: 'Duplex core-drilled spigots, continuous base shoe profiles, and point-fixed standoffs engineered for safety.',
    image: '/images/optimized/hardware-balustrade-railing-mounts.webp',
    tag: '1.5 kN Load Tested',
  },
];

const VALUE_POINTS = [
  {
    title: 'Transparent Cost Factors',
    body: 'Glass rates depend on panel thickness (5mm to 19mm), edge finish (seamed vs machine flat-polish), hole cutouts, and hardware grade (SS 304 vs 316). We provide fully broken-down estimates so you know exactly what is included.',
    note: 'No hidden fabrication charges',
  },
  {
    title: 'Fast Measurement & Quote',
    body: 'Measure height and width in millimeters at three points (top, middle, bottom), check wall plumbness, and share a photo on WhatsApp. Our Jodhpur technical desk prepares a structured quote with zero sales pressure.',
    note: 'Direct WhatsApp consultation',
  },
  {
    title: 'Local Rajasthan Dispatch',
    body: 'Avoid out-of-state transit breakage risks. We crate and deliver toughened glass panels directly across Jodhpur, Pali, Barmer, Nagaur, and greater Rajasthan with scheduled site coordination.',
    note: 'Factory-direct delivery in Jodhpur',
  },
];

export default function HomePage() {
  const featuredProducts = PRODUCT_CATEGORIES.slice(0, 6);
  const coreServices = SERVICES.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <CinematicScrollHero />

      {/* Everything below the hero sits over one fixed, crossfading photo backdrop */}
      <div className="home-dark relative isolate text-white">
        <HomeBackdrop />

      {/* ─── Product Categories ─── */}
      <section data-backdrop="/images/optimized/structural-glazing-double-height-villa.webp" className="relative overflow-hidden py-24 sm:py-32">
        <BlueSweep dark />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Comprehensive Catalogue"
            title="Engineered Glass for Every Application"
            description="Explore our core glass solutions manufactured and supplied for modern architecture, interiors, and safety installations."
            action={{ href: '/products', label: 'View full product catalogue' }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Glass finish preview ─── */}
      <section data-backdrop="/images/optimized/decorative-fluted-reeded-glass.webp" className="relative overflow-hidden py-24 sm:py-32">
        <BlueSweep dark />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="See the difference"
            title="How will your glass look?"
            description="Drag across the room to compare clear glass with frosted, fluted and tinted finishes before you choose."
          />
          <Reveal from="center">
            <FinishPreview />
          </Reveal>
        </div>
      </section>

      {/* ─── Company Profile ─── */}
      <section data-backdrop="/images/optimized/architectural-villa-coastal-estate.webp" className="relative overflow-hidden py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <Reveal from="left" className="relative group">
            <span className="absolute inset-0 translate-x-4 translate-y-4 rounded-[var(--radius-card)] border border-[var(--royal)]/40" aria-hidden="true" />
            <div className="media-zoom relative aspect-[16/10] !rounded-[var(--radius-card)] bg-[var(--paper)]">
              <Image
                src="/images/optimized/processing-tempering-furnace-line.webp"
                alt="Toughened glass panels moving through a tempering furnace line"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Genuine factory photo, shown as a verified inset */}
            <figure className="relative mt-4 sm:mt-0 sm:absolute sm:-bottom-12 sm:-right-6 flex items-center gap-4 rounded-[var(--radius-card)] bg-[var(--ink)] text-white p-3 pr-6 sm:max-w-sm shadow-2xl">
              <span className="relative w-20 h-24 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src="/images/real/factory-front-boranada-hd.webp"
                  alt="Authentic photograph of Jangid Tuff Glasses Private Limited Factory in Boranada Jodhpur"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
              <figcaption>
                <span className="font-display block text-xl">Boranada Plant</span>
                <span className="text-xs text-white/65 mt-1 block leading-relaxed">
                  21 Narnadi, Boranada Industrial Area, serving Jodhpur, Pali, Barmer, Nagaur &amp; across Rajasthan.
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal from="right" className="glass-dark rounded-[var(--radius-card)] p-7 sm:p-10">
            <p className="kicker kicker--light">Company Profile</p>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl md:text-5xl text-white leading-[1.08] tracking-[-0.02em]">
              A Trusted Glass Partner in Jodhpur, Rajasthan
            </h2>
            <p className="text-white/70 leading-relaxed mt-6 text-sm sm:text-base">
              <strong className="text-white">{COMPANY.name}</strong> ({COMPANY.nameHindi}) operates from {COMPANY.address.street} in {COMPANY.address.city}. We focus on providing modern glass solutions tailored to architectural and interior project specifications.
            </p>
            <p className="text-white/70 leading-relaxed mt-4 text-sm sm:text-base">
              Whether you are an architect designing an office partition, a builder requiring toughened structural glass, or a homeowner seeking a custom LED mirror, our team works directly with your drawings and site measurements to ensure precise fit and finish.
            </p>

            <dl className="mt-8 border-t border-white/15">
              <div className="grid sm:grid-cols-[10rem_1fr] gap-1 sm:gap-4 py-4 border-b border-white/15">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-white">Address</dt>
                <dd className="text-sm text-white/70">{COMPANY.address.full}</dd>
              </div>
              <div className="grid sm:grid-cols-[10rem_1fr] gap-1 sm:gap-4 py-4 border-b border-white/15">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-white">Direct Contact</dt>
                <dd className="text-sm text-white/70">{COMPANY.phone} • Fast phone &amp; WhatsApp response</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/about" className="btn-royal group" data-magnetic>
                <span>Read More About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-ghost-light">
                Contact &amp; Directions
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Services: hanging step cards ─── */}
      <section data-backdrop="/images/optimized/railing-floating-staircase-glass.webp" className="relative overflow-hidden py-24 sm:py-32">
        <BlueSweep dark />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            centered
            eyebrow="Our Process & Services"
            title="Comprehensive Support From Enquiry to Execution"
            description="We make glass procurement straightforward, consultative, and transparent for clients and contractors."
            action={{ href: '/services', label: 'View all services and project stages' }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Visual Inspiration (dark band) ─── */}
      <section data-backdrop="/images/optimized/villa-poolside-glass-facade.webp" className="relative overflow-hidden py-24 sm:py-32">
        <BlueSweep dark />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Visual Inspiration"
            title="Modern Glass Applications"
            description="Explore our precision glass processing, tempering line, and architectural installations in Jodhpur."
            action={{ href: '/gallery', label: 'Explore full gallery' }}
          />
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-8">
            {INSPIRATION.map((item, index) => (
              <Reveal
                key={item.title}
                from={index % 2 ? 'right' : 'left'}
                delay={index * 0.08}
                className={`group ${index % 2 ? 'sm:mt-16' : ''}`}
              >
                <Link href="/gallery" data-cursor="view" className="media-zoom block relative aspect-[16/10] !rounded-[var(--radius-card)] bg-white/5">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/5 to-transparent flex flex-col justify-end p-5 sm:p-7">
                  <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[var(--royal-bright)]">{item.tag}</span>
                  <span className="font-display text-white text-2xl sm:text-3xl mt-1 leading-tight">{item.title}</span>
                </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Architectural Hardware & Profiles ─── */}
      <section data-backdrop="/images/optimized/commercial-atrium-canopy-entrance.webp" className="relative overflow-hidden py-24 sm:py-32 lg:pt-40">
        <BlueSweep dark />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Engineered Integration"
            title="Architectural Hardware, Profiles & Interior Solutions"
            description="From hydraulic floor springs and frameless shower hinges to ultra-slim partition channels, our glass processing is engineered for precise cutout tolerances for seamless hardware installation."
            action={{ href: '/services', label: 'Explore hardware systems' }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HARDWARE.map((item, idx) => (
              <Reveal key={item.title} from={idx % 2 ? 'right' : 'left'} delay={idx * 0.08} className="h-full">
                <TiltCard as="article" className="card-frame flex flex-col h-full p-2.5">
                <div className="media-zoom relative aspect-[4/3] bg-[var(--paper)]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-4 pt-5 pb-4 flex-1 flex flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--royal)]">{item.tag}</span>
                  <h3 className="font-display text-xl text-[var(--ink)] mt-2 leading-tight">{item.title}</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed mt-3">{item.desc}</p>
                </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Local Value & Transparent Pricing ─── */}
      <section data-backdrop="/images/optimized/corporate-spider-fitting-canopy.webp" className="relative overflow-hidden py-24 sm:py-32">
        <BlueSweep dark />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Direct Factory Value"
            title="Honest Quotations & Local Jodhpur Reliability"
            description="We operate right here in Boranada / Pal, Jodhpur. By coordinating directly with our local fabrication team, you avoid multiple dealer markups, eliminate transit delays, and receive clear, itemized pricing based on exact engineering specifications."
          />
          <div className="grid md:grid-cols-3 glass-dark rounded-[var(--radius-card)] overflow-hidden">
            {VALUE_POINTS.map((point, idx) => (
              <Reveal
                key={point.title}
                from={['left', 'center', 'right'][idx]}
                delay={idx * 0.1}
                className="p-8 sm:p-10 border-b md:border-b-0 md:border-l first:border-l-0 border-white/10 flex flex-col"
              >
                <span className="font-display text-5xl text-[var(--gold-bright)] leading-none">0{idx + 1}</span>
                <h3 className="font-display text-2xl text-white mt-6">{point.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed mt-3">{point.body}</p>
                <span className="mt-auto pt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white">{point.note}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Instant estimate: list your glass, send it on WhatsApp ─── */}
      <section id="estimate" data-backdrop="/images/optimized/processing-tempering-furnace-line.webp" className="relative overflow-x-clip py-24 sm:py-32 scroll-mt-24">
        <BlueSweep dark />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Instant estimate"
            title="Get your rate in one message"
            description="List the glass you need. We calculate the area for you, and your complete list reaches our team on WhatsApp, ready to quote."
          />
          <QuoteBuilder />
        </div>
      </section>

      <CTABanner
        title="Ready to Build Something with Glass?"
        description="Share your requirements, rough dimensions, or architectural elevations. We will evaluate the specifications and guide you on the best options."
        primaryAction={{ label: 'Request a Project Quote', href: '/contact#quote' }}
        secondaryAction={{ label: `Call ${COMPANY.phone}`, href: `tel:${COMPANY.phoneRaw}` }}
        glass
      />
      </div>
    </div>
  );
}
