import PageHero from '@/components/ui/PageHero';
import { COMPANY } from '@/lib/constants';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta('terms');

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="COMMERCIAL FABRICATION TERMS"
        title="Terms & Conditions"
        titleAccent="Of Service"
        description="Standard commercial quotation, fabrication guidelines, and delivery terms for Jangid Tuff Glasses Private Limited."
        primaryAction={{ label: 'Contact Team', href: '/contact' }}
        secondaryAction={{ label: 'Explore Products', href: '/products' }}
        backgroundImage="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2000&q=85"
        showCategories={false}
        showWatchWork={false}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-600">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-8">
            <strong>Commercial Notice:</strong> These terms serve as standard operational guidelines for orders placed with Jangid Tuff Glasses Private Limited. Specific purchase orders or commercial contracts supersede these general terms.
          </div>

          <h2 className="text-xl font-bold text-[#08233f] mt-8 mb-3">1. Quotations and Pricing</h2>
          <p>
            All price estimates generated via website inquiries, WhatsApp, or preliminary consultations are indicative based on provided dimensions and glass variants. Final binding quotations require site measurement verification or confirmed architectural drawings. Quotations are typically valid for 30 calendar days due to raw material price fluctuations.
          </p>

          <h2 className="text-xl font-bold text-[#08233f] mt-8 mb-3">2. Toughened Glass Technical Constraints</h2>
          <p>
            Please note that toughened safety glass cannot be cut, drilled, or edge-worked after undergoing the heat-tempering furnace process. All cutouts, notches, holes, and polished edges must be fully finalized and confirmed prior to production approval.
          </p>

          <h2 className="text-xl font-bold text-[#08233f] mt-8 mb-3">3. Tolerances and Dimensions</h2>
          <p>
            Fabrication conforms to standard architectural glass tolerances (typically ±1.5mm to ±2.0mm depending on panel size and thickness). It is the client&apos;s or contractor&apos;s responsibility to verify that opening clearances, wall plumbness, and floor levels accommodate standard glazing clearances.
          </p>

          <h2 className="text-xl font-bold text-[#08233f] mt-8 mb-3">4. Site Delivery and Transit Safety</h2>
          <p>
            Glass panels are transported in specialized vehicles or protective crating. Delivery is made to the nearest accessible unloading point at the specified site address. Site offloading and internal lifting to upper floors must be coordinated in advance.
          </p>

          <h2 className="text-xl font-bold text-[#08233f] mt-8 mb-3">5. Inspection and Acceptance</h2>
          <p>
            Customers or their appointed representatives must inspect glass panels upon delivery for surface defects, scratches, or transit damage before installation begins. Any discrepancies must be recorded on the delivery challan.
          </p>

          <h2 className="text-xl font-bold text-[#08233f] mt-8 mb-3">6. Jurisdiction</h2>
          <p>
            Any disputes arising from transactions with Jangid Tuff Glasses Private Limited are subject to the exclusive jurisdiction of the competent courts in Jodhpur, Rajasthan, India.
          </p>
        </div>
      </section>
    </div>
  );
}
