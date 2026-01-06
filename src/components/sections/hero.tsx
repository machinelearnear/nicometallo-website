'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navDelay, loaderDelay } from '@/utils';
import { usePrefersReducedMotion } from '@/hooks';

const items = [
  <h1 key="1" className="text-green font-mono text-[14px] md:text-[16px] mb-[20px] md:mb-[30px] ml-1 tracking-wider">
    Hi, my name is
  </h1>,
  <h2 key="2" className="big-heading text-lightest-slate font-bold tracking-tight drop-shadow-[0_0_35px_rgba(100,255,218,0.15)]">
    Nico.
  </h2>,
  <h3 key="3" className="big-heading text-slate mt-2 font-medium">
    I&apos;m a builder.
  </h3>,
  <p key="4" className="mt-6 max-w-[540px] text-lg md:text-xl text-slate leading-relaxed">
    Currently based in <span className="inline-flex items-center gap-1">Madrid <span role="img" aria-label="Spain">🇪🇸</span></span>, 
    previously in the <span className="inline-flex items-center gap-1">UK <span role="img" aria-label="United Kingdom">🇬🇧</span></span> and 
    the <span className="inline-flex items-center gap-1">US <span role="img" aria-label="United States">🇺🇸</span></span>. 
    Leading sovereign AI initiatives at{' '}
    <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer" className="text-green hover:text-green/80 hover:drop-shadow-[0_0_8px_rgba(100,255,218,0.5)] transition-all duration-300">AWS</a> and 
    sharing what I learn on{' '}
    <a href="https://www.youtube.com/@machinelearnear" target="_blank" rel="noreferrer" className="text-green hover:text-green/80 hover:drop-shadow-[0_0_8px_rgba(100,255,218,0.5)] transition-all duration-300">YouTube</a>.
  </p>,
  <a
    key="5"
    className="email-link button mt-[50px]"
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
