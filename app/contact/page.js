'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Phone, MessageSquare, MapPin, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Toast from '@/components/ui/Toast';
import { COMPANY, PRODUCT_CATEGORIES } from '@/lib/constants';
import { buildWhatsAppUrl } from '@/lib/utils';

function ContactFormInner({ initialProductParam }) {
  const resolveProduct = (param) => {
    if (!param) return '';
    const match = PRODUCT_CATEGORIES.find(
      (p) =>
        p.slug.toLowerCase() === param.toLowerCase() ||
        p.slug.toLowerCase().includes(param.toLowerCase()) ||
        p.name.toLowerCase().includes(param.toLowerCase())
    );
    return match ? match.name : param;
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: resolveProduct(initialProductParam),
    location: '',
    dimensions: '',
    quantity: '',
    timeline: 'Immediate (1–2 weeks)',
    details: '',
    consent: false,
  });

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [popupBlockedUrl, setPopupBlockedUrl] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required.';
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please provide a valid 10-digit mobile number.';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.details.trim()) {
      errors.details = 'Please briefly describe your glass project specifications.';
    }
    if (!formData.consent) {
      errors.consent = 'You must agree to share project details for estimation.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setToastMessage('Please complete all required fields correctly.');
      setShowToast(true);
      return;
    }

    // Build WhatsApp URL with clean sanitized fields
    const fields = {
      'Client Name': formData.name.trim(),
      'Phone Number': formData.phone.trim(),
      ...(formData.email.trim() && { Email: formData.email.trim() }),
      'Product / Category': formData.product || 'General Enquiry',
      ...(formData.location.trim() && { 'Project Location': formData.location.trim() }),
      ...(formData.dimensions.trim() && { 'Approx. Dimensions': formData.dimensions.trim() }),
      ...(formData.quantity.trim() && { Quantity: formData.quantity.trim() }),
      Timeline: formData.timeline,
      'Project Details': formData.details.trim(),
    };

    const whatsappUrl = buildWhatsAppUrl(fields);

    setToastMessage('Preparing your WhatsApp enquiry message...');
    setShowToast(true);

    // Attempt to open WhatsApp window
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Browser blocked popup - offer clear fallback link
      setPopupBlockedUrl(whatsappUrl);
      setToastMessage('Popup window blocked. Click the direct link below to launch WhatsApp.');
    } else {
      setPopupBlockedUrl('');
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5 mt-8" noValidate>
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Your Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Vikram Jangid"
            aria-invalid={!!formErrors.name}
            aria-describedby={formErrors.name ? 'name-error' : undefined}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
              formErrors.name ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300 focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1]'
            }`}
          />
          {formErrors.name && (
            <p id="name-error" className="text-red-500 text-xs mt-1 font-medium">
              {formErrors.name}
            </p>
          )}
        </div>

        {/* Mobile Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Mobile Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 81073 88855"
            aria-invalid={!!formErrors.phone}
            aria-describedby={formErrors.phone ? 'phone-error' : undefined}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
              formErrors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300 focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1]'
            }`}
          />
          {formErrors.phone && (
            <p id="phone-error" className="text-red-500 text-xs mt-1 font-medium">
              {formErrors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address (Optional)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            aria-invalid={!!formErrors.email}
            aria-describedby={formErrors.email ? 'email-error' : undefined}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
              formErrors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300 focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1]'
            }`}
          />
          {formErrors.email && (
            <p id="email-error" className="text-red-500 text-xs mt-1 font-medium">
              {formErrors.email}
            </p>
          )}
        </div>

        {/* Product Select */}
        <div>
          <label htmlFor="product" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Product / Category *
          </label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1] outline-none transition"
          >
            <option value="">Select a Category</option>
            {PRODUCT_CATEGORIES.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
            <option value="General Consultation">General Technical Consultation</option>
          </select>
        </div>

        {/* Project Location */}
        <div>
          <label htmlFor="location" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Site Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Boranada / Pal / Shastri Nagar, Jodhpur"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1] outline-none transition"
          />
        </div>

        {/* Approximate Dimensions */}
        <div>
          <label htmlFor="dimensions" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Approx. Dimensions (W × H)
          </label>
          <input
            id="dimensions"
            name="dimensions"
            type="text"
            value={formData.dimensions}
            onChange={handleChange}
            placeholder="e.g. 7ft × 4ft or 2100mm × 1200mm"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1] outline-none transition"
          />
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Quantity / Panels
          </label>
          <input
            id="quantity"
            name="quantity"
            type="text"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 4 panels / 1 mirror"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1] outline-none transition"
          />
        </div>

        {/* Timeline */}
        <div>
          <label htmlFor="timeline" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Required Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1] outline-none transition"
          >
            <option value="Immediate (1–2 weeks)">Immediate (1–2 weeks)</option>
            <option value="Within 2–4 weeks">Within 2–4 weeks</option>
            <option value="Within 1–2 months">Within 1–2 months</option>
            <option value="Just planning / Budget stage">Just planning / Budget stage</option>
          </select>
        </div>

        {/* Project Description */}
        <div className="sm:col-span-2">
          <label htmlFor="details" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Project Description & Specifications *
          </label>
          <textarea
            id="details"
            name="details"
            rows="4"
            value={formData.details}
            onChange={handleChange}
            aria-invalid={!!formErrors.details}
            aria-describedby={formErrors.details ? 'details-error' : undefined}
            placeholder="Describe the application, required glass thickness (e.g. 8mm, 10mm, 12mm), cutouts, hardware requirements, or whether installation guidance is needed..."
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
              formErrors.details ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300 focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1]'
            }`}
          />
          {formErrors.details && (
            <p id="details-error" className="text-red-500 text-xs mt-1 font-medium">
              {formErrors.details}
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={formData.consent}
              onChange={handleChange}
              aria-invalid={!!formErrors.consent}
              aria-describedby={formErrors.consent ? 'consent-error' : undefined}
              className="mt-1 rounded text-[#0878d1] focus:ring-[#0878d1] cursor-pointer"
            />
            <label htmlFor="consent" className="text-xs text-slate-600 leading-normal cursor-pointer">
              I consent to sharing these details to receive a project assessment and quote from Jangid Tuff Glasses Private Limited.
            </label>
          </div>
          {formErrors.consent && (
            <p id="consent-error" className="text-red-500 text-xs mt-1.5 font-medium pl-6">
              {formErrors.consent}
            </p>
          )}
        </div>

        {/* Popup Blocked Fallback */}
        {popupBlockedUrl && (
          <div className="sm:col-span-2 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <strong className="block">Browser blocked opening WhatsApp automatically:</strong>
              <span>Your enquiry has been prepared. Click the button to launch your WhatsApp chat directly.</span>
            </div>
            <a
              href={popupBlockedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-sm"
            >
              Open in WhatsApp Now →
            </a>
          </div>
        )}

        {/* Submit Button */}
        <div className="sm:col-span-2 mt-2">
          <button
            type="submit"
            className="btn-gradient w-full rounded-full text-white py-4 font-bold text-base flex items-center justify-center gap-3 shadow-lg cursor-pointer"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Generate Enquiry in WhatsApp →</span>
          </button>
          <p className="text-[11px] text-slate-500 text-center mt-3">
            Clicking prepares your structured enquiry in WhatsApp. You can review all details before sending.
          </p>
        </div>
      </form>

      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}

function ContactForm() {
  const searchParams = useSearchParams();
  const initialProductParam = searchParams.get('product') || '';
  return <ContactFormInner key={initialProductParam} initialProductParam={initialProductParam} />;
}

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Page Hero */}
      <PageHero
        eyebrow="DIRECT FACTORY CONSULTATION"
        title="Connect & Discuss"
        titleAccent="Your Project"
        description="Discuss your architectural glass requirements directly with our Jodhpur fabrication team. Share site dimensions and get immediate expert guidance."
        primaryAction={{ label: 'Fill Quote Form', href: '#quote' }}
        secondaryAction={{ label: `Call ${COMPANY.phone}`, href: `tel:${COMPANY.phoneRaw}` }}
        backgroundImage="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=85"
        showCategories={true}
        showWatchWork={true}
      />

      {/* Main Contact Section */}
      <section className="py-16 sm:py-20" id="quote">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          {/* Left Column: Business Info & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Connect With Us</span>
              <h2 className="text-3xl font-extrabold text-[#08233f] mt-2">Visit or Call Us</h2>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                We welcome architects, builders, interior designers, and individual homeowners. For site consultations or workshop visits, calling ahead is recommended.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Phone */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#eaf5ff] text-[#0878d1] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Direct Phone / Call
                  </span>
                  <p className="text-sm font-semibold text-[#0878d1] mt-0.5">
                    {COMPANY.contactPerson}
                  </p>
                  <a
                    href={`tel:${COMPANY.phoneRaw}`}
                    className="text-base font-bold text-[#08233f] hover:text-[#0878d1] transition block mt-0.5"
                  >
                    {COMPANY.phone}
                  </a>
                  <span className="text-xs text-slate-400">Available Mon - Sat (9:30 AM - 7:30 PM)</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Instant WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp}?text=Hello%20Jangid%20Tuff%20Glasses,%20I%20have%20an%20enquiry.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-[#08233f] hover:text-emerald-600 transition block mt-0.5"
                  >
                    Chat on {COMPANY.phone}
                  </a>
                  <span className="text-xs text-slate-400">Share drawings, pictures & measurements</span>
                </div>
              </div>

              {/* Address */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#eaf5ff] text-[#0878d1] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Address & Location
                  </span>
                  <p className="text-sm font-semibold text-[#08233f] mt-0.5 leading-snug">
                    {COMPANY.address.full}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Industrial Area Boranada, Jodhpur, Rajasthan</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <a
                href={COMPANY.mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#08233f] px-5 py-3 text-xs font-bold transition"
              >
                <span>Open Google Maps Directions</span>
                <span>↗</span>
              </a>
              <a
                href={COMPANY.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#08233f] px-5 py-3 text-xs font-bold transition"
              >
                <span>Instagram Profile</span>
                <span>↗</span>
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm aspect-video relative">
              <iframe
                title={`Google Maps Location of ${COMPANY.name}`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=21%20Narnadi%2C%20Boranada%2C%20Pal%2C%20Jodhpur%2C%20Rajasthan%20342017&output=embed"
              />
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200">
            <div>
              <span className="text-[#0878d1] font-bold text-xs uppercase tracking-[0.2em]">Estimate & Briefing Form</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08233f] mt-2">
                Request a Project Quote
              </h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Provide as many details as possible. This form formats your enquiry directly into WhatsApp for quick processing by our sales and technical team.
              </p>
            </div>

            <Suspense fallback={<div className="py-12 text-center text-slate-400">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
