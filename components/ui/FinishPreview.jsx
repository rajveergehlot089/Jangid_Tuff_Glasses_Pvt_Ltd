'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, animate, useInView } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const EASE = [0.16, 1, 0.3, 1];
const PHOTO = '/images/optimized/partitions-corporate-conference-room.webp';

// How the room looks through each glass finish (an illustration, not a colour sample).
const FINISHES = {
  frosted: { label: 'Frosted', note: 'Soft privacy, full daylight.', img: 'blur(7px) brightness(1.1) saturate(0.85)', overlay: 'rgba(255,255,255,0.22)' },
  fluted: {
    label: 'Fluted',
    note: 'Vertical reeds blur shapes, keep light.',
    img: 'blur(2.5px) brightness(1.05)',
    overlay: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.20) 0 3px, rgba(0,0,0,0.14) 3px 6px, rgba(255,255,255,0.05) 6px 16px)',
  },
  bronze: { label: 'Bronze tint', note: 'Warm, cuts glare and heat.', img: 'saturate(0.9)', overlay: 'rgba(92, 56, 24, 0.48)', blend: 'multiply' },
  grey: { label: 'Grey tint', note: 'Cool, calm, reduces glare.', img: 'saturate(0.8)', overlay: 'rgba(28, 34, 42, 0.5)', blend: 'multiply' },
};

/**
 * Glass panel geometry for partitions-corporate-conference-room.webp.
 *
 * The photo shows a glass partition wall taken from inside the open office.
 * The partition has 3 glass panes separated by thin aluminium mullions:
 *
 *   |  person  |[ pane-1 ]|[m]|[ pane-2 ]|[m]|[   pane-3  ]|
 *   0          8%        27% 29% 31%      50% 52%           97%
 *
 * Top rail: ~6% from top.  Bottom track: ~94% from top.
 *
 * The finish effect is applied ONLY to these three rectangles so the ceiling,
 * floor, aluminium frames and the person outside the glass remain unaffected —
 * making the comparison feel like looking at real glass rather than a filter.
 */
const PANE_IDS = ['gp1', 'gp2', 'gp3'];
const PANES = [
  { x: 0.08, y: 0.06, w: 0.19, h: 0.88 }, // left pane
  { x: 0.31, y: 0.06, w: 0.19, h: 0.88 }, // centre pane
  { x: 0.54, y: 0.06, w: 0.43, h: 0.88 }, // right pane (wider — two panels merged)
];

/** Drag across one room to compare clear glass with frosted, fluted or tinted glass. */
export default function FinishPreview() {
  const [finish, setFinish] = useState('frosted');
  const [pos, setPos] = useState(88);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -25% 0px' });
  const f = FINISHES[finish];

  // On first view the divider glides in to show the effect, inviting a drag.
  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(88, 50, { duration: 1.6, ease: EASE, delay: 0.3, onUpdate: setPos });
    return controls.stop;
  }, [inView]);

  return (
    <div ref={ref}>
      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Glass finish">
        {Object.entries(FINISHES).map(([key, item]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setFinish(key);
              trackEvent('finish_preview', { finish: key });
            }}
            aria-pressed={finish === key}
            className={`relative px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
              finish === key ? 'text-[#1c1006] border-transparent' : 'text-white/80 border-white/15 hover:border-white/40'
            }`}
          >
            {finish === key && <motion.span layoutId="finish-pill" className="absolute inset-0 rounded-full bg-[var(--gold-bright)]" transition={{ duration: 0.45, ease: EASE }} />}
            <span className="relative">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] select-none ring-1 ring-white/10">

        {/* SVG clip-path definitions — one clipPath covering all three glass panes */}
        <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="finish-glass-panes" clipPathUnits="objectBoundingBox">
              {PANES.map((p, i) => (
                <rect key={PANE_IDS[i]} x={p.x} y={p.y} width={p.w} height={p.h} />
              ))}
            </clipPath>
          </defs>
        </svg>

        {/* Layer 1 — always-visible base image (clear glass, full frame) */}
        <Image
          src={PHOTO}
          alt="Conference room seen through clear glass partition"
          fill
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="object-cover"
        />

        {/* Layer 2 — finish effect, restricted to the glass panes only.
            Two nested clips:
              outer → slider reveal (inset from left at pos%)
              inner → glass-panes SVG clip (only the 3 pane rectangles)
            Result: the finish appears only inside the glass, leaving the
            aluminium frames, ceiling, floor and person outside the glass clear. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          aria-hidden="true"
        >
          <div className="absolute inset-0" style={{ clipPath: 'url(#finish-glass-panes)' }}>
            <Image
              src={PHOTO}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover scale-[1.03] transition-[filter] duration-500"
              style={{ filter: f.img }}
            />
            <div
              className="absolute inset-0 transition-[background,opacity] duration-500"
              style={{ background: f.overlay, mixBlendMode: f.blend || 'normal' }}
            />
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-4 left-4 rounded-full bg-black/45 backdrop-blur px-3 py-1 text-[11px] font-semibold text-white z-10">
          Clear
        </span>
        <motion.span
          key={finish}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 rounded-full bg-black/45 backdrop-blur px-3 py-1 text-[11px] font-semibold text-white z-10"
        >
          {f.label}
        </motion.span>

        {/* Divider + handle */}
        <div className="absolute inset-y-0 pointer-events-none z-10" style={{ left: `${pos}%` }} aria-hidden="true">
          <div className="absolute inset-y-0 -left-px w-0.5 bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
          <div className="capsule absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center w-12 h-12 text-white">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>

        {/* Invisible range input — drag anywhere or use arrow keys */}
        <input
          type="range"
          min="0"
          max="100"
          step="0.5"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare clear glass with ${f.label.toLowerCase()} glass`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>

      <motion.p key={`${finish}-note`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-white/65">
        <strong className="text-white font-semibold">{f.label}:</strong> {f.note}{' '}
        <span className="text-white/40">Illustration only. Ask our team to see real samples.</span>
      </motion.p>
    </div>
  );
}
