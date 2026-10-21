import PageHero from '@/components/ui/PageHero';
import ContactQuoteForm from '@/components/ui/ContactQuoteForm';
import { COMPANY } from '@/lib/constants';
import { generateMetadata as genMeta } from '@/lib/seo';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import DarkCanvas from '@/components/layout/DarkCanvas';

export const metadata = genMeta('contact');

export default async function ContactPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const initialProduct = resolvedParams?.product || '';
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
        name: 'Contact Us',
        item: `${siteUrl}/contact`,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Page Hero - Strictly preserved original hero image */}
      <PageHero
        eyebrow="DIRECT FACTORY CONSULTATION"
        title="Connect & Discuss"
        titleAccent="Your Project"
        description="Discuss your architectural glass requirements directly with our Jodhpur fabrication team. Share site dimensions and get immediate expert guidance."
        primaryAction={{ label: 'Fill Quote Form', href: '#quote' }}
        secondaryAction={{ label: `Call ${COMPANY.phone}`, href: `tel:${COMPANY.phoneRaw}` }}
        backgroundImage="/images/optimized/commercial-atrium-canopy-entrance.webp"
        showCategories={true}
        showWatchWork={true}
      />

      <DarkCanvas images={['/images/optimized/corporate-spider-fitting-canopy.webp', '/images/optimized/architectural-villa-coastal-estate.webp']}>

      {/* Main Contact Section */}
      <section className="py-16 sm:py-20" id="quote">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          {/* Left Column: Business Info & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Connect With Us</span>
              <h2 className="text-3xl font-extrabold text-[#08233f] mt-2">Visit or Call Us</h2>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                We welcome architects, builders, interior designers, and individual homeowners. For site consultations or workshop visits, calling ahead is recommended.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Phone */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4 transition-all duration-300 ease-out hover:border-[#0878d1]/40 hover:bg-slate-50/80">
                <div className="w-10 h-10 rounded-xl bg-[#eaf5ff] text-[#0878d1] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Direct Phone / Call
                  </span>
                  <p className="text-sm font-semibold text-[#0878d1] mt-0.5">
                    {COMPANY.contactPerson}
                  </p>
                  <a
                    href={`tel:${COMPANY.phoneRaw}`}
                    className="text-base font-bold text-[#08233f] hover:text-[#0878d1] transition-colors duration-200 ease-out block mt-0.5"
                  >
                    {COMPANY.phone}
                  </a>
                  <a
                    href={`tel:${COMPANY.phoneAltRaw}`}
                    className="text-sm font-semibold text-slate-600 hover:text-[#0878d1] transition-colors duration-200 ease-out block"
                  >
                    Office: {COMPANY.phoneAlt}
                  </a>
                  <span className="text-xs text-slate-400">Mon – Sat, 10 AM – 7 PM · Sunday closed</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4 transition-all duration-300 ease-out hover:border-emerald-300 hover:bg-emerald-50/30">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Instant WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp}?text=Hello%20Jangid%20Tuff%20Glasses,%20I%20have%20an%20enquiry.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-[#08233f] hover:text-emerald-600 transition-colors duration-200 ease-out block mt-0.5"
                  >
                    Chat on {COMPANY.phone}
                  </a>
                  <span className="text-xs text-slate-400">Share drawings, pictures & measurements</span>
                </div>
              </div>

              {/* Address */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4 transition-all duration-300 ease-out hover:border-[#0878d1]/40">
                <div className="w-10 h-10 rounded-xl bg-[#eaf5ff] text-[#0878d1] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Address & Location
                  </span>
                  <p className="text-sm font-semibold text-[#08233f] mt-0.5 leading-snug">
                    {COMPANY.address.full}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Industrial Area Boranada, Jodhpur, Rajasthan</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <a
                href={COMPANY.mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#08233f] px-5 py-3 text-xs font-bold transition-all duration-200 ease-out hover:-translate-y-0.5"
              >
                <span>Open Google Maps Directions</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={COMPANY.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#08233f] px-5 py-3 text-xs font-bold transition-all duration-200 ease-out hover:-translate-y-0.5"
              >
                <span>Instagram Profile</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm aspect-video relative">
              <iframe
                title={`Google Maps Location of ${COMPANY.name}`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Jangid%20Tuff%20Glasses%20Private%20Limited%2C%2021%20Narnadi%2C%20Boranada%2C%20Pal%2C%20Jodhpur%2C%20Rajasthan%20342017&output=embed"
              />
            </div>
          </div>

          {/* Right Column: Quote Form - Direct SSR rendering (No Suspense fallback lag) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200">
            <div>
              <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Estimate & Briefing Form</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08233f] mt-2">
                Request a Project Quote
              </h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Provide as many details as possible. This form formats your enquiry directly into WhatsApp for quick processing by our sales and technical team.
              </p>
            </div>

            <ContactQuoteForm key={initialProduct || 'default'} initialProduct={initialProduct} />

            {/* Practical Guidance on Quotation Details */}
            <div className="mt-8 p-5 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-600 space-y-2.5">
              <span className="font-bold text-[#08233f] text-sm block">How to get an accurate estimate quickly:</span>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                <li>Include <strong>width & height</strong> in mm, inches, or feet.</li>
                <li>Mention the <strong>application</strong> (e.g. bathroom shower partition, office door, balcony railing).</li>
                <li>Specify if you need <strong>hardware fittings</strong> (hinges, floor spring, aluminum channels) or glass only.</li>
                <li>Photos of the site space can be attached directly in WhatsApp after launching.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      </DarkCanvas>
    </div>
  );
}
