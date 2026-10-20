'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { LayoutGrid, SlidersHorizontal, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import FilterBar from '@/components/ui/FilterBar';
import Lightbox from '@/components/ui/Lightbox';
import { GALLERY_ITEMS, GALLERY_FILTERS } from '@/lib/constants';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'slider'

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#f6f8fa]" aria-label="Visual Gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0878d1]">
                Visual Showcase
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08233f] tracking-tight">
              Architectural Glass Showcase
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Click any project to view high-resolution photography and engineering specifications
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Switcher */}
            <div className="inline-flex items-center p-1 rounded-2xl bg-slate-200/80 border border-slate-300/80 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#08233f] shadow-xs'
                    : 'text-slate-600 hover:text-[#08233f]'
                }`}
                aria-pressed={viewMode === 'grid'}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('slider')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-white text-[#08233f] shadow-xs'
                    : 'text-slate-600 hover:text-[#08233f]'
                }`}
                aria-pressed={viewMode === 'slider'}
                aria-label="Carousel slider view"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#0878d1]" />
                <span>Carousel</span>
              </button>
            </div>

            {/* Category Filter Tabs */}
            <FilterBar
              categories={GALLERY_FILTERS}
              activeCategory={activeFilter}
              onCategoryChange={setActiveFilter}
            />
          </div>
        </div>



        {/* View Mode: Interactive React Swiper Slider */}
        {viewMode === 'slider' && filteredItems.length > 0 && (
          <div className="relative py-4">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, A11y]}
              navigation={{
                prevEl: '.gallery-swiper-prev',
                nextEl: '.gallery-swiper-next',
              }}
              pagination={{
                clickable: true,
                el: '.gallery-swiper-pagination',
              }}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
              }}
              speed={500}
              className="pb-14"
            >
              {filteredItems.map((item, index) => (
                <SwiperSlide key={item.id || index}>
                  <div
                    onClick={() => openLightbox(index)}
                    className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer border border-slate-200/90"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(index);
                      }
                    }}
                    aria-label={`View ${item.title}`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    {item.isActualCompanyWork && (
                      <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#08233f]/90 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Verified Authentic</span>
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 opacity-90 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                      <span className="text-[10px] uppercase font-bold text-sky-300 tracking-wider">
                        {item.tag || item.category}
                      </span>
                      <h3 className="text-white font-extrabold text-base mt-1 tracking-tight">
                        {item.title}
                      </h3>
                      {item.caption && (
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                          {item.caption}
                        </p>
                      )}
                      <span className="text-[11px] text-sky-400 font-semibold mt-2 inline-flex items-center gap-1 group-hover:underline">
                        <span>Click to enlarge</span>
                        <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Slider Navigation & Pagination Controls */}
            <div className="flex items-center justify-between mt-2 px-2">
              <button
                type="button"
                className="gallery-swiper-prev p-3 rounded-full bg-white text-[#08233f] hover:bg-[#0878d1] hover:text-white border border-slate-200 shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-40"
                aria-label="Previous gallery slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="gallery-swiper-pagination flex justify-center gap-1.5" />

              <button
                type="button"
                className="gallery-swiper-next p-3 rounded-full bg-white text-[#08233f] hover:bg-[#0878d1] hover:text-white border border-slate-200 shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-40"
                aria-label="Next gallery slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* View Mode: Classic Responsive Grid */}
        {viewMode === 'grid' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id || index}
                onClick={() => openLightbox(index)}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer border border-slate-200/90"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                aria-label={`View ${item.title}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {item.isActualCompanyWork && (
                  <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#08233f]/90 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Verified Authentic</span>
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 opacity-90 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                  <span className="text-[10px] uppercase font-bold text-sky-300 tracking-wider">
                    {item.tag || item.category}
                  </span>
                  <h3 className="text-white font-extrabold text-base mt-1 tracking-tight">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                  <span className="text-[11px] text-sky-400 font-semibold mt-2 inline-flex items-center gap-1 group-hover:underline">
                    <span>Click to enlarge</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-sm">No items found in this category.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-4 text-[#0878d1] font-bold text-sm hover:underline cursor-pointer"
            >
              Reset to all items
            </button>
          </div>
        )}
      </div>

      {/* Swiper-Powered Full-Screen Lightbox Slider */}
      <Lightbox
        images={filteredItems}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        currentIndex={lightboxIndex || 0}
      />
    </section>
  );
}
