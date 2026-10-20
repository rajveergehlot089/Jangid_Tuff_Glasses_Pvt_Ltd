'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ServiceCard({ service, index = 0 }) {
  const title = service.name || service.title;
  const description = service.description;
  const details = service.details;
  const number = String(index + 1).padStart(2, '0');
  const href = service.href || `/contact?product=${encodeURIComponent(title || '')}#quote`;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:border-[#0878d1]/50 hover:shadow-xl transition-all duration-300 ease-out overflow-hidden"
    >
      {/* React Bits: Cursor Tracking Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(8, 120, 209, 0.12), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Top accent gradient bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0878d1] via-sky-400 to-[#08233f] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-20" />

      {/* Number badge with gradient */}
      <div className="relative z-20 flex items-center justify-between mb-6">
        <span
          className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#eaf5ff] to-[#d6ebff] text-base font-black text-[#0878d1] group-hover:bg-gradient-to-br group-hover:from-[#0878d1] group-hover:to-[#041323] group-hover:text-white group-hover:scale-105 transition-all duration-300 ease-out shadow-xs"
          aria-hidden="true"
        >
          {number}
        </span>
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 group-hover:text-[#0878d1] transition-colors duration-200 ease-out">
          Stage {number}
        </span>
      </div>

      {/* Title */}
      <h3 className="relative z-20 text-xl font-extrabold text-[#08233f] mb-2.5 group-hover:text-[#0878d1] transition-colors duration-200 ease-out tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-20 text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
        {description}
      </p>

      {/* Details - handles either string or array */}
      {details && typeof details === 'string' && (
        <p className="relative z-20 text-xs text-slate-500 leading-relaxed mb-6 pt-3.5 border-t border-slate-100">
          {details}
        </p>
      )}

      {details && Array.isArray(details) && details.length > 0 && (
        <ul className="relative z-20 space-y-2 mb-6 pt-3.5 border-t border-slate-100" role="list">
          {details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#0878d1] to-sky-400 shrink-0" aria-hidden="true" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Spacer */}
      <div className="mt-auto" />

      {/* CTA Button with gradient hover */}
      <Link
        href={href}
        aria-label={`Enquire About Service: ${title}`}
        className="relative z-20 w-full py-3 px-4 rounded-xl bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-[#0878d1] group-hover:to-sky-600 group-hover:text-white hover:-translate-y-0.5 text-[#08233f] text-xs font-bold text-center transition-all duration-200 ease-out flex items-center justify-center gap-2 border border-slate-200/80 group-hover:border-transparent group-hover:shadow-md"
      >
        <span>Enquire About Service</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-200 ease-out" />
      </Link>
    </article>
  );
}
