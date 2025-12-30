'use client';

import { useState, useEffect } from 'react';

interface SideProps {
  children: React.ReactNode;
  isHome?: boolean;
  orientation: 'left' | 'right';
}

export default function Side({ children, isHome = false, orientation }: SideProps) {
  const [isMounted, setIsMounted] = useState(!isHome);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
    setPrefersReducedMotion(!mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(!e.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (isHome && !prefersReducedMotion) {
      const timeout = setTimeout(() => setIsMounted(true), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isHome, prefersReducedMotion]);

  const leftPosition = orientation === 'left' ? '40px' : 'auto';
  const rightPosition = orientation === 'left' ? 'auto' : '40px';

  return (
    <div
      className="w-10 fixed bottom-0 z-10 text-light-slate hidden md:block"
      style={{
        left: leftPosition,
        right: rightPosition,
      }}
    >
      {prefersReducedMotion ? (
        <>{children}</>
      ) : isMounted ? (
        <div className="animate-fade-in">{children}</div>
      ) : null}
    </div>
  );
}
