'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';

/** Service step card that drops in and swings from a short wire, like a hanging sign. */
export default function ServiceCard({ service, index = 0 }) {
  const title = service.name || service.title;
  const description = service.description;
  const details = service.details;
  const number = String(index + 1).padStart(2, '0');
  const href = service.href || `/contact?product=${encodeURIComponent(title || '')}#quote`;

  return (
    <div className="relative flex flex-col pt-9">
      <Reveal from="hang" delay={index * 0.12} className="relative flex flex-col flex-1">
        <TiltCard as="article" max={5} className="card-frame flex flex-col flex-1 p-6 sm:p-7">
        <span className="hang-wire" aria-hidden="true" />

        <div className="flex items-baseline justify-between mb-8">
          <span className="font-display text-5xl text-[var(--ink)] leading-none" aria-hidden="true">{number}</span>
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--muted)]">Stage {number}</span>
        </div>

        <h3 className="font-display text-2xl text-[var(--ink)] leading-tight">{title}</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mt-3">{description}</p>

        {details && typeof details === 'string' && (
          <p className="text-xs text-[var(--muted)] leading-relaxed mt-4 pt-4 border-t border-[var(--line)]">{details}</p>
        )}

        {details && Array.isArray(details) && details.length > 0 && (
          <ul className="mt-4 pt-4 border-t border-[var(--line)] space-y-2" role="list">
            {details.map((detail) => (
              <li key={detail} className="flex items-start gap-2.5 text-xs text-[var(--ink)]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--royal)] shrink-0" aria-hidden="true" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}

        <Link href={href} aria-label={`Enquire About Service: ${title}`} className="link-underline mt-auto pt-6 self-start group/l">
          <span>Enquire About Service</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/l:translate-x-1 transition-transform duration-200" aria-hidden="true" />
        </Link>
        </TiltCard>
      </Reveal>
    </div>
  );
}
