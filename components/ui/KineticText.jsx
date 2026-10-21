'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/**
 * Headline whose words rise out of their own lines as it scrolls into view,
 * and sink back when scrolled above again. Re-splits on resize / font load.
 */
export default function KineticText({ as: Tag = 'h2', className = '', children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      SplitText.create(el, {
        type: 'lines,words',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 115,
            rotate: 4,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.045,
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          }),
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
