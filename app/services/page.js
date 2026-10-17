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
  return (
    <div className="flex flex-col">
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

      {/* Hardware & Ozone Compatibility */}
      <section className="py-16 bg-[#eaf5ff]/50 border-t border-b border-blue-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Hardware Integration</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08233f] mt-2">
            Engineered for Compatibility
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
            Our glass panels are cut, drilled, and tempered with strict tolerance controls to ensure 100% compatibility with industry-standard fittings — including Ozone India architectural hardware, spider fittings, sliding shower channels, and stainless steel spigots.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-bold text-[#08233f]">
            <span className="bg-white px-4 py-2 rounded-full border border-blue-200">✓ Patch Fittings</span>
            <span className="bg-white px-4 py-2 rounded-full border border-blue-200">✓ Floor Springs</span>
            <span className="bg-white px-4 py-2 rounded-full border border-blue-200">✓ Spider Glazing</span>
            <span className="bg-white px-4 py-2 rounded-full border border-blue-200">✓ Shower Channels</span>
            <span className="bg-white px-4 py-2 rounded-full border border-blue-200">✓ Railing Spigots</span>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />
    </div>
  );
}
