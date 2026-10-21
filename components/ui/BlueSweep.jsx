'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/** A royal blue light band that crosses its (relative, overflow-hidden) section from left to right on scroll. */
export default function BlueSweep({ dark = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0.1, 0.65], ['-100%', '100%']);
  const opacity = useTransform(scrollYProgress, [0.1, 0.38, 0.65], [0, 1, 0]);

  return (
    <span ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.span className={`blue-sweep${dark ? ' blue-sweep--dark' : ''}`} style={{ x, opacity }} />
    </span>
  );
}
