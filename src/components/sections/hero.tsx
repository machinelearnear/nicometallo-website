'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navDelay, loaderDelay } from '@/utils';
import { usePrefersReducedMotion } from '@/hooks';

const items = [
  <h1 key="1" className="font-mono text-[14px] md:text-[16px] mb-4 tracking-[0.15em] uppercase font-bold" style={{ color: 'var(--coral)' }}>
    Hola, my name is
  </h1>,
  <h2 key="2" className="big-heading font-black tracking-tight relative inline-block" style={{
    color: 'var(--warm-white)',
    textShadow: '4px 4px 0 var(--coral), 8px 8px 0 var(--cyan)'
  }}>
    Nico.
  </h2>,
  <h3 key="3" className="big-heading mt-2 font-bold" style={{ color: 'var(--warm-gray)' }}>
    I like to build things with data.
  </h3>,
  <p key="4" className="mt-8 max-w-[540px] text-lg md:text-xl leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
    Un pibe del conurbano que anda de ciudad en ciudad.{' '}
    <span className="inline-flex items-center gap-1 font-semibold" style={{ color: 'var(--warm-white)' }}>
      <span role="img" aria-label="Argentina">🇦🇷</span> in <span role="img" aria-label="United Kingdom">🇬🇧</span>
    </span>
    {' '}/ Machine Learning at{' '}
    <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer" className="inline-link">Amazon</a>{' '}
    / Opinions are my own / Sharing what I learn on{' '}
    <a href="https://www.youtube.com/@machinelearnear" target="_blank" rel="noreferrer" className="inline-link">YouTube</a>.
  </p>,
  <a
    key="5"
    className="email-link button mt-[50px] inline-block"
    href="https://www.youtube.com/@machinelearnear"
    target="_blank"
    rel="noreferrer"
  >
    Check out my channel!
  </a>,
];

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true);
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  return (
    <section className="flex items-center justify-center min-h-screen h-screen px-0 py-0 max-w-full">
      {prefersReducedMotion ? (
        <div className="flex flex-col items-start">
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <div className="flex flex-col items-start w-full">
            {isMounted &&
              items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.645, 0.045, 0.355, 1],
                    delay: (loaderDelay + i * 100) / 1000 
                  }}
                  className="w-full"
                >
                  {item}
                </motion.div>
              ))}
          </div>
        </AnimatePresence>
      )}
    </section>
  );
}
