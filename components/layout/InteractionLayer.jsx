'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

/**
 * Site-wide motion: Lenis inertial scrolling (synced to GSAP ScrollTrigger), a follow cursor
 * that reacts to links / images, and magnetic pull on elements marked `data-magnetic`.
 * Skipped entirely for reduced-motion users; the cursor and magnets also skip touch devices.
 */
export default function InteractionLayer() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) {
      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    document.documentElement.classList.add('has-cursor');

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    let magnet = null;
    let mode = '';

    const setMode = (next, text = '') => {
      if (next === mode) return;
      mode = next;
      ring.dataset.mode = next;
      label.textContent = text;
    };

    const releaseMagnet = () => {
      if (!magnet) return;
      gsap.to(magnet, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      magnet = null;
    };

    const onMove = (e) => {
      gsap.set([dot, ring], { autoAlpha: 1 });
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = e.target instanceof Element ? e.target : null;
      const view = target?.closest('[data-cursor="view"]');
      const interactive = target?.closest('a, button, [role="button"], input, select, textarea, label');
      if (view) setMode('view', 'View');
      else if (interactive) setMode('link');
      else setMode('');

      // Liquid glass controls: move the specular highlight to the pointer.
      const glass = target?.closest('.btn-royal, .btn-ghost-light, .btn-outline-ink, .capsule');
      if (glass) {
        const g = glass.getBoundingClientRect();
        glass.style.setProperty('--mx', `${e.clientX - g.left}px`);
        glass.style.setProperty('--my', `${e.clientY - g.top}px`);
      }

      // Signature cards: the edge light gathers at the pointer.
      const card = target?.closest('.card-frame, .glass-dark, .theme-dark .rounded-3xl.bg-white, .theme-dark .rounded-2xl.bg-white');
      if (card) {
        const c = card.getBoundingClientRect();
        card.style.setProperty('--cx', `${e.clientX - c.left}px`);
        card.style.setProperty('--cy', `${e.clientY - c.top}px`);
      }

      const m = target?.closest('[data-magnetic]');
      if (m !== magnet) releaseMagnet();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        gsap.to(m, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.28,
          y: (e.clientY - (r.top + r.height / 2)) * 0.35,
          duration: 0.4,
          ease: 'power3.out',
        });
      }
    };

    const onLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: 'back.out(3)' });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.classList.remove('has-cursor');
      releaseMagnet();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
