'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navDelay, loaderDelay } from '@/utils';
import { usePrefersReducedMotion } from '@/hooks';

const items = [
  <h1 key="1" className="font-mono text-[14px] md:text-[16px] mb-4 tracking-[0.15em] uppercase font-bold" style={{ color: 'var(--coral)' }}>
    Hola! My name is
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
    Originally from{' '}
    <a href="https://es.wikipedia.org/wiki/Club_Deportivo_Mor%C3%B3n" target="_blank" rel="noreferrer" className="inline-link">Morón</a>,
    but currently based in Madrid (prev{' '}
    <span role="img" aria-label="United Kingdom">🇬🇧</span>
    ). Used to run Sovereign AI @{' '}
    <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer" className="inline-link">AWS</a>.
    Currently building Agentic AI apps @{' '}
    <a href="https://www.sgs.com/" target="_blank" rel="noreferrer" className="inline-link">SGS</a>.
    Occasionally I also share my thoughts on{' '}
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
