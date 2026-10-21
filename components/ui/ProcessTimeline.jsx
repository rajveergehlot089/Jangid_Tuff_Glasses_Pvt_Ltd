'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ClipboardList, Ruler, Factory, PackageCheck, CircleDot } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const ICONS = { ClipboardList, Ruler, Factory, PackageCheck };

/** One step's marker lights up once the gold progress line reaches it. */
function Node({ progress, at, Icon }) {
  const lit = useTransform(progress, [at - 0.04, at + 0.02], [0, 1]);
  const scale = useTransform(lit, [0, 1], [0.85, 1]);
  return (
    <span className="relative grid place-items-center w-14 h-14">
      <span className="absolute inset-0 rounded-full border border-white/15 bg-[#0a1226]" />
      <motion.span className="absolute inset-0 rounded-full bg-[var(--gold)] shadow-[0_0_30px_rgba(201,164,106,0.55)]" style={{ opacity: lit, scale }} />
      <Icon className="relative w-5 h-5 text-white" aria-hidden="true" />
    </span>
  );
}

/**
 * Vertical project timeline: a gold line fills as the visitor scrolls, each step's marker lights up
 * when reached, and step cards sweep in from alternating sides (stacked on phones).
 */
export default function ProcessTimeline({ steps }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <ol ref={ref} className="relative max-w-5xl mx-auto" role="list">
      {/* Rail + gold fill */}
      <span className="absolute top-0 bottom-0 left-7 md:left-1/2 w-px -translate-x-1/2 bg-white/12" aria-hidden="true" />
      <motion.span
        className="absolute top-0 bottom-0 left-7 md:left-1/2 w-[2px] -translate-x-1/2 origin-top bg-gradient-to-b from-[var(--gold-bright)] to-[var(--gold)]"
        style={{ scaleY: progress }}
        aria-hidden="true"
      />

      {steps.map((step, i) => {
        const right = i % 2 === 1;
        const at = steps.length > 1 ? i / (steps.length - 1) : 0;
        return (
          <li key={step.title} className="relative grid grid-cols-[3.5rem_1fr] md:grid-cols-[1fr_3.5rem_1fr] gap-x-5 md:gap-x-8 pb-12 last:pb-0">
            <div className={`hidden md:block ${right ? 'md:order-1' : 'md:order-3'}`} aria-hidden="true" />
            <div className="md:order-2 flex justify-center">
              <Node progress={progress} at={at} Icon={ICONS[step.icon] || CircleDot} />
            </div>
            <Reveal
              from={right ? 'right' : 'left'}
              className={`glass-dark rounded-[var(--radius-card)] p-6 sm:p-7 ${right ? 'md:order-3' : 'md:order-1 md:text-right'}`}
            >
              <span className="font-display text-4xl text-[var(--gold-bright)] leading-none">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-2xl text-white mt-3">{step.title}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{step.description}</p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
