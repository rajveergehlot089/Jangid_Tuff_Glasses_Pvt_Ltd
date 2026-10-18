import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export default function CTABanner({
  title = 'Ready to Discuss Your Glass Specifications?',
  description = 'Send us your project drawings, site measurements, or photos directly on WhatsApp for an immediate assessment.',
  primaryAction = { label: 'Request a Project Quote', href: '/contact#quote' },
  secondaryAction = { label: `Call ${COMPANY.phone}`, href: `tel:${COMPANY.phoneRaw}` },
}) {
  return (
    <section className="bg-gradient-to-r from-[#08233f] via-[#09355f] to-[#08233f] text-white py-16 sm:py-20 relative overflow-hidden border-t border-b border-sky-500/20 shadow-2xl" aria-label="Call to action">
      {/* Decorative radial glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-gradient-to-br from-sky-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#0878d1]/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-bold text-sky-200 uppercase tracking-widest mb-5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          Direct Factory Quote
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={primaryAction.href}
            className="btn-gradient rounded-full text-white px-8 py-3.5 font-bold text-sm shadow-xl inline-flex items-center gap-2 group transition-all duration-200 ease-out hover:-translate-y-0.5"
          >
            <span>{primaryAction.label}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 ease-out" />
          </Link>

          <a
            href={secondaryAction.href}
            className="rounded-full bg-white/10 hover:bg-white hover:text-[#08233f] text-white border border-white/30 px-8 py-3.5 font-bold text-sm transition-all duration-200 ease-out hover:-translate-y-0.5 inline-flex items-center gap-2 shadow-sm"
          >
            <Phone className="w-4 h-4 text-sky-400" />
            <span>{secondaryAction.label}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
