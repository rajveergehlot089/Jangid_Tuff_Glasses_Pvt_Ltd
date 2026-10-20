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
  Sliders,
  ExternalLink,
  Droplets,
  Building2,
  Maximize2,
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

  // Stage refs for 6 distinct scroll chapters
  const textStage1Ref = useRef(null);
  const textStage2Ref = useRef(null);
  const textStage3Ref = useRef(null);
  const textStage4Ref = useRef(null);
  const textStage5Ref = useRef(null);
  const textStage6Ref = useRef(null);

  const progressBarRef = useRef(null);
  const activeChapterLabelRef = useRef(null);

  const imagesRef = useRef([]);
  const loadedCountRef = useRef(0);
  const isMountedRef = useRef(true);
  const currentFrameRef = useRef(0);
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

    if (!img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
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

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload frames progressively
  useEffect(() => {
    isMountedRef.current = true;

    // Initial resize
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Step 1: Preload first frame immediately for instant visual
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    imagesRef.current[0] = firstImg;
    firstImg.onload = () => {
      if (!isMountedRef.current) return;
      drawFrame(0);
      setInitialLoaded(true);

      // Step 2: Preload next 15 key frames
      const batchInitial = [];
      for (let i = 1; i < 15; i++) {
        batchInitial.push(
          new Promise((resolve) => {
            const img = new Image();
            img.src = getFrameUrl(i);
            imagesRef.current[i] = img;
            img.onload = () => {
              loadedCountRef.current++;
              resolve();
            };
            img.onerror = () => resolve();
          })
        );
      }

      Promise.all(batchInitial).then(() => {
        if (!isMountedRef.current) return;

        // Step 3: Load remaining frames in idle time
        let nextIndex = 15;
        const loadNextBatch = () => {
          if (!isMountedRef.current || nextIndex >= TOTAL_FRAMES) return;

          const batchEnd = Math.min(nextIndex + 10, TOTAL_FRAMES);
          const currentBatch = [];

          for (let i = nextIndex; i < batchEnd; i++) {
            currentBatch.push(
              new Promise((resolve) => {
                const img = new Image();
                img.src = getFrameUrl(i);
                imagesRef.current[i] = img;
                img.onload = () => {
                  loadedCountRef.current++;
                  resolve();
                };
                img.onerror = () => resolve();
              })
            );
          }

          Promise.all(currentBatch).then(() => {
            if (!isMountedRef.current) return;
            nextIndex = batchEnd;
            if (nextIndex < TOTAL_FRAMES) {
              if (window.requestIdleCallback) {
                window.requestIdleCallback(loadNextBatch, { timeout: 200 });
              } else {
                setTimeout(loadNextBatch, 50);
              }
            }
          });
        };

        if (window.requestIdleCallback) {
          window.requestIdleCallback(loadNextBatch, { timeout: 200 });
        } else {
          setTimeout(loadNextBatch, 50);
        }
      });
    };

    return () => {
      isMountedRef.current = false;
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame, handleResize]);

  // Setup GSAP ScrollTrigger timeline with 2 video cycles across 6 product chapters
  useEffect(() => {
    if (isReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const playhead = { frame: 0 };

    const chapters = [
      'Chapter 1/6 • Architectural Intro',
      'Chapter 2/6 • Toughened Safety Glass',
      'Chapter 3/6 • Structural Railings',
      'Chapter 4/6 • Acoustic Partitions',
      'Chapter 5/6 • Frameless Showers',
      'Chapter 6/6 • LED Mirrors & Ordering',
    ];

    const ctx = gsap.context(() => {
      // Main scroll scrub: 2 continuous video cycles across the 650vh scroll
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          // 2 complete forward passes through the 120 frames
          const cycleProgress = (self.progress * 2) % 1;
          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(cycleProgress * TOTAL_FRAMES)
          );

          if (targetFrame !== playhead.frame) {
            playhead.frame = targetFrame;
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = requestAnimationFrame(() => {
              drawFrame(playhead.frame);
            });
          }

          // Update progress bar
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${self.progress})`;
          }

          // Update active chapter label
          if (activeChapterLabelRef.current) {
            const chapterIndex = Math.min(
              chapters.length - 1,
              Math.floor(self.progress * chapters.length)
            );
            activeChapterLabelRef.current.textContent = chapters[chapterIndex];
          }
        },
      });

      // ─── STAGE 1: Architectural Intro (0% to 15%) ───
      if (textStage1Ref.current) {
        gsap.fromTo(
          textStage1Ref.current,
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -30,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: '15% top',
              scrub: 0.5,
            },
          }
        );
      }

      // ─── STAGE 2: Toughened Glass (16% to 31%) ───
      if (textStage2Ref.current) {
        gsap.fromTo(
          textStage2Ref.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: container,
              start: '16% top',
              end: '22% top',
              scrub: 0.5,
            },
          }
        );
        gsap.to(textStage2Ref.current, {
          opacity: 0,
          y: -30,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: container,
            start: '28% top',
            end: '33% top',
            scrub: 0.5,
          },
        });
      }

      // ─── STAGE 3: Glass Railings & Balustrades (33% to 48%) ───
      if (textStage3Ref.current) {
        gsap.fromTo(
          textStage3Ref.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: container,
              start: '33% top',
              end: '39% top',
              scrub: 0.5,
            },
          }
        );
        gsap.to(textStage3Ref.current, {
          opacity: 0,
          y: -30,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: container,
            start: '45% top',
            end: '50% top',
            scrub: 0.5,
          },
        });
      }

      // ─── STAGE 4: Acoustic Office Partitions (50% to 65%) ───
      if (textStage4Ref.current) {
        gsap.fromTo(
          textStage4Ref.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: container,
              start: '50% top',
              end: '56% top',
              scrub: 0.5,
            },
          }
        );
        gsap.to(textStage4Ref.current, {
          opacity: 0,
          y: -30,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: container,
            start: '62% top',
            end: '67% top',
            scrub: 0.5,
          },
        });
      }

      // ─── STAGE 5: Luxury Shower Enclosures (67% to 82%) ───
      if (textStage5Ref.current) {
        gsap.fromTo(
          textStage5Ref.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: container,
              start: '67% top',
              end: '73% top',
              scrub: 0.5,
            },
          }
        );
        gsap.to(textStage5Ref.current, {
          opacity: 0,
          y: -30,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: container,
            start: '79% top',
            end: '84% top',
            scrub: 0.5,
          },
        });
      }

      // ─── STAGE 6: Smart LED Mirrors & Factory Ordering (84% to 100%) ───
      if (textStage6Ref.current) {
        gsap.fromTo(
          textStage6Ref.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: container,
              start: '84% top',
              end: '90% top',
              scrub: 0.5,
            },
          }
        );
        gsap.to(textStage6Ref.current, {
          opacity: 0.4,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: container,
            start: '96% top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        });
      }
    }, container);

    return () => {
      ctx.revert();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame, isReducedMotion]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${isReducedMotion ? 'min-h-[700px]' : 'h-[650vh]'}`}
      aria-label="Cinematic Architectural Hero"
    >
      {/* Pinned Sticky Viewport Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-slate-950 flex flex-col justify-between">
        {/* Canvas Renderer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Fallback Static Poster while initial frame loads */}
        {!initialLoaded && (
          <div
            className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-700"
            style={{ backgroundImage: "url('/images/cinematic-frames/poster-blur.webp')" }}
          />
        )}

        {/* ─── Neutral Scrims (Blue shadow completely removed, subtle short shadows) ─── */}
        {/* Left neutral scrim: ultra-soft neutral dark gradient for crisp typography contrast without blue cast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent pointer-events-none z-10" />

        {/* Short top shadow: exactly enough for top navbar legibility without darkening upper video */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />

        {/* Short bottom shadow: clean, short 70px transition into the white section below */}
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

        {/* ─── STAGE 1: Main Hero Editorial Intro (0% - 15%) ─── */}
        <div
          ref={textStage1Ref}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-36 pb-8 w-full flex-1 flex flex-col justify-center"
        >
          <div className="max-w-2xl">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
                Boranada, Jodhpur • Toughened Safety Glass
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-sm">
              Precision Glass for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                Modern Architecture.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow-sm">
              Engineered toughened glass, frameless partitions, balustrades, and luxury LED mirrors. Manufactured to exact millimeter tolerances for residential, commercial, and retail projects across Rajasthan.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Link
                href="/products"
                className="bg-white hover:bg-slate-100 text-[#08233f] px-7 py-3.5 rounded-full font-bold text-sm inline-flex items-center gap-2.5 shadow-lg shadow-black/25 hover:-translate-y-0.5 transition-all duration-200 ease-out group"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
              </Link>

              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello Jangid Tuff Glasses, I would like to enquire about architectural glass for my project.'
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
                <Phone className="w-3.5 h-3.5 text-slate-200" />
                <span>{COMPANY.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── STAGE 2: Product 01 • Toughened & Tempered Safety Glass (16% - 31%) ─── */}
        <div
          ref={textStage2Ref}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none opacity-0"
        >
          <div className="max-w-2xl p-6 sm:p-8 rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/40 text-white">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-[0.2em]">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Product Spec 01 • Structural Core</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 px-2.5 py-0.5 rounded-full bg-white/10">
                5mm – 19mm
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Toughened & Tempered Safety Glass
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
              Processed in continuous high-temperature tempering furnaces at ~650°C followed by uniform air quenching. Delivers 4–5× higher mechanical and thermal shock resistance.
            </p>

            {/* Definitive Engineering Instructions Box */}
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Definitive Fabrication Instructions:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-white">Pre-Furnace Processing:</strong> All hole drilling, hinge cutouts, and polished edges must be completed before tempering. Glass cannot be cut or altered post-furnace.
                </li>
                <li>
                  <strong className="text-white">Safety Fracture Spec:</strong> In case of breakage, fractures into blunt, harmless dice-sized granular fragments per IS 2553 / EN 12150.
                </li>
                <li>
                  <strong className="text-white">Applications:</strong> Structural facades, canopies, frameless doors, commercial partitions, and heavy wind-load exterior glazing.
                </li>
              </ul>
            </div>

            <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/10 pointer-events-auto">
              <Link
                href="/products/toughened-glass"
                className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-slate-300 transition-colors"
              >
                <span>View Full Toughened Specifications</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello, I need pricing and thickness recommendations for Toughened Glass.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire Specs</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── STAGE 3: Product 02 • Structural Glass Railings & Balustrades (33% - 48%) ─── */}
        <div
          ref={textStage3Ref}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none opacity-0"
        >
          <div className="max-w-2xl p-6 sm:p-8 rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/40 text-white">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 text-sky-300 font-bold text-xs uppercase tracking-[0.2em]">
                <Building2 className="w-4 h-4 text-sky-300" />
                <span>Product Spec 02 • Safety & Clear Lines</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 px-2.5 py-0.5 rounded-full bg-white/10">
                12mm – 15mm PVB Laminated
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Architectural Glass Railings & Balustrades
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
              Engineered for seamless panoramic visibility on residential balconies, luxury staircases, commercial atriums, and rooftop terraces without bulky upright posts.
            </p>

            {/* Definitive Engineering Instructions Box */}
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" />
                <span>Definitive Installation Instructions:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-white">Mounting Methods:</strong> Continuous concealed aluminum bottom U-channel or heavy-duty solid stainless steel 304/316 spigot clamps.
                </li>
                <li>
                  <strong className="text-white">Load Rating:</strong> Rigorously engineered to resist 1.5 kN/m uniform horizontal line crowd load under IS 875 part 3.
                </li>
                <li>
                  <strong className="text-white">Critical Installation Rule:</strong> Anchor into structural concrete with minimum 50mm edge distance using high-grade anchor bolts and safety isolators.
                </li>
              </ul>
            </div>

            <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/10 pointer-events-auto">
              <Link
                href="/products/glass-railings"
                className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-slate-300 transition-colors"
              >
                <span>View Balustrade Profiles</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello, I need structural drawings and channel pricing for Glass Railings.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-sky-300 hover:text-sky-200 transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire Specs</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── STAGE 4: Product 03 • Office Partitions & Acoustic Glazing (50% - 65%) ─── */}
        <div
          ref={textStage4Ref}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none opacity-0"
        >
          <div className="max-w-2xl p-6 sm:p-8 rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/40 text-white">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-[0.2em]">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Product Spec 03 • Acoustic Workplace</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 px-2.5 py-0.5 rounded-full bg-white/10">
                10mm – 12mm Monolithic
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Frameless Office Partitions & Acoustic Glazing
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
              High-transparency interior architectural glazing for executive cabins, conference rooms, and commercial office divisions with superior acoustic isolation.
            </p>

            {/* Definitive Engineering Instructions Box */}
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Definitive Engineering Instructions:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-white">Crystal-Clear Dry Joints:</strong> Panels joined using clear polycarbonate I-profiles or 3M VHB structural tape, eliminating messy wet silicone.
                </li>
                <li>
                  <strong className="text-white">Acoustic Attenuation:</strong> Delivers 36 to 42 dB sound dampening for confidential boardroom discussions and privacy.
                </li>
                <li>
                  <strong className="text-white">Hardware Integration:</strong> Compatible with slimline 25mm aluminum perimeter channels, drop seals, and hydraulic soft-closing glass doors.
                </li>
              </ul>
            </div>

            <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/10 pointer-events-auto">
              <Link
                href="/products/glass-partitions"
                className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-slate-300 transition-colors"
              >
                <span>View Partition Systems</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello, I need pricing and layout guidance for Office Glass Partitions.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire Specs</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── STAGE 5: Product 04 • Luxury Frameless Shower Enclosures (67% - 82%) ─── */}
        <div
          ref={textStage5Ref}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none opacity-0"
        >
          <div className="max-w-2xl p-6 sm:p-8 rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/40 text-white">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-[0.2em]">
                <Droplets className="w-4 h-4 text-cyan-300" />
                <span>Product Spec 04 • Wet Area Safety</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 px-2.5 py-0.5 rounded-full bg-white/10">
                8mm – 10mm Toughened
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Luxury Frameless Shower Enclosures
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
              Custom-built shower cubicles, sliding enclosures, and walk-in wet room screens engineered with diamond-polished edges and corrosion-resistant hardware.
            </p>

            {/* Definitive Engineering Instructions Box */}
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                <span>Definitive Engineering Instructions:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-white">Hydrophobic Nano-Shield:</strong> Optional factory-applied coating repels hard-water scaling, mineral deposits, and soap scum for easy maintenance.
                </li>
                <li>
                  <strong className="text-white">Grade 304/316 Hardware:</strong> Solid forged stainless steel 90°/180° self-centering hinges and brass stabilizer header bars.
                </li>
                <li>
                  <strong className="text-white">Water Containment:</strong> Dual-lip anti-leak polycarbonate magnetic door seals and bottom threshold sweeps ensure 100% dry floor isolation.
                </li>
              </ul>
            </div>

            <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/10 pointer-events-auto">
              <Link
                href="/products/shower-enclosures"
                className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-slate-300 transition-colors"
              >
                <span>View Shower Cubicle Designs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello, I would like to get a custom shower enclosure quote with hardware.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire Specs</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── STAGE 6: Product 05 • Smart LED Mirrors & Direct Factory Ordering (84% - 100%) ─── */}
        <div
          ref={textStage6Ref}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none opacity-0"
        >
          <div className="max-w-2xl p-6 sm:p-8 rounded-3xl bg-slate-950/85 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50 text-white">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-[0.2em]">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Product Spec 05 • Bespoke Fabrication</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 px-2.5 py-0.5 rounded-full bg-white/10">
                5mm Copper-Free Mirror
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Smart LED Mirrors & Direct Factory Supply
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
              Distortion-free architectural mirrors manufactured with copper-free backing, tri-color touch-dimmable LED backlighting, integrated defogger heating pads, and CNC shaped contours.
            </p>

            {/* Definitive Engineering Instructions Box */}
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct Boranada Factory Procurement:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-white">Custom CNC Shapes:</strong> Arches, capsules, organic pebble silhouettes, and beveled vanity rounds cut to 1mm precision.
                </li>
                <li>
                  <strong className="text-white">B2B & Project Supply:</strong> Direct wholesale supply for architects, interior contractors, and commercial developers across Rajasthan.
                </li>
                <li>
                  <strong className="text-white">Fast Estimation:</strong> Share your CAD or site dimension drawings on WhatsApp for an immediate technical quote.
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3 pt-3 border-t border-white/10 pointer-events-auto">
              <Link
                href="/products"
                className="bg-white hover:bg-slate-100 text-[#08233f] px-6 py-3 rounded-full font-bold text-xs inline-flex items-center gap-2 shadow-md shadow-black/25 transition-all"
              >
                <span>View All 8 Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                  'Hello Jangid Tuff Glasses, I would like to send my architectural drawing / BOQ for a quote.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Drawing</span>
              </a>
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Sales</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── Bottom Status & Interactive Chapter Indicator ─── */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 w-full flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-medium text-slate-300 tracking-wide">
              Factory Direct Boranada • Fast Rajasthan Dispatch
            </span>
          </div>

          {!isReducedMotion && (
            <div className="hidden sm:flex items-center gap-3.5">
              <span
                ref={activeChapterLabelRef}
                className="text-[11px] font-semibold uppercase tracking-wider text-slate-300"
              >
                Chapter 1/6 • Architectural Intro
              </span>
              <div className="w-28 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full bg-white origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
              <ChevronDown className="w-4 h-4 text-white animate-bounce" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
