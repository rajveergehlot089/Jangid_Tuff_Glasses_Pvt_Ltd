import Link from 'next/link';
import { ArrowRight, Wrench, Sparkles, Shield, Truck, Compass, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import ServiceCard from '@/components/ui/ServiceCard';
import ProcessStep from '@/components/ui/ProcessStep';
import CTABanner from '@/components/ui/CTABanner';
import { SERVICES, PROCESS_STEPS } from '@/lib/constants';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta('services');

export default function ServicesPage() {
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
        name: 'Services',
        item: `${siteUrl}/services`,
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
        eyebrow="EXPERTISE & COORDINATION"
        title="Consultation, Sizing"
        titleAccent="& Execution"
        description="From preliminary blueprint analysis and glass thickness selection to custom CNC fabrication and site delivery coordination across Jodhpur and Rajasthan."
        primaryAction={{ label: 'Request Consultation', href: '/contact#quote' }}
        secondaryAction={{ label: 'Explore Products', href: '/products' }}
        backgroundImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85"
        showCategories={true}
        showWatchWork={true}
      />

      {/* Services Grid */}
      <section className="py-20 bg-[#f6f8fa]" aria-label="Services List">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">What We Provide</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-2">
              Specialized Glass Services
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Every glass installation requires tailored attention. Explore our structured service offerings designed to prevent costly site errors.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 4-Stage Project Workflow */}
      <section className="py-20 sm:py-28 bg-white" aria-label="Project Workflow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Our Working Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-2">
              How We Execute Your Project
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              A transparent, 4-stage process ensuring accuracy from first contact to glass delivery.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Hardware & System Compatibility */}
      <section className="py-20 bg-[#f8fafc] border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Hardware & Profiles</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-2">
              Architectural Hardware & Framing Systems
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Glass performance depends fundamentally on precision hardware coordination. We fabricate panels to exact tolerance cutouts for leading architectural systems, including Ozone-compatible fittings, floor springs, and slim partition channels.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Door Controls & Patch Fittings',
                category: 'Entrance Systems',
                points: ['Top & bottom patch fittings (SS 304/316)', 'Hydraulic floor springs (75kg–120kg)', 'Concealed overhead transom pivots', 'Security bottom euro-cylinder patch locks'],
              },
              {
                title: 'Shower Enclosure Hardware',
                category: 'Bathroom Spaces',
                points: ['90° & 180° solid brass shower hinges', 'Water-deflecting magnetic seals & drip sweeps', 'Top roller tubular sliding track kits', 'Wall-to-glass rigid stabilizer header bars'],
              },
              {
                title: 'Slim Partition Profiles',
                category: 'Commercial & Office',
                points: ['25mm to 45mm visible face aluminum channels', 'Crittall-style aesthetic grid transoms', 'Acoustic EPDM vibration gaskets', 'Concealed door jambs with magnetic latching'],
              },
              {
                title: 'Balustrade & Railing Mounts',
                category: 'Structural Balustrades',
                points: ['Duplex 2205 / SS 316 heavy spigots', 'Continuous aluminum base shoe channels', 'Point-fixed architectural standoff pins', 'Slotted stainless steel & wood top rails'],
              },
            ].map((hw, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 hover:border-[#0878d1]/30 transition-all duration-300 ease-out">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0878d1] block mb-1">
                    {hw.category}
                  </span>
                  <h3 className="font-extrabold text-base text-[#08233f] mb-4">
                    {hw.title}
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {hw.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-[#0878d1] font-bold mt-0.5">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior Design & Project Collaboration */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Project Collaboration</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233f] mt-3">
                Working With Architects & Interior Designers
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-5">
                We bridge the gap between architectural drawings and glass manufacturing. Whether you are executing a high-end villa in Jodhpur or a commercial workspace across Rajasthan, our technical team works directly with your elevation plans.
              </p>
              
              <div className="mt-8 space-y-4">
                {[
                  { title: 'Drawing & Elevation Review', desc: 'Send CAD drawings (.dwg/.pdf) or rough elevation sketches to verify cutout tolerances and tempering constraints.' },
                  { title: 'Material & Texture Guidance', desc: 'Sample review for clear float, extra-clear low-iron, fluted textures, lacquered backsplashes, and tint options.' },
                  { title: 'Logistics & Crated Safe Dispatch', desc: 'Specialized protective wooden crating and scheduled site vehicle delivery across the Jodhpur region.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#0878d1]/40 hover:bg-slate-50/80 transition-all duration-200 ease-out">
                    <h3 className="font-bold text-sm text-[#08233f]">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#08233f] to-[#041323] text-white shadow-xl border border-white/10">
                <span className="text-xs uppercase font-extrabold tracking-widest text-sky-400 block mb-2">Technical Guidance</span>
                <h3 className="text-2xl font-bold">Have a Project Elevation Ready?</h3>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  Send your drawings, approximate opening dimensions, and desired glass thickness directly to our technical desk via WhatsApp for rapid feasibility evaluation.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact#quote"
                    className="btn-gradient text-white text-xs font-bold px-6 py-3 rounded-full shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 inline-flex items-center gap-1.5"
                  >
                    <span>Send Drawings for Review</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed">
                <strong className="block font-bold mb-1">Installation Transparency:</strong>
                Our core specialty is high-precision glass processing and supply. For site installation, we provide detailed technical placement documentation and hardware templates, and can connect contractors with experienced regional glazing specialists.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />
    </div>
  );
}
