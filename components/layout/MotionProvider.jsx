'use client';

import { MotionConfig } from 'framer-motion';
import InteractionLayer from '@/components/layout/InteractionLayer';
import ClickTracker from '@/components/layout/ClickTracker';

/** Makes every Framer Motion animation respect the visitor's "reduce motion" setting, and mounts site-wide pointer/scroll motion. */
export default function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="never">
      {children}
      <InteractionLayer />
      <ClickTracker />
    </MotionConfig>
  );
}
