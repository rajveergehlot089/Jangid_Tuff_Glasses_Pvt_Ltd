import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Target, Eye, Heart } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import CTABanner from '@/components/ui/CTABanner';
import { COMPANY, ABOUT } from '@/lib/constants';
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
      {/* Page Hero */}
      <PageHero
        eyebrow="OUR IDENTITY & HERITAGE"
        title="Engineering Architectural"
        titleAccent="Glass in Jodhpur"
        description="A dedicated glass enterprise established in Jodhpur, Rajasthan, committed to architectural precision, toughened safety standards, and transparent client partnerships."
        primaryAction={{ label: 'Explore Products', href: '/products' }}
        secondaryAction={{ label: 'Contact Us', href: '/contact' }}
        backgroundImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85"
        showCategories={true}
        showWatchWork={true}
      />

      {/* Detailed Company Narrative */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">
              Our Heritage & Direction
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-3 leading-tight">
              Shaping Spaces With Precision Glass
            </h2>
            <p className="text-slate-600 leading-relaxed mt-6">
              <strong>{COMPANY.name}</strong> was founded to deliver modern architectural and interior glass products that elevate built environments across Rajasthan. Operating from <strong>{COMPANY.address.full}</strong>, we supply builders, designers, and private homeowners with tailored glass solutions.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              Modern architecture demands both visual purity and uncompromised safety. We specialize in toughened safety glass that meets rigorous mechanical standards, combined with bespoke finishes like fluted acoustic partitions, high-clarity silver mirrors, backlit LED vanity units, and heavy-duty railing balustrades.
            </p>

            <div className="mt-8 border-l-4 border-[#0878d1] pl-5 py-3 bg-slate-50 rounded-r-2xl">
              <p className="text-sm font-semibold text-[#08233f] italic">
                &ldquo;Our focus is simple: listen carefully to site requirements, advise on the correct glass specifications, and deliver with exact millimeter precision.&rdquo;
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] relative">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
                alt="Interior Glass Craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#08233f] text-white p-6 rounded-3xl shadow-xl max-w-xs border border-white/10 hidden sm:block">
              <span className="text-2xl font-black text-sky-400">Jodhpur</span>
              <p className="text-xs text-slate-300 mt-1">
                Conveniently situated in Boranada / Pal industrial hub for responsive local distribution across Rajasthan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-20 bg-[#f6f8fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Our Core Purpose</span>
            <h2 className="text-3xl font-extrabold text-[#08233f] mt-2">Mission, Vision & Core Values</h2>
            <p className="text-xs text-slate-500 mt-2">Proposed company statements guiding our operations and customer partnerships</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#eaf5ff] text-[#0878d1] flex items-center justify-center font-bold text-xl mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-xl text-[#08233f]">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-4">
                  {ABOUT.mission}
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#eaf5ff] text-[#0878d1] flex items-center justify-center font-bold text-xl mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-xl text-[#08233f]">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-4">
                  {ABOUT.vision}
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#eaf5ff] text-[#0878d1] flex items-center justify-center font-bold text-xl mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-xl text-[#08233f]">Core Values</h3>
                <ul className="text-sm text-slate-600 space-y-3 mt-4">
                  {ABOUT.values.map((val, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0878d1] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#08233f]">{val.title}:</strong> {val.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Business Details Card */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Verified Information</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08233f] mt-2">
            Registered Business Entity
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Jangid Tuff Glasses Private Limited is officially registered under Corporate Identity Number (CIN) <strong>{COMPANY.cin}</strong> in Rajasthan, India. All business operations, consultations, and dispatches are handled directly through our verified Jodhpur hub.
          </p>
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 max-w-2xl mx-auto text-left leading-relaxed">
            <strong className="text-[#08233f] block mb-1">Registration Disclosure:</strong>
            {COMPANY.cinNote}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="btn-gradient rounded-full text-white px-8 py-3.5 font-bold text-sm shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
            <a
              href={COMPANY.mapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-300 text-[#08233f] px-7 py-3.5 font-bold text-sm hover:bg-slate-50 hover:-translate-y-0.5 hover:border-slate-400 transition-all duration-200 ease-out shadow-xs"
            >
              Find Us on Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />
    </div>
  );
}
