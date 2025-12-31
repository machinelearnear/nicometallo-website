'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navDelay, loaderDelay } from '@/utils';
import { usePrefersReducedMotion } from '@/hooks';

const items = [
  <h1 key="1" className="text-green font-mono text-[16px] mb-[30px] ml-1">
    Hi, my name is
  </h1>,
  <h2 key="2" className="big-heading text-slate-lightest font-bold tracking-tight">
    Nicolas Metallo.
  </h2>,
  <h3 key="3" className="big-heading text-slate mt-2">
    I build AI that matters.
  </h3>,
  <p key="4" className="mt-5 max-w-[540px] text-lg md:text-xl text-slate">
    I&apos;m a Generative AI leader helping enterprises and governments across EMEA unlock the potential
    of AI. Currently at <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer" className="text-green hover:underline decoration-green/50 underline-offset-4 transition-all">AWS</a> leading
    sovereign AI initiatives, and sharing what I learn on <a href="https://www.youtube.com/@machinelearnear" target="_blank" rel="noreferrer" className="text-green hover:underline decoration-green/50 underline-offset-4 transition-all">YouTube</a>.
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
