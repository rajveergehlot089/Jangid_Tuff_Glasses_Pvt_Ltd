'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Styled replacement for <select> (native option lists cannot be styled).
 * `options` may be strings or { value, label } pairs; `placeholder` shows while value is empty.
 * Select-only combobox pattern: arrows / Home / End move, Enter / Space choose, Esc closes, typing a letter jumps.
 */
export default function GlassSelect({
  label,
  value,
  options: rawOptions,
  onChange,
  name,
  placeholder = 'Select',
  labelClassName = 'block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-1.5',
  buttonClassName = 'px-3 py-2.5',
}) {
  const options = rawOptions.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const selectedIndex = options.findIndex((o) => o.value === value);
  const selectedLabel = selectedIndex >= 0 ? options[selectedIndex].label : '';
  const id = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(Math.max(0, selectedIndex));
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  // Close when clicking or tapping anywhere else.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => !rootRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  // Keep the highlighted option in view.
  useEffect(() => {
    if (open) listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const openList = () => {
    setActive(Math.max(0, selectedIndex));
    setOpen(true);
  };
  const choose = (i) => {
    onChange(options[i].value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    const last = options.length - 1;
    if (e.key === 'ArrowDown') setActive((i) => Math.min(last, i + 1));
    else if (e.key === 'ArrowUp') setActive((i) => Math.max(0, i - 1));
    else if (e.key === 'Home') setActive(0);
    else if (e.key === 'End') setActive(last);
    else if (e.key === 'Enter' || e.key === ' ') choose(active);
    else if (e.key === 'Escape' || e.key === 'Tab') return setOpen(false);
    else if (e.key.length === 1) {
      const hit = options.findIndex((o) => o.label.toLowerCase().startsWith(e.key.toLowerCase()));
      if (hit >= 0) setActive(hit);
      return;
    } else return;
    e.preventDefault();
  };

  return (
    <div ref={rootRef} className="relative">
      {name && <input type="hidden" name={name} value={value} />}
      <span id={`${id}-label`} className={labelClassName}>
        {label}
      </span>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        aria-controls={`${id}-list`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`w-full flex items-center justify-between gap-2 rounded-xl border ${buttonClassName} text-sm text-left text-white transition-colors ${
          open ? 'border-[var(--gold)] bg-white/[0.09]' : 'border-white/15 bg-white/[0.06] hover:border-white/30'
        }`}
      >
        <span id={`${id}-value`} className={`truncate ${selectedLabel ? '' : 'text-white/45'}`}>{selectedLabel || placeholder}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-[var(--gold-bright)] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={`${id}-list`}
            role="listbox"
            aria-labelledby={`${id}-label`}
            data-lenis-prevent
            initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95, transition: { duration: 0.15 } }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ transformOrigin: 'top' }}
            className="glass-dropdown absolute left-0 right-0 top-full mt-2 z-40 max-h-64 overflow-y-auto overscroll-contain p-1.5"
          >
            {options.map((opt, i) => {
              const selected = opt.value === value;
              return (
                <li
                  key={opt.value}
                  id={`${id}-opt-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={selected}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => choose(i)}
                  className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors ${
                    i === active ? 'bg-white/10' : ''
                  } ${selected ? 'font-semibold text-[var(--gold-bright)]' : i === active ? 'text-white' : 'text-white/75'}`}
                >
                  <span>{opt.label}</span>
                  {selected && <Check className="w-4 h-4 shrink-0 text-[var(--gold-bright)]" aria-hidden="true" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
