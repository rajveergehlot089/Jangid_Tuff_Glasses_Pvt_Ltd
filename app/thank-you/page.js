import Link from 'next/link';
import { CheckCircle2, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export const metadata = {
  title: 'Thank You | Jangid Tuff Glasses',
  description: 'Your inquiry has been received. Our team will contact you shortly.',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#f6f8fa]">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#08233f]">
          Enquiry Received!
        </h1>
        <p className="text-slate-600 text-sm mt-3 leading-relaxed">
          Thank you for reaching out to <strong>{COMPANY.name}</strong>. If you submitted via WhatsApp, please ensure you hit the send button in the WhatsApp window.
        </p>

        <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs space-y-2 text-slate-600">
          <p className="font-bold text-[#08233f]">What happens next:</p>
          <p>1. Our estimation team reviews your specifications and measurements.</p>
          <p>2. We clarify glass thickness, edge polish, and hardware needs if required.</p>
          <p>3. You receive a structured project estimate within business hours.</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="btn-gradient rounded-full text-white px-6 py-3 font-bold text-xs transition-all duration-200 ease-out hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 shadow-md group"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
          </Link>
          <Link
            href="/"
            className="rounded-full border border-slate-300 text-[#08233f] px-6 py-3 font-bold text-xs hover:bg-slate-50 hover:-translate-y-0.5 hover:border-slate-400 transition-all duration-200 ease-out inline-flex items-center justify-center shadow-xs"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
