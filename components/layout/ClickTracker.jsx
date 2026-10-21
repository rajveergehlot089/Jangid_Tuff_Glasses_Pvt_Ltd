'use client';

import { useEffect } from 'react';
import { trackPhoneCall, trackWhatsAppClick } from '@/lib/analytics';

/**
 * One site-wide listener that records every Call and WhatsApp tap, wherever the link lives
 * (including server-rendered pages). The source label comes from the nearest [data-track]
 * attribute, else the surrounding section / header / footer, else the page path.
 * Links that track themselves carry data-no-autotrack. Does nothing until a GA id is configured.
 */
export default function ClickTracker() {
  useEffect(() => {
    const sourceOf = (el) => {
      const tagged = el.closest('[data-track]');
      if (tagged) return tagged.dataset.track;
      const area = el.closest('section[id], section[aria-label], header, footer, nav[aria-label]');
      const label = area?.id || area?.getAttribute('aria-label') || area?.tagName.toLowerCase();
      return `${window.location.pathname}${label ? ` · ${label}` : ''}`;
    };
    const onClick = (e) => {
      const link = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!link || link.closest('[data-no-autotrack]')) return;
      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:')) trackPhoneCall(sourceOf(link));
      else if (/wa\.me|api\.whatsapp\.com/.test(href)) trackWhatsAppClick(sourceOf(link));
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
