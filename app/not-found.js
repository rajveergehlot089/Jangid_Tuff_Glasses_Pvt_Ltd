import Link from 'next/link';
import { ArrowRight, Home, Phone } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import DarkCanvas from '@/components/layout/DarkCanvas';

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <DarkCanvas images={['/images/optimized/structural-glazing-double-height-villa.webp']}>
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#f6f8fa]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center">
        <span className="text-6xl font-black text-[#0878d1]">404</span>
        <h1 className="text-2xl font-extrabold text-[#08233f] mt-4">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm mt-3 leading-relaxed">
          The glass page or resource you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="rounded-full bg-[#0878d1] hover:bg-sky-600 text-white px-6 py-3 font-bold text-xs transition inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-slate-300 text-[#08233f] px-6 py-3 font-bold text-xs hover:bg-slate-50 transition inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
    </DarkCanvas>
  );
}
