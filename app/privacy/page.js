import PageHero from '@/components/ui/PageHero';
import { COMPANY } from '@/lib/constants';
import { generateMetadata as genMeta } from '@/lib/seo';
import DarkCanvas from '@/components/layout/DarkCanvas';

export const metadata = genMeta('privacy');

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="LEGAL & TRANSPARENCY"
        title="Privacy Policy"
        titleAccent="& Standards"
        description="How Jangid Tuff Glasses Private Limited collects, uses, and protects customer inquiry details."
        primaryAction={{ label: 'Contact Team', href: '/contact' }}
        secondaryAction={{ label: 'Home Page', href: '/' }}
        backgroundImage="/images/optimized/retail-storefront-curtain-wall.webp"
        showCategories={false}
        showWatchWork={false}
      />

      <DarkCanvas images={['/images/optimized/structural-glazing-double-height-villa.webp']}>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-600">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-8">
            <strong>Legal Review Notice:</strong> This policy outlines our standard data handling practices. It should be reviewed by legal counsel before formal enterprise contracts.
          </div>

          <h2 className="text-xl font-bold text-[#08233f] mt-8 mb-3">1. Information We Collect</h2>
          <p>
            When you interact with <strong>{COMPANY.name}</strong> through our website quote form, phone, or WhatsApp, we may collect the following project information:
          </p>
          <ul className="list-disc pl-6 space-y-1 my-3">
            <li>Contact details: Name, mobile number, optional email address.</li>
            <li>Project specifications: Product category, approximate dimensions, quantities, delivery location.</li>
            <li>Technical notes: Sketches, elevation drawings, or special cutting instructions you provide voluntarily.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#08233f] mt-8 mb-3">2. How Your Information is Used</h2>
          <p>
            Your information is used strictly to:
          </p>
          <ul className="list-disc pl-6 space-y-1 my-3">
            <li>Prepare accurate glass material estimates and technical recommendations.</li>
            <li>Coordinate site measurements, hardware requirements, or delivery schedules.</li>
            <li>Respond directly to your queries via telephone or WhatsApp.</li>
          </ul>
          <p>
            We do not sell, rent, or trade your contact details to third-party marketing companies.
          </p>

          <h2 className="text-xl font-bold text-[#08233f] mt-8 mb-3">3. WhatsApp Communications</h2>
          <p>
            Our website provides direct integration with WhatsApp for rapid quotation. When you submit an inquiry form, the information is formatted into a WhatsApp message sent directly to our business number (<code>{COMPANY.phone}</code>). WhatsApp communications are subject to WhatsApp&apos;s own privacy terms and end-to-end encryption.
          </p>

          <h2 className="text-xl font-bold text-[#08233f] mt-8 mb-3">4. Cookies and Analytics</h2>
          <p>
            Our website uses minimal, privacy-respecting analytics to evaluate page visits, popular product categories, and referral paths. We do not track personally identifiable information across third-party websites.
          </p>

          <h2 className="text-xl font-bold text-[#08233f] mt-8 mb-3">5. Contact and Data Inquiries</h2>
          <p>
            If you wish to update, review, or delete your contact records with us, please contact us directly:
          </p>
          <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#08233f]">
            <p className="font-bold">{COMPANY.name}</p>
            <p>{COMPANY.address.full}</p>
            <p>Phone: {COMPANY.phone}</p>
            <p>CIN: {COMPANY.cin}</p>
          </div>
        </div>
      </section>
      </DarkCanvas>
    </div>
  );
}
