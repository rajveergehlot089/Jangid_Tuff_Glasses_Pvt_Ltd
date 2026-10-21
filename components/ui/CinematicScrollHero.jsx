'use client';

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, MessageSquare, Phone, ChevronDown } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Blue-hour intro (scripts/build-intro-frames.mjs) dissolves into the 240-frame dusk tour (scripts/extract-video-frames.mjs).
const INTRO_FRAMES = 24;
const MAIN_FRAMES = 240;
const TOTAL_FRAMES = INTRO_FRAMES + MAIN_FRAMES;
const FRAME_DIR = '/images/cinematic-frames/';

function getFrameUrl(index) {
  const intro = index < INTRO_FRAMES;
  const n = intro ? index + 1 : index - INTRO_FRAMES + 1;
  return `${FRAME_DIR}${intro ? 'intro_' : 'frame_'}${String(n).padStart(3, '0')}.webp`;
}

const CHAPTERS = [
  '01 • Balcony Glass Railings',
  '02 • Architectural Glass Profiles',
  '03 • Staircase Glass Balustrades',
  '04 • Designer Smart LED Mirrors',
  '05 • Acoustic Glass Partitions',
  '06 • Engineered Glass for Every Application',
];

// Product spec cards shown after the intro. `side` sets where the card sits and which way it enters.
const SPEC_STAGES = [
  {
    n: '02',
    side: 'right',
    image: '/images/optimized/hardware-door-controls-patch-fittings.webp',
    imageAlt: 'Patch fittings and floor spring hardware on a frameless glass door',
    kicker: 'Glass Profiles & Hardware',
    badge: 'Slimline 25mm–45mm',
    title: 'Architectural Glass Profiles & Structural Glazing',
    body: 'Precision aluminum channels, spider fittings, and thermal break frames engineered for storefronts, entrance doors, and double-height structural glass facades.',
    specs: [
      ['Profile Finishes', 'Anodized black, brushed champagne, deep bronze, and custom powder-coated RAL finishes.'],
      ['Hardware Fit', 'CNC cutouts for Dorma / Ozone floor springs, top pivots, and patch fittings.'],
      ['Weather Sealing', 'High-performance EPDM gaskets and structural silicones for zero air/water infiltration.'],
    ],
    link: { href: '/services', label: 'View Hardware & Profile Options' },
    wa: { label: 'Enquire Profiles', text: 'Hello, I need profile specifications and glass thickness for an entrance facade.' },
  },
  {
    n: '03',
    side: 'left',
    image: '/images/optimized/railing-floating-staircase-glass.webp',
    imageAlt: 'Floating staircase with frameless glass balustrade',
    kicker: 'Staircase Glazing',
    badge: '12mm – 15mm Extra Clear',
    title: 'Floating Staircase Glass Balustrades',
    body: 'Cantilevered staircase glass panels processed with diamond machine-polished edges, safety radius corners, and custom standoff bracket CNC cutouts.',
    specs: [
      ['Impact Strength', 'Heat-treated toughened glass compliant with BS EN 12150 & IS 2553 for human impact safety.'],
      ['Mounting', 'Solid SS 304/316 side-mounted standoff pins, concealed stringer shoe, or glass-to-glass clamps.'],
      ['Templating', 'Rake angles and step rises templated for millimeter-perfect alignment along floating treads.'],
    ],
    link: { href: '/products/railing-balustrade-glass', label: 'View Staircase Balustrades' },
    wa: { label: 'Enquire Specs', text: 'Hello, I would like to enquire about Staircase Glass Railings.' },
  },
  {
    n: '04',
    side: 'center',
    image: '/images/optimized/led-mirror-bathroom-vanity.webp',
    imageAlt: 'Backlit LED vanity mirror in a bathroom',
    kicker: 'LED Mirrors & Showers',
    badge: '5mm Copper-Free Mirror',
    title: 'Designer Smart LED Vanity Mirrors',
    body: 'Illuminated vanity mirrors and frameless shower cubicles engineered for luxury master bathrooms, hotels, and retail powder rooms.',
    specs: [
      ['Smart Lighting', 'Tri-color CCT LED backlighting (3000K / 4000K / 6500K) with stepless touch dimmer.'],
      ['Anti-Fog', 'Built-in demister pads that prevent mirror misting during hot showers.'],
      ['Custom CNC Shapes', 'Arches, capsules, organic pebble shapes, fluted glass, and beveled edge rounds.'],
      ['Shower Cubicles', '8mm–10mm toughened glass with hydrophobic easy-clean coating and SS 304 anti-leak hardware.'],
    ],
    link: { href: '/products/mirrors-led-mirrors', label: 'View LED Mirror Catalogue' },
    wa: { label: 'Enquire LED Mirrors', text: 'Hello Jangid Tuff Glasses, I would like to order a custom LED Mirror.' },
  },
  {
    n: '05',
    side: 'right',
    image: '/images/optimized/partitions-corporate-conference-room.webp',
    imageAlt: 'Frameless glass partitions around a corporate conference room',
    kicker: 'Acoustic Partitioning',
    badge: '10mm – 12mm Monolithic',
    title: 'Frameless Acoustic Office & Room Partitions',
    body: 'Floor-to-ceiling glass dividers and sliding acoustic walls that maintain daylight illumination while securing confidential boardroom acoustics.',
    specs: [
      ['Crystal Dry-Joints', 'Clear polycarbonate I-profiles eliminate messy wet silicone lines and maintain flawless sightlines.'],
      ['Acoustics', 'Sound isolation up to 36–42 dB for executive cabins, conference spaces, and residences.'],
      ['Sliding & Swing', 'Top-hung sliding barn doors and hydraulic soft-closing dampers.'],
    ],
    link: { href: '/products/slim-glass-partitions', label: 'View Partition Systems' },
    wa: { label: 'Enquire Specs', text: 'Hello, I need pricing and layout options for Office Glass Partitions.' },
  },
  {
    n: '06',
    side: 'center',
    final: true,
    image: '/images/optimized/processing-tempering-furnace-line.webp',
    imageAlt: 'Toughened glass panels on a tempering furnace line',
    kicker: 'Boranada Facility • Jodhpur',
    badge: 'Factory Direct Supply',
    title: 'Engineered Glass for Every Application.',
    body: 'From residential villas and luxury bathrooms to high-rise commercial facades, our Boranada manufacturing plant processes toughened safety glass, acoustic partitions, balustrades, and custom mirrors to strict millimeter tolerances.',
    specs: [
      ['Direct Rates', 'Eliminate dealer commissions with factory-direct pricing in Jodhpur.'],
      ['Local Dispatch', 'Direct crated transport across Jodhpur, Pali, Barmer, Nagaur & all Rajasthan districts.'],
      ['Engineering Advice', 'Share your site measurements or CAD elevations on WhatsApp for quick BOQ estimation.'],
    ],
    link: { href: '/products', label: 'Browse All 8 Categories' },
    wa: { label: 'WhatsApp Drawing', text: 'Hello Jangid Tuff Glasses, I would like to send my architectural drawing / BOQ for a quote.' },
  },
];


