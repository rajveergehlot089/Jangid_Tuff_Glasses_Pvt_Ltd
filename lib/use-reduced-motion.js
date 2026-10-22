import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener?.('change', callback);
  return () => mediaQuery.removeEventListener?.('change', callback);
}

const getSnapshot = () => false;
const getServerSnapshot = () => false;

/** True when the visitor's system asks for reduced motion. Safe to call during SSR. */
export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
