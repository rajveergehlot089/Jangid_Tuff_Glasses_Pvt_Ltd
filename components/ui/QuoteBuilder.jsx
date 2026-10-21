'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'framer-motion';
import { Plus, Trash2, MessageSquare, Phone, Ruler } from 'lucide-react';
import { COMPANY, PRODUCT_CATEGORIES } from '@/lib/constants';
import Reveal from '@/components/ui/Reveal';
import GlassSelect from '@/components/ui/GlassSelect';
import { trackEvent } from '@/lib/analytics';

const THICKNESS = ['5mm', '6mm', '8mm', '10mm', '12mm', '15mm', '19mm'];
const PRODUCT_NAMES = PRODUCT_CATEGORIES.map((p) => p.name);
const LOOKS = ['Clear', 'Extra clear', 'Frosted', 'Tinted', 'Fluted'];
// Multiply a width × height in this unit to get square feet.
const UNITS = { ft: { label: 'feet', toSqFt: 1 }, in: { label: 'inches', toSqFt: 1 / 144 }, mm: { label: 'mm', toSqFt: 1 / 92903.04 } };
const EASE = [0.16, 1, 0.3, 1];

const newItem = (product = PRODUCT_CATEGORIES[0].name) => ({ id: Math.random().toString(36).slice(2), product, thickness: '10mm', look: 'Clear', width: '', height: '', qty: 1 });

function AnimatedNumber({ value }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => v.toLocaleString('en-IN', { maximumFractionDigits: 1, minimumFractionDigits: 1 }));
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.6, ease: EASE });
    return controls.stop;
  }, [mv, value]);
  return <motion.span>{text}</motion.span>;
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  'w-full rounded-xl bg-white/[0.06] border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[var(--gold)] focus:bg-white/[0.09] outline-none transition-colors';

/**
 * Lets a visitor list the glass they need, shows the total area instantly, and sends a complete,
 * ready-to-quote enquiry on WhatsApp. No prices are shown: rates are confirmed by the factory.
 */
