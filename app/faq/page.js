import PageHero from '@/components/ui/PageHero';
import Accordion from '@/components/ui/Accordion';
import CTABanner from '@/components/ui/CTABanner';
import { FAQS, COMPANY } from '@/lib/constants';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta('faq');

export default function FAQPage() {
  return (
    <div className="flex flex-col">
      {/* Page Hero */}
      <PageHero
        eyebrow="HELP & KNOWLEDGE BASE"
        title="Frequently Asked"
        titleAccent="Questions"
        description="Clear answers regarding toughened glass properties, order minimums, custom cutting tolerances, delivery options, and project consultation in Jodhpur."
        primaryAction={{ label: 'Ask a Question', href: '/contact#quote' }}
        secondaryAction={{ label: 'View Products', href: '/products' }}
        backgroundImage="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=2000&q=85"
        showCategories={true}
        showWatchWork={true}
      />

      {/* Accordions Section */}
      <section className="py-16 sm:py-24 bg-[#f6f8fa]" aria-label="FAQ Accordion">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Questions & Answers</span>
            <h2 className="text-3xl font-extrabold text-[#08233f] mt-2">
              Everything You Need to Know
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Click any question below to expand the detailed answer.
            </p>
          </div>

          <Accordion items={FAQS} />
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-[#08233f]">
            Have a Question Not Listed Here?
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Our technical team is ready to answer specific inquiries about glass thickness, load calculations, custom hardware compatibility, and on-site delivery in Rajasthan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${COMPANY.whatsapp}?text=Hello%20Jangid%20Tuff%20Glasses,%20I%20have%20a%20question.`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 font-bold text-sm transition"
            >
              Ask on WhatsApp
            </a>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="rounded-full border border-slate-300 text-[#08233f] px-7 py-3.5 font-bold text-sm hover:bg-slate-50 transition"
            >
              Call {COMPANY.contactPerson} ({COMPANY.phone})
            </a>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />
    </div>
  );
}
