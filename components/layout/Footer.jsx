import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { BUSINESS, CONTACT, NAV_LINKS, PRODUCT_CATEGORIES, SOCIAL_LINKS, COMPANY } from '@/lib/constants';

const quickLinks = NAV_LINKS.filter(
  (l) => l.href !== '/' && l.href !== '/faq'
);

const productLinks = PRODUCT_CATEGORIES.slice(0, 6).map((p) => ({
  label: p.name,
  href: `/products/${p.slug}`,
}));

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#050b18] text-slate-300" role="contentinfo">
      {/* Brand poster band: shown edge to edge at its natural ratio so none of the lettering is cropped */}
      <div className="relative w-full aspect-[1672/478] min-h-[9rem]">
        <Image
          src="/images/optimized/footer-poster-brand.webp"
          alt="Jangid Tuff Glasses Private Limited — Better spaces through better glass"
          fill
          sizes="100vw"
          className="object-cover object-left-top"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#050b18]" />
      </div>

      {/* Second poster ("Glass builds a brighter tomorrow") as a dimmed texture behind the links */}
      <div className="absolute right-0 bottom-0 left-[45%] top-[min(28.6vw,30rem)] pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_35%)]" aria-hidden="true">
        <Image src="/images/optimized/footer-poster-tagline.webp" alt="" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover object-right opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050b18] via-[#050b18]/70 to-[#050b18]/90" />
      </div>

      {/* Main footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1 — Brand with Official Logo */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white p-0.5 border border-white/20 shadow-lg">
                <Image
                  src="/logo.jpg"
                  alt="Jangid Tuff Glass"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-black text-white tracking-tight group-hover:text-[var(--royal-bright)] transition duration-500">
                  JANGID TUFF
                </span>
                <span className="text-[10px] font-extrabold tracking-[0.2em] text-[var(--royal-bright)] uppercase">
                  GLASS PVT LTD
                </span>
              </div>
            </Link>

            <p className="text-xs text-[var(--royal-bright)] font-semibold mb-3 tracking-wide">
              {COMPANY.name}
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400 mb-6">
              Precision-cut toughened safety glass, slim architectural partitions, bespoke mirrors, and LED glass solutions in Jodhpur, Rajasthan.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-[var(--royal)] hover:border-[var(--royal)] hover:text-white hover:-translate-y-0.5 transition-all duration-200 ease-out shadow-sm"
                  aria-label={`Follow us on ${platform}`}
                >
                  <SocialIcon platform={platform} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-5">
              Explore Pages
            </h2>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 ease-out"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 ease-out"
                >
                  FAQ & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Products */}
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-5">
              Glass Solutions
            </h2>
            <ul className="space-y-3" role="list">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-[var(--royal-bright)] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 ease-out"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-5">
              Jodhpur Workshop
            </h2>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-400" role="list">
              <li>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="flex items-start gap-2.5 hover:text-white transition-colors duration-200 ease-out group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-[var(--royal-bright)] shrink-0 group-hover:scale-110 transition-transform duration-200 ease-out" />
                  <span className="font-semibold text-white">{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=Hello%20Jangid%20Tuff%20Glasses,%20I%20have%20an%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-emerald-400 transition-colors duration-200 ease-out group"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0 animate-pulse" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.mapsQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-white transition-colors duration-200 ease-out group"
                >
                  <MapPin className="w-4 h-4 mt-0.5 text-[var(--royal-bright)] shrink-0 group-hover:scale-110 transition-transform duration-200 ease-out" />
                  <span className="leading-snug">{CONTACT.address}</span>
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-5 border-t border-white/10">
              <Link
                href="/contact#quote"
                className="btn-royal group w-full justify-center !text-xs"
              >
                <span>Request Project Estimate</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/65">
          <p>© {year} {BUSINESS.name} Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="py-1.5 hover:text-slate-300 transition-colors duration-200 ease-out">
              Privacy Policy
            </Link>
            <Link href="/terms" className="py-1.5 hover:text-slate-300 transition-colors duration-200 ease-out">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="py-1.5 hover:text-slate-300 transition-colors duration-200 ease-out">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ platform }) {
  const size = 16;
  switch (platform) {
    case 'facebook':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    default:
      return null;
  }
}
