'use client';

import { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import FilterBar from '@/components/ui/FilterBar';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

const filterCategories = [
  { label: 'All Products (9)', value: 'all' },
  { label: 'Architectural', value: 'architectural' },
  { label: 'Interior & Bath', value: 'interior' },
  { label: 'Mirrors', value: 'mirrors' },
  { label: 'Custom Fabricated', value: 'custom' },
];

export default function ProductCatalogueSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = PRODUCT_CATEGORIES.filter((product) => {
    if (activeFilter === 'all') return true;
    return product.categoryGroup === activeFilter || product.slug.includes(activeFilter);
  });

  return (
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
  );
}
