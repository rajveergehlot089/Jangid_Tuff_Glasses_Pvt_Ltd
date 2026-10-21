'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Calculator } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const WHATSAPP_URL = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
  'Hello Jangid Tuff Glasses, I would like a quotation for glass work.'
)}`;

/** Phones only: the three ways to reach the factory, always within thumb reach. */
export default function MobileActionBar() {
  return (
    <motion.nav
      aria-label="Quick contact"
      data-track="mobile action bar"
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
      className="md:hidden fixed inset-x-3 bottom-3 z-50 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="capsule grid grid-cols-3 gap-1.5 p-1.5">
        <a href={`tel:${COMPANY.phoneRaw}`} className="flex flex-col items-center gap-0.5 rounded-full py-2 text-white/90 active:bg-white/10">
          <Phone className="w-[18px] h-[18px]" aria-hidden="true" />
          <span className="text-[11px] font-semibold">Call</span>
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 rounded-full py-2 text-emerald-300 active:bg-white/10"
        >
          <MessageSquare className="w-[18px] h-[18px]" aria-hidden="true" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>
        <Link href="/#estimate" className="btn-royal !flex-col !gap-0.5 !py-2 !px-2 justify-center">
          <Calculator className="w-[18px] h-[18px]" aria-hidden="true" />
          <span className="text-[11px]">Estimate</span>
        </Link>
      </div>
    </motion.nav>
  );
}
