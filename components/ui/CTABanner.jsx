import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import BlueSweep from '@/components/ui/BlueSweep';
import Reveal from '@/components/ui/Reveal';

export default function CTABanner({
  title = 'Ready to Discuss Your Glass Specifications?',
  description = 'Send us your project drawings, site measurements, or photos directly on WhatsApp for an immediate assessment.',
  primaryAction = { label: 'Request a Project Quote', href: '/contact#quote' },
  secondaryAction = { label: `Call ${COMPANY.phone}`, href: `tel:${COMPANY.phoneRaw}` },
  glass = false, // transparent over a photo backdrop, content on a frosted panel
}) {
  return (
    <section
      data-backdrop={glass ? '/images/optimized/custom-architectural-glass-pavilion.webp' : undefined}
      className={`relative overflow-hidden text-white py-20 sm:py-28 ${glass ? '' : 'bg-[var(--ink)]'}`}
      aria-label="Call to action"
    >
      <BlueSweep dark />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal
        from="center"
        className={`grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-end ${glass ? 'glass-dark rounded-[var(--radius-card)] p-8 sm:p-12' : ''}`}
      >
        <div>
          <p className="kicker kicker--light">Direct Factory Quote</p>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em]">{title}</h2>
        </div>

        <div>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryAction.href} className="btn-royal group" data-magnetic>
              <span>{primaryAction.label}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </Link>
            <a href={secondaryAction.href} className="btn-ghost-light" data-magnetic>
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>{secondaryAction.label}</span>
            </a>
          </div>
        </div>
      </Reveal>
      </div>
    </section>
  );
}
