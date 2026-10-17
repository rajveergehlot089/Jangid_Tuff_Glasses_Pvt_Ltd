'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import ProductCard from '@/components/ui/ProductCard';
import FilterBar from '@/components/ui/FilterBar';
import CTABanner from '@/components/ui/CTABanner';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

const filterCategories = [
  { label: 'All Products (9)', value: 'all' },
  { label: 'Architectural', value: 'architectural' },
  { label: 'Interior & Bath', value: 'interior' },
  { label: 'Mirrors', value: 'mirrors' },
  { label: 'Custom Fabricated', value: 'custom' },
];

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = PRODUCT_CATEGORIES.filter((product) => {
    if (activeFilter === 'all') return true;
    return product.categoryGroup === activeFilter || product.slug.includes(activeFilter);
  });

  return (
    <div className="flex flex-col">
      {/* Page Hero */}
      <PageHero
        eyebrow="ENGINEERED GLASS CATALOGUE"
        title="Comprehensive Products"
        titleAccent="& Solutions"
        description="High-grade architectural, safety, and decorative glass solutions crafted for homes, retail showrooms, commercial facades, and offices across Jodhpur and Rajasthan."
        primaryAction={{ label: 'Request a Quote', href: '/contact#quote' }}
        secondaryAction={{ label: 'View Services', href: '/services' }}
        backgroundImage="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2000&q=85"
        showCategories={true}
        showWatchWork={true}
      />

      {/* Catalogue with Interactive Filters */}
      <section className="py-16 sm:py-20 bg-[#f6f8fa]" aria-label="Product Catalogue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-extrabold text-[#08233f]">Explore Categories</h2>
              <p className="text-xs text-slate-500 mt-1">Select a category below to filter products</p>
            </div>
            <FilterBar
              categories={filterCategories}
              activeCategory={activeFilter}
              onCategoryChange={setActiveFilter}
            />
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-sm">No products found in this category.</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-4 text-[#0878d1] font-bold text-sm hover:underline cursor-pointer"
              >
                Reset to all products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Custom Requirement Prompt */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Have a Custom Need?</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08233f] mt-2">
            Need a Glass Product for a Specific Application?
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed max-w-xl mx-auto">
            Send us your site dimensions, desired glass thickness, edge finish requirements, or architectural elevations. We will evaluate feasibility and provide direct technical recommendations.
          </p>
          <div className="mt-8">
            <Link
              href="/contact?product=Custom+Glass#quote"
              className="rounded-full bg-[#0878d1] hover:bg-sky-600 text-white px-8 py-3.5 font-bold text-sm transition inline-block shadow-md"
            >
              Ask for Technical Guidance →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />
    </div>
  );
}
