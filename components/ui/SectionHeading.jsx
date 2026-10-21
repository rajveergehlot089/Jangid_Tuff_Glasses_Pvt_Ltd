import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import KineticText from '@/components/ui/KineticText';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  action,
  dark = false,
  className = '',
}) {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        centered ? 'text-center mx-auto max-w-3xl' : 'flex flex-col md:flex-row md:items-end justify-between gap-6'
      } ${className}`}
    >
      <Reveal from={centered ? 'center' : 'left'} className={centered ? '' : 'max-w-3xl'}>
        {eyebrow && <p className={dark ? 'kicker kicker--light' : 'kicker'}>{eyebrow}</p>}
        <KineticText className={`font-display mt-4 text-3xl sm:text-4xl md:text-5xl ${dark ? 'text-white' : 'text-[var(--ink)]'} leading-[1.08] tracking-[-0.02em]`}>
          {title}
        </KineticText>
        {description && (
          <p className={`mt-5 text-sm sm:text-base ${dark ? 'text-white/65' : 'text-[var(--muted)]'} leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}>
            {description}
          </p>
        )}
      </Reveal>
      {action && (
        <Reveal from="right" className={centered ? 'mt-6' : 'shrink-0'}>
          <Link href={action.href} className={`link-underline group${dark ? ' !text-white' : ''}`}>
            <span>{action.label}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
