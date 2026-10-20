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
      className="relative min-h-[640px] sm:min-h-[700px] lg:min-h-[760px] w-full text-white overflow-hidden flex flex-col justify-between bg-[#040e1a]"
      aria-label="Hero Banner"
    >
      {/* Background Photography with Architectural Depth */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt=""
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

        {/* Soft Ambient Radial Blue Glow */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#0878d1]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28 pb-8 flex-1 flex flex-col justify-center">
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
                className="btn-gradient inline-flex items-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-white text-sm sm:text-base font-bold shadow-lg shadow-[#0878d1]/30 transition-all duration-200 ease-out hover:-translate-y-0.5 group"
              >
                <span>{primaryAction.label}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 ease-out" />
              </Link>
            )}

            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white/10 hover:bg-white hover:text-[#08233f] text-white border border-white/30 backdrop-blur-md text-sm sm:text-base font-bold transition-all duration-200 ease-out hover:-translate-y-0.5 shadow-sm group"
              >
                <span>{secondaryAction.label}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 ease-out" />
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* Embedded Floating Glass Feature Bar (Inside the Hero background image, no scrollbar) */}
      {showCategories && (
        <div className="relative z-10 w-full pb-6 pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-3.5">
              {/* Feature Category Chips with hidden scrollbars */}
              <div className="w-full lg:w-auto flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1">
                {categories.map((item, idx) => {
                  const IconComponent = item.icon || ShieldCheck;
                  return (
                    <Link
                      key={idx}
                      href={item.href || '/products'}
                      className="flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-[#030e1a]/65 hover:bg-[#030e1a]/85 border border-white/15 hover:border-sky-400/50 backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-0.5 group shrink-0 shadow-lg shadow-black/20"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#0878d1]/50 to-sky-400/25 border border-sky-400/30 flex items-center justify-center text-sky-300 group-hover:scale-105 group-hover:text-white transition-all duration-200 ease-out shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors duration-200 ease-out leading-tight whitespace-nowrap">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-300 group-hover:text-slate-100 transition-colors duration-200 ease-out whitespace-nowrap">
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
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#030e1a]/65 hover:bg-[#030e1a]/85 border border-white/15 hover:border-sky-400/50 backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-0.5 group shrink-0 shadow-lg shadow-black/20"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#0878d1] to-sky-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200 ease-out">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors duration-200 ease-out whitespace-nowrap">
                      Watch Our Work
                    </span>
                    <span className="text-[10px] text-slate-300 whitespace-nowrap">
                      Inspiration Gallery
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
