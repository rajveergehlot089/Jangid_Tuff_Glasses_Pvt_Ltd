'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y, Zoom } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';

export default function Lightbox({
  images,
  isOpen,
  onClose,
  currentIndex = 0,
}) {
  const closeButtonRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const swiperInstanceRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  // Remember what opened the viewer and give focus back to it when it closes.
  useEffect(() => {
    if (!isOpen) return undefined;
    triggerRef.current = document.activeElement;
    return () => {
      triggerRef.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      // Keep Tab / Shift+Tab inside the dialog while it is open.
      const items = [
        ...dialogRef.current.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'),
      ].filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) {
        e.preventDefault();
        first.focus();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
        if (swiperInstanceRef.current && !swiperInstanceRef.current.destroyed) {
          swiperInstanceRef.current.slideTo(currentIndex, 0);
          setActiveIndex(currentIndex);
        }
      }, 50);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, currentIndex, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

  // Rendered straight into <body>: transformed or frosted-glass ancestors would otherwise
  // trap this fixed overlay inside the page instead of covering the screen.
  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={dialogRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[60] flex flex-col bg-[#040812]/95 backdrop-blur-2xl px-3 sm:px-6 pt-4 pb-3"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        data-lenis-prevent
      >
        {/* Top bar */}
        <div className="relative z-50 w-full max-w-6xl mx-auto flex items-center justify-between gap-4 shrink-0" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-4 min-w-0">
            <span className="font-display text-2xl text-white tabular-nums leading-none">
              {String(activeIndex + 1).padStart(2, '0')}
              <span className="ml-1 font-sans text-xs text-[var(--gold-bright)]">/ {String(images.length).padStart(2, '0')}</span>
            </span>
            <span className="hidden sm:block w-px h-6 bg-white/15" aria-hidden="true" />
            <span className="hidden sm:block font-display text-lg text-white/85 truncate">{images[activeIndex]?.title || 'Jangid Tuff Glasses'}</span>
          </div>
          <button ref={closeButtonRef} onClick={onClose} className="capsule inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white cursor-pointer" aria-label="Close image viewer">
            <span>Close</span>
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Previous / next */}
        {images.length > 1 && (
          <>
            <button className="lightbox-prev-btn capsule absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 grid place-items-center w-12 h-12 text-white cursor-pointer disabled:opacity-30" aria-label="Previous image" onClick={(e) => e.stopPropagation()}>
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            <button className="lightbox-next-btn capsule absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 grid place-items-center w-12 h-12 text-white cursor-pointer disabled:opacity-30" aria-label="Next image" onClick={(e) => e.stopPropagation()}>
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </>
        )}

        {/* Slides: swipe, arrow keys, pinch or double-tap to zoom */}
        <div className="relative w-full max-w-6xl mx-auto flex-1 flex items-center justify-center min-h-0 my-3" onClick={(e) => e.stopPropagation()}>
          <Swiper
            initialSlide={currentIndex}
            onSwiper={(swiper) => {
              swiperInstanceRef.current = swiper;
              swiper.slideTo(currentIndex, 0);
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            modules={[Navigation, Keyboard, A11y, Zoom]}
            navigation={{ prevEl: '.lightbox-prev-btn', nextEl: '.lightbox-next-btn' }}
            keyboard={{ enabled: true }}
            zoom={{ maxRatio: 2.5 }}
            spaceBetween={30}
            slidesPerView={1}
            speed={550}
            className="!w-full h-full"
          >
            {images.map((item, idx) => (
              <SwiperSlide key={item.id || idx} className="!flex flex-col items-center h-full select-none">
                <div className="swiper-zoom-container relative w-full flex-1 min-h-0">
                  <Image
                    src={item.image || item.src}
                    alt={item.alt || item.title || 'Jangid Tuff Glasses'}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority={idx === currentIndex}
                  />
                </div>
                <div className="glass-dark shrink-0 w-full max-w-2xl mx-auto mt-3 px-5 py-3 sm:px-6 sm:py-4 rounded-2xl text-center">
                  {item.tag && <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--gold-bright)]">{item.tag}</span>}
                  <h3 className="font-display text-lg sm:text-xl text-white mt-1">{item.title}</h3>
                  {item.caption && <p className="mt-1.5 text-xs text-white/65 leading-relaxed max-w-xl mx-auto [@media(max-height:620px)]:hidden">{item.caption}</p>}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Thumbnails: jump straight to any photo */}
        {images.length > 1 && (
          <div className="w-full max-w-6xl mx-auto shrink-0 [@media(max-height:520px)]:hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-2 overflow-x-auto no-scrollbar justify-start sm:justify-center py-1" role="group" aria-label="Choose an image">
              {images.map((item, idx) => (
                <button
                  key={item.id || idx}
                  type="button"
                  onClick={() => swiperInstanceRef.current?.slideTo(idx)}
                  aria-label={`Show image ${idx + 1}: ${item.title || ''}`}
                  aria-current={idx === activeIndex ? 'true' : undefined}
                  className={`relative shrink-0 w-16 h-11 rounded-lg overflow-hidden transition-all duration-300 ${
                    idx === activeIndex ? 'ring-2 ring-[var(--gold-bright)] opacity-100' : 'opacity-45 hover:opacity-80'
                  }`}
                >
                  <Image src={item.image || item.src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-white/45">
              <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" /> Swipe or use arrow keys · double-tap or pinch to zoom · Esc to close
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
