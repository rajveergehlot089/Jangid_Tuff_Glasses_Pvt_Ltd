'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Menu, X, Phone, ChevronRight, ArrowRight } from 'lucide-react';
import { CONTACT, NAV_LINKS } from '@/lib/constants';


const EASE = [0.16, 1, 0.3, 1];

const mobileMenuVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', damping: 28, stiffness: 240 } },
  exit: { x: '100%', transition: { duration: 0.3, ease: EASE } },
};

const linkVariants = {
  hidden: { x: 30, opacity: 0 },
  visible: (i) => ({ x: 0, opacity: 1, transition: { delay: 0.1 + i * 0.05, duration: 0.5, ease: EASE } }),
};

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });
  // A zero-length arc with a round cap still draws a dot; fade the arc in as scrolling starts.
  const ringOpacity = useTransform(progress, [0, 0.015], [0, 1]);

  // Mobile drawer keyboard behaviour: Esc closes, Tab stays inside, focus returns to the menu button.
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const drawer = drawerRef.current;
    const focusables = () => (drawer ? [...drawer.querySelectorAll('a[href], button:not([disabled])')] : []);
    focusables()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const menuButton = menuButtonRef.current;
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      menuButton?.focus();
    };
  }, [mobileOpen]);

  // Tighten the top spacing once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const pillTarget = hovered ?? NAV_LINKS.find((l) => isActive(l.href))?.href;

  // Capsules settle in one after another on load.
  const capsule = (i) => ({
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.7, ease: EASE, delay: 0.1 + i * 0.08 },
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <nav
        className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3 transition-[padding] duration-500 ${
          scrolled ? 'pt-3' : 'pt-4 sm:pt-5'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Left: brand, ringed by scroll progress */}
        <motion.div {...capsule(0)} className="justify-self-start pointer-events-auto">
          <div className="capsule flex items-center gap-3 py-2 pl-2 pr-6">
            <Link href="/" className="flex items-center gap-3 group" aria-label="Jangid Tuff Glass Home">
              <span className="relative grid place-items-center w-11 h-11 shrink-0">
                <svg className="absolute inset-0 -rotate-90 overflow-visible" viewBox="0 0 44 44" aria-hidden="true">
                  <circle cx="22" cy="22" r="20.8" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2.2" />
                  <motion.circle cx="22" cy="22" r="20.8" fill="none" stroke="var(--royal-bright)" strokeWidth="2.2" strokeLinecap="round" style={{ pathLength: progress, opacity: ringOpacity, filter: "drop-shadow(0 0 3px rgba(125,180,255,0.65))" }} />
                </svg>
                <span className="relative w-9 h-9 rounded-full overflow-hidden bg-white">
                  <Image src="/logo.jpg" alt="Jangid Tuff Glass Logo" fill sizes="36px" className="object-contain p-0.5" priority />
                </span>
              </span>
              <span className="flex flex-col leading-none whitespace-nowrap">
                <span className="font-display text-lg text-white">Jangid</span>
                <span className="mt-1 text-[9px] font-semibold tracking-[0.28em] text-[var(--royal-bright)] uppercase">Tuff Glass</span>
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Centre: page links (desktop) */}
        <motion.div {...capsule(1)} className="pointer-events-auto">
          <div
            className="capsule hidden xl:flex items-center gap-0.5 p-2 min-h-[62px]"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  onFocus={() => setHovered(link.href)}
                  onBlur={() => setHovered(null)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-4 py-2.5 text-[13px] font-medium rounded-full transition-colors duration-200 ${
                    active && !hovered ? 'text-[#fbf3e6] font-semibold' : hovered === link.href ? 'text-white' : 'text-white/65'
                  }`}
                >
                  {pillTarget === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-full ${active && !hovered ? 'liquid-pill' : 'bg-white/12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]'}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Right: actions (desktop) / call + menu (smaller screens) */}
        <motion.div {...capsule(2)} className="justify-self-end pointer-events-auto flex items-center gap-2">
          <div className="capsule hidden xl:flex items-center gap-1.5 p-2 min-h-[62px]">
            <a href={`tel:${CONTACT.phoneRaw}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors" data-magnetic>
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Call Now</span>
            </a>
            <Link href="/contact#quote" className="btn-royal group !py-2.5 !px-5 !text-[13px]" data-magnetic>
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </Link>
          </div>
          <a href={`tel:${CONTACT.phoneRaw}`} className="capsule xl:hidden grid place-items-center w-[52px] h-[52px] text-white" aria-label={`Call ${CONTACT.phone}`}>
            <Phone className="w-[18px] h-[18px]" aria-hidden="true" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="capsule xl:hidden grid place-items-center w-[52px] h-[52px] text-white cursor-pointer"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="glass-dark fixed inset-y-0 right-0 z-50 w-[300px] max-w-[85vw] lg:hidden flex flex-col text-white"
            >
              <div className="flex items-center justify-between px-5 h-18 border-b border-white/10">
                <span className="font-display text-xl">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full glass"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-6 px-4" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.href} custom={i} variants={linkVariants} initial="hidden" animate="visible">
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-display text-2xl transition-colors duration-200 ${
                        isActive(link.href) ? 'bg-[var(--royal)]/25 text-white' : 'text-white/75 hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                      <ChevronRight className={`w-4 h-4 ${isActive(link.href) ? 'text-[var(--royal-bright)]' : 'text-white/30'}`} aria-hidden="true" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-4 border-t border-white/10 space-y-2.5">
                <a href={`tel:${CONTACT.phoneRaw}`} className="btn-ghost-light w-full justify-center">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
                <Link href="/contact#quote" onClick={() => setMobileOpen(false)} className="btn-royal w-full justify-center">
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
