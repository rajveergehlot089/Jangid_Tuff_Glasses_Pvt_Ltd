'use client';

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

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="glass-card group flex flex-col bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:border-[#0878d1]/40"
    >
      {/* Image Container with overlay gradient */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08233f]/75 via-[#08233f]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
        
        {tag && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-[#08233f]/90 to-[#0878d1]/90 backdrop-blur px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-sky-300" />
            {tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 sm:p-7">
        <h3 className="text-xl font-black text-[#08233f] group-hover:text-[#0878d1] transition duration-500 tracking-tight">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 mb-5">
          {description}
        </p>

        {/* Features */}
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-6 pt-4 border-t border-slate-100" role="list" aria-label={`${name} features`}>
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-xs font-medium text-slate-700"
              >
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
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
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#08233f] text-xs font-bold text-center transition duration-500"
          >
            Details
          </Link>
          <Link
            href={`/contact?product=${slug}#quote`}
            className="btn-gradient w-full py-2.5 px-3 rounded-xl text-white text-xs font-bold text-center transition duration-500 flex items-center justify-center gap-1 shadow-sm"
          >
            <span>Quote</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition duration-500" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