// Text stage windows as fractions (0-1) of the pinned scroll range, locked to the frame ranges:
// 1 Balcony (0-18), 2 Profiles (19-36), 3 Staircase (37-56), 4 Partitions (57-72),
// 5 LED Mirrors (73-94), 6 Final (95-119). `in` / `out` are [start, end] fade windows.
// Windows are fractions of the 20s dusk tour (seconds / 20), matched to what is on screen:
// exterior 0–1.5s · entrance doors 2–3s · staircase 3–5s · LED-mirror bathroom 6–7s ·
// glass partitions 8–10s · (kitchen & lounge 11–15s, film only) · railings & pool 15–20s.
const STAGES = [
  { out: [0.06, 0.085], exitX: -120 },
  { in: [0.085, 0.1], out: [0.14, 0.155], side: 'right' },
  { in: [0.16, 0.175], out: [0.235, 0.25], side: 'left' },
  { in: [0.285, 0.3], out: [0.39, 0.405], side: 'center' },
  { in: [0.41, 0.425], out: [0.525, 0.54], side: 'right' },
  { in: [0.75, 0.78], side: 'center' }, // final stage stays fully visible until the pin releases
];
// Horizontal direction a card travels in from (1 = from the right). Exits keep moving the same way.
const SIDE_DIR = { left: -1, right: 1, center: 0 };
const SIDE_JUSTIFY = { left: 'justify-start', right: 'justify-end', center: 'justify-center' };

