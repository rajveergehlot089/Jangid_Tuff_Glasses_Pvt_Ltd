/**
 * Privacy-Conscious Client Analytics Module (Google Analytics 4)
 *
 * Rules:
 * 1. NEVER track personally identifiable information (PII) such as customer names,
 *    phone numbers, email addresses, exact site street addresses, or free-text requirements.
 * 2. Only track anonymous interaction signals (e.g., product slug, method, page path).
 * 3. Safely no-op in development or when NEXT_PUBLIC_GA_ID is not configured.
 * 4. Separate WhatsApp click tracking from confirmed order outcomes.
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

/**
 * Track custom events in GA4 safely
 * @param {string} eventName - GA4 event name (e.g. 'click_whatsapp', 'click_call')
 * @param {Object} [params] - Non-sensitive event parameters
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || !window.gtag || !GA_TRACKING_ID) {
    // In dev or without GA_ID, log in debug mode for developer verification
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[Analytics Debug] Event: ${eventName}`, params);
    }
    return;
  }

  // Ensure no sensitive keys are ever sent
  const sanitizedParams = { ...params };
  const sensitiveKeys = ['name', 'phone', 'email', 'address', 'details', 'notes', 'text', 'message'];
  for (const key of Object.keys(sanitizedParams)) {
    if (sensitiveKeys.includes(key.toLowerCase())) {
      delete sanitizedParams[key];
    }
  }

  window.gtag('event', eventName, sanitizedParams);
}

/**
 * Predefined conversion tracking helpers
 */

export function trackWhatsAppClick(source = 'unknown', product = '') {
  trackEvent('click_whatsapp', {
    source, // e.g. 'floating_button', 'contact_page', 'product_detail', 'header'
    product_category: product || undefined,
    page_location: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

export function trackPhoneCall(source = 'unknown') {
  trackEvent('click_call', {
    source, // e.g. 'header', 'contact_card', 'cta_banner', 'footer'
    page_location: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

export function trackQuoteFormStart(product = '') {
  trackEvent('quote_form_start', {
    product_category: product || undefined,
    page_location: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

export function trackQuoteFormSubmit(product = '', timeline = '') {
  trackEvent('quote_form_submit', {
    product_category: product || 'General Enquiry',
    timeline_preference: timeline || undefined,
    page_location: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

export function trackProductView(productSlug = '', productName = '') {
  trackEvent('view_product', {
    product_slug: productSlug,
    product_name: productName,
  });
}
