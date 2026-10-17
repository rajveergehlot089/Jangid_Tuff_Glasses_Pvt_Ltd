'use client';

export default function FilterBar({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2.5" role="group" aria-label="Category filters">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition duration-500 cursor-pointer ${
              isActive
                ? 'btn-gradient text-white shadow-md shadow-[#0878d1]/30 scale-[1.02]'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:border-[#0878d1]/50 hover:bg-[#eaf5ff]/40 hover:text-[#0878d1]'
            }`}
            aria-pressed={isActive}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
