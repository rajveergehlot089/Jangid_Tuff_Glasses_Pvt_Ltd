'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import FilterBar from '@/components/ui/FilterBar';
import Lightbox from '@/components/ui/Lightbox';
import CTABanner from '@/components/ui/CTABanner';
import { GALLERY_ITEMS, GALLERY_FILTERS } from '@/lib/constants';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

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

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jangid-tuff-glasses-pvt-ltd.vercel.app';

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Gallery',
        item: `${siteUrl}/gallery`,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Page Hero */}
      <PageHero
        eyebrow="VISUAL INSPIRATION & DESIGNS"
        title="Modern Architectural"
        titleAccent="Glass Gallery"
        description="A curated visual showcase exploring structural facades, bespoke interior mirrors, fluted partitions, and luxury shower cubicles."
        primaryAction={{ label: 'Explore Products', href: '/products' }}
        secondaryAction={{ label: 'Request a Quote', href: '/contact#quote' }}
        backgroundImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85"
        showCategories={true}
        showWatchWork={false}
      />

      {/* Gallery Section */}
      <section className="py-16 sm:py-20 bg-[#f6f8fa]" aria-label="Visual Gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-extrabold text-[#08233f]">Project Inspiration</h2>
              <p className="text-xs text-slate-500 mt-1">Click any image to view in high resolution</p>
            </div>
            <FilterBar
              categories={GALLERY_FILTERS}
              activeCategory={activeFilter}
              onCategoryChange={setActiveFilter}
            />
          </div>

          {/* Photo Authenticity Disclaimer */}
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-center gap-3">
            <span className="font-bold shrink-0">Note:</span>
            <span>
              The images in this gallery are curated illustrative design references showing architectural glass possibilities. Verified photographs of our actual factory, machinery, and completed Jodhpur client projects will be published here upon client clearance.
            </span>
          </div>

          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id || index}
                onClick={() => openLightbox(index)}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer border border-slate-200/80"
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
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 opacity-90 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                  <span className="text-[10px] uppercase font-bold text-sky-300 tracking-wider">
                    {item.tag || item.category}
                  </span>
                  <h3 className="text-white font-bold text-base mt-1">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                  <span className="text-[11px] text-sky-400 font-semibold mt-2 inline-flex items-center gap-1 group-hover:underline">
                    Click to enlarge ↗
                  </span>
                </div>
              </div>
            ))}
          </div>

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
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        images={filteredItems}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        currentIndex={lightboxIndex || 0}
        onNext={nextImage}
        onPrev={prevImage}
      />

      {/* CTA Banner */}
      <CTABanner
        title="Inspired by a Design You See Here?"
        description="Share the screenshot or describe the glass look you want. We will check feasibility, suggest suitable glass variants, and provide an estimate."
        primaryAction={{ label: 'Enquire About a Look', href: '/contact#quote' }}
      />
    </div>
  );
}
