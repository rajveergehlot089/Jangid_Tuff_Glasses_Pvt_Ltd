'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// Hidden pose per entrance style. `fromAbove` flips the vertical drift so content scrolling back
// into view from the top edge enters downward, mirroring the scroll-down entrance.
function hiddenPose(from, fromAbove) {
  const v = fromAbove ? -1 : 1;
  switch (from) {
    case 'left':
      return { opacity: 0, x: -90, y: 24 * v, rotateY: 12, scale: 1, rotate: 0 };
    case 'right':
      return { opacity: 0, x: 90, y: 24 * v, rotateY: -12, scale: 1, rotate: 0 };
    case 'hang':
      // Hanging cards always drop and swing from their wire, whichever way you scroll.
      return { opacity: 0, x: 0, y: -70, rotate: -8, rotateY: 0, scale: 1 };
    default:
      return { opacity: 0, x: 0, y: 40 * v, scale: 0.9, rotate: 0, rotateY: 0 };
  }
}

const SHOWN = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, rotateY: 0 };

/** Cycles left → centre → right so each row of a 3-column grid opens outward from its own side. */
export const revealFromIndex = (index) => ['left', 'center', 'right'][index % 3];

export default function Reveal({ as = 'div', from = 'center', delay = 0, className = '', children, ...rest }) {
  const Tag = motion[as];
  const ref = useRef(null);
  const controls = useAnimationControls();
  const isHang = from === 'hang';
  // Enter once the element is 12% into the viewport; reset only after it has fully left.
  const entered = useInView(ref, { margin: '0px 0px -12% 0px' });
  const onScreen = useInView(ref);

  useEffect(() => {
    if (entered) {
      controls.start(
        isHang
          ? { ...SHOWN, transition: { delay, opacity: { duration: 0.3, delay }, default: { type: 'spring', stiffness: 110, damping: 9, mass: 0.9, delay } } }
          : { ...SHOWN, transition: { delay, duration: 0.85, ease: EASE } }
      );
    } else if (!onScreen && ref.current) {
      controls.set(hiddenPose(from, ref.current.getBoundingClientRect().top < 0));
    }
  }, [entered, onScreen, controls, from, delay, isHang]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      initial={hiddenPose(from, false)}
      animate={controls}
      style={{ transformOrigin: isHang ? '50% 0%' : '50% 50%', transformPerspective: 1200 }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