export default function QuoteBuilder({ initialProduct } = {}) {
  const uid = useId();
  const [items, setItems] = useState(() => [newItem(initialProduct)]);
  const [unit, setUnit] = useState('ft');
  const [location, setLocation] = useState('');

  const update = (id, patch) => setItems((list) => list.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  const areaOf = (it) => (parseFloat(it.width) || 0) * (parseFloat(it.height) || 0) * UNITS[unit].toSqFt * (parseInt(it.qty, 10) || 0);
  const total = useMemo(() => items.reduce((sum, it) => sum + areaOf(it), 0), [items, unit]); // eslint-disable-line react-hooks/exhaustive-deps
  const ready = items.some((it) => areaOf(it) > 0);

  const whatsappUrl = useMemo(() => {
    const lines = ['Hello Jangid Tuff Glasses, please share a rate for:', ''];
    items.forEach((it, i) => {
      if (!(areaOf(it) > 0)) return;
      lines.push(`${i + 1}. ${it.product} – ${it.thickness}, ${it.look}`);
      lines.push(`   Size: ${it.width} × ${it.height} ${UNITS[unit].label} × ${it.qty} pc (${areaOf(it).toFixed(1)} sq ft)`);
    });
    lines.push('', `Total area: ${total.toFixed(1)} sq ft`);
    if (location.trim()) lines.push(`Site location: ${location.trim()}`);
    return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [items, unit, location, total]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid lg:grid-cols-[1fr_22rem] gap-6 lg:gap-8 items-start" data-track="estimate builder">
      <Reveal from="left" className="glass-dark rounded-[var(--radius-card)] p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            <Ruler className="w-4 h-4 text-[var(--gold-bright)]" aria-hidden="true" />
            Your glass list
          </span>
          <div className="inline-flex rounded-full bg-white/[0.06] border border-white/15 p-1" role="group" aria-label="Measurement unit">
            {Object.entries(UNITS).map(([key, u]) => (
              <button
                key={key}
                type="button"
                onClick={() => setUnit(key)}
                aria-pressed={unit === key}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold ${unit === key ? 'text-[#1c1006]' : 'text-white/70'}`}
              >
                {unit === key && <motion.span layoutId={`${uid}-unit`} className="absolute inset-0 rounded-full bg-[var(--gold-bright)]" transition={{ duration: 0.4, ease: EASE }} />}
                <span className="relative">{u.label}</span>
              </button>
            ))}
          </div>
        </div>

        <ul className="space-y-4" role="list">
          <AnimatePresence initial={false}>
            {items.map((it, i) => (
              <motion.li
                key={it.id}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, transition: { duration: 0.25 } }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative focus-within:z-20 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-lg text-white">Item {String(i + 1).padStart(2, '0')}</span>
                  {items.length > 1 && (
                    <button type="button" onClick={() => setItems((l) => l.filter((x) => x.id !== it.id))} className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10" aria-label={`Remove item ${i + 1}`}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <GlassSelect label="Product" value={it.product} options={PRODUCT_NAMES} onChange={(product) => update(it.id, { product })} />
                  <GlassSelect label="Look" value={it.look} options={LOOKS} onChange={(look) => update(it.id, { look })} />
                </div>
                <div className="mt-3">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-1.5">Thickness</span>
                  <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Thickness for item ${i + 1}`}>
                    {THICKNESS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update(it.id, { thickness: t })}
                        aria-pressed={it.thickness === t}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                          it.thickness === t ? 'bg-[var(--gold-bright)] border-transparent text-[#1c1006]' : 'border-white/15 text-white/75 hover:border-white/40'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <Field label={`Width (${UNITS[unit].label})`}>
                    <input type="number" inputMode="decimal" min="0" value={it.width} onChange={(e) => update(it.id, { width: e.target.value })} placeholder="0" className={inputCls} />
                  </Field>
                  <Field label={`Height (${UNITS[unit].label})`}>
                    <input type="number" inputMode="decimal" min="0" value={it.height} onChange={(e) => update(it.id, { height: e.target.value })} placeholder="0" className={inputCls} />
                  </Field>
                  <Field label="Pieces">
                    <input type="number" inputMode="numeric" min="1" value={it.qty} onChange={(e) => update(it.id, { qty: e.target.value })} className={inputCls} />
                  </Field>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <button
          type="button"
          onClick={() => {
            setItems((l) => [...l, newItem(initialProduct)]);
            trackEvent('estimate_add_item', { items: items.length + 1 });
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-dashed border-white/25 px-4 py-2.5 text-xs font-semibold text-white/80 hover:border-[var(--gold)] hover:text-white transition-colors"
        >
          <Plus className="w-4 h-4" aria-hidden="true" /> Add another item
        </button>
      </Reveal>

      {/* Summary: sticks beside the list on desktop */}
      <Reveal from="right" className="glass-dark rounded-[var(--radius-card)] p-6 sm:p-7 lg:sticky lg:top-28">
        <span className="kicker kicker--light">Your estimate</span>
        <p className="mt-5 text-xs text-white/55 uppercase tracking-[0.18em]">Total glass area</p>
        <p className="mt-1 font-display text-5xl text-white tabular-nums leading-none" aria-live="polite">
          <AnimatedNumber value={total} />
          <span className="ml-2 font-sans text-base text-white/55">sq ft</span>
        </p>
        <p className="mt-2 text-xs text-white/55">{items.length} {items.length === 1 ? 'item' : 'items'} on your list</p>

        <div className="mt-6">
          <Field label="Site location (optional)">
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Shastri Nagar, Jodhpur" className={inputCls} />
          </Field>
        </div>

        <a
          href={ready ? whatsappUrl : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!ready}
          onClick={(e) => {
            if (!ready) return e.preventDefault();
            trackEvent('estimate_sent', { items: items.length, total_sqft: Math.round(total * 10) / 10, unit, product: items[0]?.product });
          }}
          className={`btn-royal w-full justify-center mt-6 ${ready ? '' : 'opacity-50 cursor-not-allowed'}`}
          data-magnetic
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>Get my rate on WhatsApp</span>
        </a>
        <a href={`tel:${COMPANY.phoneRaw}`} className="btn-ghost-light w-full justify-center mt-2.5">
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>Or call {COMPANY.phone}</span>
        </a>
        <p className="mt-5 text-[11px] leading-relaxed text-white/45">
          {ready ? 'Your full list is sent ready to quote.' : 'Enter a size to see your area.'} Final rates are confirmed by our team after checking thickness, edge finish and site measurements.
        </p>
      </Reveal>
    </div>
  );
}