const rangeProgress = (p, [start, end]) => Math.min(1, Math.max(0, (p - start) / (end - start)));
const smoothstep = (t) => t * t * (3 - 2 * t);

// Stages sit between the sticky header and the bottom status bar. Flex centering (not a CSS
// translate) so GSAP-driven transforms can never displace the card.
function stageWrapClass(isReducedMotion, side) {
  if (isReducedMotion) {
    return 'relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3';
  }
  return `absolute inset-x-0 top-[4.75rem] bottom-[3.5rem] md:top-[7.25rem] z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center ${SIDE_JUSTIFY[side]} pointer-events-none opacity-0 will-change-transform`;
}

function subscribeReducedMotion(callback) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener?.('change', callback);
  return () => mediaQuery.removeEventListener?.('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function CinematicScrollHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Wrapper and action-row elements for the 6 scroll chapters locked to video frames (see STAGES)
  const stageRefs = useRef([]);
  const actionRefs = useRef([]);

  const progressBarRef = useRef(null);
  const sweepRef = useRef(null);
  const activeChapterLabelRef = useRef(null);

  const imagesRef = useRef([]);
  const loadedCountRef = useRef(0);
  const isMountedRef = useRef(true);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafIdRef = useRef(null);

  const [initialLoaded, setInitialLoaded] = useState(false);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Draw frame on canvas with object-fit: cover
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    targetFrameRef.current = frameIndex;

    // Search for nearest loaded frame if target frame is not yet cached
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let nearest = null;
      let minDiff = Infinity;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const diff = Math.abs(i - frameIndex);
          if (diff < minDiff) {
            minDiff = diff;
            nearest = candidate;
          }
        }
      }
      img = nearest;
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const imgRatio = 16 / 9;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    currentFrameRef.current = frameIndex;
  }, []);

  // Responsive canvas resize with high-DPI scaling
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    drawFrame(targetFrameRef.current);
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }, [drawFrame]);

  // Preload frames progressively & reliably (cache-safe)
  useEffect(() => {
    isMountedRef.current = true;
    let active = true;

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const loadSingleFrame = (index) => {
      return new Promise((resolve) => {
        const existing = imagesRef.current[index];
        if (existing && existing.complete && existing.naturalWidth > 0) {
          resolve(existing);
          return;
        }

        const img = new window.Image();
        const onFinish = () => {
          if (!active) return resolve(img);
          loadedCountRef.current++;
          if (targetFrameRef.current === index) {
            drawFrame(index);
          }
          resolve(img);
        };

        img.onload = onFinish;
        img.onerror = () => resolve(null);
        img.src = getFrameUrl(index);
        imagesRef.current[index] = img;

        if (img.complete && img.naturalWidth > 0) {
          onFinish();
        }
      });
    };

    // 1. Load initial frame immediately
    loadSingleFrame(0).then(() => {
      if (!active) return;
      drawFrame(0);
      setInitialLoaded(true);

      // Refresh ScrollTrigger now that initial frame is painted
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }

      // 2. Load all remaining frames in parallel chunks of 10
      // Phones and data-saver connections fetch every second frame (half the download, same
      // sharpness); drawFrame already falls back to the nearest loaded frame in between.
      const step =
        window.matchMedia('(max-width: 767px)').matches || navigator.connection?.saveData ? 2 : 1;
      const preloadAll = async () => {
        const chunkSize = 10;
        for (let i = 1; i < TOTAL_FRAMES; i += chunkSize) {
          if (!active) break;
          const chunk = [];
          for (let j = i; j < Math.min(i + chunkSize, TOTAL_FRAMES); j++) {
            if (j % step !== 0 && j !== TOTAL_FRAMES - 1) continue;
            chunk.push(loadSingleFrame(j));
          }
          await Promise.all(chunk);
        }
      };

      preloadAll();
    });

    return () => {
      active = false;
      isMountedRef.current = false;
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame, handleResize]);

  // Drive frames AND text stages from one smoothed progress value (0 → 1 across the real pinned
  // scroll range), so the copy always matches the frame on screen. Stage windows are fractions of
  // that range; the last stage never fades out so its buttons stay fully visible.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const container = containerRef.current;
    if (!container) return;

    const stageEls = stageRefs.current;
    const actionEls = actionRefs.current;
    const activeState = [];

    const applyStages = (p) => {
      STAGES.forEach((stage, i) => {
        const el = stageEls[i];
        if (!el) return;

        const dir = SIDE_DIR[stage.side] ?? 0;
        const e = stage.in ? smoothstep(rangeProgress(p, stage.in)) : 1;
        const t = stage.out ? smoothstep(rangeProgress(p, stage.out)) : 0;
        const opacity = e * (1 - t);

        let x;
        let y;
        let rotate;
        let scale;
        if (dir === 0 && stage.in) {
          // Centre cards rise out of the scene and settle, then lift away.
          x = 0;
          y = 40 * (1 - e) - 30 * t;
          rotate = 0;
          scale = 0.86 + 0.14 * e + 0.04 * t;
        } else {
          // Side cards swing in on a hinge from their edge, then keep travelling on exit.
          x = dir * 160 * (1 - e) + (stage.exitX ?? -dir * 110) * t;
          y = 0;
          rotate = -dir * 16 * (1 - e);
          scale = 1;
        }

        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `perspective(1400px) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotateY(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        // Tether line draws once the card has mostly landed, and retracts first on exit.
        el.style.setProperty('--tether', (smoothstep(Math.max(0, (e - 0.5) / 0.5)) * (1 - Math.min(1, t * 2))).toFixed(3));

        // Only the stage that is actually on screen may take focus or clicks.
        const active = opacity >= 0.5;
        if (activeState[i] !== active) {
          activeState[i] = active;
          const actions = actionEls[i];
          if (actions) {
            if (active) actions.removeAttribute('inert');
            else actions.setAttribute('inert', '');
          }
        }
      });

      // Royal blue sweep: one left → right pass across each chapter change.
      if (sweepRef.current) {
        let sweep = 0;
        STAGES.forEach((stage) => {
          if (stage.in) {
            const [a, b] = stage.in;
            const local = rangeProgress(p, [a - 0.05, b + 0.02]);
            if (local > 0 && local < 1) sweep = local;
          }
        });
        sweepRef.current.style.transform = `translate3d(${(-100 + sweep * 200).toFixed(1)}%, 0, 0)`;
        sweepRef.current.style.opacity = Math.sin(Math.PI * sweep).toFixed(3);
      }

      let chapterIndex = 0;
      STAGES.forEach((stage, i) => {
        if (stage.in && p >= stage.in[0]) chapterIndex = i;
      });
      if (activeChapterLabelRef.current && activeChapterLabelRef.current.dataset.i !== String(chapterIndex)) {
        activeChapterLabelRef.current.dataset.i = String(chapterIndex);
        activeChapterLabelRef.current.textContent = CHAPTERS[chapterIndex];
      }
    };

    const ctx = gsap.context(() => {
      const playhead = { frame: 0 };
      applyStages(0);

      // Butter-smooth GSAP scrub tween across all 120 frames
      gsap.to(playhead, {
        frame: TOTAL_FRAMES - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: isReducedMotion ? 0.2 : 0.8,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
        onUpdate: () => {
          const target = Math.round(playhead.frame);
          if (target !== currentFrameRef.current) {
            drawFrame(target);
          }
          applyStages(Math.max(0, playhead.frame - INTRO_FRAMES) / (MAIN_FRAMES - 1));
        },
      });
    }, container);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      stageEls.forEach((el) => {
        if (!el) return;
        el.style.opacity = '';
        el.style.transform = '';
        el.style.removeProperty('--tether');
      });
    };
  }, [drawFrame, isReducedMotion]);

  // The canvas height changes with the layout mode, so re-measure it whenever the mode flips.
  useEffect(() => {
    handleResize();
  }, [isReducedMotion, handleResize]);

  // Jump past the pinned showcase without scrolling through it, and move focus with the view.
  const handleSkip = (event) => {
    const target = document.getElementById('hero-end');
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
    target.focus({ preventScroll: true });
  };

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${isReducedMotion ? '' : 'h-[760vh] md:h-[880vh]'}`}
      aria-label="Cinematic Architectural Glass Showcase"
    >
      {/* Pinned Sticky Viewport Window (reduced motion: a normal tall block with every stage stacked) */}
      <div
        className={
          isReducedMotion
            ? 'relative w-full min-h-screen overflow-hidden bg-[#070d18] flex flex-col'
            : 'sticky top-0 h-screen w-full overflow-hidden bg-[#070d18] flex flex-col justify-between'
        }
      >
        {/* Skip link: first tab stop in the showcase; always visible from tablet up */}
        <div className="absolute z-30 top-[5.5rem] right-4 md:top-[8rem] md:right-8">
          <a
            href="#hero-end"
            onClick={handleSkip}
            className="sr-only focus:not-sr-only md:not-sr-only block rounded-full focus-visible:outline-2 focus-visible:outline-white"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/25 px-3.5 py-1.5 text-[11px] font-bold text-white hover:bg-black/75">
              <span>Skip showcase</span>
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </a>
        </div>

        {/* Canvas Frame Renderer */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 w-full ${isReducedMotion ? 'h-screen' : 'h-full'} object-cover z-0 pointer-events-none`}
        />

        {/* Fallback Static Poster while initial frame loads */}
        {!initialLoaded && (
          <div
            className={`absolute inset-x-0 top-0 ${isReducedMotion ? 'h-screen' : 'h-full'} bg-cover bg-center z-0 transition-opacity duration-700`}
            style={{ backgroundImage: "url('/images/cinematic-frames/poster-blur.webp')" }}
          />
        )}

        {/* Royal blue light sweep: crosses left → right once per chapter (driven by applyStages) */}
        <div ref={sweepRef} className="hero-sweep" aria-hidden="true" />

        {/* Left scrim for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent pointer-events-none z-10" />

        {/* Short Top Shadow for Clean Navbar Contrast */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent pointer-events-none z-10" />

        {/* Short Bottom Transition into the Next Section */}
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-[#070d18] to-transparent pointer-events-none z-10" />

        {/* ─── STAGE 1: Intro (Frames 0 to 18) ─── */}
        <div
          ref={(el) => (stageRefs.current[0] = el)}
          className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-36 pb-8 w-full flex-1 flex flex-col justify-center${isReducedMotion ? ' min-h-screen' : ''}`}
        >
          <div className="max-w-2xl">
            <p className="kicker kicker--light">01 — Exterior Glazing &amp; Balconies</p>

            <h1 className="font-display mt-5 text-[2.6rem] sm:text-6xl lg:text-7xl text-white leading-[1.02] tracking-[-0.02em]">
              Balcony Glass Railings
              <span className="block italic text-white/75">&amp; Architectural Balustrades.</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed max-w-xl">
              Engineered for seamless panoramic views across balconies, terraces, and facades. Fabricated with 12mm–15mm toughened and PVB laminated glass to withstand intense Rajasthan wind pressures.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-white/80" role="list">
              {['12mm–15mm PVB Laminated', 'Continuous U-Channel / Spigots', '1.5 kN/m Crowd Load Certified'].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="w-3 h-px bg-[var(--gold)]" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <div ref={(el) => (actionRefs.current[0] = el)} className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/products/railing-balustrade-glass" className="btn-royal group" data-magnetic>
                <span>View Railing Specs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello Jangid Tuff Glasses, I would like to get a quote for Balcony Glass Railings.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-light"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                <span>WhatsApp Quote</span>
              </a>
              <a href={`tel:${COMPANY.phoneRaw}`} className="inline-flex items-center gap-2 px-2 py-3 text-xs font-semibold text-white/80 hover:text-white">
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{COMPANY.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── STAGES 2–6: spec cards that enter from left / right / centre, tethered to the scene ─── */}
        {SPEC_STAGES.map((s, k) => {
          const i = k + 1;
          return (
            <div key={s.n} ref={(el) => (stageRefs.current[i] = el)} className={stageWrapClass(isReducedMotion, s.side)}>
              <article className="hero-spec glass-dark group relative w-full max-w-[52rem] text-white">
                {!isReducedMotion && (
                  <span className={`hero-tether hero-tether--${s.side}`} aria-hidden="true">
                    <b />
                    <i />
                  </span>
                )}
                <div className="p-2.5">
                  <div className="media-zoom relative h-[clamp(7rem,24vh,15rem)]">
                    <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 1024px) 100vw, 832px" className="object-cover" style={{ objectPosition: s.focus || '50% 50%' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050a16]/75 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 font-display text-4xl leading-none">
                      {s.n}
                      <span className="ml-1 align-top font-sans text-[11px] text-white/50">/06</span>
                    </span>
                    <span className="absolute bottom-4 right-4 hidden sm:inline rounded-full bg-black/45 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85">{s.badge}</span>
                  </div>
                </div>
                <div className="grid lg:grid-cols-[1.1fr_1fr] lg:gap-2">
                  <div className="px-5 pb-5 pt-3 sm:px-7 sm:pb-6">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold-bright)]">{s.kicker}</span>
                    <h2 className="font-display mt-3 text-2xl sm:text-[2rem] leading-[1.1] tracking-[-0.01em]">{s.title}</h2>
                    <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">{s.body}</p>
                    <div
                      ref={(el) => (actionRefs.current[i] = el)}
                      inert={!isReducedMotion}
                      className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 pointer-events-auto"
                    >
                      <Link href={s.link.href} className={s.final ? 'btn-royal group' : 'hero-link group'} data-magnetic={s.final ? '' : undefined}>
                        <span>{s.link.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
                      </Link>
                      <a
                        href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(s.wa.text)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 py-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200"
                      >
                        <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{s.wa.label}</span>
                      </a>
                      {s.final && (
                        <a href={`tel:${COMPANY.phoneRaw}`} className="inline-flex items-center gap-1.5 py-2 text-xs font-semibold text-white/80 hover:text-white">
                          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Call Sales</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="hidden sm:block px-5 pb-5 sm:px-7 lg:pl-0 lg:pt-4">
                  <dl className="divide-y divide-white/10 border-y border-white/10">
                    {s.specs.map(([term, detail]) => (
                      <div key={term} className="grid grid-cols-[8.5rem_1fr] gap-3 py-2 text-xs">
                        <dt className="font-semibold text-white">{term}</dt>
                        <dd className="text-white/60 leading-relaxed">{detail}</dd>
                      </div>
                    ))}
                  </dl>
                  </div>
                </div>
              </article>
            </div>
          );
        })}

        {/* ─── Bottom Status & Interactive Chapter Indicator with Royal Blue Progress ─── */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 w-full flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[var(--royal-bright)] animate-pulse" />
            <span className="text-[11px] font-medium text-white/60 tracking-wide">
              Factory Direct Boranada • Fast Rajasthan Dispatch
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3.5">
              <span
                ref={activeChapterLabelRef}
                className="text-[11px] font-semibold uppercase tracking-wider text-white/70"
              >
                01 • Balcony Glass Railings
              </span>
              <div className="w-32 h-1.5 bg-white/10 border border-white/15 rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-[var(--royal)] to-[var(--royal-bright)] origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
              <ChevronDown className="w-4 h-4 text-[var(--royal-bright)] animate-bounce" />
            </div>
        </div>
      </div>

      {/* Skip-link target: the very end of the showcase */}
      <div id="hero-end" tabIndex={-1} className="absolute inset-x-0 bottom-0 h-px outline-none" />
    </section>
  );
}
