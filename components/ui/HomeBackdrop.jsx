'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * Full-screen photo that stays fixed behind the homepage (below the hero) and crossfades to the
 * image named by whichever `[data-backdrop]` section is crossing the middle of the viewport.
 * Must be the first child of the wrapper that holds those sections; it is sticky within that wrapper only.
 */
export default function HomeBackdrop({ images: fallback = [] }) {
  const ref = useRef(null);
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    // Direct-child sections without their own data-backdrop take the next fallback image in turn.
    const sections = [...(ref.current?.parentElement?.querySelectorAll(':scope > section, [data-backdrop]') ?? [])];
    let next = 0;
    sections.forEach((s) => {
      if (!s.dataset.backdrop && fallback.length) s.dataset.backdrop = fallback[next++ % fallback.length];
    });
    if (!sections.length && fallback.length) {
      setImages([fallback[0]]);
      setActive(fallback[0]);
      return undefined;
    }
    setImages([...new Set(sections.map((s) => s.dataset.backdrop))]);
    setActive(sections[0]?.dataset.backdrop ?? null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.backdrop);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fallback list is static per page
  }, []);

  return (
    <div ref={ref} className="sticky top-0 h-screen -mb-[100vh] overflow-hidden bg-[#050b18]" aria-hidden="true">
      {images.map((src, i) => {
        const isActive = src === active;
        return (
          <div
            key={src}
            className="absolute inset-0 transition-[opacity,transform] ease-out motion-reduce:transition-none"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'scale(1)' : 'scale(1.08)',
              transitionDuration: isActive ? '1200ms, 9000ms' : '1200ms, 1200ms',
            }}
          >
            <Image src={src} alt="" fill sizes="100vw" loading={i < 2 ? 'eager' : 'lazy'} className="object-cover" />
          </div>
        );
      })}
      {/* Navy tint keeps text and white cards readable over any photo */}
      <div className="absolute inset-0 bg-[#050b18]/72" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050b18]/60 via-transparent to-[#050b18]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(11,87,208,0.35),transparent_55%)]" />
    </div>
  );
}
