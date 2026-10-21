'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, animate, useInView } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

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
            onClick={() => setFinish(key)}
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
        <Image src={PHOTO} alt="Conference room seen through clear glass" fill sizes="(max-width: 1024px) 100vw, 1100px" className="object-cover" />

        {/* The chosen finish, revealed to the right of the divider */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} aria-hidden="true">
          <Image src={PHOTO} alt="" fill sizes="(max-width: 1024px) 100vw, 1100px" className="object-cover scale-105 transition-[filter] duration-500" style={{ filter: f.img }} />
          <div className="absolute inset-0 transition-[background] duration-500" style={{ background: f.overlay, mixBlendMode: f.blend || 'normal' }} />
        </div>

        <span className="absolute top-4 left-4 rounded-full bg-black/45 backdrop-blur px-3 py-1 text-[11px] font-semibold text-white">Clear</span>
        <motion.span key={finish} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="absolute top-4 right-4 rounded-full bg-black/45 backdrop-blur px-3 py-1 text-[11px] font-semibold text-white">
          {f.label}
        </motion.span>

        {/* Divider + handle */}
        <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${pos}%` }} aria-hidden="true">
          <div className="absolute inset-y-0 -left-px w-0.5 bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
          <div className="capsule absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center w-12 h-12 text-white">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>

        {/* A native range input covers the photo: drag anywhere, or use arrow keys */}
        <input
          type="range"
          min="0"
          max="100"
          step="0.5"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare clear glass with ${f.label.toLowerCase()} glass`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>
      <motion.p key={`${finish}-note`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-white/65">
        <strong className="text-white font-semibold">{f.label}:</strong> {f.note} <span className="text-white/40">Illustration only. Ask our team to see real samples.</span>
      </motion.p>
    </div>
  );
}
