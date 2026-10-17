'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { BUSINESS, CONTACT, NAV_LINKS, COMPANY } from '@/lib/constants';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="Jangid Tuff Glass Home">
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-slate-200/80 shadow-sm bg-white p-0.5 group-hover:border-[#0878d1]/40 transition duration-500">
        <Image
          src="/logo.jpg"
          alt="Jangid Tuff Glass Logo"
          fill
          sizes="48px"
          className="object-contain p-0.5"
          priority
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-base sm:text-lg font-black text-[#08233f] tracking-tight group-hover:text-[#0878d1] transition duration-500">
          JANGID
        </span>
        <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.18em] text-[#0878d1] uppercase -mt-0.5">
          TUFF GLASS
        </span>
      </div>
    </Link>
  );
}

const mobileMenuVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 25, stiffness: 220 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
};

const linkVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.04, duration: 0.25 },
  }),
};

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition duration-500 ${
        scrolled ? 'shadow-xl shadow-[#08233f]/5' : ''
      }`}
    >
      {/* Top info bar with gradient */}
      <div className="hidden md:block bg-gradient-to-r from-[#041323] via-[#08233f] to-[#0a3560] text-white/85 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
              {CONTACT.addressShort}
            </span>
            <span className="text-white/30">|</span>
            <span className="text-sky-200 font-semibold tracking-wide">
              {COMPANY.name}
            </span>
          </div>
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="flex items-center gap-1.5 text-sky-200 hover:text-white transition duration-500 font-semibold"
          >
            <Phone className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
            <span>{CONTACT.contactPerson}: {CONTACT.phone}</span>
          </a>
        </div>
      </div>

      {/* Main nav bar */}
      <nav
        className="bg-white/95 backdrop-blur-md border-b border-slate-200/80"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-[76px]">
            <Logo />

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-semibold rounded-xl transition duration-500 ${
                    isActive(link.href)
                      ? 'text-[#0878d1] bg-gradient-to-r from-[#eaf5ff] to-[#f3f9ff]'
                      : 'text-[#132b45] hover:text-[#0878d1] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[#0878d1] to-sky-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-[#08233f] border border-slate-200 rounded-xl hover:border-[#0878d1]/40 hover:bg-slate-50 transition duration-500"
              >
                <Phone className="w-4 h-4 text-[#0878d1]" aria-hidden="true" />
                Call Now
              </a>
              <Link
                href="/contact#quote"
                className="btn-gradient flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-md"
              >
                <span>Get a Quote</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-[#08233f] hover:bg-slate-100 transition duration-500 cursor-pointer"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 right-0 z-50 w-[290px] bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-18 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-200">
                    <Image
                      src="/logo.jpg"
                      alt="Logo"
                      fill
                      sizes="36px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-black text-[#08233f]">
                    JANGID TUFF
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 transition duration-500"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition duration-500 ${
                        isActive(link.href)
                          ? 'text-[#0878d1] bg-gradient-to-r from-[#eaf5ff] to-[#f3f9ff]'
                          : 'text-[#132b45] hover:bg-slate-50'
                      }`}
                    >
                      {link.label}
                      <ChevronRight
                        className={`w-4 h-4 ${
                          isActive(link.href)
                            ? 'text-[#0878d1]'
                            : 'text-slate-300'
                        }`}
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTAs */}
              <div className="p-4 border-t border-slate-100 space-y-2.5 bg-slate-50">
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold text-[#08233f] border border-slate-200 bg-white rounded-xl hover:bg-slate-100 transition duration-500"
                >
                  <Phone className="w-4 h-4 text-[#0878d1]" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
                <Link
                  href="/contact#quote"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gradient flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold text-white rounded-xl shadow-md"
                >
                  <span>Request a Quote</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
