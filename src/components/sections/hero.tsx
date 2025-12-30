'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navDelay, loaderDelay } from '@/utils';
import { usePrefersReducedMotion } from '@/hooks';

const items = [
  <h1 key="1">Hi, my name is</h1>,
  <h2 key="2" className="big-heading">Nicolas Metallo.</h2>,
  <h3 key="3" className="big-heading">I build things for the web.</h3>,
  <p key="4">
    I&apos;m a software engineer specializing in building (and occasionally designing) exceptional
    digital experiences. Currently, I&apos;m focused on building accessible, human-centered products
    at <a href="https://upstatement.com/" target="_blank" rel="noreferrer">Upstatement</a>.
  </p>,
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
          {isMounted &&
            items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0, delay: loaderDelay + i * 100 }}
                style={{ transitionDelay: `${loaderDelay + i * 100}ms` }}
              >
                {item}
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </section>
  );
}
