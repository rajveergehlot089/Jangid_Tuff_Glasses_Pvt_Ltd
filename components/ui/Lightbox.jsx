'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Lightbox({
  images,
  isOpen,
  onClose,
  currentIndex = 0,
}) {
  const closeButtonRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-[#030914]/98 backdrop-blur-2xl p-4 sm:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer slider"
      >
        {/* Top Header Bar */}
        <div
          className="relative z-50 w-full max-w-6xl mx-auto flex items-center justify-between pb-3 border-b border-white/10 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Slide Fraction Counter */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-black tracking-widest text-sky-400 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-300 truncate max-w-xs md:max-w-md">
              {images[activeIndex]?.title || 'Jangid Tuff Glasses'}
            </span>
          </div>

          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="flex items-center gap-2 text-white/80 hover:text-white px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 cursor-pointer border border-white/15 text-xs font-bold shadow-md"
            aria-label="Close image viewer"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            className="lightbox-prev-btn absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 text-white/90 hover:text-white p-3.5 sm:p-4 rounded-full bg-black/60 hover:bg-[#0878d1] hover:scale-110 transition-all duration-200 ease-out cursor-pointer border border-white/20 backdrop-blur-md shadow-2xl"
            aria-label="Previous slide"
            onClick={(e) => e.stopPropagation()}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            className="lightbox-next-btn absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 text-white/90 hover:text-white p-3.5 sm:p-4 rounded-full bg-black/60 hover:bg-[#0878d1] hover:scale-110 transition-all duration-200 ease-out cursor-pointer border border-white/20 backdrop-blur-md shadow-2xl"
            aria-label="Next slide"
            onClick={(e) => e.stopPropagation()}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Middle Swiper Container */}
        <div
          className="relative w-full max-w-6xl mx-auto flex-1 my-auto flex items-center justify-center min-h-0"
          onClick={(e) => e.stopPropagation()}
        >
          <Swiper
            initialSlide={currentIndex}
            onSwiper={(swiper) => {
              swiperInstanceRef.current = swiper;
              swiper.slideTo(currentIndex, 0);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
            }}
            modules={[Navigation, Pagination, Keyboard, A11y]}
            navigation={{
              prevEl: '.lightbox-prev-btn',
              nextEl: '.lightbox-next-btn',
            }}
            keyboard={{ enabled: true }}
            spaceBetween={30}
            slidesPerView={1}
            speed={400}
            className="w-full h-full flex flex-col justify-center"
          >
            {images.map((item, idx) => (
              <SwiperSlide
                key={item.id || idx}
                className="flex flex-col items-center justify-center h-full select-none"
              >
                {/* Image Container with Exact Containment */}
                <div className="relative w-full h-[55vh] sm:h-[62vh] flex items-center justify-center">
                  <Image
                    src={item.image || item.src}
                    alt={item.title || 'Jangid Tuff Glasses'}
                    fill
                    className="object-contain drop-shadow-2xl rounded-2xl"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority={idx === currentIndex}
                  />
                </div>

                {/* Caption Card tied strictly to this specific slide */}
                <div className="w-full max-w-2xl mx-auto mt-4 px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center text-white shrink-0">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {item.tag && (
                      <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-[#0878d1]/80 text-white">
                        {item.tag}
                      </span>
                    )}
                    <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  {item.caption && (
                    <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
                      {item.caption}
                    </p>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom Hint */}
        <div
          className="text-center pt-2 text-[11px] text-slate-400 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          Use arrow keys or swipe to navigate • Press Esc to close
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
