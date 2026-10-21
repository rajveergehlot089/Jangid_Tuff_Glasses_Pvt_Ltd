'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useMotionValue, useTransform, motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';

/** Counts up from `from` to `to` the first time it scrolls into view. */
function CountUp({ from = 0, to, format = (v) => Math.round(v) }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const mv = useMotionValue(from);
  const text = useTransform(mv, format);
  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(mv, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, mv, to]);
  return <motion.span ref={ref}>{text}</motion.span>;
}

/**
 * Row of verified figures. Each stat: { label, to, from?, prefix?, suffix?, text? } — `text` shows a
 * fixed value (e.g. a range) instead of counting.
 */
export default function StatsBand({ stats }) {
  return (
    <div className="glass-dark rounded-[var(--radius-card)] grid grid-cols-2 lg:grid-cols-4 overflow-hidden">
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          from="center"
          delay={i * 0.08}
          className={`p-6 sm:p-8 text-center ${i % 2 ? 'border-l border-white/10' : ''} ${i >= 2 ? 'border-t lg:border-t-0 border-white/10' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
        >
          <p className="font-display text-4xl sm:text-5xl text-white tabular-nums leading-none whitespace-nowrap">
            {s.prefix}
            {s.text ?? <CountUp from={s.from} to={s.to} />}
            {s.suffix && <span className="text-[0.6em] text-[var(--gold-bright)]">{s.suffix}</span>}
          </p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">{s.label}</p>
        </Reveal>
      ))}
    </div>
  );
}
