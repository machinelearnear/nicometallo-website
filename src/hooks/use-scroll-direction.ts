import { useState, useEffect } from 'react';

const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';

type ScrollDirection = typeof SCROLL_UP | typeof SCROLL_DOWN;

interface UseScrollDirectionProps {
  initialDirection?: ScrollDirection;
  thresholdPixels?: number;
  off?: boolean;
}

export function useScrollDirection(props?: UseScrollDirectionProps | ScrollDirection): ScrollDirection {
  const options: UseScrollDirectionProps = typeof props === 'string' 
    ? { initialDirection: props } 
    : props || {};

  const {
    initialDirection = SCROLL_UP,
    thresholdPixels = 0,
    off = false,
  } = options;

  const [scrollDir, setScrollDir] = useState<ScrollDirection>(initialDirection);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const threshold = thresholdPixels || 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    if (!off) {
      window.addEventListener('scroll', onScroll);
    } else {
      setScrollDir(initialDirection);
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [initialDirection, thresholdPixels, off]);

  return scrollDir;
}
