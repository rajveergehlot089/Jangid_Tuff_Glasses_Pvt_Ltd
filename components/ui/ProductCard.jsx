'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function ProductCard({ product, index = 0 }) {
  const { name, slug, description, image, tag, features } = product;
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
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      viewport={{ once: true, margin: '-40px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:border-[#0878d1]/50 hover:shadow-xl transition-all duration-300 ease-out"
    >
      {/* React Bits: Spotlight Cursor Tracker Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(8, 120, 209, 0.12), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Image Container with overlay gradient */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08233f]/80 via-[#08233f]/25 to-transparent opacity-65 group-hover:opacity-45 transition-opacity duration-300 ease-out" />

        {tag && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-[#08233f]/95 to-[#0878d1]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider border border-white/20">
            <Sparkles className="w-3 h-3 text-sky-300" />
            {tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 p-6 sm:p-7">
        <h3 className="text-xl font-extrabold text-[#08233f] group-hover:text-[#0878d1] transition-colors duration-200 ease-out tracking-tight">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 mb-5 font-normal">
          {description}
        </p>

        {/* Features */}
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-6 pt-4 border-t border-slate-100" role="list" aria-label={`${name} features`}>
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-xs font-semibold text-slate-700"
              >
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 shrink-0 shadow-xs">
                  <Check className="w-2.5 h-2.5 stroke-[3]" aria-hidden="true" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Spacer */}
        <div className="mt-auto" />

        {/* Dual Actions with smooth gradient hover */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <Link
            href={`/products/${slug}`}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 hover:-translate-y-0.5 text-[#08233f] text-xs font-bold text-center transition-all duration-200 ease-out shadow-2xs"
          >
            Details
          </Link>
          <Link
            href={`/contact?product=${slug}#quote`}
            className="btn-gradient w-full py-2.5 px-3 rounded-xl text-white text-xs font-bold text-center transition-all duration-200 ease-out hover:-translate-y-0.5 flex items-center justify-center gap-1.5 shadow-sm group/btn"
          >
            <span>Quote</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200 ease-out" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
