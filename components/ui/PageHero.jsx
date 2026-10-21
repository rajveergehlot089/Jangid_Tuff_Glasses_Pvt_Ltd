'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';

const defaultCategories = [
  { label: 'Toughened Glass', sublabel: 'Safety & Impact', href: '/products/toughened-glass' },
  { label: 'Mirrors & LED Mirrors', sublabel: 'Backlit & Custom', href: '/products/mirrors-led-mirrors' },
  { label: 'Glass Partitions', sublabel: 'Office & Shower', href: '/products/slim-glass-partitions' },
  { label: 'Decorative Glass', sublabel: 'Fluted & Frosted', href: '/products/decorative-glass' },
  { label: 'Custom Solutions', sublabel: 'Bespoke Fabrication', href: '/products/custom-architectural-glass' },
];

const EASE = [0.16, 1, 0.3, 1];

// Each line of the headline rises out of a mask, one after another.
function MaskLine({ children, delay, className = '' }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function PageHero({
  eyebrow = 'PREMIUM GLASS SOLUTIONS',
  title = 'Transforming Spaces',
  titleAccent = 'with Glass',
  description = 'Modern glass solutions for residential, commercial and industrial spaces. From toughened glass to custom interiors, we bring clarity, elegance and strength to your vision.',
  primaryAction = { label: 'Explore Products', href: '/products' },
  secondaryAction = { label: 'Our Services', href: '/services' },
  backgroundImage = '/images/optimized/villa-poolside-glass-facade.webp',
  showCategories = true,
  categories = defaultCategories,
  showWatchWork = true,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  // Small drift and an early fade, so the hero text never slides under the category rail on short phone screens.
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] w-full text-white overflow-hidden flex flex-col justify-between bg-[var(--ink)]"
      aria-label="Hero Banner"
    >
      {/* Background: slow settle-in zoom + scroll parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.03 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <Image src={backgroundImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050b18]/95 via-[#050b18]/70 to-[#050b18]/15" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050b18]/80 to-transparent" />
      </motion.div>

      {/* One royal blue light pass on load */}
      <motion.span
        aria-hidden="true"
        className="hero-sweep"
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: '100%', opacity: [0, 1, 0] }}
        transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.3 }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 pb-10 flex-1 flex flex-col justify-center"
      >
        <div className="max-w-2xl">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="kicker kicker--light"
            >
              {eyebrow}
            </motion.p>
          )}

          <h1 className="font-display mt-5 text-[2.6rem] sm:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em]">
            <MaskLine delay={0.15}>{title}</MaskLine>
            {titleAccent && (
              <MaskLine delay={0.3} className="italic text-white/75">
                {titleAccent}
              </MaskLine>
            )}
          </h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              className="mt-6 text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed max-w-xl"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            {primaryAction && (
              <Link href={primaryAction.href} className="btn-royal group" data-magnetic>
                <span>{primaryAction.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            )}
            {secondaryAction && (
              <Link href={secondaryAction.href} className="btn-ghost-light glass group" data-magnetic>
                <span>{secondaryAction.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Category rail: separate glass cards that rise in one after another */}
      {showCategories && (
        <div className="relative z-20 w-full pb-6 sm:pb-8">
          <nav aria-label="Product categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul
              role="list"
              className={`flex lg:grid gap-3 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 ${
                showWatchWork ? 'lg:grid-cols-6' : 'lg:grid-cols-5'
              }`}
            >
              {categories.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.8 + i * 0.08 }}
                  className="snap-start shrink-0 w-[11.5rem] lg:w-auto"
                >
                  <Link href={item.href || '/products'} className="rail-card group">
                    <span className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold tabular-nums tracking-[0.2em] text-[var(--gold)] group-hover:text-[var(--gold-bright)] transition-colors duration-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="relative grid place-items-center w-7 h-7 rounded-full border border-white/20 overflow-hidden group-hover:bg-[var(--royal)] group-hover:border-[var(--royal)] transition-colors duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 group-hover:-translate-y-4" aria-hidden="true" />
                        <ArrowUpRight className="absolute w-3.5 h-3.5 text-white -translate-x-4 translate-y-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="mt-auto pt-5 block font-display text-lg leading-tight text-white">{item.label}</span>
                    <span className="mt-1 block text-[11px] text-white/55">{item.sublabel}</span>
                  </Link>
                </motion.li>
              ))}

              {showWatchWork && (
                <motion.li
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.8 + categories.length * 0.08 }}
                  className="snap-start shrink-0 w-[11.5rem] lg:w-auto"
                >
                  <Link href="/gallery" className="rail-card rail-card--accent group">
                    <span className="relative grid place-items-center w-10 h-10 rounded-full bg-white text-[var(--royal)]">
                      <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-25 motion-reduce:hidden" aria-hidden="true" />
                      <Play className="relative w-4 h-4 fill-current ml-0.5" aria-hidden="true" />
                    </span>
                    <span className="mt-auto pt-4 block font-display text-lg leading-tight text-white">Watch Our Work</span>
                    <span className="mt-1 block text-[11px] text-white/75">Inspiration Gallery</span>
                  </Link>
                </motion.li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </section>
  );
}
