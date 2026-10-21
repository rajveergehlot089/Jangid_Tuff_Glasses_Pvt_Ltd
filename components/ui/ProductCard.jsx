'use client';

import { ViewTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal, { revealFromIndex } from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';

export default function ProductCard({ product, index = 0 }) {
  const { name, slug, description, image, tag, features } = product;

  return (
    <Reveal from={revealFromIndex(index)} delay={(index % 3) * 0.08} className="h-full">
      <TiltCard as="article" className="card-frame flex flex-col h-full p-2.5">
      <Link href={`/products/${slug}`} tabIndex={-1} aria-hidden="true" data-cursor="view" className="media-zoom relative block aspect-[16/10] bg-[var(--paper)]">
        <ViewTransition name={`product-photo-${slug}`}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        </ViewTransition>
        <span className="absolute top-3 left-3 rounded-full bg-[var(--ink)] text-white font-display text-base leading-none px-3 py-2">
          {String(index + 1).padStart(2, '0')}
        </span>
        {tag && (
          <span className="absolute bottom-3 left-3 rounded-full bg-white/95 backdrop-blur text-[var(--ink)] text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-1.5">
            {tag}
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 px-4 pt-6 pb-4 sm:px-5">
        <h3 className="font-display text-2xl text-[var(--ink)] leading-tight">{name}</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mt-3">{description}</p>

        {features && features.length > 0 && (
          <ul className="mt-5 border-t border-[var(--line)]" role="list" aria-label={`${name} features`}>
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 py-2.5 border-b border-[var(--line)] text-xs font-medium text-[var(--ink)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--royal)] shrink-0" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6 flex items-center justify-between gap-4">
          <Link href={`/products/${slug}`} aria-label={`Details: ${name}`} className="link-underline">
            Details
          </Link>
          <Link href={`/contact?product=${slug}#quote`} aria-label={`Quote: ${name}`} className="btn-royal group/btn !py-2.5 !px-4 !text-xs">
            <span>Get a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>
        </div>
      </div>
      </TiltCard>
    </Reveal>
  );
}
