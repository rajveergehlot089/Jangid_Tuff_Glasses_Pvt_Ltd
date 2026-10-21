'use client';

import { useEffect, useRef } from 'react';
import HomeBackdrop from '@/components/ui/HomeBackdrop';

/**
 * Wraps a page body in the homepage look: fixed crossfading photo backdrop + dark/glass theme.
 * Also gives older page content (blocks not already using <Reveal>) a two-way scroll entrance:
 * it rises in when scrolled to from above, drops in when scrolled back to from below.
 */
export default function DarkCanvas({ images, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const targets = [];
    const skip = (el) => el.closest('[data-reveal]') || el.querySelector('[data-reveal]') || el.closest('.card-frame');
    const isGrid = (el) => getComputedStyle(el).display === 'grid';
    // Picture-like blocks (an image with little text) wipe open instead of sliding.
    const isMedia = (el) => el.querySelector('img') && el.textContent.trim().length < 60;
    const add = (el, { x = 0, delay = 0 } = {}) => {
      if (skip(el)) return;
      el.style.setProperty('--rv-x', `${x}px`);
      el.style.setProperty('--rv-delay', `${delay}ms`);
      if (isMedia(el)) el.classList.add('rv-media');
      // Photo frames inside a card wipe open while the card itself slides in.
      else el.querySelectorAll('img').forEach((img) => img.parentElement.closest('.overflow-hidden')?.classList.add('rv-frame'));
      targets.push(el);
    };

    // Grid cells arrive column by column from alternating sides, then row by row.
    const revealGrid = (grid, baseDelay = 0) => {
      const cells = [...grid.children];
      const cols = Math.max(1, getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length);
      cells.forEach((cell, i) => {
        const col = i % cols;
        const x = cols === 1 ? 0 : col === 0 ? -70 : col === cols - 1 ? 70 : 0;
        // A text column inside a 2-up layout cascades its own lines after it lands.
        if (cols === 2 && !isMedia(cell) && cell.children.length >= 3 && cell.children.length <= 10 && !isGrid(cell)) {
          [...cell.children].forEach((line, j) => add(line, { x: x / 2, delay: baseDelay + j * 70 }));
        } else {
          add(cell, { x, delay: baseDelay + col * 90 + Math.floor(i / cols) * 60 });
        }
      });
    };

    root.querySelectorAll(':scope section').forEach((section) => {
      [...section.children].forEach((container) => {
        if (skip(container) || container.matches('span:empty, .absolute')) return;
        if (isGrid(container)) return revealGrid(container);
        // Otherwise cascade the container's blocks top to bottom; nested grids get the grid treatment.
        let delay = 0;
        [...container.children].forEach((block) => {
          if (skip(block)) return;
          if (isGrid(block) && block.children.length >= 2) revealGrid(block, delay);
          else add(block, { delay });
          delay = Math.min(delay + 70, 280);
        });
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
          if (isIntersecting) {
            target.classList.remove('rv-below', 'rv-above');
          } else {
            target.classList.add(boundingClientRect.top < 0 ? 'rv-above' : 'rv-below');
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((t) => {
      t.classList.add('rv');
      observer.observe(t);
    });
    return () => {
      observer.disconnect();
      targets.forEach((t) => t.classList.remove('rv', 'rv-below', 'rv-above', 'rv-media'));
      root.querySelectorAll('.rv-frame').forEach((f) => f.classList.remove('rv-frame'));
    };
  }, []);

  return (
    <div ref={ref} className="theme-dark home-dark relative isolate text-white">
      <HomeBackdrop images={images} />
      {children}
    </div>
  );
}
