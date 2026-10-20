'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Toast from '@/components/ui/Toast';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { buildWhatsAppUrl } from '@/lib/utils';
import { trackQuoteFormStart, trackQuoteFormSubmit } from '@/lib/analytics';

export default function ContactQuoteForm({ initialProduct = '' }) {
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
    product: resolveProduct(initialProduct),
    location: '',
    dimensions: '',
    quantity: '',
    timeline: 'Immediate (1–2 weeks)',
    details: '',
    consent: false,
  });

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('success');
  const [popupBlockedUrl, setPopupBlockedUrl] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const [hasStartedForm, setHasStartedForm] = useState(false);

  const handleChange = (e) => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackQuoteFormStart(formData.product);
    }
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
      setToastVariant('error');
      setToastMessage('Please complete all required fields correctly.');
      setShowToast(true);
      // Move focus to the first field that needs attention so keyboard and screen-reader users land on it.
      const firstInvalid = ['name', 'phone', 'email', 'details', 'consent'].find((key) => errors[key]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }
    setToastVariant('success');

    // Track submission with non-sensitive metadata only (category & timeline, NO PII)
    trackQuoteFormSubmit(formData.product, formData.timeline);

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
      setToastVariant('error');
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
            aria-required="true"
            aria-invalid={!!formErrors.name}
            aria-describedby={formErrors.name ? 'name-error' : undefined}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all duration-200 ease-out ${
              formErrors.name ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300 focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1]'
            }`}
          />
          {formErrors.name && (
            <p id="name-error" role="alert" className="text-red-500 text-xs mt-1 font-medium">
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
            aria-required="true"
            aria-invalid={!!formErrors.phone}
            aria-describedby={formErrors.phone ? 'phone-error' : undefined}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all duration-200 ease-out ${
              formErrors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300 focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1]'
            }`}
          />
          {formErrors.phone && (
            <p id="phone-error" role="alert" className="text-red-500 text-xs mt-1 font-medium">
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
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all duration-200 ease-out ${
              formErrors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300 focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1]'
            }`}
          />
          {formErrors.email && (
            <p id="email-error" role="alert" className="text-red-500 text-xs mt-1 font-medium">
              {formErrors.email}
            </p>
          )}
        </div>

        {/* Product Select */}
        <div>
          <label htmlFor="product" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Product / Category
          </label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1] outline-none transition-all duration-200 ease-out"
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
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1] outline-none transition-all duration-200 ease-out"
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
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1] outline-none transition-all duration-200 ease-out"
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
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1] outline-none transition-all duration-200 ease-out"
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
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1] outline-none transition-all duration-200 ease-out"
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
            aria-required="true"
            aria-invalid={!!formErrors.details}
            aria-describedby={formErrors.details ? 'details-error' : undefined}
            placeholder="Describe the application, required glass thickness (e.g. 8mm, 10mm, 12mm), cutouts, hardware requirements, or whether installation guidance is needed..."
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all duration-200 ease-out ${
              formErrors.details ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300 focus:border-[#0878d1] focus:ring-1 focus:ring-[#0878d1]'
            }`}
          />
          {formErrors.details && (
            <p id="details-error" role="alert" className="text-red-500 text-xs mt-1 font-medium">
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
              aria-required="true"
              aria-invalid={!!formErrors.consent}
              aria-describedby={formErrors.consent ? 'consent-error' : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 rounded text-[#0878d1] focus:ring-[#0878d1] cursor-pointer transition-colors duration-200 ease-out"
            />
            <label htmlFor="consent" className="text-xs text-slate-600 leading-normal cursor-pointer select-none">
              I consent to sharing these details to receive a project assessment and quote from Jangid Tuff Glasses Private Limited.
            </label>
          </div>
          {formErrors.consent && (
            <p id="consent-error" role="alert" className="text-red-500 text-xs mt-1.5 font-medium pl-6">
              {formErrors.consent}
            </p>
          )}
        </div>

        {/* Popup Blocked Fallback */}
        {popupBlockedUrl && (
          <div className="sm:col-span-2 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
            <div>
              <strong className="block font-bold">Browser blocked opening WhatsApp automatically:</strong>
              <span>Your enquiry has been prepared. Click the button to launch your WhatsApp chat directly.</span>
            </div>
            <a
              href={popupBlockedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all duration-200 ease-out hover:-translate-y-0.5 shadow-sm inline-flex items-center gap-1.5"
            >
              <span>Open in WhatsApp Now</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}

        {/* Submit Button */}
        <div className="sm:col-span-2 mt-2">
          <button
            type="submit"
            className="btn-gradient w-full rounded-full text-white py-4 font-bold text-base flex items-center justify-center gap-3 shadow-lg cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Generate Enquiry in WhatsApp →</span>
          </button>
          <p className="text-[11px] text-slate-500 text-center mt-3">
            Clicking prepares your structured enquiry in WhatsApp. You can review all details before sending.
          </p>
        </div>
      </form>

      <Toast message={toastMessage} isVisible={showToast} variant={toastVariant} onClose={() => setShowToast(false)} />
    </>
  );
}
