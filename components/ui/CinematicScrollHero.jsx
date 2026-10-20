'use client';

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  MessageSquare,
  Phone,
  ChevronDown,
  Shield,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Droplets,
  Building2,
  Sliders,
  Maximize2,
  Eye,
} from 'lucide-react';
import { COMPANY } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 120;
const FRAME_BASE_PATH = '/images/cinematic-frames/frame_';

function getFrameUrl(index) {
  const pad = String(index + 1).padStart(3, '0');
  return `${FRAME_BASE_PATH}${pad}.webp`;
}

const CHAPTERS = [
  '01 • Balcony Glass Railings',
  '02 • Architectural Glass Profiles',
  '03 • Staircase Glass Balustrades',
  '04 • Acoustic Glass Partitions',
  '05 • Designer Smart LED Mirrors',
  '06 • Engineered Glass for Every Application',
];

// Text stage windows as fractions (0-1) of the pinned scroll range, locked to the frame ranges:
// 1 Balcony (0-18), 2 Profiles (19-36), 3 Staircase (37-56), 4 Partitions (57-72),
// 5 LED Mirrors (73-94), 6 Final (95-119). `in` / `out` are [start, end] fade windows.
const STAGES = [
  { out: [0.09, 0.14], exitY: 30 },
  { in: [0.15, 0.19], out: [0.28, 0.32], exitY: 35 },
  { in: [0.32, 0.36], out: [0.45, 0.49], exitY: 35 },
  { in: [0.49, 0.53], out: [0.62, 0.66], exitY: 35 },
  { in: [0.66, 0.7], out: [0.79, 0.83], exitY: 35 },
  { in: [0.83, 0.88] }, // final stage stays fully visible until the pin releases
];
const STAGE_ENTER_Y = 40;

const rangeProgress = (p, [start, end]) => Math.min(1, Math.max(0, (p - start) / (end - start)));
const smoothstep = (t) => t * t * (3 - 2 * t);

