'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageSquare, Shield, Clock, MapPin, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import ServiceCard from '@/components/ui/ServiceCard';
import CTABanner from '@/components/ui/CTABanner';
import CinematicScrollHero from '@/components/ui/CinematicScrollHero';
import { COMPANY, PRODUCT_CATEGORIES, SERVICES } from '@/lib/constants';

export default function HomePage() {
  const featuredProducts = PRODUCT_CATEGORIES.slice(0, 6);
  const coreServices = SERVICES.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── Premium Cinematic Scroll Hero ─── */}
      <CinematicScrollHero />

      {/* ─── Product Categories Preview ─── */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.25em]">
                Comprehensive Catalogue
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-2 tracking-tight">
                Engineered Glass for Every Application
              </h2>
              <p className="text-slate-600 mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
                Explore our core glass solutions manufactured and supplied for modern architecture, interiors, and safety installations.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-bold text-[#0878d1] hover:text-[#08233f] transition duration-500 group shrink-0 text-sm"
            >
              <span>View full product catalogue</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition duration-500" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Company Section ─── */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with Jodhpur badge */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] relative group bg-slate-100">
              <Image
                src="/images/real/factory-front-original.jpg"
                alt="Authentic photograph of Jangid Tuff Glasses Private Limited Factory in Boranada Jodhpur"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08233f]/75 via-[#08233f]/15 to-transparent transition-opacity duration-500" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08233f]/90 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified Factory Premises</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-gradient-to-br from-[#08233f] to-[#041323] text-white p-6 rounded-3xl shadow-2xl max-w-xs border border-white/15 hidden sm:block animate-float-gentle">
              <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">
                Boranada Plant
              </span>
              <span className="text-xs text-slate-300 mt-1.5 block leading-relaxed">
                Operating directly from 21 Narnadi, Boranada Industrial Area, serving Jodhpur, Pali, Barmer, Nagaur & across Rajasthan.
              </span>
            </div>
          </div>

          {/* Right: Narrative */}
          <div>
            <p className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.25em]">Company Profile</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-3 leading-tight tracking-tight">
              A Trusted Glass Partner in Jodhpur, Rajasthan
            </h2>
            <p className="text-slate-600 leading-relaxed mt-6 text-sm sm:text-base">
              <strong>{COMPANY.name}</strong> ({COMPANY.nameHindi}) operates from {COMPANY.address.street} in {COMPANY.address.city}. We focus on providing modern glass solutions tailored to architectural and interior project specifications.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4 text-sm sm:text-base">
              Whether you are an architect designing an office partition, a builder requiring toughened structural glass, or a homeowner seeking a custom LED mirror, our team works directly with your drawings and site measurements to ensure precise fit and finish.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#eaf5ff] to-[#f3f9ff] border border-blue-100/80 shadow-sm">
                <span className="text-[#08233f] font-bold block text-sm">Verified Address</span>
                <span className="text-xs text-slate-600 mt-1 block leading-relaxed">{COMPANY.address.full}</span>
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#eaf5ff] to-[#f3f9ff] border border-blue-100/80 shadow-sm">
                <span className="text-[#08233f] font-bold block text-sm">Direct Contact</span>
                <span className="text-xs text-slate-600 mt-1 block leading-relaxed">{COMPANY.phone} • Fast phone & WhatsApp response</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="btn-gradient text-white px-7 py-3.5 rounded-full font-bold text-sm inline-flex items-center gap-2 shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5"
              >
                <span>Read More About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-slate-300 text-[#132b45] px-7 py-3.5 font-bold hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-200 ease-out text-sm shadow-xs"
              >
                Contact & Directions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Overview ─── */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.25em]">Our Process & Services</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-2 tracking-tight">
              Comprehensive Support From Enquiry to Execution
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              We make glass procurement straightforward, consultative, and transparent for clients and contractors.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-bold text-[#0878d1] hover:text-[#08233f] text-sm group transition-colors duration-200 ease-out"
            >
              <span>View all services and project stages</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 ease-out" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Architectural Hardware & Profile Systems Highlight ─── */}
      <section className="py-20 sm:py-24 bg-white border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.25em]">
                Engineered Integration
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-2 tracking-tight">
                Architectural Hardware, Profiles & Interior Solutions
              </h2>
              <p className="text-slate-600 mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
                From hydraulic floor springs and frameless shower hinges to ultra-slim partition channels, our glass processing is engineered for precise cutout tolerances for seamless hardware installation.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-bold text-[#0878d1] hover:text-[#08233f] transition-colors duration-200 ease-out group shrink-0 text-sm"
            >
              <span>Explore hardware systems</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 ease-out" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Door Controls & Patch Fittings',
                desc: 'Top/bottom patch fittings, hydraulic floor springs, and bottom euro-locks for commercial and residential frameless entrances.',
                icon: Shield,
              },
              {
                title: 'Frameless Shower Hardware',
                desc: '304/316 grade stainless steel hinges, magnetic water-stops, stabilizing header bars, and sliding roller tracks.',
                icon: Sparkles,
              },
              {
                title: 'Slim Partition Profiles',
                desc: 'Minimalist 25mm–45mm aluminum channels, acoustic gaskets, and concealed door frames for modern workspaces.',
                icon: Clock,
              },
              {
                title: 'Balustrade & Railing Mounts',
                desc: 'Duplex core-drilled spigots, continuous base shoe profiles, and point-fixed standoffs engineered for safety.',
                icon: CheckCircle2,
              },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#f8fafc] border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1.5 hover:border-[#0878d1]/30 transition-all duration-300 ease-out"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#eaf5ff] text-[#0878d1] flex items-center justify-center mb-4 transition-transform duration-200 ease-out">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-[#08233f] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Local Jodhpur Value & Transparent Pricing Section ─── */}
      <section className="py-20 sm:py-28 bg-[#f1f5f9] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <p className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.25em]">Direct Factory Value</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-2 tracking-tight">
              Honest Quotations & Local Jodhpur Reliability
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              We operate right here in Boranada / Pal, Jodhpur. By coordinating directly with our local fabrication team, you avoid multiple dealer markups, eliminate transit delays, and receive clear, itemized pricing based on exact engineering specifications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-10 h-10 rounded-xl bg-[#eaf5ff] text-[#0878d1] font-bold text-sm flex items-center justify-center mb-4">
                  01
                </span>
                <h3 className="font-bold text-lg text-[#08233f] mb-2">Transparent Cost Factors</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Glass rates depend on panel thickness (5mm to 19mm), edge finish (seamed vs machine flat-polish), hole cutouts, and hardware grade (SS 304 vs 316). We provide fully broken-down estimates so you know exactly what is included.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#0878d1] mt-6 block">No hidden fabrication charges</span>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-bold text-sm flex items-center justify-center mb-4">
                  02
                </span>
                <h3 className="font-bold text-lg text-[#08233f] mb-2">Fast Measurement & Quote</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Measure height and width in millimeters at three points (top, middle, bottom), check wall plumbness, and share a photo on WhatsApp. Our Jodhpur technical desk prepares a structured quote with zero sales pressure.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 mt-6 block">Direct WhatsApp consultation</span>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 font-bold text-sm flex items-center justify-center mb-4">
                  03
                </span>
                <h3 className="font-bold text-lg text-[#08233f] mb-2">Local Rajasthan Dispatch</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Avoid out-of-state transit breakage risks. We crate and deliver toughened glass panels directly across Jodhpur, Pali, Barmer, Nagaur, and greater Rajasthan with scheduled site coordination.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-sky-700 mt-6 block">Factory-direct delivery in Jodhpur</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Visual Inspiration Preview ─── */}
      <section className="py-20 sm:py-28 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.25em]">Visual Inspiration</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-2 tracking-tight">
                Modern Glass Applications
              </h2>
              <p className="text-slate-600 mt-2 text-xs sm:text-sm max-w-xl">
                Explore our precision glass processing, tempering line, and architectural installations in Jodhpur.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 font-bold text-[#0878d1] hover:text-[#08233f] text-sm group shrink-0 transition-colors duration-200 ease-out"
            >
              <span>Explore full gallery</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 ease-out" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: 'Processing & Tempering', src: '/images/real/glass-processing-plant.png', tag: 'LiSEC Tempering Line' },
              { title: 'Office Partitions', src: '/images/optimized/partitions-corporate-conference-room.webp', tag: 'Commercial Glazing' },
              { title: 'Balcony & Stair Railings', src: '/images/optimized/railing-floating-staircase-glass.webp', tag: 'Architectural Railings' },
              { title: 'Shower Cubicles', src: '/images/optimized/shower-enclosure-frameless-corner.webp', tag: 'Shower Enclosures' },
            ].map((item, index) => (
              <div key={index} className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-slate-100 shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041323]/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] uppercase font-bold text-sky-300 tracking-wider">
                    {item.tag}
                  </span>
                  <span className="text-white font-bold text-sm sm:text-base mt-1">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA Banner ─── */}
      <CTABanner
        title="Ready to Build Something with Glass?"
        description="Share your requirements, rough dimensions, or architectural elevations. We will evaluate the specifications and guide you on the best options."
        primaryAction={{ label: 'Request a Project Quote', href: '/contact#quote' }}
        secondaryAction={{ label: `Call ${COMPANY.phone}`, href: `tel:${COMPANY.phoneRaw}` }}
      />
    </div>
  );
}
