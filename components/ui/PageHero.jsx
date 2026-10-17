'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Sparkles,
  Layers,
  Palette,
  Compass,
  ArrowRight,
  Play,
} from 'lucide-react';

const defaultCategories = [
  {
    icon: ShieldCheck,
    label: 'Toughened Glass',
    sublabel: 'Safety & Impact',
    href: '/products/toughened-glass',
  },
  {
    icon: Layers,
    label: 'Mirrors & LED Mirrors',
    sublabel: 'Backlit & Custom',
    href: '/products/mirrors-led-mirrors',
  },
  {
    icon: Compass,
    label: 'Glass Partitions',
    sublabel: 'Office & Shower',
    href: '/products/slim-glass-partitions',
  },
  {
    icon: Palette,
    label: 'Decorative Glass',
    sublabel: 'Fluted & Frosted',
    href: '/products/decorative-glass',
  },
  {
    icon: Sparkles,
    label: 'Custom Solutions',
    sublabel: 'Bespoke Fabrication',
    href: '/products/custom-architectural-glass',
  },
];

export default function PageHero({
  eyebrow = 'PREMIUM GLASS SOLUTIONS',
  title = 'Transforming Spaces',
  titleAccent = 'with Glass',
  description = 'Modern glass solutions for residential, commercial and industrial spaces. From toughened glass to custom interiors, we bring clarity, elegance and strength to your vision.',
  primaryAction = { label: 'Explore Products', href: '/products' },
  secondaryAction = { label: 'Our Services', href: '/services' },
  backgroundImage = '/hero-exact.png',
  showCategories = true,
  categories = defaultCategories,
  showWatchWork = true,
}) {
  return (
    <section
      className="relative min-h-[680px] lg:min-h-[760px] w-full text-white overflow-hidden flex flex-col justify-between bg-[#040e1a]"
      aria-label="Hero Banner"
    >
      {/* Background Photography with Architectural Depth */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-right"
        />

        {/* Multi-layer cinematic vignette & dark gradient over image */}
        {/* Left-to-right gradient for crystal clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030c17]/95 via-[#041323]/80 to-[#041323]/25 lg:from-[#030c17]/95 lg:via-[#041323]/75 lg:to-transparent" />

        {/* Top subtle fade from dark header */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020912]/80 to-transparent" />

        {/* Bottom deep fade into content & ticker bar */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#020810] via-[#041323]/70 to-transparent" />

        {/* Soft Ambient Radial Blue Glow */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#0878d1]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-xl">
          {/* Eyebrow badge */}
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="text-[#38bdf8] font-extrabold text-[11px] sm:text-xs uppercase tracking-[0.22em] drop-shadow-sm">
                {eyebrow}
              </span>
            </motion.div>
          )}

          {/* Headline with Glowing Gradient Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight drop-shadow-md"
          >
            {title}{' '}
            {titleAccent && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#0878d1] to-[#60a5fa] drop-shadow">
                {titleAccent}
              </span>
            )}
          </motion.h1>

          {/* Subtitle / Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal max-w-xl drop-shadow"
            >
              {description}
            </motion.p>
          )}

          {/* Action Buttons Matching Mockup Exact Aesthetic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
          >
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="btn-gradient inline-flex items-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-white text-sm sm:text-base font-bold shadow-lg shadow-[#0878d1]/30 group"
              >
                <span>{primaryAction.label}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition duration-500" />
              </Link>
            )}

            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white/10 hover:bg-white hover:text-[#08233f] text-white border border-white/30 backdrop-blur-md text-sm sm:text-base font-bold transition duration-500 shadow-sm group"
              >
                <span>{secondaryAction.label}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition duration-500" />
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Horizontal Glass Feature Bar Exactly Like Reference Image */}
      {showCategories && (
        <div className="relative z-10 w-full border-t border-white/15 bg-[#030e1a]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Feature Category Chips */}
            <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 lg:flex items-center gap-2.5 sm:gap-4 overflow-x-auto pb-1 lg:pb-0">
              {categories.map((item, idx) => {
                const IconComponent = item.icon || ShieldCheck;
                return (
                  <Link
                    key={idx}
                    href={item.href || '/products'}
                    className="flex items-center gap-3 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-sky-400/40 transition duration-500 group shrink-0"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0878d1]/40 to-sky-400/20 border border-sky-400/30 flex items-center justify-center text-sky-300 group-hover:scale-105 group-hover:text-white transition duration-500 shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition duration-500 leading-tight">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-400 group-hover:text-slate-200 transition duration-500 hidden sm:block">
                        {item.sublabel}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Right: Watch Our Work / Quick Project Tour */}
            {showWatchWork && (
              <Link
                href="/gallery"
                className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-sky-400/40 transition duration-500 group shrink-0"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0878d1] to-sky-400 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition duration-500">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white group-hover:text-sky-300 transition duration-500">
                    Watch Our Work
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Inspiration Gallery
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