// Stages sit between the sticky header and the bottom status bar. Flex centering (not a CSS
// translate) so GSAP-driven transforms can never displace the card.
function stageWrapClass(isReducedMotion) {
  if (isReducedMotion) {
    return 'relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3';
  }
  return 'absolute inset-x-0 top-[4.75rem] bottom-[3.5rem] md:top-[7.25rem] z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center pointer-events-none opacity-0';
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

        const img = new Image();
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
      const preloadAll = async () => {
        const chunkSize = 10;
        for (let i = 1; i < TOTAL_FRAMES; i += chunkSize) {
          if (!active) break;
          const chunk = [];
          for (let j = i; j < Math.min(i + chunkSize, TOTAL_FRAMES); j++) {
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

        let opacity = 1;
        let y = 0;
        if (stage.in) {
          const e = smoothstep(rangeProgress(p, stage.in));
          opacity = e;
          y = STAGE_ENTER_Y * (1 - e);
        }
        if (stage.out) {
          const t = rangeProgress(p, stage.out);
          if (t > 0) {
            opacity *= 1 - smoothstep(t);
            y = -stage.exitY * smoothstep(t);
          }
        }

        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;

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
          applyStages(playhead.frame / (TOTAL_FRAMES - 1));
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
      className={`relative w-full ${isReducedMotion ? '' : 'h-[420vh] md:h-[480vh]'}`}
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

        {/* ─── ROYAL BLUE ARCHITECTURAL ACCENTS (Vibrant architectural lighting) ─── */}
        {/* Top-Right Luminous Royal Blue Accent Light Beam */}
        <div
          className="absolute -top-12 -right-12 w-[550px] h-[550px] pointer-events-none z-10 opacity-75 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(29, 78, 216, 0.18) 45%, transparent 70%)',
          }}
        />

        {/* Bottom-Left Luminous Royal Blue Accent Light Beam */}
        <div
          className="absolute -bottom-16 -left-16 w-[600px] h-[600px] pointer-events-none z-10 opacity-65 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(29, 78, 216, 0.32) 0%, rgba(30, 64, 175, 0.15) 50%, transparent 75%)',
          }}
        />

        {/* Center Specular Glazing Reflection Line */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-blue-500/10 pointer-events-none z-10" />

        {/* Crisp Neutral Dark Left Scrim for Text Legibility without Muddy Shadows */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none z-10" />

        {/* Short Top Shadow for Clean Navbar Contrast */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent pointer-events-none z-10" />

        {/* Short Bottom Transition into the Next Section */}
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-[#070d18] to-transparent pointer-events-none z-10" />

        {/* ═══════════════════════════════════════════════════════════════════════════
            STAGE 1: Balcony Glass Railings & Villa Exterior (Frames 0 to 18)
            ═══════════════════════════════════════════════════════════════════════════ */}
        <div
          ref={(el) => (stageRefs.current[0] = el)}
          className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-36 pb-8 w-full flex-1 flex flex-col justify-center${isReducedMotion ? ' min-h-screen' : ''}`}
        >
          <div className="max-w-2xl">
            {/* Royal Blue Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/80 backdrop-blur-md border border-blue-500/40 text-blue-200 mb-5 shadow-[0_0_15px_rgba(37,99,235,0.35)]">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#60a5fa]" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
                01 • Exterior Glazing & Balconies
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-md">
              Balcony Glass Railings <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">
                &amp; Architectural Balustrades.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow-sm">
              Engineered for seamless panoramic views across balconies, terraces, and facades. Fabricated with 12mm–15mm toughened and PVB laminated glass to withstand intense Rajasthan wind pressures.
            </p>

            {/* Feature Bullets */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-blue-200">
              <span className="px-3 py-1 rounded-full bg-blue-900/50 border border-blue-500/30">
                12mm–15mm PVB Laminated
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-900/50 border border-blue-500/30">
                Continuous U-Channel / Spigots
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-900/50 border border-blue-500/30">
                1.5 kN/m Crowd Load Certified
              </span>
            </div>

            {/* Action Buttons */}
            <div ref={(el) => (actionRefs.current[0] = el)} className="mt-7 flex flex-wrap items-center gap-3.5">
              <Link
                href="/products/railing-balustrade-glass"
                className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-blue-500 text-white px-7 py-3.5 rounded-full font-bold text-sm inline-flex items-center gap-2.5 shadow-lg shadow-blue-700/40 hover:-translate-y-0.5 transition-all duration-200 ease-out group"
              >
                <span>View Railing Specs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
              </Link>

              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello Jangid Tuff Glasses, I would like to get a quote for Balcony Glass Railings.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center gap-2 backdrop-blur-sm border border-emerald-400/30 shadow-md shadow-black/20 hover:-translate-y-0.5 transition-all duration-200 ease-out"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Quote</span>
              </a>

              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs inline-flex items-center gap-2 backdrop-blur-md border border-white/20 transition-all duration-200 ease-out"
              >
                <Phone className="w-3.5 h-3.5 text-blue-300" />
                <span>{COMPANY.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════════
            STAGE 2: Architectural Glass Profiles (Frames 19 to 36)
            ═══════════════════════════════════════════════════════════════════════════ */}
        <div
          ref={(el) => (stageRefs.current[1] = el)}
          className={stageWrapClass(isReducedMotion)}
        >
          <div className="w-full max-w-2xl p-5 sm:p-8 rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-blue-500/40 shadow-[0_0_35px_rgba(29,78,216,0.3)] text-white relative overflow-hidden mx-auto">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-[0.2em]">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Product Detail • Glass Profiles & Hardware</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-200 px-3 py-0.5 rounded-full bg-blue-900/60 border border-blue-500/30">
                Slimline 25mm–45mm
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Architectural Glass Profiles & Structural Glazing
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
              Precision aluminum channels, spider fittings, and thermal break frames engineered for storefronts, entrance doors, and double-height structural glass facades.
            </p>

            {/* Definitive Engineering Instructions */}
            <div className="mt-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/20 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>What We Supply & Fabricate:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-white">Profile Finishes:</strong> Anodized black, brushed champagne, deep bronze, and custom powder-coated RAL finishes.
                </li>
                <li>
                  <strong className="text-white">Hardware Compatibility:</strong> CNC cutouts for Dorma / Ozone floor springs, top pivots, and patch fittings.
                </li>
                <li>
                  <strong className="text-white">Weather Sealing:</strong> High-performance EPDM gaskets and structural silicones for zero air/water infiltration.
                </li>
              </ul>
            </div>

            <div
              ref={(el) => (actionRefs.current[1] = el)}
              inert={!isReducedMotion}
              className="mt-5 flex items-center justify-between pt-3 border-t border-white/10 pointer-events-auto"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 py-2 text-xs font-bold text-blue-300 hover:text-white transition-colors"
              >
                <span>View Hardware & Profile Options</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello, I need profile specifications and glass thickness for an entrance facade.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire Profiles</span>
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════════
            STAGE 3: Floating Staircase Glass Balustrades (Frames 37 to 56)
            ═══════════════════════════════════════════════════════════════════════════ */}
        <div
          ref={(el) => (stageRefs.current[2] = el)}
          className={stageWrapClass(isReducedMotion)}
        >
          <div className="w-full max-w-2xl p-5 sm:p-8 rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-blue-500/40 shadow-[0_0_35px_rgba(29,78,216,0.3)] text-white relative overflow-hidden mx-auto">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-[0.2em]">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Product Detail • Staircase Glazing</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-200 px-3 py-0.5 rounded-full bg-blue-900/60 border border-blue-500/30">
                12mm – 15mm Extra Clear
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Floating Staircase Glass Balustrades
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
              Cantilevered staircase glass panels processed with diamond machine-polished edges, safety radius corners, and custom standoff bracket CNC cutouts.
            </p>

            {/* Definitive Engineering Instructions */}
            <div className="mt-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/20 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Staircase Engineering Specs:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-white">Impact Strength:</strong> Heat-treated toughened glass compliant with BS EN 12150 & IS 2553 for human impact safety.
                </li>
                <li>
                  <strong className="text-white">Mounting Flexibility:</strong> Solid SS 304/316 side-mounted standoff pins, concealed stringer shoe, or glass-to-glass clamps.
                </li>
                <li>
                  <strong className="text-white">Precision Templating:</strong> Rake angles and step rises templated for millimeter-perfect alignment along floating treads.
                </li>
              </ul>
            </div>

            <div
              ref={(el) => (actionRefs.current[2] = el)}
              inert={!isReducedMotion}
              className="mt-5 flex items-center justify-between pt-3 border-t border-white/10 pointer-events-auto"
            >
              <Link
                href="/products/railing-balustrade-glass"
                className="inline-flex items-center gap-2 py-2 text-xs font-bold text-blue-300 hover:text-white transition-colors"
              >
                <span>View Staircase Balustrades</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello, I would like to enquire about Staircase Glass Railings.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire Specs</span>
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════════
            STAGE 4: Frameless Acoustic Glass Partitions (Frames 57 to 72)
            ═══════════════════════════════════════════════════════════════════════════ */}
        <div
          ref={(el) => (stageRefs.current[3] = el)}
          className={stageWrapClass(isReducedMotion)}
        >
          <div className="w-full max-w-2xl p-5 sm:p-8 rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-blue-500/40 shadow-[0_0_35px_rgba(29,78,216,0.3)] text-white relative overflow-hidden mx-auto">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-[0.2em]">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Product Detail • Acoustic Partitioning</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-200 px-3 py-0.5 rounded-full bg-blue-900/60 border border-blue-500/30">
                10mm – 12mm Monolithic
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Frameless Acoustic Office & Room Partitions
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
              Floor-to-ceiling glass dividers and sliding acoustic walls that maintain daylight illumination while securing confidential boardroom acoustics.
            </p>

            {/* Definitive Engineering Instructions */}
            <div className="mt-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/20 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Acoustic Partition Specs:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-white">Crystal Dry-Joints:</strong> Clear polycarbonate I-profiles eliminate messy wet silicone lines and maintain flawless sightlines.
                </li>
                <li>
                  <strong className="text-white">Acoustic Performance:</strong> Sound isolation up to 36–42 dB for executive cabins, conference spaces, and residences.
                </li>
                <li>
                  <strong className="text-white">Sliding & Swing Integration:</strong> Top-hung sliding barn doors and hydraulic soft-closing dampers.
                </li>
              </ul>
            </div>

            <div
              ref={(el) => (actionRefs.current[3] = el)}
              inert={!isReducedMotion}
              className="mt-5 flex items-center justify-between pt-3 border-t border-white/10 pointer-events-auto"
            >
              <Link
                href="/products/slim-glass-partitions"
                className="inline-flex items-center gap-2 py-2 text-xs font-bold text-blue-300 hover:text-white transition-colors"
              >
                <span>View Partition Systems</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello, I need pricing and layout options for Office Glass Partitions.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire Specs</span>
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════════
            STAGE 5: Smart LED Mirrors & Bathroom Suite (Frames 73 to 94)
            ═══════════════════════════════════════════════════════════════════════════ */}
        <div
          ref={(el) => (stageRefs.current[4] = el)}
          className={stageWrapClass(isReducedMotion)}
        >
          <div className="w-full max-w-2xl p-5 sm:p-8 rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-blue-500/40 shadow-[0_0_35px_rgba(29,78,216,0.3)] text-white relative overflow-hidden mx-auto">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-[0.2em]">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Product Detail • LED Mirrors & Showers</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-200 px-3 py-0.5 rounded-full bg-blue-900/60 border border-blue-500/30">
                5mm Copper-Free Mirror
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Designer Smart LED Vanity Mirrors
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
              Illuminated vanity mirrors and frameless shower cubicles engineered for luxury master bathrooms, hotels, and retail powder rooms.
            </p>

            {/* What We Offer in LED Mirrors & Bathrooms */}
            <div className="mt-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/20 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>What We Offer in LED Mirrors & Enclosures:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-white">Smart Lighting Controls:</strong> Tri-color CCT LED backlighting (3000K warm / 4000K natural / 6500K cool white) with stepless touch dimmer.
                </li>
                <li>
                  <strong className="text-white">Anti-Fog Demister Pads:</strong> Built-in heating elements that prevent mirror misting during hot showers.
                </li>
                <li>
                  <strong className="text-white">Custom CNC Shapes:</strong> Arches, capsules, organic pebble shapes, fluted glass, and beveled edge rounds.
                </li>
                <li>
                  <strong className="text-white">Shower Cubicles:</strong> 8mm–10mm toughened glass with hydrophobic easy-clean coating and SS 304 anti-leak hardware.
                </li>
              </ul>
            </div>

            <div
              ref={(el) => (actionRefs.current[4] = el)}
              inert={!isReducedMotion}
              className="mt-5 flex items-center justify-between pt-3 border-t border-white/10 pointer-events-auto"
            >
              <Link
                href="/products/mirrors-led-mirrors"
                className="inline-flex items-center gap-2 py-2 text-xs font-bold text-blue-300 hover:text-white transition-colors"
              >
                <span>View LED Mirror Catalogue</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello Jangid Tuff Glasses, I would like to order a custom LED Mirror.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire LED Mirrors</span>
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════════
            STAGE 6: "Engineered Glass for Every Application" (Frames 95 to 119)
            ═══════════════════════════════════════════════════════════════════════════ */}
        <div
          ref={(el) => (stageRefs.current[5] = el)}
          className={stageWrapClass(isReducedMotion)}
        >
          <div className="w-full max-w-2xl p-5 sm:p-8 rounded-3xl bg-slate-950/90 backdrop-blur-2xl border border-blue-500/50 shadow-[0_0_45px_rgba(29,78,216,0.35)] text-white relative overflow-hidden mx-auto">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-[0.2em]">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Boranada Fabrication Facility • Jodhpur</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30">
                Factory Direct Supply
              </span>
            </div>

            {/* Requested Explicit Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Engineered Glass for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">
                Every Application.
              </span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
              From residential villas and luxury bathrooms to high-rise commercial facades, our Boranada manufacturing plant processes toughened safety glass, acoustic partitions, balustrades, and custom mirrors to strict millimeter tolerances.
            </p>

            {/* Core Capability Checklist */}
            <div className="mt-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/20 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Factory Advantages for Architects & Builders:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-white">Direct Wholesale Rates:</strong> Eliminate dealer commissions with factory-direct pricing in Jodhpur.
                </li>
                <li>
                  <strong className="text-white">Fast Local Dispatch:</strong> Direct crated transport across Jodhpur, Pali, Barmer, Nagaur & all Rajasthan districts.
                </li>
                <li>
                  <strong className="text-white">Immediate Engineering Advice:</strong> Share your site measurements or CAD elevations on WhatsApp for quick BOQ estimation.
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div
              ref={(el) => (actionRefs.current[5] = el)}
              inert={!isReducedMotion}
              className="mt-6 flex flex-wrap items-center gap-3 pt-3 border-t border-white/10 pointer-events-auto"
            >
              <Link
                href="/products"
                className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-blue-500 text-white px-6 py-3 rounded-full font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-blue-700/40 transition-all hover:-translate-y-0.5"
              >
                <span>Browse All 8 Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello Jangid Tuff Glasses, I would like to send my architectural drawing / BOQ for a quote.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Drawing</span>
              </a>
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-blue-300" />
                <span>Call Sales</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── Bottom Status & Interactive Chapter Indicator with Royal Blue Progress ─── */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 w-full flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse" />
            <span className="text-[11px] font-medium text-slate-300 tracking-wide">
              Factory Direct Boranada • Fast Rajasthan Dispatch
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3.5">
              <span
                ref={activeChapterLabelRef}
                className="text-[11px] font-semibold uppercase tracking-wider text-blue-200"
              >
                01 • Balcony Glass Railings
              </span>
              <div className="w-32 h-1.5 bg-blue-950/80 border border-blue-500/30 rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-sky-300 shadow-[0_0_10px_rgba(59,130,246,0.8)] origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
              <ChevronDown className="w-4 h-4 text-blue-400 animate-bounce" />
            </div>
        </div>
      </div>

      {/* Skip-link target: the very end of the showcase */}
      <div id="hero-end" tabIndex={-1} className="absolute inset-x-0 bottom-0 h-px outline-none" />
    </section>
  );
}
