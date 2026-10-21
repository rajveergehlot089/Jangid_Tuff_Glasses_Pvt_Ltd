'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { LayoutGrid, GalleryHorizontal, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import Lightbox from '@/components/ui/Lightbox';
import { GALLERY_ITEMS, GALLERY_FILTERS } from '@/lib/constants';
import useReducedMotion from '@/lib/use-reduced-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const EASE = [0.16, 1, 0.3, 1];

// Every 7th tile (and the 4th after it) spans 2×2 on large screens, giving the grid a bento rhythm.
const isFeatured = (i) => i % 7 === 0 || i % 7 === 4;

function Tile({ item, index, onOpen, featured }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="view"
      aria-label={`View ${item.title}`}
      className="group relative block w-full h-full text-left rounded-[var(--radius-card)] focus-visible:outline-offset-4"
    >
      <span className="media-zoom absolute inset-0 !rounded-[var(--radius-card)] bg-[var(--paper)]">
        <Image
          src={item.image}
          alt={item.alt || item.title}
          fill
          sizes={featured ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
          className="object-cover"
        />
      </span>
      <span className="absolute inset-0 z-10 rounded-[var(--radius-card)] bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="absolute top-4 left-4 z-10 rounded-full bg-white/90 backdrop-blur px-3 py-1 font-display text-sm text-[#0a1628]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="absolute top-4 right-4 z-10 grid place-items-center w-9 h-9 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400">
        <Expand className="w-4 h-4" aria-hidden="true" />
      </span>
      <span className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">{item.tag}</span>
        <span className={`block font-display text-white leading-tight mt-1 ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{item.title}</span>
        <span className="block text-xs text-white/75 leading-relaxed mt-2 max-w-md line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
          {item.caption}
        </span>
      </span>
    </button>
  );
}

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'slider'
  const reducedMotion = useReducedMotion();

  const filteredItems = GALLERY_ITEMS.filter((item) => activeFilter === 'all' || item.category === activeFilter);

  return (
    <section className="relative py-20 sm:py-28 bg-[var(--paper)]" aria-label="Visual Gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <p className="kicker">Visual Showcase</p>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-[1.08] tracking-[-0.02em]">
              {filteredItems.length} images of glass in place
            </h2>
            <p className="mt-3 text-sm text-[var(--muted)]">Filter by application, then select any image to view it full-screen.</p>
          </div>

          <div className="inline-flex self-start lg:self-auto items-center p-1 rounded-full bg-white border border-[var(--line)]" role="group" aria-label="Layout">
            {[
              ['grid', 'Grid', LayoutGrid],
              ['slider', 'Carousel', GalleryHorizontal],
            ].map(([mode, label, Icon]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                aria-pressed={viewMode === mode}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${viewMode === mode ? 'text-white' : 'text-[var(--ink)]'}`}
              >
                {viewMode === mode && (
                  <motion.span layoutId="gallery-mode" className="absolute inset-0 rounded-full bg-[var(--ink)]" transition={{ duration: 0.45, ease: EASE }} />
                )}
                <Icon className="relative w-3.5 h-3.5" aria-hidden="true" />
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap pb-2 mb-10" role="group" aria-label="Category filters">
          {GALLERY_FILTERS.map((f) => {
            const active = activeFilter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setActiveFilter(f.value)}
                aria-pressed={active}
                className={`relative shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold border transition-colors duration-300 ${
                  active ? 'text-white border-transparent' : 'text-[var(--ink)] border-[var(--line)] bg-white hover:border-[var(--royal)]/40'
                }`}
              >
                {active && (
                  <motion.span layoutId="gallery-filter" className="absolute inset-0 rounded-full bg-[var(--royal)]" transition={{ duration: 0.45, ease: EASE }} />
                )}
                <span className="relative">{f.label}</span>
                <span className={`relative tabular-nums text-[10px] ${active ? 'text-white/70' : 'text-[var(--muted)]'}`}>{f.count}</span>
              </button>
            );
          })}
        </div>

        {/* Grid view */}
        {viewMode === 'grid' && (
          <motion.ul layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[14rem] sm:auto-rows-[15rem] lg:auto-rows-[14.5rem] grid-flow-dense gap-4 sm:gap-5" role="list">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const featured = isFeatured(index);
                return (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.6, ease: EASE, delay: Math.min(index, 8) * 0.04 }}
                    className={featured ? 'sm:col-span-2 lg:row-span-2' : ''}
                  >
                    <Tile item={item} index={index} featured={featured} onOpen={() => setLightboxIndex(index)} />
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        )}

        {/* Carousel view */}
        {viewMode === 'slider' && filteredItems.length > 0 && (
          <div className="relative">
            <Swiper
              key={`${activeFilter}-${reducedMotion ? 'static' : 'autoplay'}`}
              modules={[Navigation, Pagination, Autoplay, A11y]}
              navigation={{ prevEl: '.gallery-swiper-prev', nextEl: '.gallery-swiper-next' }}
              pagination={{ clickable: true, el: '.gallery-swiper-pagination' }}
              autoplay={reducedMotion ? false : { delay: 4500, disableOnInteraction: true, pauseOnMouseEnter: true }}
              spaceBetween={20}
              slidesPerView={1.1}
              breakpoints={{ 640: { slidesPerView: 1.6 }, 1024: { slidesPerView: 2.2, spaceBetween: 24 } }}
              speed={700}
            >
              {filteredItems.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <div className="aspect-[16/10]">
                    <Tile item={item} index={index} featured onOpen={() => setLightboxIndex(index)} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex items-center justify-between mt-8">
              <div className="gallery-swiper-pagination flex gap-1.5 !w-auto" />
              <div className="flex gap-2">
                <button type="button" className="gallery-swiper-prev btn-outline-ink !p-3 disabled:opacity-40" aria-label="Previous gallery slide">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button type="button" className="gallery-swiper-next btn-outline-ink !p-3 disabled:opacity-40" aria-label="Next gallery slide">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--muted)] text-sm">No items found in this category.</p>
            <button onClick={() => setActiveFilter('all')} className="mt-4 link-underline">
              Reset to all items
            </button>
          </div>
        )}
      </div>

      <Lightbox images={filteredItems} isOpen={lightboxIndex !== null} onClose={() => setLightboxIndex(null)} currentIndex={lightboxIndex || 0} />
    </section>
  );
}
